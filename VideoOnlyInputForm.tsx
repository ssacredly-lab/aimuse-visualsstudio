

import React from 'react';
import type { VideoOnlyFormState, OutfitImage } from '../types.ts';
import SectionHeader from './SectionHeader.tsx';

interface VideoOnlyInputFormProps {
  formState: VideoOnlyFormState;
  setFormState: React.Dispatch<React.SetStateAction<VideoOnlyFormState>>;
  onGenerate: () => void;
  isLoading: boolean;
}

const VIDEO_VIBES = [ "General", "Cinematic", "Editorial Fashion", "Luxury Lifestyle", "Street Movement", "Fashion Runway", "Street Style" ];
const POSE_TEMPLATES = [ "General", "Influencer", "Editorial", "Walking", "Casual" ];


const FormField: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
    <div>
        <label className="block text-sm font-semibold text-aimuse-text mb-1.5">{label}</label>
        {children}
    </div>
);

const VideoOnlyInputForm: React.FC<VideoOnlyInputFormProps> = ({ formState, setFormState, onGenerate, isLoading }) => {
  
  const handleChange = <K extends keyof VideoOnlyFormState>(key: K, value: VideoOnlyFormState[K]) => {
     setFormState(prevState => ({ ...prevState, [key]: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        const refImage: OutfitImage = {
          base64: base64String,
          mimeType: file.type,
        };
        handleChange('refImage', refImage);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    handleChange('refImage', null);
    const fileInput = document.getElementById('video-only-file-input') as HTMLInputElement;
    if (fileInput) {
        fileInput.value = "";
    }
  }

  const commonInputStyles = "block w-full bg-aimuse-pearl border border-aimuse-stroke rounded-form shadow-atelier-inset focus:ring-2 focus:ring-aimuse-blue focus:border-aimuse-blue text-base text-aimuse-text placeholder-aimuse-muted px-3.5 py-2.5 transition-all outline-none";


  return (
    <div className="bg-aimuse-pearl/60 backdrop-blur-md border border-aimuse-stroke rounded-aimuse shadow-atelier p-[18px] pb-4 space-y-5">
      <SectionHeader title="Video-only (Quick Prompt)" />
      
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
        
        <FormField label="Reference Image (for continuity only)">
            <input 
                id="video-only-file-input"
                type="file" 
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-aimuse-muted file:mr-4 file:py-2 file:px-4 file:rounded-form file:border-0 file:text-sm file:font-semibold file:bg-aimuse-blue/20 file:text-aimuse-blue-dark hover:file:bg-aimuse-blue/30 file:transition-colors file:cursor-pointer"
            />
        </FormField>
        {formState.refImage && (
            <div className="relative group">
                <img src={`data:${formState.refImage.mimeType};base64,${formState.refImage.base64}`} alt="Reference preview" className="rounded-form max-h-40 mx-auto" />
                <button onClick={removeImage} className="absolute top-2 right-2 bg-black/50 text-white rounded-full w-6 h-6 flex items-center justify-center text-lg opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Remove image">&times;</button>
            </div>
        )}

        <div className="flex items-center gap-2 pt-1">
            <input 
                type="checkbox" 
                id="video_luxury_toggle" 
                checked={formState.keepLuxuryLayer} 
                onChange={e => handleChange('keepLuxuryLayer', e.target.checked)} 
                className="h-4 w-4 rounded border-aimuse-stroke text-aimuse-blue focus:ring-aimuse-blue"
            />
            <label htmlFor="video_luxury_toggle" className="text-sm font-medium text-aimuse-text">Keep AiMUSE Luxury Layer</label>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={onGenerate}
            disabled={isLoading}
            className="w-full flex justify-center items-center gap-2 px-4 py-3 border-none text-base font-semibold rounded-btn shadow-atelier-btn text-aimuse-ink bg-gradient-to-br from-aimuse-blue to-aimuse-blue-dark hover:shadow-lg hover:shadow-aimuse-blue/30 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aimuse-blue/50 focus:ring-offset-aimuse-pearl disabled:from-gray-400 disabled:to-gray-500 disabled:text-white disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none disabled:brightness-100 transition-all active:translate-y-0"
          >
            <span role="img" aria-label="sparkles">✨</span>
            {isLoading ? 'Generating...' : 'Generate Video Prompt'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoOnlyInputForm;
