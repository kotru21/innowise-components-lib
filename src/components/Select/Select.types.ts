import { SelectHTMLAttributes, ReactNode } from 'react';

export interface SelectOption {
  /**
   * Значение опции
   */
  value: string | number;

  /**
   * Отображаемый текст опции
   */
  label: string;

  /**
   * Опция недоступна для выбора
   */
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<
    SelectHTMLAttributes<HTMLSelectElement>,
    'size' | 'multiple' | 'value' | 'onChange'
  > {
  /**
   * Ярлык для поля выбора
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

  /**
   * Опции для выбора
   */
  options: SelectOption[];

  /**
   * Добавляет опцию "none" (пустое значение) в начало списка
   * @default true
   */
  includeNoneOption?: boolean;

  /**
   * Текст для опции "none"
   * @default "Не выбрано"
   */
  noneOptionText?: string;

  /**
   * Значение для опции "none"
   * @default ""
   */
  noneOptionValue?: string | number;

  /**
   * Текст плейсхолдера, отображается когда ничего не выбрано
   */
  placeholder?: string;

  /**
   * Разрешает выбор нескольких значений
   * @default false
   */
  multiple?: boolean;

  /**
   * Значение для множественного выбора
   */
  value?: string | number | (string | number)[];

  /**
   * Callback для изменения значения
   */
  onChange?: (
    event: React.ChangeEvent<HTMLSelectElement>,
    value: string | number | (string | number)[]
  ) => void;

  /**
   * Контролирует открытое состояние выпадающего списка
   */
  open?: boolean;

  /**
   * Callback для изменения открытого состояния
   */
  onOpen?: () => void;

  /**
   * Callback для закрытия
   */
  onClose?: () => void;

  /**
   * Автоматическая ширина по содержимому
   * @default false
   */
  autoWidth?: boolean;

  /**
   * Иконка для индикатора выпадающего списка
   */
  IconComponent?: React.ComponentType<any>;

  /**
   * Дополнительные элементы для отображения в выпадающем списке
   */
  children?: ReactNode;
}
