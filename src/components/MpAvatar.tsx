import React from 'react';
import { PARTIES } from '../data/parties';

interface MpAvatarProps {
  fullName: string;
  partyId: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const MpAvatar: React.FC<MpAvatarProps> = ({
  fullName,
  partyId,
  size = 'md',
  className = '',
}) => {
  const party = PARTIES[partyId];
  const initials = fullName
    .split(' ')
    .filter(n => n.length > 0 && !n.startsWith('(') && !n.startsWith('Dr') && !n.startsWith('Prof') && !n.startsWith('Doç'))
    .map(n => n[0])
    .slice(0, 2)
    .join('') || fullName.slice(0, 2);

  const sizeClasses = {
    xs: 'w-6 h-6 text-[10px] rounded-lg',
    sm: 'w-8 h-8 text-xs rounded-xl',
    md: 'w-12 h-12 text-sm rounded-xl',
    lg: 'w-16 h-16 sm:w-18 sm:h-18 text-base sm:text-lg rounded-2xl',
    xl: 'w-20 h-20 sm:w-24 sm:h-24 text-xl sm:text-2xl rounded-3xl',
  };

  return (
    <div
      className={`relative shrink-0 flex items-center justify-center font-bold font-serif shadow-xs border select-none transition-transform group-hover:scale-105 duration-200 ${sizeClasses[size]} ${className}`}
      style={{
        backgroundColor: party ? party.bgColor : '#f1f5f9',
        borderColor: party ? party.borderColor : '#cbd5e1',
        color: party ? party.color : '#334155',
      }}
      title={`${fullName} (${party?.shortName || ''})`}
    >
      <span>{initials}</span>
      {/* Tiny corner party dot for small/medium sizes if needed */}
      {party && (size === 'lg' || size === 'xl') && (
        <span
          className="absolute -bottom-1 -right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 border-white dark:border-slate-900 shadow-xs"
          style={{ backgroundColor: party.color }}
          title={party.name}
        />
      )}
    </div>
  );
};
