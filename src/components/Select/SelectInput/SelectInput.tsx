import React, { useMemo } from 'react';
import { SelectOption } from '../Select.types';
import { Chip } from '../Chip';
import styles from '../Select.module.css';

export interface SelectInputProps {
  /** Текущее значение */
  value: string | number | (string | number)[];
  /** Массив опций */
  options: SelectOption[];
  /** Режим множественного выбора */
  multiple?: boolean;
  /** Значение опции "none" */
  noneOptionValue?: string | number;
  /** Лейбл */
  label?: string;
  /** Placeholder */
  placeholder?: string;
  /** Должен ли лейбл быть сжатым */
  shouldShrink?: boolean;
  /** Обработчик удаления чипа */
  onChipDelete?: (value: string | number) => void;
}

/**
 * Компонент для отображения выбранных значений
 */
export const SelectInput: React.FC<SelectInputProps> = ({
  value,
  options,
  multiple = false,
  noneOptionValue = '',
  label,
  placeholder,
  shouldShrink = false,
  onChipDelete,
}) => {
  // Мемоизированное отображаемое значение для одиночного режима
  const displayValue = useMemo((): string => {
    if (multiple) return '';
    const option = options.find((opt) => opt.value === value);
    if (option && option.value !== noneOptionValue) {
      return option.label;
    }
    if (label && !shouldShrink) return '';
    return placeholder || '';
  }, [
    multiple,
    options,
    value,
    noneOptionValue,
    label,
    shouldShrink,
    placeholder,
  ]);
  // Компонент списка чипов для множественного выбора
  const ChipList: React.FC = () => {
    if (!multiple || !Array.isArray(value) || value.length === 0) {
      if (label && !shouldShrink) return <></>;
      return <>{placeholder || ''}</>;
    }
    return (
      <div className={styles.chipContainer}>
        {value.map((val) => {
          const option = options.find((opt) => opt.value === val);
          const chipLabel = option ? option.label : String(val);
          return (
            <Chip
              key={val}
              label={chipLabel}
              onDelete={onChipDelete ? () => onChipDelete(val) : undefined}
            />
          );
        })}
      </div>
    );
  };

  return <>{multiple ? <ChipList /> : displayValue}</>;
};

SelectInput.displayName = 'SelectInput';
