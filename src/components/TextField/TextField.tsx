import React, { forwardRef, useId, useMemo } from 'react';
import { TextFieldProps } from './TextField.types';
import { useTextField, useTextFieldClasses } from './hooks';
import styles from './TextField.module.css';

/**
 * TextField компонент - поле ввода с лейблом, поддержкой ошибок и различными вариантами отображения
 *
 * Особенности:
 * - Поддерживает 3 варианта: outlined, filled, standard (как в Material-UI)
 * - Анимированный лейбл, который поднимается при фокусе или заполнении
 * - Состояние ошибки с красным выделением
 * - Helper text для подсказок или сообщений об ошибках
 * - Hover и focus эффекты (согласно требованиям)
 * - Поддержка всех стандартных HTML атрибутов input
 */
const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      label,
      error = false,
      helperText,
      variant = 'outlined',
      size = 'medium',
      fullWidth = false,
      required = false,
      className = '',
      value,
      defaultValue,
      onFocus,
      onBlur,
      onChange,
      disabled,
      ...props
    },
    ref
  ) => {
    // уникальный ID для связи label и input
    const inputId = useId();
    const helperTextId = useId();

    // Use custom hooks
    const {
      currentValue,
      isFocused,
      shouldShrinkLabel,
      handleChange,
      handleFocus,
      handleBlur,
    } = useTextField({
      value,
      defaultValue,
      onChange,
      onFocus,
      onBlur,
    });

    const {
      rootClasses,
      inputContainerClasses,
      inputClasses,
      labelClasses,
      helperTextClasses,
    } = useTextFieldClasses({
      variant,
      size,
      fullWidth,
      disabled: Boolean(disabled),
      error,
      required,
      isFocused,
      shouldShrinkLabel,
      hasLabel: Boolean(label),
      className,
    });

    /**
     *  текущее значение (контролируемое или неконтролируемое)
     */
    const getCurrentValue = () => {
      return currentValue;
    };

    return (
      <div className={rootClasses}>
        {/* Контейнер input с лейблом */}
        <div className={inputContainerClasses}>
          {/* Input элемент */}
          <input
            ref={ref}
            id={inputId}
            className={inputClasses}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            disabled={disabled}
            required={required}
            value={getCurrentValue()}
            aria-describedby={helperText ? helperTextId : undefined}
            aria-invalid={error}
            placeholder={label ? undefined : props.placeholder}
            {...(({ placeholder, ...rest }) => rest)(props)}
          />

          {/* Лейбл */}
          {label && (
            <label htmlFor={inputId} className={labelClasses}>
              {label}
              {required && <span className={styles.asterisk}> *</span>}
            </label>
          )}

          {/* Рамка для outlined варианта */}
          {variant === 'outlined' && (
            <fieldset
              className={styles.outlinedNotchedOutline}
              aria-hidden="true"
            >
              {label && shouldShrinkLabel && (
                <legend className={styles.legend}>
                  <span className={styles.legendText}>
                    {label}
                    {required && ' *'}
                  </span>
                </legend>
              )}
            </fieldset>
          )}
        </div>

        {/* Helper text */}
        {helperText && (
          <div id={helperTextId} className={helperTextClasses}>
            {helperText}
          </div>
        )}
      </div>
    );
  }
);

TextField.displayName = 'TextField';

export default TextField;
