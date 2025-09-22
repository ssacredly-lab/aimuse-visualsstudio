

import React from 'react';
import type { FormState, OutfitImage } from '../types';
import SectionHeader from './SectionHeader';

interface InputFormProps {
  formState: FormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
  onGenerate: () => void;
  isLoading: boolean;
}

const PHOTO_STYLE_PRESETS = [
    "General",
    "Cinematic",
    "Editorial",
    "Lifestyle",
    "Old Money",
    "Clean Girl Aesthetic",
    "Hyper-Real Beauty",
    "Pinterest Lifestyle",
    "Surreal Luxury",
    "Fashion Runway",
    "Street Style"
];
const VIDEO_VIBES = [ "General", "Cinematic", "Editorial Fashion", "Luxury Lifestyle", "Street Movement", "Fashion Runway", "Street Style" ];
const POSE_TEMPLATES = [ "General", "Influencer", "Editorial", "Walking", "Casual" ];

const FormField: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
    <div>
        <label className="block text-sm font-semibold text-aimuse-text mb-1.5">{label}</label>
        {children}
    </div>
);

const InputForm: React.FC<InputFormProps> = ({ formState, setFormState, onGenerate, isLoading }) => {
  
  const handleChange = <K extends keyof FormState>(key: K, value: FormState[K]) => {
     setFormState(prevState => ({ ...prevState, [key]: value }));
  };

  const handleShotTypeChange = (shotType: 'isCloseup' | 'isMidShot' | 'isFullBody') => {
    setFormState(prevState => {
        const isChecked = !prevState[shotType];
        return {
            ...prevState,
            isCloseup: shotType === 'isCloseup' ? isChecked : false,
            isMidShot: shotType === 'isMidShot' ? isChecked : false,
            isFullBody: shotType === 'isFullBody' ? isChecked : false,
        };
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        const outfitImage: OutfitImage = {
          base64: base64String,
          mimeType: file.type,
        };
        handleChange('outfitImage', outfitImage);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    handleChange('outfitImage', null);
  }

  const commonInputStyles = "block w-full bg-aimuse-pearl border border-aimuse-stroke rounded-form shadow-atelier-inset focus:ring-2 focus:ring-aimuse-blue focus:border-aimuse-blue text-base text-aimuse-text placeholder-aimuse-muted px-3.5 py-2.5 transition-all outline-none";

  return (
    <div className="bg-aimuse-pearl/60 backdrop-blur-md border border-aimuse-stroke rounded-aimuse shadow-atelier p-[18px] pb-4 space-y-5">
      <div>
        <SectionHeader title="Vibe / Scenario" />
        <textarea
            className={`${commonInputStyles} min-h-[92px] leading-relaxed`}
            value={formState.vibe}
            onChange={(e) => handleChange('vibe', e.target.value)}
            placeholder="e.g., Luxury influencer style in a mansion"
        />
        <div className="flex items-center gap-2 pt-3">
            <input 
                type="checkbox" 
                id="luxury_toggle" 
                checked={formState.keepLuxuryLayer} 
                onChange={e => handleChange('keepLuxuryLayer', e.target.checked)} 
                className="h-4 w-4 rounded border-aimuse-stroke text-aimuse-blue focus:ring-aimuse-blue"
            />
            <label htmlFor="luxury_toggle" className="text-sm font-medium text-aimuse-text">Keep AiMUSE Luxury Layer</label>
        </div>
      </div>

      <div>
        <SectionHeader title="Photo Style" />
        <FormField label="Style Preset">
            <select
                className={`${commonInputStyles} custom-select`}
                value={formState.photoStyle}
                onChange={(e) => handleChange('photoStyle', e.target.value)}
            >
                {PHOTO_STYLE_PRESETS.map(style => <option key={style}>{style}</option>)}
            </select>
        </FormField>
        <div className="pt-4">
            <label className="block text-sm font-semibold text-aimuse-text mb-2">Shot Framing (optional override)</label>
            <div className="flex items-center space-x-6">
                <div className="flex items-center gap-2">
                    <input 
                        type="checkbox" 
                        id="isCloseup" 
                        checked={formState.isCloseup} 
                        onChange={() => handleShotTypeChange('isCloseup')} 
                        className="h-4 w-4 rounded border-aimuse-stroke text-aimuse-blue focus:ring-aimuse-blue"
                    />
                    <label htmlFor="isCloseup" className="text-sm font-medium text-aimuse-text">Close-up</label>
                </div>
                <div className="flex items-center gap-2">
                    <input 
                        type="checkbox" 
                        id="isMidShot" 
                        checked={formState.isMidShot} 
                        onChange={() => handleShotTypeChange('isMidShot')} 
                        className="h-4 w-4 rounded border-aimuse-stroke text-aimuse-blue focus:ring-aimuse-blue"
                    />
                    <label htmlFor="isMidShot" className="text-sm font-medium text-aimuse-text">Mid-shot</label>
                </div>
                <div className="flex items-center gap-2">
                    <input 
                        type="checkbox" 
                        id="isFullBody" 
                        checked={formState.isFullBody} 
                        onChange={() => handleShotTypeChange('isFullBody')} 
                        className="h-4 w-4 rounded border-aimuse-stroke text-aimuse-blue focus:ring-aimuse-blue"
                    />
                    <label htmlFor="isFullBody" className="text-sm font-medium text-aimuse-text">Full body</label>
                </div>
            </div>
        </div>
      </div>

      <div>
        <SectionHeader title="Outfit Inspo" />
        <div className="space-y-4">
            <FormField label="Outfit Reference Image (Optional)">
                <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-aimuse-muted file:mr-4 file:py-2 file:px-4 file:rounded-form file:border-0 file:text-sm file:font-semibold file:bg-aimuse-blue/20 file:text-aimuse-blue-dark hover:file:bg-aimuse-blue/30 file:transition-colors file:cursor-pointer"
                />
            </FormField>
            {formState.outfitImage && (
                <div className="relative group">
                    <img src={`data:${formState.outfitImage.mimeType};base64,${formState.outfitImage.base64}`} alt="Outfit preview" className="rounded-form max-h-40 mx-auto" />
                    <button onClick={removeImage} className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">&times;</button>
                </div>
            )}
            <FormField label="Manual Wardrobe Override (Optional)">
                <textarea
                    className={`${commonInputStyles} min-h-[72px] leading-relaxed`}
                    value={formState.manualWardrobe}
                    onChange={(e) => handleChange('manualWardrobe', e.target.value)}
                    placeholder="Describe outfit here to override image or preset hint..."
                />
            </FormField>
        </div>
      </div>
      
      <div>
        <SectionHeader title="Video Settings" />
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Video Vibe">
                    <select className={`${commonInputStyles} custom-select`} value={formState.videoVibe} onChange={e => handleChange('videoVibe', e.target.value)}>
                        {VIDEO_VIBES.map(v => <option key={v}>{v}</option>)}
                    </select>
                </FormField>
                <FormField label="Pose Style">
                    <select className={`${commonInputStyles} custom-select`} value={formState.poseStyle} onChange={e => handleChange('poseStyle', e.target.value)}>
                        {POSE_TEMPLATES.map(p => <option key={p}>{p}</option>)}
                    </select>
                </FormField>
            </div>
            <FormField label="Action">
                <textarea className={`${commonInputStyles} min-h-[52px] leading-relaxed`} value={formState.actionText} onChange={e => handleChange('actionText', e.target.value)} placeholder="e.g., adjust hair and smile softly" />
            </FormField>
        </div>
      </div>

      <div className="pt-2">
        <button
          type="button"
          onClick={onGenerate}
          disabled={isLoading}
          className="w-full flex justify-center items-center gap-2 px-4 py-3 border-none text-base font-semibold rounded-btn shadow-atelier-btn text-aimuse-ink bg-gradient-to-br from-aimuse-blue to-aimuse-blue-dark hover:shadow-lg hover:shadow-aimuse-blue/30 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aimuse-blue/50 focus:ring-offset-aimuse-pearl disabled:from-gray-400 disabled:to-gray-500 disabled:text-white disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none disabled:brightness-100 transition-all active:translate-y-0"
        >
          <span role="img" aria-label="sparkles">✨</span>
          {isLoading ? 'Generating...' : 'Generate Prompts'}
        </button>
      </div>
    </div>
  );
};

export default InputForm;
