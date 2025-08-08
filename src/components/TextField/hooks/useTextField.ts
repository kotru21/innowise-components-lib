import { useCallback, useMemo, useState } from 'react';
import { TextFieldProps } from '../TextField.types';

export interface UseTextFieldOptions {
  value?: string | number | readonly string[];
  defaultValue?: string | number | readonly string[];
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  controlled?: boolean;
}

export interface UseTextFieldReturn {
  // State values
  internalValue: string;
  isFocused: boolean;

  // Computed values
  currentValue: string;
  shouldShrinkLabel: boolean;

  // Event handlers
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFocus: (event: React.FocusEvent<HTMLInputElement>) => void;
  handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export function useTextField(options: UseTextFieldOptions): UseTextFieldReturn {
  const {
    value,
    defaultValue = '',
    onChange,
    onFocus,
    onBlur,
    controlled = value !== undefined,
  } = options;

  // Convert values to strings for internal state
  const normalizedDefaultValue = String(defaultValue);

  // Internal state for uncontrolled mode
  const [internalValue, setInternalValue] = useState(normalizedDefaultValue);
  const [isFocused, setIsFocused] = useState(false);

  // Current value (controlled vs uncontrolled)
  const currentValue = useMemo(() => {
    return controlled ? String(value ?? '') : internalValue;
  }, [controlled, value, internalValue]);

  // Determine if label should shrink
  const shouldShrinkLabel = useMemo(() => {
    return isFocused || currentValue.length > 0;
  }, [isFocused, currentValue]);

  // Change handler
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;

      if (!controlled) {
        setInternalValue(newValue);
      }

      onChange?.(event);
    },
    [controlled, onChange]
  );

  // Focus handler
  const handleFocus = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(event);
    },
    [onFocus]
  );

  // Blur handler
  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(event);
    },
    [onBlur]
  );

  return {
    // State values
    internalValue,
    isFocused,

    // Computed values
    currentValue,
    shouldShrinkLabel,

    // Event handlers
    handleChange,
    handleFocus,
    handleBlur,
  };
}
