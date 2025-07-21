import { useMemo } from 'react';
import { SelectOption } from '../Select.types';

export interface UseSelectOptionsProps {
  /** Массив опций */
  options: SelectOption[];
  /** Включать ли опцию "none" */
  includeNoneOption?: boolean;
  /** Текст для опции "none" */
  noneOptionText?: string;
  /** Значение для опции "none" */
  noneOptionValue?: string | number;
  /** Режим множественного выбора */
  multiple?: boolean;
}

export interface UseSelectOptionsReturn {
  /** Расширенный массив опций */
  allOptions: SelectOption[];
}

/**
 * Хук для обработки опций Select компонента
 */
export const useSelectOptions = ({
  options,
  includeNoneOption = true,
  noneOptionText = 'Не выбрано',
  noneOptionValue = '',
  multiple = false,
}: UseSelectOptionsProps): UseSelectOptionsReturn => {
  const allOptions = useMemo(() => {
    const noneOption: SelectOption = {
      value: noneOptionValue,
      label: noneOptionText,
      disabled: false,
    };

    // Для множественного выбора не добавляем опцию "none"
    if (multiple || !includeNoneOption) {
      return options;
    }

    // Проверяем, есть ли уже опция с таким значением
    const hasNoneOption = options.some((opt) => opt.value === noneOptionValue);

    if (hasNoneOption) {
      return options;
    }

    return [noneOption, ...options];
  }, [options, includeNoneOption, noneOptionText, noneOptionValue, multiple]);

  return {
    allOptions,
  };
};
