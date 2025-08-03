import React, { forwardRef } from 'react';
import { SwitchProps } from './Switch.types';
import styles from './Switch.module.css';

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
      ...props
    },
    ref
  ) => {
    /**
     * Функция для генерации CSS классов на основе props
     */
    const getSwitchClasses = (): string => {
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
    };

    /**
     * Функция для генерации CSS классов контейнера с учетом расположения ярлыка
     */
    const getContainerClasses = (): string => {
      const classes = [styles.container];

      if (labelPlacement) {
        classes.push(styles[`container--${labelPlacement}`]);
      }

      return classes.join(' ');
    };

    /**
     * Рендерит переключатель
     */
    const renderSwitch = () => (
      <label className={getSwitchClasses()}>
        <input
          ref={ref}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className={styles.input}
          id={id}
          {...props}
        />
        <span className={styles.track}>
          <span className={styles.thumb} />
        </span>
      </label>
    );

    /**
     * Рендерит ярлык
     */
    const renderLabel = () => {
      if (!label) return null;

      return <span className={styles.label}>{label}</span>;
    };

    /**
     * Рендерит вспомогательный текст
     */
    const renderHelperText = () => {
      if (!helperText) return null;

      return (
        <div
          className={`${styles.helperText} ${error ? styles['helperText--error'] : ''}`}
        >
          {helperText}
        </div>
      );
    };

    // Если нет ярлыка и вспомогательного текста, возвращаем только переключатель
    if (!label && !helperText) {
      return renderSwitch();
    }

    // Возвращаем полную структуру с ярлыком и вспомогательным текстом
    return (
      <div className={getContainerClasses()}>
        {(labelPlacement === 'start' || labelPlacement === 'top') &&
          renderLabel()}
        {renderSwitch()}
        {(labelPlacement === 'end' || labelPlacement === 'bottom') &&
          renderLabel()}
        {renderHelperText()}
      </div>
    );
  }
);

Switch.displayName = 'Switch';

export default Switch;
