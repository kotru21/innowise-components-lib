import { InputHTMLAttributes, ReactNode } from 'react';

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /**
   * Ярлык для чекбокса
   */
  label?: string;

  /**
   * Показывает состояние ошибки
   * Если true, чекбокс будет отображаться в красном цвете
   * @default false
   */
  error?: boolean;

  /**
   * Текст сообщения об ошибке или вспомогательный текст
   */
  helperText?: string;

  /**
   * Размер чекбокса
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Цветовая схема чекбокса
   * @default 'primary'
   */
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';

  /**
   * Промежуточное состояние чекбокса
   * Используется для родительских чекбоксов, когда дочерние элементы частично выбраны
   * @default false
   */
  indeterminate?: boolean;

  /**
   * Иконка для неотмеченного состояния
   * @default встроенная иконка
   */
  icon?: ReactNode;

  /**
   * Иконка для отмеченного состояния
   * @default встроенная иконка
   */
  checkedIcon?: ReactNode;

  /**
   * Иконка для промежуточного состояния
   * @default встроенная иконка
   */
  indeterminateIcon?: ReactNode;

  /**
   * Расположение ярлыка относительно чекбокса
   * @default 'end'
   */
  labelPlacement?: 'start' | 'end' | 'top' | 'bottom';

  /**
   * Если true, чекбокс является обязательным для заполнения
   * @default false
   */
  required?: boolean;

  /**
   * Дополнительные атрибуты для input элемента
   */
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
}
