
import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="bg-aimuse-pink-bg/50 border border-aimuse-blue/50 text-aimuse-ink px-4 py-3 rounded-card relative shadow-atelier" role="alert">
      <strong className="font-bold text-aimuse-ink/80">Error: </strong>
      <span className="block sm:inline">{message}</span>
    </div>
  );
};

export default ErrorMessage;