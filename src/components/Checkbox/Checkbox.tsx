import React, { forwardRef, useRef, useEffect } from 'react';
import { CheckboxProps } from './Checkbox.types';
import styles from './Checkbox.module.css';
import { CheckIcon, IndeterminateIcon } from './icons';

/**
 * Checkbox компонент - переиспользуемый чекбокс с различными состояниями
 *
 * Основные особенности:
 * - Поддерживает стандартные состояния: checked, unchecked
 * - Поддерживает промежуточное состояние (indeterminate)
 * - 3 размера: small, medium, large
 * - 6 цветовых схем: primary, secondary, error, warning, info, success
 * - Поддерживает кастомные иконки
 * - Поддерживает все стандартные HTML атрибуты для input[type="checkbox"]
 * - Использует forwardRef для передачи ref к DOM элементу
 */
const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      error = false,
      helperText,
      size = 'medium',
      color = 'primary',
      indeterminate = false,
      icon,
      checkedIcon,
      indeterminateIcon,
      labelPlacement = 'end',
      required = false,
      disabled = false,
      className = '',
      inputProps,
      id,
      checked,
      onChange,
      ...props
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const finalRef = (ref as React.RefObject<HTMLInputElement>) || inputRef;

    // Устанавливаем indeterminate состояние для input элемента
    useEffect(() => {
      if (finalRef.current) {
        finalRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate, finalRef]);

    /**
     * Функция для генерации CSS классов для контейнера
     */
    const getContainerClasses = () => {
      const classes = [styles.container];

      classes.push(styles[`placement-${labelPlacement}`]);

      if (disabled) {
        classes.push(styles.disabled);
      }

      if (error) {
        classes.push(styles.error);
      }

      if (className) {
        classes.push(className);
      }

      return classes.join(' ');
    };

    /**
     * Функция для генерации CSS классов для чекбокса
     */
    const getCheckboxClasses = () => {
      const classes = [styles.checkbox];

      // класс размера
      classes.push(styles[size]);

      // класс цвета
      const colorClass = error ? 'error' : color;
      classes.push(styles[colorClass]);

      if (checked) {
        classes.push(styles.checked);
      }

      if (indeterminate) {
        classes.push(styles.indeterminate);
      }

      return classes.join(' ');
    };

    /**
     * Функция для генерации CSS классов для ярлыка
     */
    const getLabelClasses = () => {
      const classes = [styles.label];

      classes.push(styles[`label-${size}`]);

      if (required) {
        classes.push(styles.required);
      }

      return classes.join(' ');
    };

    /**
     * Функция для рендеринга иконки
     */
    const renderIcon = () => {
      if (indeterminate && indeterminateIcon) {
        return indeterminateIcon;
      }

      if (indeterminate && !indeterminateIcon) {
        return <IndeterminateIcon />;
      }

      if (checked && checkedIcon) {
        return checkedIcon;
      }

      if (checked && !checkedIcon) {
        return <CheckIcon />;
      }

      if (icon) {
        return icon;
      }

      return null;
    };

    const checkboxId =
      id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

    const checkboxElement = (
      <div className={styles.checkboxContainer}>
        <input
          ref={finalRef}
          type="checkbox"
          id={checkboxId}
          checked={checked}
          disabled={disabled}
          required={required}
          onChange={onChange}
          className={styles.input}
          {...inputProps}
          {...props}
        />
        <span className={getCheckboxClasses()}>{renderIcon()}</span>
      </div>
    );

    const labelElement = label && (
      <label htmlFor={checkboxId} className={getLabelClasses()}>
        {label}
        {required && <span className={styles.asterisk}>*</span>}
      </label>
    );

    const helperElement = helperText && (
      <div className={styles.helperText}>{helperText}</div>
    );

    // Определяем порядок элементов в зависимости от labelPlacement
    const renderContent = () => {
      switch (labelPlacement) {
        case 'start':
          return (
            <>
              {labelElement}
              {checkboxElement}
            </>
          );
        case 'top':
          return (
            <div className={styles.vertical}>
              {labelElement}
              {checkboxElement}
            </div>
          );
        case 'bottom':
          return (
            <div className={styles.vertical}>
              {checkboxElement}
              {labelElement}
            </div>
          );
        case 'end':
        default:
          return (
            <>
              {checkboxElement}
              {labelElement}
            </>
          );
      }
    };

    if (!label) {
      return (
        <div className={getContainerClasses()}>
          {checkboxElement}
          {helperElement}
        </div>
      );
    }

    return (
      <div className={getContainerClasses()}>
        {renderContent()}
        {helperElement}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
