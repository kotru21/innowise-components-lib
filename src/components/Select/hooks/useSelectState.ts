import { useState, useCallback, useRef, useEffect } from 'react';

export interface UseSelectStateProps {
  /** Контролируемое состояние открытия */
  controlledOpen?: boolean;
  /** Заблокирован ли компонент */
  disabled?: boolean;
  /** Коллбек при открытии */
  onOpen?: () => void;
  /** Коллбек при закрытии */
  onClose?: () => void;
  /** Коллбек при фокусе */
  onFocus?: (event: React.FocusEvent<HTMLSelectElement>) => void;
  /** Коллбек при потере фокуса */
  onBlur?: (event: React.FocusEvent<HTMLSelectElement>) => void;
}

export interface UseSelectStateReturn {
  /** Состояние фокуса */
  focused: boolean;
  /** Состояние открытия меню */
  isOpen: boolean;
  /** Обработчик фокуса */
  handleFocus: (event: React.FocusEvent<HTMLElement>) => void;
  /** Обработчик потери фокуса */
  handleBlur: (event: React.FocusEvent<HTMLElement>) => void;
  /** Обработчик открытия меню */
  handleOpen: () => void;
  /** Обработчик закрытия меню */
  handleClose: () => void;
  /** Обработчик переключения состояния меню */
  handleToggle: () => void;
}

/**
 * Хук для управления состоянием Select компонента
 */
export const useSelectState = ({
  controlledOpen,
  disabled,
  onOpen,
  onClose,
  onFocus,
  onBlur,
}: UseSelectStateProps): UseSelectStateReturn => {
  const [focused, setFocused] = useState(false);
  const [internalOpen, setInternalOpen] = useState(false);

  // Используем контролируемое значение open, если оно предоставлено
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

  const handleFocus = useCallback(
    (event: React.FocusEvent<HTMLElement>) => {
      setFocused(true);
      onFocus?.(event as React.FocusEvent<HTMLSelectElement>);
    },
    [onFocus]
  );

  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLElement>) => {
      setFocused(false);
      onBlur?.(event as React.FocusEvent<HTMLSelectElement>);
    },
    [onBlur]
  );

  const handleOpen = useCallback(() => {
    if (controlledOpen === undefined) {
      setInternalOpen(true);
    }
    onOpen?.();
  }, [controlledOpen, onOpen]);

  const handleClose = useCallback(() => {
    if (controlledOpen === undefined) {
      setInternalOpen(false);
    }
    onClose?.();
  }, [controlledOpen, onClose]);

  const handleToggle = useCallback(() => {
    if (disabled) return;
    if (isOpen) {
      handleClose();
    } else {
      handleOpen();
    }
  }, [disabled, isOpen, handleOpen, handleClose]);

  return {
    focused,
    isOpen,
    handleFocus,
    handleBlur,
    handleOpen,
    handleClose,
    handleToggle,
  };
};
