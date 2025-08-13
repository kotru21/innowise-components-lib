import { useMemo } from 'react';
import styles from '../Select.module.css';

export interface UseSelectClassesProps {
  /** Размер компонента */
  size?: 'small' | 'medium';
  /** Вариант отображения */
  variant?: 'outlined' | 'filled' | 'standard';
  /** Состояние фокуса */
  focused?: boolean;
  /** Состояние ошибки */
  error?: boolean;
  /** Заблокирован ли компонент */
  disabled?: boolean;
  /** Обязательное поле */
  required?: boolean;
  /** Полная ширина */
  fullWidth?: boolean;
  /** Автоматическая ширина */
  autoWidth?: boolean;
  /** Режим множественного выбора */
  multiple?: boolean;
  /** Есть ли значение */
  hasValue?: boolean;
  /** Должен ли лейбл быть сжатым */
  shouldShrink?: boolean;
  /** Открыто ли меню */
  isOpen?: boolean;
  /** Есть ли placeholder */
  hasPlaceholder?: boolean;
  /** Дополнительный CSS класс */
  className?: string;
}

export interface UseSelectClassesReturn {
  /** Классы для корневого элемента */
  rootClasses: string;
  /** Классы для лейбла */
  labelClasses: string;
  /** Классы для контейнера инпута */
  inputContainerClasses: string;
  /** Классы для select элемента */
  selectClasses: string;
  /** Классы для иконки */
  iconClasses: string;
  /** Классы для helper text */
  helperTextClasses: string;
}

/**
 * Хук для формирования CSS классов Select компонента
 */
export const useSelectClasses = ({
  size = 'medium',
  variant = 'outlined',
  focused = false,
  error = false,
  disabled = false,
  required = false,
  fullWidth = false,
  autoWidth = false,
  multiple = false,
  hasValue = false,
  shouldShrink = false,
  isOpen = false,
  hasPlaceholder = false,
  className = '',
}: UseSelectClassesProps): UseSelectClassesReturn => {
  const rootClasses = useMemo(() => {
    const classes = [styles.selectRoot];

    if (fullWidth) classes.push(styles.fullWidth);
    if (autoWidth) classes.push(styles.autoWidth);
    if (className) classes.push(className);

    return classes.filter(Boolean).join(' ');
  }, [fullWidth, autoWidth, className]);

  const labelClasses = useMemo(() => {
    const classes = [styles.label];

    if (size === 'small') classes.push(styles.labelSmall);
    if (shouldShrink) classes.push(styles.labelShrunk);
    if (focused) classes.push(styles.labelFocused);
    if (error) classes.push(styles.labelError);
    if (disabled) classes.push(styles.labelDisabled);
    if (required) classes.push(styles.labelRequired);

    return classes.filter(Boolean).join(' ');
  }, [size, shouldShrink, focused, error, disabled, required]);

  const inputContainerClasses = useMemo(() => {
    const classes = [styles.inputContainer, styles[variant]];

    if (size === 'small') classes.push(styles[`${variant}Small`]);
    if (focused) classes.push(styles[`${variant}Focused`]);
    if (size === 'small' && focused)
      classes.push(styles[`${variant}FocusedSmall`]);
    if (error) classes.push(styles[`${variant}Error`]);
    if (disabled) classes.push(styles[`${variant}Disabled`]);

    return classes.filter(Boolean).join(' ');
  }, [variant, size, focused, error, disabled]);

  const selectClasses = useMemo(() => {
    const classes = [styles.select];

    if (multiple) classes.push(styles.selectMultiple);
    if (disabled) classes.push(styles.selectDisabled);
    if (!hasValue && hasPlaceholder) classes.push(styles.placeholder);

    return classes.filter(Boolean).join(' ');
  }, [multiple, disabled, hasValue, hasPlaceholder]);

  const iconClasses = useMemo(() => {
    const classes = [styles.icon];

    if (isOpen) classes.push(styles.iconOpen);
    if (disabled) classes.push(styles.iconDisabled);

    return classes.filter(Boolean).join(' ');
  }, [isOpen, disabled]);

  const helperTextClasses = useMemo(() => {
    const classes = [styles.helperText];

    if (error) classes.push(styles.helperTextError);
    if (disabled) classes.push(styles.helperTextDisabled);

    return classes.filter(Boolean).join(' ');
  }, [error, disabled]);

  return {
    rootClasses,
    labelClasses,
    inputContainerClasses,
    selectClasses,
    iconClasses,
    helperTextClasses,
  };
};
