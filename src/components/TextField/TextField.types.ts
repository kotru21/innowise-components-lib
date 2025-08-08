import { InputHTMLAttributes } from 'react';

export interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Ярлык для поля ввода
   */
  label?: string;

  /**
   * Показывает состояние ошибки
   * Если true, поле будет отображаться в красном цвете
   * @default false
   */
  error?: boolean;

  /**
   * Текст сообщения об ошибке или вспомогательный текст
   */
  helperText?: string;

  /**
   * Вариант отображения поля
   * - outlined: поле с рамкой (как в Material-UI)
   * - filled: поле с заливкой
   * - standard: стандартное поле с подчеркиванием
   * @default 'outlined'
   */
  variant?: 'outlined' | 'filled' | 'standard';

  /**
   * Размер поля
   * @default 'medium'
   */
  size?: 'small' | 'medium';

  /**
   * Если true, поле будет занимать всю доступную ширину
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Если true, поле является обязательным для заполнения
   * @default false
   */
  required?: boolean;
}
