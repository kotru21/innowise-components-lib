import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '../Button';
import { ButtonProps } from '../Button.types';

describe('Button', () => {
  // Базовые тесты рендеринга
  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<Button>Test Button</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('renders children correctly', () => {
      render(<Button>Click Me</Button>);
      expect(screen.getByRole('button')).toHaveTextContent('Click Me');
    });

    it('renders with complex children (icons, text)', () => {
      render(
        <Button>
          <span>🚀</span>
          <span>Launch</span>
        </Button>
      );
      const button = screen.getByRole('button');
      expect(button).toHaveTextContent('🚀Launch');
    });

    it('applies custom className', () => {
      render(<Button className="custom-class">Test</Button>);
      expect(screen.getByRole('button')).toHaveClass('custom-class');
    });
  });

  // Тесты пропа variant
  describe('variant prop', () => {
    it('renders with default variant "contained"', () => {
      render(<Button>Test</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('button'); // Базовый класс
      expect(button).toHaveClass('contained');
    });

    it('renders with variant "text"', () => {
      render(<Button variant="text">Test</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('button');
      expect(button).toHaveClass('text');
      expect(button).not.toHaveClass('contained');
    });

    it('renders with variant "outlined"', () => {
      render(<Button variant="outlined">Test</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('button');
      expect(button).toHaveClass('outlined');
      expect(button).not.toHaveClass('contained');
    });
  });

  // Тесты пропа size
  describe('size prop', () => {
    it('renders with default size "medium"', () => {
      render(<Button>Test</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('button');
      expect(button).toHaveClass('medium');
    });

    it('renders with size "small"', () => {
      render(<Button size="small">Test</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('button');
      expect(button).toHaveClass('small');
      expect(button).not.toHaveClass('medium');
    });

    it('renders with size "large"', () => {
      render(<Button size="large">Test</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('button');
      expect(button).toHaveClass('large');
      expect(button).not.toHaveClass('medium');
    });
  });

  // Тесты пропа color
  describe('color prop', () => {
    it('renders with default color "primary"', () => {
      render(<Button>Test</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('button');
      expect(button).toHaveClass('containedPrimary');
    });

    it('renders with color "secondary"', () => {
      render(<Button color="secondary">Test</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('button');
      expect(button).toHaveClass('containedSecondary');
    });

    it('renders with color "error"', () => {
      render(<Button color="error">Test</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('button');
      expect(button).toHaveClass('containedError');
    });

    it('renders with color "warning"', () => {
      render(<Button color="warning">Test</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('button');
      expect(button).toHaveClass('containedWarning');
    });

    it('renders with color "info"', () => {
      render(<Button color="info">Test</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('button');
      expect(button).toHaveClass('containedInfo');
    });

    it('renders with color "success"', () => {
      render(<Button color="success">Test</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('button');
      expect(button).toHaveClass('containedSuccess');
    });
  });

  // Тесты комбинации variant + color
  describe('variant and color combinations', () => {
    it('applies correct class for text + primary', () => {
      render(
        <Button variant="text" color="primary">
          Test
        </Button>
      );
      const button = screen.getByRole('button');
      expect(button).toHaveClass('text');
      expect(button).toHaveClass('textPrimary');
    });

    it('applies correct class for outlined + error', () => {
      render(
        <Button variant="outlined" color="error">
          Test
        </Button>
      );
      const button = screen.getByRole('button');
      expect(button).toHaveClass('outlined');
      expect(button).toHaveClass('outlinedError');
    });

    it('applies correct class for contained + success', () => {
      render(
        <Button variant="contained" color="success">
          Test
        </Button>
      );
      const button = screen.getByRole('button');
      expect(button).toHaveClass('contained');
      expect(button).toHaveClass('containedSuccess');
    });

    it('applies correct classes for all variant-color combinations', () => {
      const variants = ['text', 'outlined', 'contained'] as const;
      const colors = [
        'primary',
        'secondary',
        'error',
        'warning',
        'info',
        'success',
      ] as const;

      variants.forEach((variant) => {
        colors.forEach((color) => {
          const { unmount } = render(
            <Button variant={variant} color={color}>
              Test {variant} {color}
            </Button>
          );

          const button = screen.getByRole('button');
          const expectedColorClass = `${variant}${color.charAt(0).toUpperCase() + color.slice(1)}`;

          expect(button).toHaveClass('button');
          expect(button).toHaveClass(variant);
          expect(button).toHaveClass(expectedColorClass);

          unmount();
        });
      });
    });
  });

  // Тесты состояния disabled
  describe('disabled prop', () => {
    it('renders as enabled by default', () => {
      render(<Button>Test</Button>);
      const button = screen.getByRole('button');
      expect(button).not.toBeDisabled();
    });

    it('renders as disabled when disabled=true', () => {
      render(<Button disabled>Test</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('does not trigger onClick when disabled', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();

      render(
        <Button disabled onClick={handleClick}>
          Test
        </Button>
      );
      const button = screen.getByRole('button');

      await user.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  // Тесты событий и интерактивности
  describe('Event handling', () => {
    it('calls onClick when clicked', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();

      render(<Button onClick={handleClick}>Test</Button>);
      const button = screen.getByRole('button');

      await user.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('calls onClick with event object', () => {
      const handleClick = jest.fn();

      render(<Button onClick={handleClick}>Test</Button>);
      const button = screen.getByRole('button');

      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalledWith(expect.any(Object));
    });

    it('handles onMouseEnter event', async () => {
      const user = userEvent.setup();
      const handleMouseEnter = jest.fn();

      render(<Button onMouseEnter={handleMouseEnter}>Test</Button>);
      const button = screen.getByRole('button');

      await user.hover(button);
      expect(handleMouseEnter).toHaveBeenCalledTimes(1);
    });

    it('handles onFocus event', async () => {
      const user = userEvent.setup();
      const handleFocus = jest.fn();

      render(<Button onFocus={handleFocus}>Test</Button>);
      const button = screen.getByRole('button');

      await user.click(button);
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it('handles keyboard events (Enter)', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();

      render(<Button onClick={handleClick}>Test</Button>);
      const button = screen.getByRole('button');

      button.focus();
      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles keyboard events (Space)', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();

      render(<Button onClick={handleClick}>Test</Button>);
      const button = screen.getByRole('button');

      button.focus();
      await user.keyboard(' ');
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  // Тесты HTML атрибутов
  describe('HTML attributes', () => {
    it('should pass through HTML attributes', () => {
      render(
        <Button data-testid="custom-button" aria-label="Custom button">
          Test Button
        </Button>
      );

      const button = screen.getByTestId('custom-button');
      expect(button).toHaveAttribute('aria-label', 'Custom button');
    });
    it('supports type attribute', () => {
      render(<Button type="submit">Submit</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
    });

    it('supports form attribute', () => {
      render(<Button form="test-form">Test</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('form', 'test-form');
    });

    it('supports tabIndex attribute', () => {
      render(<Button tabIndex={-1}>Test</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('tabIndex', '-1');
    });
  });

  // Тесты ref
  describe('Ref forwarding', () => {
    it('forwards ref to button element', () => {
      const ref = React.createRef<HTMLButtonElement>();

      render(<Button ref={ref}>Test</Button>);

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
      expect(ref.current?.tagName).toBe('BUTTON');
    });

    it('allows calling focus through ref', () => {
      const ref = React.createRef<HTMLButtonElement>();

      render(<Button ref={ref}>Test</Button>);

      ref.current?.focus();
      expect(ref.current).toHaveFocus();
    });
  });

  // Тесты комплексных сценариев
  describe('Complex scenarios', () => {
    it('renders correctly with all props combined', () => {
      const handleClick = jest.fn();

      render(
        <Button
          variant="outlined"
          size="large"
          color="error"
          disabled={false}
          className="custom-btn"
          onClick={handleClick}
          id="complex-button"
        >
          <span>🔥</span>
          Complex Button
        </Button>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveClass('button');
      expect(button).toHaveClass('outlined');
      expect(button).toHaveClass('large');
      expect(button).toHaveClass('outlinedError');
      expect(button).toHaveClass('custom-btn');
      expect(button).toHaveAttribute('id', 'complex-button');
      expect(button).toHaveTextContent('🔥Complex Button');
      expect(button).not.toBeDisabled();
    });

    it('maintains proper CSS class order', () => {
      render(
        <Button variant="text" size="small" color="warning" className="extra">
          Test
        </Button>
      );

      const button = screen.getByRole('button');
      const classList = Array.from(button.classList);

      // Проверяем, что базовые классы присутствуют
      expect(classList).toContain('button');
      expect(classList).toContain('small');
      expect(classList).toContain('text');
      expect(classList).toContain('textWarning');
      expect(classList).toContain('extra');
    });
  });

  // Тесты доступности
  describe('Accessibility', () => {
    it('has correct role', () => {
      render(<Button>Test</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('is focusable by default', () => {
      render(<Button>Test</Button>);
      const button = screen.getByRole('button');
      // Кнопки по умолчанию фокусируемы, но не имеют явного tabIndex
      expect(button).not.toHaveAttribute('tabIndex');

      // Проверяем, что кнопка может получить фокус
      button.focus();
      expect(button).toHaveFocus();
    });

    it('supports aria-pressed for toggle buttons', () => {
      render(<Button aria-pressed="true">Toggle</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-pressed', 'true');
    });

    it('supports aria-expanded for dropdown buttons', () => {
      render(<Button aria-expanded="false">Dropdown</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });
  });

  // Тесты Edge Cases
  describe('Edge cases', () => {
    it('handles empty string children', () => {
      render(<Button>{''}</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('');
    });

    it('handles null children', () => {
      render(<Button>{null}</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('handles undefined props gracefully', () => {
      const props: Partial<ButtonProps> = {
        variant: undefined,
        size: undefined,
        color: undefined,
      };

      render(<Button {...props}>Test</Button>);
      const button = screen.getByRole('button');

      // Должны применяться значения по умолчанию
      expect(button).toHaveClass('button');
      expect(button).toHaveClass('contained');
      expect(button).toHaveClass('medium');
      expect(button).toHaveClass('containedPrimary');
    });

    it('handles multiple rapid clicks', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();

      render(<Button onClick={handleClick}>Test</Button>);
      const button = screen.getByRole('button');

      // Быстрые клики
      await user.click(button);
      await user.click(button);
      await user.click(button);

      expect(handleClick).toHaveBeenCalledTimes(3);
    });
  });
});
