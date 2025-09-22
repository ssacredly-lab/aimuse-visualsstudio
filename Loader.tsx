
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center p-12">
      <div className="w-12 h-12 border-4 border-t-aimuse-blue border-aimuse-blue/20 rounded-full animate-spin" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;