import React, { forwardRef, useState, useCallback, useId } from 'react';
import { TextFieldProps } from './TextField.types';
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
      disabled,
      ...props
    },
    ref
  ) => {
    const [focused, setFocused] = useState(false);
    const [hasValue, setHasValue] = useState(Boolean(value || defaultValue));

    // уникальный ID для связи label и input
    const inputId = useId();
    const helperTextId = useId();

    /**
     * Обработчик фокуса
     */
    const handleFocus = useCallback(
      (event: React.FocusEvent<HTMLInputElement>) => {
        setFocused(true);
        if (onFocus) {
          onFocus(event);
        }
      },
      [onFocus]
    );

    /**
     * Обработчик потери фокуса
     */
    const handleBlur = useCallback(
      (event: React.FocusEvent<HTMLInputElement>) => {
        setFocused(false);
        // Проверяем, есть ли значение в поле
        setHasValue(Boolean(event.target.value));
        if (onBlur) {
          onBlur(event);
        }
      },
      [onBlur]
    );

    /**
     * должен ли лейбл быть "поднят" (shrunk)
     */
    const shouldShrinkLabel = focused || hasValue || Boolean(value);

    /**
     * CSS классы для корневого элемента
     */
    const getRootClasses = () => {
      const classes = [styles.textFieldRoot];

      if (fullWidth) {
        classes.push(styles.fullWidth);
      }

      if (className) {
        classes.push(className);
      }

      return classes.join(' ');
    };

    /**
     * Генерируем CSS классы для лейбла
     */
    const getLabelClasses = () => {
      const classes = [styles.label];

      if (size === 'small') {
        classes.push(styles.labelSmall);
      }

      if (shouldShrinkLabel) {
        classes.push(styles.labelShrunk);
      }

      if (focused) {
        classes.push(styles.labelFocused);
      }

      if (error) {
        classes.push(styles.labelError);
      }

      if (required) {
        classes.push(styles.labelRequired);
      }

      return classes.join(' ');
    };

    /**
     * CSS классы для контейнера input
     */
    const getInputContainerClasses = () => {
      const classes = [styles.inputContainer, styles[variant]];

      if (focused) {
        classes.push(styles[`${variant}Focused`]);
      }

      if (error) {
        classes.push(styles[`${variant}Error`]);
      }

      if (disabled) {
        classes.push(styles[`${variant}Disabled`]);
      }

      return classes.join(' ');
    };

    /**
     * CSS классы для input элемента
     */
    const getInputClasses = () => {
      const classes = [styles.input];

      if (size === 'small') {
        classes.push(styles.inputSmall);
      }

      return classes.join(' ');
    };

    /**
     * CSS классы для helper text
     */
    const getHelperTextClasses = () => {
      const classes = [styles.helperText];

      if (error) {
        classes.push(styles.helperTextError);
      }

      return classes.join(' ');
    };

    return (
      <div className={getRootClasses()}>
        {/* Контейнер input с лейблом */}
        <div className={getInputContainerClasses()}>
          {/* Input элемент */}
          <input
            ref={ref}
            id={inputId}
            className={getInputClasses()}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
            required={required}
            value={value}
            defaultValue={defaultValue}
            aria-describedby={helperText ? helperTextId : undefined}
            aria-invalid={error}
            {...props}
          />

          {/* Лейбл */}
          {label && (
            <label htmlFor={inputId} className={getLabelClasses()}>
              {label}
            </label>
          )}

          {/* Рамка для outlined варианта */}
          {variant === 'outlined' && (
            <fieldset
              className={styles.outlinedNotchedOutline}
              aria-hidden="true"
            />
          )}
        </div>

        {/* Helper text */}
        {helperText && (
          <div id={helperTextId} className={getHelperTextClasses()}>
            {helperText}
          </div>
        )}
      </div>
    );
  }
);

TextField.displayName = 'TextField';

export default TextField;
