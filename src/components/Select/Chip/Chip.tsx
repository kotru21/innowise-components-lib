import React from 'react';
import styles from '../Select.module.css';

export interface ChipProps {
  /** Текст чипа */
  label: string;
  /** Коллбек для удаления чипа */
  onDelete?: () => void;
  /** Дополнительные CSS классы */
  className?: string;
}

/**
 * Компонент для отображения выбранных значений в виде чипов
 */
export const Chip: React.FC<ChipProps> = ({ label, onDelete, className }) => (
  <span className={`${styles.chip} ${className || ''}`}>
    {label}
    {onDelete && (
      <span
        className={styles.chipDeleteIcon}
        onClick={onDelete}
        role="button"
        aria-label={`Удалить ${label}`}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onDelete();
          }
        }}
      >
        ×
      </span>
    )}
  </span>
);

Chip.displayName = 'Chip';
