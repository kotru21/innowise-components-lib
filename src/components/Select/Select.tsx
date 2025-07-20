import React, {
  forwardRef,
  useState,
  useCallback,
  useId,
  useEffect,
  useRef,
} from 'react';
import { SelectProps, SelectOption } from './Select.types';
import styles from './Select.module.css';

/**
 * Компонент стрелки вниз (по умолчанию)
 */
const ArrowDropDownIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    focusable="false"
    aria-hidden="true"
    viewBox="0 0 24 24"
    width="24"
    height="24"
  >
    <path d="M7 10l5 5 5-5z"></path>
  </svg>
);

/**
 * Компонент для отображения выбранных значений в виде чипов
 */
const Chip: React.FC<{
  label: string;
  onDelete?: () => void;
  className?: string;
}> = ({ label, onDelete, className }) => (
  <span className={`${styles.chip} ${className || ''}`}>
    {label}
    {onDelete && (
      <span className={styles.chipDeleteIcon} onClick={onDelete}>
        ×
      </span>
    )}
  </span>
);

/**
 * Select компонент - выпадающий список с поддержкой различных вариантов отображения
 *
 * Особенности:
 * - Поддерживает 3 варианта: outlined, filled, standard (как в Material-UI)
 * - Анимированный лейбл, который поднимается при фокусе или заполнении
 * - Состояние ошибки с красным выделением
 * - Helper text для подсказок или сообщений об ошибках
 * - Поддержка множественного выбора
 * - Кастомная иконка стрелки
 * - Hover и focus эффекты
 */
const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error = false,
      helperText,
      variant = 'outlined',
      size = 'medium',
      fullWidth = false,
      autoWidth = false,
      required = false,
      multiple = false,
      className = '',
      value,
      defaultValue,
      options = [],
      includeNoneOption = true,
      noneOptionText = 'Не выбрано',
      noneOptionValue = '',
      placeholder,
      onFocus,
      onBlur,
      onChange,
      onOpen,
      onClose,
      disabled,
      open: controlledOpen,
      IconComponent = ArrowDropDownIcon,
      children,
      ...props
    },
    ref
  ) => {
    const [focused, setFocused] = useState(false);
    const [internalOpen, setInternalOpen] = useState(false);
    const [internalValue, setInternalValue] = useState<
      string | number | (string | number)[]
    >(
      multiple
        ? (value as (string | number)[]) ||
            (defaultValue as (string | number)[]) ||
            []
        : (value as string | number) || (defaultValue as string | number) || ''
    );

    const selectRef = useRef<HTMLSelectElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    // Используем контролируемое значение open, если оно предоставлено
    const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

    // уникальные ID для связи label и select
    const selectId = useId();
    const helperTextId = useId();

    // Создаем расширенный массив опций с опцией "none"
    const allOptions = React.useMemo(() => {
      const noneOption: SelectOption = {
        value: noneOptionValue,
        label: noneOptionText,
        disabled: false,
      };

      // Для множественного выбора не добавляем опцию "none"
      if (multiple || !includeNoneOption) {
        return options;
      }

      // Проверяем, есть ли уже опция с таким значением
      const hasNoneOption = options.some(
        (opt) => opt.value === noneOptionValue
      );

      if (hasNoneOption) {
        return options;
      }

      return [noneOption, ...options];
    }, [options, includeNoneOption, noneOptionText, noneOptionValue, multiple]);

    // Определяем, должен ли лейбл быть в сжатом состоянии
    // Лейбл поднимается при фокусе, открытии меню или когда есть выбранное значение (кроме "none")
    const hasValue = multiple
      ? Array.isArray(internalValue) && internalValue.length > 0
      : internalValue !== '' &&
        internalValue !== undefined &&
        internalValue !== noneOptionValue;
    const shouldShrink = focused || hasValue || isOpen;

    // Обновляем внутреннее значение при изменении внешнего
    useEffect(() => {
      if (value !== undefined) {
        setInternalValue(value);
      }
    }, [value]);

    // Закрытие меню при клике вне компонента
    useEffect(() => {
      if (!isOpen) return;

      const handleClickOutside = (event: MouseEvent) => {
        if (
          menuRef.current &&
          !menuRef.current.contains(event.target as Node) &&
          selectRef.current &&
          !selectRef.current.contains(event.target as Node)
        ) {
          handleClose();
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    const handleFocus = useCallback(
      (event: React.FocusEvent<HTMLSelectElement>) => {
        setFocused(true);
        onFocus?.(event);
      },
      [onFocus]
    );

    const handleBlur = useCallback(
      (event: React.FocusEvent<HTMLSelectElement>) => {
        setFocused(false);
        onBlur?.(event);
      },
      [onBlur]
    );

    const handleOpen = useCallback(() => {
      if (controlledOpen === undefined) {
        setInternalOpen(true);
      }
      onOpen?.();
    }, [controlledOpen, onOpen]);

    const handleClose = useCallback(() => {
      if (controlledOpen === undefined) {
        setInternalOpen(false);
      }
      onClose?.();
    }, [controlledOpen, onClose]);

    const handleToggle = useCallback(() => {
      if (disabled) return;
      if (isOpen) {
        handleClose();
      } else {
        handleOpen();
      }
    }, [disabled, isOpen, handleOpen, handleClose]);

    const handleOptionClick = useCallback(
      (optionValue: string | number) => {
        let newValue: string | number | (string | number)[];

        if (multiple) {
          const currentArray = Array.isArray(internalValue)
            ? internalValue
            : [];
          if (currentArray.includes(optionValue)) {
            newValue = currentArray.filter((v) => v !== optionValue);
          } else {
            newValue = [...currentArray, optionValue];
          }
        } else {
          newValue = optionValue;
          handleClose();
        }

        setInternalValue(newValue);

        // Создаем событие для совместимости
        const event = {
          target: { value: newValue },
        } as unknown as React.ChangeEvent<HTMLSelectElement>;

        onChange?.(event, newValue);
      },
      [multiple, internalValue, onChange, handleClose]
    );

    const handleChipDelete = useCallback(
      (valueToRemove: string | number) => {
        if (!multiple || !Array.isArray(internalValue)) return;

        const newValue = internalValue.filter((v) => v !== valueToRemove);
        setInternalValue(newValue);

        const event = {
          target: { value: newValue },
        } as unknown as React.ChangeEvent<HTMLSelectElement>;

        onChange?.(event, newValue);
      },
      [multiple, internalValue, onChange]
    );

    // Получаем отображаемое значение
    const getDisplayValue = () => {
      if (multiple && Array.isArray(internalValue)) {
        if (internalValue.length === 0) {
          // Если лейбл есть и не поднят, не показываем никакого текста (лейбл играет роль плейсхолдера)
          return label && !shouldShrink ? '' : placeholder || '';
        }
        return internalValue
          .map((val) => {
            const option = allOptions.find((opt) => opt.value === val);
            return option ? option.label : val;
          })
          .join(', ');
      }

      if (!multiple) {
        const option = allOptions.find((opt) => opt.value === internalValue);
        if (option && option.value !== noneOptionValue) {
          // Есть реальное выбранное значение
          return option.label;
        }

        // Если лейбл есть и не поднят, не показываем никакого текста (лейбл играет роль плейсхолдера)
        if (label && !shouldShrink) {
          return '';
        }

        // Показываем placeholder только если нет лейбла или лейбл поднят
        return placeholder || '';
      }

      return '';
    };

    // Рендер чипов для множественного выбора
    const renderChips = () => {
      if (
        !multiple ||
        !Array.isArray(internalValue) ||
        internalValue.length === 0
      ) {
        // Если нет выбранных значений и лейбл не поднят, не показываем ничего (лейбл играет роль плейсхолдера)
        if (label && !shouldShrink) {
          return '';
        }
        return placeholder || '';
      }

      return (
        <div className={styles.chipContainer}>
          {internalValue.map((val) => {
            const option = allOptions.find((opt) => opt.value === val);
            const label = option ? option.label : String(val);

            return (
              <Chip
                key={val}
                label={label}
                onDelete={() => handleChipDelete(val)}
              />
            );
          })}
        </div>
      );
    };

    // Классы для контейнера
    const rootClasses = [
      styles.selectRoot,
      fullWidth && styles.fullWidth,
      autoWidth && styles.autoWidth,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Классы для лейбла
    const labelClasses = [
      styles.label,
      size === 'small' && styles.labelSmall,
      shouldShrink && styles.labelShrunk,
      focused && styles.labelFocused,
      error && styles.labelError,
      disabled && styles.labelDisabled,
      required && styles.labelRequired,
    ]
      .filter(Boolean)
      .join(' ');

    // Классы для контейнера инпута
    const inputContainerClasses = [
      styles.inputContainer,
      styles[variant],
      size === 'small' && styles[`${variant}Small`],
      focused && styles[`${variant}Focused`],
      size === 'small' && focused && styles[`${variant}FocusedSmall`],
      error && styles[`${variant}Error`],
      disabled && styles[`${variant}Disabled`],
    ]
      .filter(Boolean)
      .join(' ');

    // Классы для select элемента
    const selectClasses = [
      styles.select,
      multiple && styles.selectMultiple,
      disabled && styles.selectDisabled,
      !hasValue && placeholder && styles.placeholder,
    ]
      .filter(Boolean)
      .join(' ');

    // Классы для иконки
    const iconClasses = [
      styles.icon,
      isOpen && styles.iconOpen,
      disabled && styles.iconDisabled,
    ]
      .filter(Boolean)
      .join(' ');

    // Классы для helper text
    const helperTextClasses = [
      styles.helperText,
      error && styles.helperTextError,
      disabled && styles.helperTextDisabled,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={rootClasses}>
        <div className={inputContainerClasses}>
          {label && (
            <label htmlFor={selectId} className={labelClasses}>
              {label}
            </label>
          )}

          {/* Скрытый select для доступности и совместимости с формами */}
          <select
            {...props}
            ref={(node) => {
              selectRef.current = node;
              if (typeof ref === 'function') {
                ref(node);
              } else if (ref) {
                ref.current = node;
              }
            }}
            id={selectId}
            value={multiple ? [] : (internalValue as string | number)}
            multiple={multiple}
            onChange={() => {}} // Обрабатываем изменения через клики
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
            required={required}
            aria-describedby={helperText ? helperTextId : undefined}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            style={{ opacity: 0, position: 'absolute', pointerEvents: 'none' }}
          >
            {allOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>

          {/* Видимый элемент для отображения */}
          <div
            className={selectClasses}
            onClick={handleToggle}
            role="combobox"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            tabIndex={disabled ? -1 : 0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleToggle();
              }
              if (e.key === 'Escape' && isOpen) {
                handleClose();
              }
            }}
          >
            {multiple ? renderChips() : getDisplayValue()}
          </div>

          <IconComponent className={iconClasses} />

          {/* Выпадающее меню */}
          {isOpen && (
            <div ref={menuRef} className={styles.menu} role="listbox">
              {allOptions.map((option) => {
                const isSelected = multiple
                  ? Array.isArray(internalValue) &&
                    internalValue.includes(option.value)
                  : internalValue === option.value;

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
                    onClick={() =>
                      !option.disabled && handleOptionClick(option.value)
                    }
                  >
                    {option.label}
                  </button>
                );
              })}
              {children}
            </div>
          )}
        </div>

        {helperText && (
          <div id={helperTextId} className={helperTextClasses}>
            {helperText}
          </div>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
