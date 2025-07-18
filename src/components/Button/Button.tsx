import React, { forwardRef } from 'react';
import { ButtonProps } from './Button.types';
import styles from './Button.module.css';

/**
 * Button компонент - переиспользуемая кнопка с различными вариантами отображения
 *
 * Основные особенности:
 * - Поддерживает 3 варианта: text, contained, outlined
 * - 3 размера: small, medium, large
 * - 6 цветовых схем: primary, secondary, error, warning, info, success
 * - Поддерживает все стандартные HTML атрибуты кнопки
 * - Использует forwardRef для передачи ref к DOM элементу
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'contained',
      size = 'medium',
      color = 'primary',
      disabled = false,
      className = '',
      ...props // Все остальные HTML атрибуты
    },
    ref
  ) => {
    /**
     * Функция для генерации CSS классов на основе props
     */
    const getButtonClasses = () => {
      const classes = [styles.button];

      // Добавляем класс размера
      classes.push(styles[size]);

      // Добавляем класс варианта отображения
      classes.push(styles[variant]);

      // Добавляем класс цвета (комбинируем variant + color)
      const colorClass = `${variant}${color.charAt(0).toUpperCase() + color.slice(1)}`;
      if (styles[colorClass]) {
        classes.push(styles[colorClass]);
      }

      // Добавляем пользовательский className если передан
      if (className) {
        classes.push(className);
      }

      return classes.join(' ');
    };

    return (
      <button
        ref={ref}
        className={getButtonClasses()}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

// Устанавливаем displayName для лучшей отладки в React DevTools
Button.displayName = 'Button';

export default Button;
