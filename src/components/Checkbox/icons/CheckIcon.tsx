import React from 'react';

interface CheckIconProps {
  className?: string;
}

const CheckIcon: React.FC<CheckIconProps> = ({ className }) => {
  return (
    <svg
      className={className}
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="currentColor"
    >
      <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
    </svg>
  );
};

export default CheckIcon;
