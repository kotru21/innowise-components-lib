import React, {
  forwardRef,
  useState,
  useCallback,
  useId,
  useEffect,
} from 'react';
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
      onChange,
      disabled,
      ...props
    },
    ref
  ) => {
    const [focused, setFocused] = useState(false);
    const [internalValue, setInternalValue] = useState(
      value || defaultValue || ''
    );

    // уникальный ID для связи label и input
    const inputId = useId();
    const helperTextId = useId();

    // Отслеживаем изменения в prop value
    useEffect(() => {
      setInternalValue(value || '');
    }, [value]);

    /**
     * Получаем текущее значение (контролируемое или неконтролируемое)
     */
    const getCurrentValue = () => {
      return value !== undefined ? value : internalValue;
    };

    /**
     * Обработчик изменения значения
     */
    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;

        // Если компонент неконтролируемый, обновляем внутреннее состояние
        if (value === undefined) {
          setInternalValue(newValue);
        }

        if (onChange) {
          onChange(event);
        }
      },
      [value, onChange]
    );

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
        if (onBlur) {
          onBlur(event);
        }
      },
      [onBlur]
    );

    /**
     * должен ли лейбл быть "поднят" (shrunk)
     */
    const shouldShrinkLabel = focused || Boolean(getCurrentValue());

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
            onChange={handleChange}
            disabled={disabled}
            required={required}
            value={getCurrentValue()}
            aria-describedby={helperText ? helperTextId : undefined}
            aria-invalid={error}
            // Полностью убираем placeholder если есть лейбл
            placeholder={label ? undefined : props.placeholder}
            {...(({ placeholder, ...rest }) => rest)(props)}
          />

          {/* Лейбл */}
          {label && (
            <label htmlFor={inputId} className={getLabelClasses()}>
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
