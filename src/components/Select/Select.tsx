import React, { forwardRef, useId, useRef } from 'react';
import { SelectProps } from './Select.types';
import { ArrowDropDownIcon } from './icons';
import { SelectMenu } from './SelectMenu';
import { SelectInput } from './SelectInput';
import {
  useSelectState,
  useSelectValue,
  useSelectOptions,
  useClickOutside,
  useSelectClasses,
} from './hooks';
import styles from './Select.module.css';

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
    const selectRef = useRef<HTMLSelectElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    // Уникальные ID для связи label и select
    const selectId = useId();
    const helperTextId = useId();

    // Используем кастомные хуки
    const {
      focused,
      isOpen,
      handleFocus,
      handleBlur,
      handleOpen,
      handleClose,
      handleToggle,
    } = useSelectState({
      controlledOpen,
      disabled,
      onOpen,
      onClose,
      onFocus,
      onBlur,
    });

    const { internalValue, handleOptionClick, handleChipDelete } =
      useSelectValue({
        value,
        defaultValue: defaultValue as
          | string
          | number
          | (string | number)[]
          | undefined,
        multiple,
        onChange: (event, newValue) => {
          onChange?.(event, newValue);
          if (!multiple) {
            handleClose();
          }
        },
      });

    const { allOptions } = useSelectOptions({
      options,
      includeNoneOption,
      noneOptionText,
      noneOptionValue,
      multiple,
    });

    // Определяем, должен ли лейбл быть в сжатом состоянии
    const hasValue = multiple
      ? Array.isArray(internalValue) && internalValue.length > 0
      : internalValue !== '' &&
        internalValue !== undefined &&
        internalValue !== noneOptionValue;
    const shouldShrink = focused || hasValue || isOpen;

    // Используем хук для формирования CSS классов
    const {
      rootClasses,
      labelClasses,
      inputContainerClasses,
      selectClasses,
      iconClasses,
      helperTextClasses,
    } = useSelectClasses({
      size,
      variant,
      focused,
      error,
      disabled,
      required,
      fullWidth,
      autoWidth,
      multiple,
      hasValue,
      shouldShrink,
      isOpen,
      hasPlaceholder: Boolean(placeholder),
      className,
    });

    // Закрытие меню при клике вне компонента
    useClickOutside({
      isOpen,
      menuRef,
      selectRef,
      onClose: handleClose,
    });

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
            onFocus={handleFocus}
            onBlur={handleBlur}
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
            <SelectInput
              value={internalValue}
              options={allOptions}
              multiple={multiple}
              noneOptionValue={noneOptionValue}
              label={label}
              placeholder={placeholder}
              shouldShrink={shouldShrink}
              onChipDelete={handleChipDelete}
            />
          </div>

          <IconComponent className={iconClasses} />

          {/* Выпадающее меню */}
          {isOpen && (
            <SelectMenu
              ref={menuRef}
              options={allOptions}
              value={internalValue}
              multiple={multiple}
              onOptionClick={handleOptionClick}
            >
              {children}
            </SelectMenu>
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
