import React from 'react';
// Fix: Changed import to use the SVG LogoIcon component to resolve the module error.
import Logo from './icons/LogoIcon';

const Header: React.FC = () => {
  return (
    <header className="flex items-center gap-4 pt-6 pb-4">
        <Logo />
        <div>
          <h1 className="text-[28px] font-serif font-bold text-aimuse-ink leading-tight">AiMUSE Visuals Atelier</h1>
          <p className="text-aimuse-muted text-sm -mt-0.5">luxury prompt designer • photo + matching video</p>
        </div>
    </header>
  );
};

export default Header;