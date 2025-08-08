import React from 'react';

export interface ArrowDropDownIconProps {
  className?: string;
}

/**
 * Компонент стрелки вниз для Select
 */
export const ArrowDropDownIcon: React.FC<ArrowDropDownIconProps> = ({
  className,
}) => (
  <svg
    className={className}
    focusable="false"
    aria-hidden="true"
    viewBox="0 0 24 24"
    width="24"
    height="24"
  >
    <path d="M7 10l5 5 5-5z"></path>
  </svg>
);

ArrowDropDownIcon.displayName = 'ArrowDropDownIcon';
