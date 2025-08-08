import React from 'react';

interface IndeterminateIconProps {
  className?: string;
}

const IndeterminateIcon: React.FC<IndeterminateIconProps> = ({ className }) => {
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
      <path d="M19 13H5v-2h14v2z" />
    </svg>
  );
};

export default IndeterminateIcon;
