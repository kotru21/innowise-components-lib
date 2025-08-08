import React, { useEffect, useRef, useCallback, forwardRef } from 'react';
import { createPortal } from 'react-dom';
import { ModalProps } from './Modal.types';
import styles from './Modal.module.css';

/**
 * Modal компонент - базовое модальное окно для создания диалогов, lightbox и других overlay компонентов
 *
 * Основные особенности:
 * - Управление стеком модальных окон
 * - Блокировка прокрутки страницы
 * - Управление фокусом и доступностью
 * - Поддержка backdrop с возможностью кастомизации
 * - Поддержка порталов и SSR
 * - Обработка клавиш (Escape)
 * - Анимации входа/выхода
 */
const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      open,
      onClose,
      children,
      backdrop = true,
      closeOnBackdropClick = true,
      closeOnEscape = true,
      keepMounted = false,
      disableAutoFocus = false,
      disableEnforceFocus = false,
      disableRestoreFocus = false,
      disableScrollLock = false,
      disablePortal = false,
      container,
      className = '',
      backdropClassName = '',
      BackdropComponent = 'div',
      BackdropProps = {},
      onEnter,
      onExited,
      ...props
    },
    ref
  ) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const backdropRef = useRef<HTMLDivElement>(null);
    const lastFocusedElement = useRef<HTMLElement | null>(null);

    // контейнер для портала
    const getContainer = useCallback(() => {
      if (disablePortal) return null;
      if (container) {
        return typeof container === 'function' ? container() : container;
      }
      return document.body;
    }, [container, disablePortal]);

    const handleClose = useCallback(
      (event: any, reason: 'backdropClick' | 'escapeKeyDown') => {
        if (onClose) {
          onClose(event, reason);
        }
      },
      [onClose]
    );

    const handleBackdropClick = useCallback(
      (event: React.MouseEvent) => {
        if (event.target === event.currentTarget && closeOnBackdropClick) {
          handleClose(event, 'backdropClick');
        }
      },
      [closeOnBackdropClick, handleClose]
    );

    const handleKeyDown = useCallback(
      (event: KeyboardEvent) => {
        if (!open || event.key !== 'Escape' || !closeOnEscape) return;

        event.stopPropagation();
        handleClose(event, 'escapeKeyDown');
      },
      [open, closeOnEscape, handleClose]
    );

    const handleFocus = useCallback(() => {
      if (disableEnforceFocus || !modalRef.current) return;

      const modalElement = modalRef.current;
      const activeElement = document.activeElement;

      if (!modalElement.contains(activeElement)) {
        const firstFocusable = modalElement.querySelector<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (firstFocusable) {
          firstFocusable.focus();
        } else {
          modalElement.focus();
        }
      }
    }, [disableEnforceFocus]);

    useEffect(() => {
      if (!open) return;

      if (!disableRestoreFocus) {
        lastFocusedElement.current = document.activeElement as HTMLElement;
      }

      if (!disableScrollLock) {
        document.body.style.overflow = 'hidden';
      }

      document.addEventListener('keydown', handleKeyDown);
      if (!disableEnforceFocus) {
        document.addEventListener('focusin', handleFocus);
      }

      if (!disableAutoFocus) {
        setTimeout(() => handleFocus(), 0);
      }

      onEnter?.();

      return () => {
        if (!disableScrollLock) {
          document.body.style.overflow = '';
        }
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('focusin', handleFocus);
        if (!disableRestoreFocus && lastFocusedElement.current) {
          lastFocusedElement.current.focus();
          lastFocusedElement.current = null;
        }
        onExited?.();
      };
    }, [
      open,
      disableAutoFocus,
      disableEnforceFocus,
      disableRestoreFocus,
      disableScrollLock,
      handleKeyDown,
      handleFocus,
      onEnter,
      onExited,
    ]);

    const renderModal = () => {
      if (!open && !keepMounted) {
        return null;
      }

      const modalClasses = [
        backdrop === false ? styles['modal--no-backdrop'] : styles.modal,
        !open && styles['modal--hidden'],
        className,
      ]
        .filter(Boolean)
        .join(' ');

      const backdropClasses = [styles.backdrop, backdropClassName]
        .filter(Boolean)
        .join(' ');

      const modal = (
        <div ref={ref} className={modalClasses} role="presentation" {...props}>
          {backdrop && (
            <BackdropComponent
              ref={backdropRef}
              className={backdropClasses}
              onClick={handleBackdropClick}
              {...BackdropProps}
            />
          )}
          <div
            ref={modalRef}
            className={styles.content}
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
          >
            {children}
          </div>
        </div>
      );

      const portalContainer = getContainer();
      if (portalContainer && !disablePortal) {
        return createPortal(modal, portalContainer);
      }

      return modal;
    };

    return renderModal();
  }
);

Modal.displayName = 'Modal';

export default Modal;
