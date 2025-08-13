import { useState, useCallback, useEffect } from 'react';

export interface UseSelectValueProps<T = string | number> {
  /** Внешнее значение */
  value?: T | T[];
  /** Значение по умолчанию */
  defaultValue?: T | T[];
  /** Режим множественного выбора */
  multiple?: boolean;
  /** Коллбек при изменении значения */
  onChange?: (
    event: React.ChangeEvent<HTMLSelectElement>,
    value: T | T[]
  ) => void;
}

export interface UseSelectValueReturn<T = string | number> {
  /** Внутреннее значение */
  internalValue: T | T[];
  /** Обработчик выбора опции */
  handleOptionClick: (optionValue: T) => void;
  /** Обработчик удаления чипа */
  handleChipDelete: (valueToRemove: T) => void;
}

/**
 * Хук для управления значениями Select компонента
 */
export const useSelectValue = <T extends string | number>({
  value,
  defaultValue,
  multiple = false,
  onChange,
}: UseSelectValueProps<T>): UseSelectValueReturn<T> => {
  const [internalValue, setInternalValue] = useState<T | T[]>(() => {
    if (multiple) {
      return (value as T[]) || (defaultValue as T[]) || [];
    }
    return (value as T) || (defaultValue as T) || ('' as T);
  });

  // Обновляем внутреннее значение при изменении внешнего
  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  const handleOptionClick = useCallback(
    (optionValue: T) => {
      let newValue: T | T[];

      if (multiple) {
        const currentArray = Array.isArray(internalValue) ? internalValue : [];
        if (currentArray.includes(optionValue)) {
          newValue = currentArray.filter((v) => v !== optionValue);
        } else {
          newValue = [...currentArray, optionValue];
        }
      } else {
        newValue = optionValue;
      }

      setInternalValue(newValue);

      // Создаем событие для совместимости
      const event = {
        target: { value: newValue },
      } as unknown as React.ChangeEvent<HTMLSelectElement>;

      onChange?.(event, newValue);
    },
    [multiple, internalValue, onChange]
  );

  const handleChipDelete = useCallback(
    (valueToRemove: T) => {
      if (!multiple || !Array.isArray(internalValue)) return;

      const newValue = internalValue.filter((v) => v !== valueToRemove);
      setInternalValue(newValue);

      const event = {
        target: { value: newValue },
      } as unknown as React.ChangeEvent<HTMLSelectElement>;

      onChange?.(event, newValue);
    },
    [multiple, internalValue, onChange]
  );

  return {
    internalValue,
    handleOptionClick,
    handleChipDelete,
  };
};
