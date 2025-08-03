import { InputHTMLAttributes } from 'react';

export interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /**
   * Состояние переключателя (включен/выключен)
   * @default false
   */
  checked?: boolean;

  /**
   * Обработчик изменения состояния переключателя
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * Блокирует взаимодействие с переключателем
   * @default false
   */
  disabled?: boolean;

  /**
   * Размер переключателя
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Цветовая схема переключателя
   * @default 'primary'
   */
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';

  /**
   * Ярлык для переключателя
   */
  label?: string;

  /**
   * Показывает состояние ошибки
   * Если true, переключатель будет отображаться в красном цвете
   * @default false
   */
  error?: boolean;

  /**
   * Текст сообщения об ошибке или вспомогательный текст
   */
  helperText?: string;

  /**
   * Расположение ярлыка относительно переключателя
   * @default 'end'
   */
  labelPlacement?: 'start' | 'end' | 'top' | 'bottom';

  /**
   * Дополнительный CSS класс
   */
  className?: string;
}
