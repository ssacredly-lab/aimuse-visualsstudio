import React from 'react';
import type { VideoOnlyPromptOutput } from '../types';
import PromptCard from './PromptCard';
import SectionHeader from './SectionHeader';

interface VideoOnlyOutputDisplayProps {
  output: VideoOnlyPromptOutput;
}

const VideoOnlyOutputDisplay: React.FC<VideoOnlyOutputDisplayProps> = ({ output }) => {
  return (
    <div className="bg-aimuse-pearl/60 backdrop-blur-md border border-aimuse-stroke rounded-aimuse shadow-atelier p-[18px] pb-4 space-y-4">
      <SectionHeader title="Generated Video-only Prompts" />
      
      <div className="space-y-4">
        <PromptCard 
            title="Kling 2.1 Prompt (Video-only)"
            content={output.videoPrompt} 
            isCode={false}
        />
        <PromptCard 
            title="Optional Negative Prompt"
            content={output.videoNegativePrompt} 
            isCode={false}
        />
      </div>
    </div>
  );
};

export default VideoOnlyOutputDisplay;