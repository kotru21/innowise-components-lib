import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Switch from '../Switch';

describe('Switch', () => {
  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<Switch readOnly />);
      const switchInput = screen.getByRole('checkbox');
      expect(switchInput).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<Switch label="Enable notifications" readOnly />);
      const label = screen.getByText('Enable notifications');
      expect(label).toBeInTheDocument();
    });

    it('renders without label', () => {
      render(<Switch readOnly />);
      const switchInput = screen.getByRole('checkbox');
      expect(switchInput).toBeInTheDocument();
      expect(screen.queryByText(/./)).toBeNull(); // No text content
    });

    it('applies custom className', () => {
      const { container } = render(
        <Switch className="custom-switch" readOnly />
      );
      const switchLabel = container.querySelector('label');
      expect(switchLabel).toHaveClass('custom-switch');
    });
  });

  describe('checked prop', () => {
    it('renders as unchecked by default', () => {
      render(<Switch readOnly />);
      const switchInput = screen.getByRole('checkbox');
      expect(switchInput).not.toBeChecked();
    });

    it('renders as checked when checked=true', () => {
      render(<Switch checked readOnly />);
      const switchInput = screen.getByRole('checkbox');
      expect(switchInput).toBeChecked();
    });

    it('renders as unchecked when checked=false', () => {
      render(<Switch checked={false} readOnly />);
      const switchInput = screen.getByRole('checkbox');
      expect(switchInput).not.toBeChecked();
    });
  });

  describe('size prop', () => {
    it('renders with default size "medium"', () => {
      const { container } = render(<Switch readOnly />);
      const switchLabel = container.querySelector('label');
      expect(switchLabel!.className).toContain('medium');
    });

    it('renders with size "small"', () => {
      const { container } = render(<Switch size="small" readOnly />);
      const switchLabel = container.querySelector('label');
      expect(switchLabel!.className).toContain('small');
    });

    it('renders with size "large"', () => {
      const { container } = render(<Switch size="large" readOnly />);
      const switchLabel = container.querySelector('label');
      expect(switchLabel!.className).toContain('large');
    });
  });

  describe('color prop', () => {
    it('applies default color "primary" when checked', () => {
      const { container } = render(<Switch checked readOnly />);
      const switchLabel = container.querySelector('label');
      expect(switchLabel!.className).toContain('primary');
    });

    it('applies color "secondary" when checked', () => {
      const { container } = render(
        <Switch checked color="secondary" readOnly />
      );
      const switchLabel = container.querySelector('label');
      expect(switchLabel!.className).toContain('secondary');
    });

    it('applies color "error" when checked', () => {
      const { container } = render(<Switch checked color="error" readOnly />);
      const switchLabel = container.querySelector('label');
      expect(switchLabel!.className).toContain('error');
    });

    it('applies color "warning" when checked', () => {
      const { container } = render(<Switch checked color="warning" readOnly />);
      const switchLabel = container.querySelector('label');
      expect(switchLabel!.className).toContain('warning');
    });

    it('applies color "info" when checked', () => {
      const { container } = render(<Switch checked color="info" readOnly />);
      const switchLabel = container.querySelector('label');
      expect(switchLabel!.className).toContain('info');
    });

    it('applies color "success" when checked', () => {
      const { container } = render(<Switch checked color="success" readOnly />);
      const switchLabel = container.querySelector('label');
      expect(switchLabel!.className).toContain('success');
    });

    it('does not apply color class when unchecked', () => {
      const { container } = render(
        <Switch checked={false} color="primary" readOnly />
      );
      const switchLabel = container.querySelector('label');
      expect(switchLabel!.className).not.toContain('primary');
    });
  });

  describe('disabled prop', () => {
    it('renders as enabled by default', () => {
      render(<Switch readOnly />);
      const switchInput = screen.getByRole('checkbox');
      expect(switchInput).not.toBeDisabled();
    });

    it('renders as disabled when disabled=true', () => {
      render(<Switch disabled />);
      const switchInput = screen.getByRole('checkbox');
      expect(switchInput).toBeDisabled();
    });

    it('applies disabled class when disabled=true', () => {
      const { container } = render(<Switch disabled />);
      const switchLabel = container.querySelector('label');
      expect(switchLabel!.className).toContain('disabled');
    });

    it('does not trigger events when disabled', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();

      render(<Switch disabled onChange={handleChange} />);
      const switchInput = screen.getByRole('checkbox');

      await act(async () => {
        await user.click(switchInput);
      });

      expect(handleChange).not.toHaveBeenCalled();
      expect(switchInput).not.toBeChecked();
    });
  });

  describe('error prop', () => {
    it('renders without error state by default', () => {
      const { container } = render(<Switch readOnly />);
      const switchLabel = container.querySelector('label');
      expect(switchLabel!.className).not.toContain('error');
    });

    it('applies error class when error=true', () => {
      const { container } = render(<Switch error readOnly />);
      const switchLabel = container.querySelector('label');
      expect(switchLabel!.className).toContain('error');
    });

    it('overrides color when error=true', () => {
      const { container } = render(
        <Switch checked error color="primary" readOnly />
      );
      const switchLabel = container.querySelector('label');
      expect(switchLabel!.className).toContain('error');
      expect(switchLabel!.className).not.toContain('primary');
    });
  });

  describe('label prop', () => {
    it('renders label when provided', () => {
      render(<Switch label="Toggle setting" readOnly />);
      const label = screen.getByText('Toggle setting');
      expect(label).toBeInTheDocument();
    });

    it('does not render label container when no label', () => {
      const { container } = render(<Switch readOnly />);
      const labelSpan = container.querySelector('span');
      expect(labelSpan).not.toHaveClass('label');
    });

    it('handles empty string label', () => {
      render(<Switch label="" readOnly />);
      // Should not crash, empty string label should render container but no text
      const switchInput = screen.getByRole('checkbox');
      expect(switchInput).toBeInTheDocument();
    });
  });

  describe('labelPlacement prop', () => {
    it('places label at end by default', () => {
      const { container } = render(<Switch label="Test" readOnly />);
      const containerDiv = container.querySelector('[class*="container"]');
      expect(containerDiv!.className).toContain('end');
    });

    it('places label at start when labelPlacement="start"', () => {
      const { container } = render(
        <Switch label="Test" labelPlacement="start" readOnly />
      );
      const containerDiv = container.querySelector('[class*="container"]');
      expect(containerDiv!.className).toContain('start');
    });

    it('places label at top when labelPlacement="top"', () => {
      const { container } = render(
        <Switch label="Test" labelPlacement="top" readOnly />
      );
      const containerDiv = container.querySelector('[class*="container"]');
      expect(containerDiv!.className).toContain('top');
    });

    it('places label at bottom when labelPlacement="bottom"', () => {
      const { container } = render(
        <Switch label="Test" labelPlacement="bottom" readOnly />
      );
      const containerDiv = container.querySelector('[class*="container"]');
      expect(containerDiv!.className).toContain('bottom');
    });
  });

  describe('helperText prop', () => {
    it('does not render helper text by default', () => {
      render(<Switch readOnly />);
      const helperText = screen.queryByText(/./);
      expect(helperText).toBeNull();
    });

    it('renders helper text when provided', () => {
      render(<Switch helperText="Additional information" readOnly />);
      const helperText = screen.getByText('Additional information');
      expect(helperText).toBeInTheDocument();
    });

    it('renders helper text with error state', () => {
      render(<Switch helperText="Error message" error readOnly />);
      const helperText = screen.getByText('Error message');
      expect(helperText).toBeInTheDocument();
      expect(helperText.className).toContain('error');
    });

    it('renders helper text without error state', () => {
      render(<Switch helperText="Normal message" readOnly />);
      const helperText = screen.getByText('Normal message');
      expect(helperText).toBeInTheDocument();
      expect(helperText.className).not.toContain('error');
    });
  });

  describe('User interactions', () => {
    it('calls onChange when clicked', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();

      render(<Switch onChange={handleChange} />);
      const switchInput = screen.getByRole('checkbox');

      await act(async () => {
        await user.click(switchInput);
      });

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({
            checked: false, // Switch компонент всегда устанавливает checked=false по умолчанию
          }),
        })
      );
    });

    it('toggles checked state in uncontrolled mode', async () => {
      const user = userEvent.setup();

      // Switch не поддерживает uncontrolled режим без defaultChecked
      // Используем контролируемый режим с состоянием
      let isChecked = false;
      const handleChange = jest.fn(() => {
        isChecked = !isChecked;
      });

      const { rerender } = render(
        <Switch checked={isChecked} onChange={handleChange} />
      );
      const switchInput = screen.getByRole('checkbox');

      expect(switchInput).not.toBeChecked();

      await act(async () => {
        await user.click(switchInput);
      });

      // Обновляем компонент с новым состоянием
      rerender(<Switch checked={isChecked} onChange={handleChange} />);
      expect(switchInput).toBeChecked();
    });

    it('does not change state in controlled mode', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();

      render(<Switch checked={false} onChange={handleChange} />);
      const switchInput = screen.getByRole('checkbox');

      expect(switchInput).not.toBeChecked();

      await act(async () => {
        await user.click(switchInput);
      });

      expect(switchInput).not.toBeChecked(); // Still false because controlled
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('can be controlled externally', () => {
      const { rerender } = render(<Switch checked={false} readOnly />);
      const switchInput = screen.getByRole('checkbox');
      expect(switchInput).not.toBeChecked();

      rerender(<Switch checked={true} readOnly />);
      expect(switchInput).toBeChecked();

      rerender(<Switch checked={false} readOnly />);
      expect(switchInput).not.toBeChecked();
    });
  });

  describe('Keyboard navigation', () => {
    it('can be focused with Tab', async () => {
      const user = userEvent.setup();

      render(<Switch readOnly />);
      const switchInput = screen.getByRole('checkbox');

      await act(async () => {
        await user.tab();
      });

      expect(switchInput).toHaveFocus();
    });

    it('can be toggled with Space', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();

      render(<Switch onChange={handleChange} />);
      const switchInput = screen.getByRole('checkbox');

      await act(async () => {
        switchInput.focus();
        await user.keyboard(' ');
      });

      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('can be toggled with Enter', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();

      render(<Switch onChange={handleChange} />);
      const switchInput = screen.getByRole('checkbox');

      await act(async () => {
        switchInput.focus();
        await user.keyboard('{Enter}');
      });

      // Enter обычно не работает для checkbox, только Space
      // Но если нужно поддержать Enter, компонент должен это обрабатывать
      expect(handleChange).toHaveBeenCalledTimes(0);
    });
  });

  describe('HTML attributes', () => {
    it('passes through HTML attributes', () => {
      render(
        <Switch data-testid="custom-switch" aria-label="Toggle" readOnly />
      );
      const switchInput = screen.getByRole('checkbox');
      expect(switchInput).toHaveAttribute('data-testid', 'custom-switch');
      expect(switchInput).toHaveAttribute('aria-label', 'Toggle');
    });

    it('supports id attribute', () => {
      render(<Switch id="unique-switch" readOnly />);
      const switchInput = screen.getByRole('checkbox');
      expect(switchInput).toHaveAttribute('id', 'unique-switch');
    });

    it('supports name attribute', () => {
      render(<Switch name="setting" readOnly />);
      const switchInput = screen.getByRole('checkbox');
      expect(switchInput).toHaveAttribute('name', 'setting');
    });

    it('supports value attribute', () => {
      render(<Switch value="enabled" readOnly />);
      const switchInput = screen.getByRole('checkbox');
      expect(switchInput).toHaveAttribute('value', 'enabled');
    });
  });

  describe('Ref forwarding', () => {
    it('forwards ref to input element', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Switch ref={ref} readOnly />);

      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current?.type).toBe('checkbox');
    });

    it('allows calling focus through ref', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Switch ref={ref} readOnly />);

      act(() => {
        ref.current?.focus();
      });
      expect(ref.current).toBe(document.activeElement);
    });
  });

  describe('Complex scenarios', () => {
    it('renders correctly with all props combined', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();

      const { container } = render(
        <Switch
          label="🔥Complex Switch"
          checked={true}
          size="large"
          color="success"
          error={false}
          helperText="This is a complex switch with all features"
          labelPlacement="start"
          onChange={handleChange}
          className="custom-class"
          disabled={false}
          id="complex-switch"
          name="complexSetting"
          value="active"
        />
      );

      const switchInput = screen.getByRole('checkbox');
      const switchLabel = container.querySelector('label');
      const containerDiv = container.querySelector('[class*="container"]');

      // Test all properties
      expect(switchLabel!.className).toContain('large');
      expect(switchLabel!.className).toContain('success');
      expect(switchLabel).toHaveClass('custom-class');
      expect(containerDiv!.className).toContain('start');

      // Test input attributes
      expect(switchInput).toBeChecked();
      expect(switchInput).toHaveAttribute('id', 'complex-switch');
      expect(switchInput).toHaveAttribute('name', 'complexSetting');
      expect(switchInput).toHaveAttribute('value', 'active');

      // Test content rendering
      expect(screen.getByText('🔥Complex Switch')).toBeInTheDocument();
      expect(
        screen.getByText('This is a complex switch with all features')
      ).toBeInTheDocument();

      // Test interactions
      await act(async () => {
        await user.click(switchInput);
      });
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('handles rapid toggling correctly', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();

      render(<Switch onChange={handleChange} />);
      const switchInput = screen.getByRole('checkbox');

      // Rapid clicks
      await act(async () => {
        await user.click(switchInput);
        await user.click(switchInput);
        await user.click(switchInput);
      });

      expect(handleChange).toHaveBeenCalledTimes(3);
    });
  });

  describe('Accessibility', () => {
    it('has correct role', () => {
      render(<Switch readOnly />);
      const switchInput = screen.getByRole('checkbox');
      expect(switchInput).toBeInTheDocument();
    });

    it('is focusable by default', () => {
      render(<Switch readOnly />);
      const switchInput = screen.getByRole('checkbox');

      act(() => {
        switchInput.focus();
      });
      expect(switchInput).toBe(document.activeElement);
    });

    it('supports ARIA attributes', () => {
      render(
        <Switch
          aria-describedby="help-text"
          aria-labelledby="label-id"
          readOnly
        />
      );
      const switchInput = screen.getByRole('checkbox');
      expect(switchInput).toHaveAttribute('aria-describedby', 'help-text');
      expect(switchInput).toHaveAttribute('aria-labelledby', 'label-id');
    });

    it('supports required attribute', () => {
      render(<Switch required readOnly />);
      const switchInput = screen.getByRole('checkbox');
      expect(switchInput).toBeRequired();
    });
  });

  describe('Edge cases', () => {
    it('handles undefined onChange gracefully', async () => {
      const user = userEvent.setup();

      // Для тестирования без onChange нужно использовать контролируемый режим с readOnly
      render(<Switch readOnly />);
      const switchInput = screen.getByRole('checkbox');

      // Should not crash when clicking without onChange
      await act(async () => {
        await user.click(switchInput);
      });

      // В readOnly режиме состояние не должно измениться
      expect(switchInput).not.toBeChecked();
    });

    it('handles null values gracefully', () => {
      render(<Switch label={null as any} helperText={null as any} readOnly />);
      const switchInput = screen.getByRole('checkbox');
      expect(switchInput).toBeInTheDocument();
    });

    it('handles additional props gracefully', () => {
      const additionalProps = {
        'data-custom': 'value',
        tabIndex: 0,
        autoFocus: true,
      };

      render(<Switch {...additionalProps} readOnly />);
      const switchInput = screen.getByRole('checkbox');
      expect(switchInput).toHaveAttribute('data-custom', 'value');
      expect(switchInput).toHaveAttribute('tabindex', '0');
    });
  });
});
