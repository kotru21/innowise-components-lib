import React, { forwardRef, ReactNode } from 'react';
import { SelectOption } from '../Select.types';
import styles from '../Select.module.css';

export interface SelectMenuProps {
  /** Массив опций */
  options: SelectOption[];
  /** Текущее значение */
  value: string | number | (string | number)[];
  /** Режим множественного выбора */
  multiple?: boolean;
  /** Обработчик клика по опции */
  onOptionClick: (value: string | number) => void;
  /** Дочерние элементы */
  children?: ReactNode;
}

/**
 * Компонент выпадающего меню для Select
 */
export const SelectMenu = forwardRef<HTMLDivElement, SelectMenuProps>(
  ({ options, value, multiple = false, onOptionClick, children }, ref) => {
    return (
      <div ref={ref} className={styles.menu} role="listbox">
        {options.map((option) => {
          const isSelected = multiple
            ? Array.isArray(value) && value.includes(option.value)
            : value === option.value;

          const itemClasses = [
            styles.menuItem,
            isSelected && styles.menuItemSelected,
            option.disabled && styles.menuItemDisabled,
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <button
              key={option.value}
              type="button"
              className={itemClasses}
              role="option"
              aria-selected={isSelected}
              disabled={option.disabled}
              onClick={() => !option.disabled && onOptionClick(option.value)}
            >
              {option.label}
            </button>
          );
        })}
        {children}
      </div>
    );
  }
);

SelectMenu.displayName = 'SelectMenu';
