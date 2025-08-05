import '@testing-library/jest-dom';

// Расширяем типы Jest для кастомных матчеров
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveClass(className: string): R;
      toHaveStyle(style: string | Record<string, any>): R;
      toBeVisible(): R;
      toBeDisabled(): R;
      toBeRequired(): R;
      toHaveAttribute(attr: string, value?: string): R;
      toHaveValue(value?: string | number | string[]): R;
      toHaveFocus(): R;
    }
  }
}
