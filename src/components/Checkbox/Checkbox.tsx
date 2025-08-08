import React, { forwardRef, useRef, useEffect, useMemo } from 'react';
import { CheckboxProps } from './Checkbox.types';
import styles from './Checkbox.module.css';
import { CheckIcon, IndeterminateIcon } from './icons';

// Компонент иконки чекбокса, чтобы не вызывать renderX-функции
const CheckboxIcon: React.FC<{
  checked?: boolean;
  indeterminate?: boolean;
  icon?: React.ReactNode;
  checkedIcon?: React.ReactNode;
  indeterminateIcon?: React.ReactNode;
}> = React.memo(
  ({ checked, indeterminate, icon, checkedIcon, indeterminateIcon }) => {
    if (indeterminate) {
      return <>{indeterminateIcon || <IndeterminateIcon />}</>;
    }
    if (checked) {
      return <>{checkedIcon || <CheckIcon />}</>;
    }
    return <>{icon || null}</>;
  }
);

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
     * Вычисляем все производные значения за один проход
     */
    const { containerClasses, checkboxClasses, labelClasses, memoCheckboxId } =
      useMemo(() => {
        // container
        const container = [styles.container];
        container.push(styles[`placement-${labelPlacement}`]);
        if (disabled) container.push(styles.disabled);
        if (error) container.push(styles.error);
        if (className) container.push(className);

        // checkbox
        const checkbox = [styles.checkbox];
        checkbox.push(styles[size]);
        const colorClass = error ? 'error' : color;
        checkbox.push(styles[colorClass]);
        if (checked) checkbox.push(styles.checked);
        if (indeterminate) checkbox.push(styles.indeterminate);

        // label
        const labelArr = [styles.label];
        labelArr.push(styles[`label-${size}`]);
        if (required) labelArr.push(styles.required);

        // id
        const computedId =
          id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

        return {
          containerClasses: container.join(' '),
          checkboxClasses: checkbox.join(' '),
          labelClasses: labelArr.join(' '),
          memoCheckboxId: computedId,
        };
      }, [
        labelPlacement,
        disabled,
        error,
        className,
        size,
        color,
        checked,
        indeterminate,
        required,
        id,
      ]);

    const checkboxId = memoCheckboxId;

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
        <span className={checkboxClasses}>
          <CheckboxIcon
            checked={checked}
            indeterminate={indeterminate}
            icon={icon}
            checkedIcon={checkedIcon}
            indeterminateIcon={indeterminateIcon}
          />
        </span>
      </div>
    );

    const labelElement = label && (
      <label htmlFor={checkboxId} className={labelClasses}>
        {label}
        {required && <span className={styles.asterisk}>*</span>}
      </label>
    );

    const helperElement = helperText && (
      <div className={styles.helperText}>{helperText}</div>
    );

    if (!label) {
      return (
        <div className={containerClasses}>
          {checkboxElement}
          {helperElement}
        </div>
      );
    }

    return (
      <div className={containerClasses}>
        {labelPlacement === 'top' ? (
          <div className={styles.vertical}>
            {labelElement}
            {checkboxElement}
          </div>
        ) : labelPlacement === 'bottom' ? (
          <div className={styles.vertical}>
            {checkboxElement}
            {labelElement}
          </div>
        ) : labelPlacement === 'start' ? (
          <>
            {labelElement}
            {checkboxElement}
          </>
        ) : (
          <>
            {checkboxElement}
            {labelElement}
          </>
        )}
        {helperElement}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
