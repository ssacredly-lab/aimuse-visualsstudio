import React from 'react';

interface SectionHeaderProps {
  title: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => (
  <h3 className="text-xl font-serif font-semibold text-aimuse-ink mb-3" style={{ textShadow: '0 1px 2px rgba(255, 255, 255, 0.3)' }}>{title}</h3>
);

export default SectionHeader;