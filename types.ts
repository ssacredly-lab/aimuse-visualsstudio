export interface OutfitImage {
  base64: string;
  mimeType: string;
}

export interface FormState {
  vibe: string;
  photoStyle: string;
  outfitImage: OutfitImage | null;
  manualWardrobe: string;
  videoVibe: string;
  poseStyle: string;
  actionText: string;
  keepLuxuryLayer: boolean;
  isCloseup: boolean;
  isMidShot: boolean;
  isFullBody: boolean;
}

export interface Meta {
    seed: number;
    outfit: string;
}

export interface PromptOutput {
  photoPrompt: string;
  videoPrompt: string;
  videoNegativePrompt: string;
  meta: Meta;
}


// --- Video-only Workflow Types ---

export interface VideoOnlyFormState {
  videoVibe: string;
  poseStyle: string;
  actionText: string;
  refImage: OutfitImage | null;
  keepLuxuryLayer: boolean;
}

export interface VideoOnlyMeta {
    seed: number;
    reference_image: string;
}

export interface VideoOnlyPromptOutput {
  videoPrompt: string;
  videoNegativePrompt: string;
  meta: VideoOnlyMeta;
}