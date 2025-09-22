// This file is a serverless function that runs on Vercel's backend.
// It securely handles the Gemini API calls.

import { GoogleGenAI, Type } from "@google/genai";
import type { FormState, PromptOutput, VideoOnlyFormState, VideoOnlyPromptOutput } from '../types';
import { chooseOutfit, cleanVibe, sceneFromVibe, _is_runway_mode, _runway_scene_phrase, _runway_scene_block, _runway_lighting, _RUNWAY_SHOTS, _sanitize_runway, applyGeneralPassthrough, applyCinematicVariation, applyEditorialOutfits, applyOldMoneyVariation, applyCleanGirlVariation, applyHyperrealBeautyVariation, applyPinterestLifestyleVariation, applySurrealLuxuryVariation, applyStreetStyleVariation } from "../services/promptUtils";

// --- IMPORTANT ---
// This function relies on an Environment Variable named `API_KEY` being set in your Vercel project settings.
// Do NOT hardcode the key here.
if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });


// --- All the original constant definitions from geminiService.ts are moved here ---
const AIMUSE_LUXURY_VIBE = "aspirational, luxury-coded aesthetic; refined modern interiors or upscale details; polished yet natural; Pinterest-worthy influencer energy";
const AIMUSE_REALISM_CORE = "sharp eye focus; visible natural pores; individual hair strands; authentic fabric stretch; realistic jewelry speculars; accurate hands; refined tonal micro-contrast; realistic reflections; no visible lighting equipment";
const NEGATIVE_CORE = "extra fingers, deformed hands, warped face, waxy skin, blurry eyes, low detail, motion blur, text, watermark, logo, lighting gear, crew, tripod";

const SHOT_VARIANTS: Record<string, string[]> = {
    "General": ["full-body composition", "mid-shot from the waist up", "classic portrait framing"],
    "Cinematic": ["wide establishing shot with subject small in frame", "dramatic low-angle full-body shot", "intimate over-the-shoulder mid-shot"],
    "Editorial": ["dynamic full-body pose, slightly off-center", "clean mid-shot with negative space", "graphic close-up on face and accessory detail"],
    "Lifestyle": ["candid full-body walking shot", "relaxed waist-up shot interacting with environment", "tight shot on hands holding coffee/product"],
    "Old Money": ["elegant full-body portrait on estate grounds", "classic three-quarter shot by a fireplace", "poised mid-shot capturing texture of clothing"],
    "Clean Girl Aesthetic": ["minimalist full-body against a clean wall", "sunlit mid-shot with soft focus background", "tight beauty shot focused on glowing skin"],
    "Hyper-Real Beauty": ["tight close-up focusing on face and shoulders", "beauty mid-shot capturing neckline and upper torso", "extreme close-up of face with sharp focus on eyes and lips"],
    "Pinterest Lifestyle": ["flat-lay inspired overhead shot", "candid full-body from a slight high angle", "aesthetic mid-shot with props (flowers, magazine)"],
    "Surreal Luxury": ["dreamlike full-body floating or suspended", "disorienting Dutch angle mid-shot", "reflections-based close-up"],
    "Fashion Runway": ["full-body runway stride on center line; confident snap pose at end", "tele follow during stride; beauty close-up on pose", "symmetry-forward hero frame mid-catwalk with elongated perspective"],
    "Street Style": ["paparazzi-style full-body shot crossing a street", "dynamic mid-shot with motion blur in background", "close-up on a key accessory (bag, shoes) with outfit context"]
};

const getLightingSentence = (vibe: string, isOutdoor: boolean): string => {
    const v = (vibe || "").toLowerCase();
    if (v.includes("night") || v.includes("neon") || v.includes("dark")) {
        return "Crisp on-camera flash illuminates the subject against a darker background with beautiful bokeh from city lights or practicals.";
    }
    if (v.includes("golden hour") || v.includes("sunset")) {
        return "Warm, low-angle golden hour sunlight creates a soft rim light, with gentle bounce filling in the shadows for a flattering glow.";
    }
    if (isOutdoor) {
        return "Soft, natural daylight, as if diffused by a large cloud or open shade, providing even, flattering illumination with no harsh shadows.";
    }
    // Default indoor
    return "Beautiful, soft light as if from a large window, creating gentle shadows and a natural, airy feel.";
};

const PHOTO_STYLE_PRESETS: Record<string, any> = {
    "General": {
        lighting: ["editorial window-softbox key with reflector fill; crisp catchlights; balanced micro-contrast; believable contact shadows; invisible sources"],
        optics: ["50mm f/1.8, ISO 100, 1/200s", "85mm f/1.4, ISO 100, 1/160s"],
        color: ["subtle filmic grade, refined skin tones, deep but not crushed blacks, clean whites", "neutral color palette, high tonal range, natural saturation, accurate whites"],
        style: "hyper-real, cinematic, editorial, sharp focus, ultra-detailed, 8k",
    },
    // ... all other presets would be here
};

const VIDEO_VIBES: Record<string, any> = {
    "General": {}, // Special case handled in logic
    // ... all other video vibes would be here
};

const POSE_TEMPLATES: Record<string, any> = {
    "General": {}, // Special case handled in logic
    // ... all other pose templates would be here
};


// The handler function that Vercel will execute.
// We need to export a default function that handles the request and response.
export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { type, inputs } = req.body;

    if (type === 'styled') {
      const result = await runGenerateStyledPrompt(inputs as FormState);
      return res.status(200).json(result);
    } else if (type === 'video_only') {
      const result = await runGenerateVideoOnlyPrompt(inputs as VideoOnlyFormState);
      return res.status(200).json(result);
    } else {
      return res.status(400).json({ error: 'Invalid generation type' });
    }

  } catch (error) {
    console.error("Error in serverless function:", error);
    const message = error instanceof Error ? error.message : "An internal server error occurred.";
    return res.status(500).json({ error: message });
  }
}

const sanitizeOutdoor = (promptText: string, isOutdoor: boolean): string => {
    let sanitized = promptText;
    if (isOutdoor) {
        // Replace indoor words with outdoor equivalents
        sanitized = sanitized.replace(/\b(in a room|indoors|inside a building|interior|in a studio)\b/gi, "outdoors");
        sanitized = sanitized.replace(/\b(window light|indoor lighting)\b/gi, "natural daylight");
    } else {
        // Replace outdoor words with indoor equivalents
        sanitized = sanitized.replace(/\b(outdoors|outside|in a park|on a street)\b/gi, "indoors");
        sanitized = sanitized.replace(/\b(natural daylight|sunlight)\b/gi, "soft indoor lighting");
    }
    return sanitized;
};


// --- We move the original generation logic into functions that can be called by our handler ---

const buildSystemInstruction = (inputs: FormState, scenePhrase: string, isOutdoor: boolean): string => {
  const seed = Math.floor(Math.random() * 999999);
  const selectedStyle = inputs.photoStyle;
  const videoVibeKey = inputs.videoVibe;
  const poseKey = inputs.poseStyle;
  const lightingSentence = getLightingSentence(inputs.vibe, isOutdoor);
  const sceneLine = sceneFromVibe(inputs.vibe, isOutdoor);
  const autoOutfit = chooseOutfit(inputs.vibe, inputs.photoStyle, "");

  const shotOverride = inputs.isCloseup ? "Close-up" : inputs.isMidShot ? "Mid-shot" : inputs.isFullBody ? "Full body" : "None";
  const isRunway = _is_runway_mode(inputs.photoStyle, inputs.videoVibe, inputs.vibe);

  const runwayOverrideBlock = isRunway ? `
--- RUNWAY MODE OVERRIDE (DETECTED) ---
- **INSTRUCTION**: When generating prompts, you MUST ignore standard presets for SCENE, LIGHTING, and SHOTs, and instead use the specific assets provided in this block.
- **Runway Scene Block**: "${_runway_scene_block(isOutdoor)}"
- **Runway Lighting**: "${_runway_lighting(isOutdoor)}"
- **Runway Shots Pool**: ${JSON.stringify(_RUNWAY_SHOTS)}
- **Runway Default Action**: "confident runway stride and snap pose"
` : '';


  return `
You are a world-class Art Director and Prompt Engineer using the AiMUSE Prompt Engine v2. Your task is to generate a detailed, production-ready set of prompts based on a user's vibe and selected style, using a structured and deterministic process that includes variability.
${runwayOverrideBlock}
--- AiMUSE DNA v2 (Reference) ---
- **LUXURY_VIBE**: "${AIMUSE_LUXURY_VIBE}"
- **NEGATIVE_CORE**: "${NEGATIVE_CORE}"
- **PHOTO_STYLE_PRESETS (with variability pools)**: ${JSON.stringify(PHOTO_STYLE_PRESETS, null, 2)}
- **SHOT_VARIANTS (with variability pools)**: ${JSON.stringify(SHOT_VARIANTS, null, 2)}
- **VIDEO_VIBES (with variability pools)**: ${JSON.stringify(VIDEO_VIBES, null, 2)}
- **POSE_TEMPLATES (with variability pools)**: ${JSON.stringify(POSE_TEMPLATES, null, 2)}

--- TASK ---

1.  **Determine Wardrobe (\`WARDROBE\`)**:
    - If 'Manual Wardrobe Override' ("${inputs.manualWardrobe || 'not provided'}") is given, use it precisely. This is the final \`WARDROBE\`. Set meta.outfit to "Used manual wardrobe override".
    - If an outfit image is provided, describe it concisely (e.g., "fitted baby-pink ribbed crop top and high-waisted leggings"). This description is the final \`WARDROBE\`. Set meta.outfit to "Outfit pulled from image".
    - Otherwise (if no manual override and no image), use the auto-generated on-trend outfit provided here: \`${autoOutfit}\`. This is the final \`WARDROBE\`. Set meta.outfit to "Derived outfit from vibe and style.".

2.  **Build the Lead Paragraph (\`LEAD\`):**
    - Construct a single, cinematic, hyper-real paragraph.
    - Start with: "Cinematic, hyper-real lifestyle/editorial capture ${scenePhrase}. Wearing \`WARDROBE\`. "
    - If \`keepLuxuryLayer\` is true, append: "The atmosphere feels ${AIMUSE_LUXURY_VIBE}. "
    - Append the lighting: "${lightingSentence} "
    - Finish with: "Ultra-detailed realism: sharp eyes, natural pores, visible hair strands, authentic fabric stretch, jewelry sparkle, balanced shadows."

3.  **Generate 'photoPrompt' (with random variability)**:
    - Take the \`LEAD\` paragraph you just built.
    - **Determine \`SCENE\`, \`LIGHTING\`, and the \`SHOTS_POOL\`**:
        - If a 'RUNWAY MODE OVERRIDE' block is present:
            - \`SCENE\` is the 'Runway Scene Block'.
            - \`LIGHTING\` is the 'Runway Lighting'.
            - \`SHOTS_POOL\` is the 'Runway Shots Pool'.
        - Otherwise (no runway mode):
            - \`SCENE\` is: "${sceneLine}".
            - \`LIGHTING\` is a **random selection** from \`PHOTO_STYLE_PRESETS["${selectedStyle}"].lighting\`.
            - \`SHOTS_POOL\` is \`SHOT_VARIANTS["${selectedStyle}"]\`.
    - **Determine the final \`SHOT\`**:
        - The user has provided a shot framing override: "${shotOverride}".
        - If override is 'Close-up', \`SHOT\` is "tight close-up on face and upper shoulders".
        - If override is 'Mid-shot', \`SHOT\` is "mid-shot, waist-up framing".
        - If override is 'Full body', \`SHOT\` is "full-body composition, head-to-toe".
        - If override is 'None', **randomly select one (1) item** for \`SHOT\` from the \`SHOTS_POOL\` you determined above.
    - **Select \`OPTICS\` and \`COLOR\`**:
        - \`OPTICS\` is a **random selection** from \`PHOTO_STYLE_PRESETS["${selectedStyle}"].optics\`.
        - \`COLOR\` is a **random selection** from \`PHOTO_STYLE_PRESETS["${selectedStyle}"].color\`.
    - Assemble the final prompt in this exact format:
        \`\`\`
        \${LEAD}

        SHOT:
        \${SHOT}.
        SCENE:
        \${SCENE}
        LIGHTING:
        \${LIGHTING}
        OPTICS:
        \${OPTICS}
        COLOR:
        \${COLOR}
        STYLE:
        ${PHOTO_STYLE_PRESETS[selectedStyle]?.style}
        QUALITY:
        Ultra-detailed realism: skin texture, sharp eye focus, visible hair strands, authentic fabric stretch, jewelry sparkle, balanced shadows.
        \`\`\`

4.  **Generate 'videoPrompt' (with random variability and "General" handling)**:
    -   Start with the same \`LEAD\` paragraph.
    -   **MOTION block generation**:
        -   Determine the base lighting: If a 'RUNWAY MODE OVERRIDE' block is present, use the 'Runway Lighting'. Otherwise, use \`${VIDEO_VIBES[videoVibeKey]?.lighting}\`.
        -   If the selected Video Vibe is "General", use this exact \`MOTION\` block: "Camera: natural handheld; framing centered; clean, unobtrusive motion and cuts."
        -   Otherwise, **randomly select one (1) item from each array** within \`VIDEO_VIBES["${videoVibeKey}"]\` and construct the \`MOTION\` block: "Camera: {random camera}. Framing: {random framing}. Tempo: {random tempo}. Transitions: {random transitions}. Lighting: {base lighting}. Grade: ${VIDEO_VIBES[videoVibeKey]?.grade}."
    -   **POSE_DIR block generation**:
         -   If the selected Pose Style is "General", use this exact \`POSE_DIR\` block: "Pose: natural, relaxed; hands and face read clearly; simple, flattering blocking."
         -   Otherwise, **randomly select one (1) item from each array** within \`POSE_TEMPLATES["${poseKey}"]\` and construct the \`POSE_DIR\` block: "Pose: {random body}. Hands: {random hands}. Face: {random face}. Blocking: {random blocking}."
    -   Construct an \`ACTION\` block: 
        - If a 'RUNWAY MODE OVERRIDE' block is present AND the user's Action Text ("${inputs.actionText.trim()}") is empty, the action is 'confident runway stride and snap pose'.
        - Otherwise, use the user's Action Text or the default: "Action: ${inputs.actionText.trim() || 'natural, elegant movement'}."
    -   Assemble the final prompt: "\`LEAD\` \`MOTION\` \`POSE_DIR\` \`ACTION\`"

5.  **Generate 'videoNegativePrompt'**:
    -   Use this exact prompt: "${NEGATIVE_CORE}"

--- USER INPUTS ---
- Vibe: "${inputs.vibe}"
- Photo Style: "${inputs.photoStyle}"
- Shot Framing Override: ${shotOverride}
- Video Vibe: "${inputs.videoVibe}"
- Pose Style: "${inputs.poseStyle}"
- Keep Luxury Layer: ${inputs.keepLuxuryLayer}
- Manual Wardrobe Override: "${inputs.manualWardrobe || '(not provided)'}"
- Action Text: "${inputs.actionText}"
- Seed for generation: ${seed}
${inputs.outfitImage ? '- An outfit reference image is provided. Analyze it for wardrobe details.' : ''}

Now, generate the complete JSON output according to the schema.
`;
}

const runGenerateStyledPrompt = async (inputs: FormState): Promise<PromptOutput> => {
    let { scenePhrase, isOutdoor } = cleanVibe(inputs.vibe);
    const isRunway = _is_runway_mode(inputs.photoStyle, inputs.videoVibe, inputs.vibe);
    
    if (isRunway) {
        scenePhrase = _runway_scene_phrase(isOutdoor);
    }
    
    const systemInstruction = buildSystemInstruction(inputs, scenePhrase, isOutdoor);
    const model = 'gemini-2.5-flash';
    
    const responseSchema = {
        type: Type.OBJECT,
        properties: {
            photoPrompt: { type: Type.STRING, description: "The full, final AiMUSE-structured photo prompt as a multi-line Markdown string." },
            videoPrompt: { type: Type.STRING, description: "The plain-text positive prompt for Kling 2.1." },
            videoNegativePrompt: { type: Type.STRING, description: "The plain-text negative prompt for Kling 2.1." },
            meta: {
                type: Type.OBJECT,
                properties: {
                    seed: { type: Type.INTEGER },
                    outfit: { type: Type.STRING, description: "A note on how the outfit was sourced, e.g., from image or manual override." }
                },
                required: ["seed", "outfit"]
            }
        },
        required: ["photoPrompt", "videoPrompt", "videoNegativePrompt", "meta"]
    };

    const textPart = { text: systemInstruction };
    const parts = [
        ...(inputs.outfitImage ? [{
            inlineData: {
                mimeType: inputs.outfitImage.mimeType,
                data: inputs.outfitImage.base64,
            },
        }] : []),
        textPart,
    ];

    
    const response = await ai.models.generateContent({
        model: model,
        contents: { parts: parts },
        config: {
            responseMimeType: "application/json",
            responseSchema: responseSchema,
        },
    });

    const jsonString = response.text;
    const parsedJson = JSON.parse(jsonString) as PromptOutput;

    // --- Post-processing & Sanitization ---
    const outfitLocked = !!(inputs.manualWardrobe.trim() || inputs.outfitImage);
    
    let finalPhotoPrompt = parsedJson.photoPrompt;
    let finalVideoPrompt = parsedJson.videoPrompt;

    // Apply special variations only to the photo prompt
    if (inputs.photoStyle === 'General') {
        finalPhotoPrompt = applyGeneralPassthrough(finalPhotoPrompt, inputs.photoStyle, inputs.vibe, outfitLocked);
    } else if (inputs.photoStyle === 'Cinematic') {
        finalPhotoPrompt = applyCinematicVariation(finalPhotoPrompt, inputs.vibe, outfitLocked);
    } else if (inputs.photoStyle === 'Editorial') {
        finalPhotoPrompt = applyEditorialOutfits(finalPhotoPrompt, inputs.photoStyle, inputs.vibe, outfitLocked);
    } else if (inputs.photoStyle === 'Old Money') {
        finalPhotoPrompt = applyOldMoneyVariation(finalPhotoPrompt, inputs.photoStyle, inputs.vibe, outfitLocked);
    } else if (inputs.photoStyle === 'Clean Girl Aesthetic') {
        finalPhotoPrompt = applyCleanGirlVariation(finalPhotoPrompt, inputs.photoStyle, inputs.vibe, outfitLocked);
    } else if (inputs.photoStyle === 'Hyper-Real Beauty') {
        finalPhotoPrompt = applyHyperrealBeautyVariation(finalPhotoPrompt, inputs.photoStyle, inputs.vibe, outfitLocked);
    } else if (inputs.photoStyle === 'Pinterest Lifestyle') {
        finalPhotoPrompt = applyPinterestLifestyleVariation(finalPhotoPrompt, inputs.photoStyle, inputs.vibe, outfitLocked);
    } else if (inputs.photoStyle === 'Surreal Luxury') {
        finalPhotoPrompt = applySurrealLuxuryVariation(finalPhotoPrompt, inputs.photoStyle, inputs.vibe, outfitLocked);
    } else if (inputs.photoStyle === 'Street Style') {
        finalPhotoPrompt = applyStreetStyleVariation(finalPhotoPrompt, inputs.photoStyle, inputs.vibe, outfitLocked);
    }

    finalPhotoPrompt = sanitizeOutdoor(finalPhotoPrompt, isOutdoor);
    finalVideoPrompt = sanitizeOutdoor(finalVideoPrompt, isOutdoor);

    if (isRunway) {
        finalPhotoPrompt = _sanitize_runway(finalPhotoPrompt);
        finalVideoPrompt = _sanitize_runway(finalVideoPrompt);
    }
    
    parsedJson.photoPrompt = finalPhotoPrompt;
    parsedJson.videoPrompt = finalVideoPrompt;

    return parsedJson;
};


const buildVideoOnlySystemInstruction = (inputs: VideoOnlyFormState, scenePhrase: string, isOutdoor: boolean): string => {
  const seed = Math.floor(Math.random() * 999999);
  const lightingSentence = getLightingSentence(inputs.videoVibe, isOutdoor);
  const videoVibeKey = inputs.videoVibe;
  const poseKey = inputs.poseStyle;
  const autoOutfit = chooseOutfit(inputs.videoVibe, inputs.videoVibe, "");
  const isRunway = _is_runway_mode("", inputs.videoVibe, "");

  const runwayOverrideBlock = isRunway ? `
--- RUNWAY MODE OVERRIDE (DETECTED) ---
- **INSTRUCTION**: When generating prompts, you MUST use the runway-specific assets provided in this block.
- **Runway Lighting**: "${_runway_lighting(isOutdoor)}"
- **Runway Default Action**: "confident runway stride and snap pose"
` : '';

  return `
You are a Prompt Engineering Specialist using the AiMUSE DNA framework to generate a video prompt.
${runwayOverrideBlock}
--- AiMUSE DNA v2 (Reference) ---
- **LUXURY_VIBE**: "${AIMUSE_LUXURY_VIBE}"
- **NEGATIVE_CORE**: "${NEGATIVE_CORE}"
- **VIDEO_VIBES (with variability pools)**: ${JSON.stringify(VIDEO_VIBES, null, 2)}
- **POSE_TEMPLATES (with variability pools)**: ${JSON.stringify(POSE_TEMPLATES, null, 2)}


--- TASK ---

1.  **Determine Wardrobe (\`WARDROBE\`)**:
    - If a reference image is provided, the subject's wardrobe and identity should be consistent with it. You must describe the wardrobe from the image. This description is the final \`WARDROBE\`.
    - Otherwise (if no image), use the auto-generated on-trend outfit provided here: \`${autoOutfit}\`. This is the final \`WARDROBE\`.

2.  **Build the Lead Paragraph (\`LEAD\`):**
    -   Construct a single, cinematic, hyper-real paragraph.
    -   Start with: "Hyper-real editorial/lifestyle video ${scenePhrase}. Wearing \`WARDROBE\`. "
    -   If \`keepLuxuryLayer\` is true, append: "The atmosphere feels ${AIMUSE_LUXURY_VIBE}. "
    -   Append the lighting: "${lightingSentence} "
    -   Finish with: "Ultra-detailed realism: sharp eyes, visible pores, hair strands, authentic fabric stretch, jewelry sparkle."

3.  **Generate 'videoPrompt' (with random variability and "General" handling)**:
    -   Start with the \`LEAD\` paragraph.
    -   **MOTION block generation**:
        -   Determine the base lighting: If a 'RUNWAY MODE OVERRIDE' block is present, use the 'Runway Lighting'. Otherwise, use \`${VIDEO_VIBES[videoVibeKey]?.lighting}\`.
        -   If the selected Video Vibe is "General", use this exact \`MOTION\` block: "Camera: natural handheld; framing centered; clean, unobtrusive motion and cuts."
        -   Otherwise, **randomly select one (1) item from each array** within \`VIDEO_VIBES["${videoVibeKey}"]\` and construct the \`MOTION\` block: "Camera: {random camera}. Framing: {random framing}. Tempo: {random tempo}. Transitions: {random transitions}. Lighting: {base lighting}. Grade: ${VIDEO_VIBES[videoVibeKey]?.grade}."
    -   **POSE_DIR block generation**:
         -   If the selected Pose Style is "General", use this exact \`POSE_DIR\` block: "Pose: natural, relaxed; hands and face read clearly; simple, flattering blocking."
         -   Otherwise, **randomly select one (1) item from each array** within \`POSE_TEMPLATES["${poseKey}"]\` and construct the \`POSE_DIR\` block: "Pose: {random body}. Hands: {random hands}. Face: {random face}. Blocking: {random blocking}."
    -   Construct an \`ACTION\` block: 
        - If a 'RUNWAY MODE OVERRIDE' block is present AND the user's Action Text ("${inputs.actionText.trim()}") is empty, the action is 'confident runway stride and snap pose'.
        - Otherwise, use the user's Action Text or the default: "Action: ${inputs.actionText.trim() || 'natural, elegant movement'}."
    -   Assemble the final prompt: "\`LEAD\` \`MOTION\` \`POSE_DIR\` \`ACTION\`"

4.  **Generate 'videoNegativePrompt'**:
    -   Use this exact prompt: "${NEGATIVE_CORE}"

--- USER INPUTS ---
- Video Vibe: "${inputs.videoVibe}"
- Keep Luxury Layer: ${inputs.keepLuxuryLayer}
- Pose Style: "${inputs.poseStyle}"
- Action Text: "${inputs.actionText}"
- Seed for generation: ${seed}
${inputs.refImage ? '- A reference image is provided for continuity. Keep the subject identity and wardrobe consistent with the image.' : ''}

Now, generate the complete JSON output based on these rules.
`;
}

const runGenerateVideoOnlyPrompt = async (inputs: VideoOnlyFormState): Promise<VideoOnlyPromptOutput> => {
    let { scenePhrase, isOutdoor } = cleanVibe(inputs.videoVibe);
    const isRunway = _is_runway_mode("", inputs.videoVibe, inputs.videoVibe);
    
    if (isRunway) {
        scenePhrase = _runway_scene_phrase(isOutdoor);
    }
    
    const systemInstruction = buildVideoOnlySystemInstruction(inputs, scenePhrase, isOutdoor);
    const model = 'gemini-2.5-flash';

    const responseSchema = {
        type: Type.OBJECT,
        properties: {
            videoPrompt: { type: Type.STRING, description: "The plain-text positive prompt for Kling 2.1." },
            videoNegativePrompt: { type: Type.STRING, description: "The plain-text negative prompt for Kling 2.1." },
            meta: {
                type: Type.OBJECT,
                properties: {
                    seed: { type: Type.INTEGER }
                },
                required: ["seed"]
            }
        },
        required: ["videoPrompt", "videoNegativePrompt", "meta"]
    };

    const textPart = { text: systemInstruction };
    const parts = [
        ...(inputs.refImage ? [{
            inlineData: {
                mimeType: inputs.refImage.mimeType,
                data: inputs.refImage.base64,
            },
        }] : []),
        textPart,
    ];

    const response = await ai.models.generateContent({
        model: model,
        contents: { parts: parts },
        config: {
            responseMimeType: "application/json",
            responseSchema: responseSchema,
        },
    });

    const jsonString = response.text;
    const parsedJson = JSON.parse(jsonString) as Omit<VideoOnlyPromptOutput, 'meta'> & { meta: { seed: number } };
    
    let finalVideoPrompt = sanitizeOutdoor(parsedJson.videoPrompt, isOutdoor);
    if (isRunway) {
        finalVideoPrompt = _sanitize_runway(finalVideoPrompt);
    }

    const finalOutput: VideoOnlyPromptOutput = {
        videoPrompt: finalVideoPrompt,
        videoNegativePrompt: parsedJson.videoNegativePrompt,
        meta: {
            seed: parsedJson.meta.seed,
            reference_image: inputs.refImage ? "Reference image noted for continuity." : "(none)"
        }
    };

    return finalOutput;
};
