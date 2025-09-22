import React, { useState } from 'react';
import CopyIcon from './icons/CopyIcon.tsx';
import CheckIcon from './icons/CheckIcon.tsx';

interface PromptCardProps {
  title: string;
  content: string;
  isNegative?: boolean;
  isCode?: boolean;
  small?: boolean;
}

const PromptCard: React.FC<PromptCardProps> = ({ title, content, isNegative = false, isCode = false, small = false }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const titleClasses = "font-serif font-semibold text-aimuse-ink";
  const titleSize = small ? 'text-base' : 'text-lg';

  return (
    <div className="bg-aimuse-cream/70 border border-aimuse-stroke shadow-atelier-inset rounded-output">
      <div className={`flex justify-between items-center px-4 py-2 border-b border-aimuse-stroke`}>
        <h4 className={`${titleSize} ${titleClasses}`}>{title}</h4>
        <button
          onClick={handleCopy}
          className="p-1.5 rounded-md hover:bg-aimuse-blue/20 text-aimuse-muted hover:text-aimuse-blue-dark transition-all focus:outline-none focus:ring-2 focus:ring-aimuse-blue/30 focus:ring-offset-2 focus:ring-offset-aimuse-cream"
          aria-label="Copy prompt"
        >
          {copied ? <CheckIcon className="w-5 h-5 text-aimuse-blue-dark" /> : <CopyIcon className="w-5 h-5" />}
        </button>
      </div>
      <div className="p-4">
        {isCode ? (
          <pre className="whitespace-pre-wrap text-sm text-aimuse-text font-mono">
            <code>{content}</code>
          </pre>
        ) : (
          <p className={`text-sm text-aimuse-text whitespace-pre-wrap`}>
            {content}
          </p>
        )}
      </div>
    </div>
  );
};

export default PromptCard;
