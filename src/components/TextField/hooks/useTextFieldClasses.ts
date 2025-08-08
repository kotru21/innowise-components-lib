import { useMemo } from 'react';
import { TextFieldProps } from '../TextField.types';
import styles from '../TextField.module.css';

export interface UseTextFieldClassesOptions {
  variant: TextFieldProps['variant'];
  size: TextFieldProps['size'];
  fullWidth: boolean;
  disabled: boolean;
  error: boolean;
  required: boolean;
  isFocused: boolean;
  shouldShrinkLabel: boolean;
  hasLabel: boolean;
  className?: string;
}

export interface UseTextFieldClassesReturn {
  rootClasses: string;
  inputContainerClasses: string;
  inputClasses: string;
  labelClasses: string;
  helperTextClasses: string;
}

export function useTextFieldClasses(
  options: UseTextFieldClassesOptions
): UseTextFieldClassesReturn {
  const {
    variant,
    size,
    fullWidth,
    disabled,
    error,
    required,
    isFocused,
    shouldShrinkLabel,
    hasLabel,
    className,
  } = options;

  const rootClasses = useMemo(() => {
    const classes = [styles.textFieldRoot];

    if (fullWidth) {
      classes.push(styles.fullWidth);
    }

    if (className) {
      classes.push(className);
    }

    return classes.join(' ');
  }, [fullWidth, className]);

  const inputContainerClasses = useMemo(() => {
    const classes = [styles.inputContainer];

    // Variant classes
    if (variant && styles[variant as keyof typeof styles]) {
      classes.push(styles[variant as keyof typeof styles]);
    }

    // State classes
    const variantDisabledKey = `${variant}Disabled` as keyof typeof styles;
    const variantErrorKey = `${variant}Error` as keyof typeof styles;
    const variantFocusedKey = `${variant}Focused` as keyof typeof styles;

    if (disabled && styles[variantDisabledKey]) {
      classes.push(styles[variantDisabledKey]);
    } else if (error && styles[variantErrorKey]) {
      classes.push(styles[variantErrorKey]);
    } else if (isFocused && styles[variantFocusedKey]) {
      classes.push(styles[variantFocusedKey]);
    }

    // Size classes
    if (size === 'small') {
      const variantSmallKey = `${variant}Small` as keyof typeof styles;
      const variantFocusedSmallKey =
        `${variant}FocusedSmall` as keyof typeof styles;

      if (styles[variantSmallKey]) {
        classes.push(styles[variantSmallKey]);
      }

      if (isFocused && styles[variantFocusedSmallKey]) {
        classes.push(styles[variantFocusedSmallKey]);
      }
    }

    return classes.join(' ');
  }, [variant, disabled, error, isFocused, size]);

  const inputClasses = useMemo(() => {
    const classes = [styles.input];

    if (size === 'small') {
      classes.push(styles.inputSmall);
    }

    return classes.join(' ');
  }, [size]);

  const labelClasses = useMemo(() => {
    const classes = [styles.label];

    // State classes
    if (disabled) {
      classes.push(styles.labelDisabled);
    } else if (error) {
      classes.push(styles.labelError);
    } else if (isFocused) {
      classes.push(styles.labelFocused);
    }

    // Shrink state
    if (shouldShrinkLabel) {
      classes.push(styles.labelShrunk);
    }

    // Required state
    if (required) {
      classes.push(styles.labelRequired);
    }

    // Size classes
    if (size === 'small') {
      classes.push(styles.labelSmall);
    }

    return classes.join(' ');
  }, [disabled, error, isFocused, shouldShrinkLabel, required, size]);

  const helperTextClasses = useMemo(() => {
    const classes = [styles.helperText];

    if (disabled) {
      classes.push(styles.helperTextDisabled);
    } else if (error) {
      classes.push(styles.helperTextError);
    }

    return classes.join(' ');
  }, [disabled, error]);

  return {
    rootClasses,
    inputContainerClasses,
    inputClasses,
    labelClasses,
    helperTextClasses,
  };
}
