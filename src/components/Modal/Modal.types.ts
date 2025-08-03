import { ReactNode, HTMLAttributes } from 'react';

export interface ModalProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onClose'> {
  /**
   * Показывает или скрывает модальное окно
   * @default false
   */
  open: boolean;

  /**
   * Обработчик закрытия модального окна
   * Вызывается при клике на backdrop или нажатии Escape
   */
  onClose?: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void;

  /**
   * Содержимое модального окна
   */
  children: ReactNode;

  /**
   * Показывать ли затемненный фон (backdrop)
   * @default true
   */
  backdrop?: boolean | 'static';

  /**
   * Закрывать ли модальное окно при клике на backdrop
   * @default true
   */
  closeOnBackdropClick?: boolean;

  /**
   * Закрывать ли модальное окно при нажатии клавиши Escape
   * @default true
   */
  closeOnEscape?: boolean;

  /**
   * Сохранять ли содержимое модального окна в DOM при закрытии
   * Полезно для SEO или тяжелых компонентов
   * @default false
   */
  keepMounted?: boolean;

  /**
   * Отключить управление фокусом
   * @default false
   */
  disableAutoFocus?: boolean;

  /**
   * Отключить перехват фокуса в модальном окне
   * @default false
   */
  disableEnforceFocus?: boolean;

  /**
   * Отключить восстановление фокуса при закрытии
   * @default false
   */
  disableRestoreFocus?: boolean;

  /**
   * Отключить блокировку прокрутки страницы
   * @default false
   */
  disableScrollLock?: boolean;

  /**
   * Отключить использование портала (для SSR)
   * @default false
   */
  disablePortal?: boolean;

  /**
   * Контейнер для портала
   * @default document.body
   */
  container?: Element | (() => Element | null) | null;

  /**
   * Дополнительный CSS класс для модального окна
   */
  className?: string;

  /**
   * Дополнительный CSS класс для backdrop
   */
  backdropClassName?: string;

  /**
   * Компонент для backdrop (по умолчанию div)
   */
  BackdropComponent?: React.ElementType;

  /**
   * Пропсы для компонента backdrop
   */
  BackdropProps?: Record<string, any>;

  /**
   * Обработчик начала анимации входа
   */
  onEnter?: () => void;

  /**
   * Обработчик завершения анимации выхода
   */
  onExited?: () => void;
}
