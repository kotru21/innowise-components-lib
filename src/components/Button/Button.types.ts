import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Содержимое кнопки (текст, иконки и т.д.)
   */
  children: ReactNode;

  /**
   * Вариант отображения кнопки
   * - text: текстовая кнопка без фона
   * - contained: кнопка с заливкой фона
   * - outlined: кнопка с рамкой
   * @default 'contained'
   */
  variant?: 'text' | 'contained' | 'outlined';

  /**
   * Размер кнопки
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Цветовая схема кнопки
   * @default 'primary'
   */
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
}
