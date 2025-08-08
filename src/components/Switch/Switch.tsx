import React, { forwardRef, useMemo } from 'react';
import { SwitchProps } from './Switch.types';
import styles from './Switch.module.css';

// Отдельные компоненты, вынесенные на уровень модуля (стабильная идентичность между рендерами)
type SwitchControlProps = React.InputHTMLAttributes<HTMLInputElement> & {
  wrapperClassName: string;
};

const SwitchControl = React.memo(
  forwardRef<HTMLInputElement, SwitchControlProps>(
    (
      { wrapperClassName, id, checked, disabled, onChange, ...inputProps },
      controlRef
    ) => (
      <label className={wrapperClassName}>
        <input
          ref={controlRef}
          type="checkbox"
          checked={!!checked}
          onChange={onChange}
          disabled={!!disabled}
          className={styles.input}
          id={id}
          {...inputProps}
        />
        <span className={styles.track}>
          <span className={styles.thumb} />
        </span>
      </label>
    )
  )
);

const SwitchLabel: React.FC<{ label?: React.ReactNode }> = React.memo(
  ({ label }) => {
    if (!label) return null;
    return <span className={styles.label}>{label}</span>;
  }
);

const HelperText: React.FC<{ helperText?: React.ReactNode; error?: boolean }> =
  React.memo(({ helperText, error }) => {
    if (!helperText) return null;
    return (
      <div
        className={`${styles.helperText} ${error ? styles['helperText--error'] : ''}`}
      >
        {helperText}
      </div>
    );
  });

/**
 * Switch компонент - переиспользуемый переключатель для включения/выключения настроек
 *
 * Основные особенности:
 * - Поддерживает состояния: включен/выключен
 * - 3 размера: small, medium, large
 * - 6 цветовых схем: primary, secondary, error, warning, info, success
 * - Поддерживает ярлыки с различным расположением
 * - Поддерживает состояние ошибки и вспомогательный текст
 * - Поддерживает все стандартные HTML атрибуты для input[type="checkbox"]
 * - Использует forwardRef для передачи ref к DOM элементу
 */
const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      checked = false,
      onChange,
      disabled = false,
      size = 'medium',
      color = 'primary',
      label,
      error = false,
      helperText,
      labelPlacement = 'end',
      className = '',
      id,
      ...restProps
    },
    ref
  ) => {
    // Классы переключателя
    const switchClassName = useMemo((): string => {
      const classes = [styles.switch];

      // Размер
      classes.push(styles[`switch--${size}`]);

      // Цвет (используется только когда checked = true и нет ошибки)
      if (checked && !error) {
        classes.push(styles[`switch--${color}`]);
      }

      // Состояние ошибки
      if (error) {
        classes.push(styles['switch--error']);
      }

      // Отключенное состояние
      if (disabled) {
        classes.push(styles['switch--disabled']);
      }

      // Дополнительный класс
      if (className) {
        classes.push(className);
      }

      return classes.join(' ');
    }, [size, checked, error, color, disabled, className]);

    // Классы контейнера
    const containerClassName = useMemo((): string => {
      const classes = [styles.container];
      if (labelPlacement) {
        classes.push(styles[`container--${labelPlacement}`]);
      }
      return classes.join(' ');
    }, [labelPlacement]);

    // Если нет ярлыка и вспомогательного текста, возвращаем только переключатель
    if (!label && !helperText) {
      return (
        <SwitchControl
          ref={ref}
          wrapperClassName={switchClassName}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          id={id}
          {...restProps}
        />
      );
    }

    // Возвращаем полную структуру с ярлыком и вспомогательным текстом
    return (
      <div className={containerClassName}>
        {(labelPlacement === 'start' || labelPlacement === 'top') && (
          <SwitchLabel label={label} />
        )}
        <SwitchControl
          ref={ref}
          wrapperClassName={switchClassName}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          id={id}
          {...restProps}
        />
        {(labelPlacement === 'end' || labelPlacement === 'bottom') && (
          <SwitchLabel label={label} />
        )}
        <HelperText helperText={helperText} error={error} />
      </div>
    );
  }
);

Switch.displayName = 'Switch';

export default Switch;
