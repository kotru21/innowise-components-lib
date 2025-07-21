import { useEffect } from 'react';

export interface UseClickOutsideProps {
  /** Открыто ли меню */
  isOpen: boolean;
  /** Реф на меню */
  menuRef: React.RefObject<HTMLElement | null>;
  /** Реф на select элемент */
  selectRef: React.RefObject<HTMLElement | null>;
  /** Обработчик закрытия */
  onClose: () => void;
}

/**
 * Хук для закрытия меню при клике вне компонента
 */
export const useClickOutside = ({
  isOpen,
  menuRef,
  selectRef,
  onClose,
}: UseClickOutsideProps): void => {
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        selectRef.current &&
        !selectRef.current.contains(target)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, menuRef, selectRef, onClose]);
};
