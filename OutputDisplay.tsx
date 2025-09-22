import React from 'react';
import type { PromptOutput } from '../types.ts';
import PromptCard from './PromptCard.tsx';
import SectionHeader from './SectionHeader.tsx';

interface OutputDisplayProps {
  output: PromptOutput;
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({ output }) => {
  return (
    <div className="bg-aimuse-pearl/60 backdrop-blur-md border border-aimuse-stroke rounded-aimuse shadow-atelier p-[18px] pb-4 space-y-4">
      <SectionHeader title="Generated Prompts" />
      
      <div className="space-y-4">
        <PromptCard 
            title="AiMUSE Photo Prompt" 
            content={output.photoPrompt}
            isCode // Use code block for better formatting of multi-line sections
        />
        <PromptCard 
            title="Kling 2.1 Prompt"
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

export default OutputDisplay;
