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

      // класс размера
      classes.push(styles[size]);

      // класс варианта отображения
      classes.push(styles[variant]);

      // класс цвета (комбинируем variant + color)
      const colorClass = `${variant}${color.charAt(0).toUpperCase() + color.slice(1)}`;
      if (styles[colorClass]) {
        classes.push(styles[colorClass]);
      }

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

Button.displayName = 'Button';

export default Button;
