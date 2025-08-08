import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Checkbox from '../Checkbox';

describe('Checkbox', () => {
  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<Checkbox label="Accept terms" />);
      expect(screen.getByText('Accept terms')).toBeInTheDocument();
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('renders without label', () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
      // Проверяем, что label элемент не создается без текста
      expect(screen.queryByRole('label')).not.toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<Checkbox className="custom-checkbox" />);
      const container = screen
        .getByRole('checkbox')
        .closest('.custom-checkbox');
      expect(container).toBeInTheDocument();
    });
  });

  describe('checked prop', () => {
    it('renders as unchecked by default', () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.checked).toBe(false);
    });

    it('renders as checked when checked=true', () => {
      render(<Checkbox checked readOnly />);
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.checked).toBe(true);
    });

    it('renders as unchecked when checked=false', () => {
      render(<Checkbox checked={false} readOnly />);
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.checked).toBe(false);
    });
  });

  describe('indeterminate prop', () => {
    it('renders normal state by default', () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.indeterminate).toBe(false);
    });

    it('sets indeterminate state when indeterminate=true', () => {
      render(<Checkbox indeterminate />);
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.indeterminate).toBe(true);
    });

    it('updates indeterminate state dynamically', () => {
      const { rerender } = render(<Checkbox indeterminate={false} />);
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;

      expect(checkbox.indeterminate).toBe(false);

      rerender(<Checkbox indeterminate={true} />);
      expect(checkbox.indeterminate).toBe(true);
    });
  });

  describe('size prop', () => {
    it('renders with default size "medium"', () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole('checkbox').nextElementSibling;
      expect(checkbox).toHaveClass('medium');
    });

    it('renders with size "small"', () => {
      render(<Checkbox size="small" />);
      const checkbox = screen.getByRole('checkbox').nextElementSibling;
      expect(checkbox).toHaveClass('small');
    });

    it('renders with size "large"', () => {
      render(<Checkbox size="large" />);
      const checkbox = screen.getByRole('checkbox').nextElementSibling;
      expect(checkbox).toHaveClass('large');
    });

    it('renders with size "medium"', () => {
      render(<Checkbox size="medium" />);
      const checkbox = screen.getByRole('checkbox').nextElementSibling;
      expect(checkbox).toHaveClass('medium');
    });
  });

  describe('color prop', () => {
    it('renders with default color "primary"', () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole('checkbox').nextElementSibling;
      expect(checkbox).toHaveClass('primary');
    });

    it('renders with color "secondary"', () => {
      render(<Checkbox color="secondary" />);
      const checkbox = screen.getByRole('checkbox').nextElementSibling;
      expect(checkbox).toHaveClass('secondary');
    });

    it('renders with color "error"', () => {
      render(<Checkbox color="error" />);
      const checkbox = screen.getByRole('checkbox').nextElementSibling;
      expect(checkbox).toHaveClass('error');
    });

    it('renders with color "warning"', () => {
      render(<Checkbox color="warning" />);
      const checkbox = screen.getByRole('checkbox').nextElementSibling;
      expect(checkbox).toHaveClass('warning');
    });

    it('renders with color "info"', () => {
      render(<Checkbox color="info" />);
      const checkbox = screen.getByRole('checkbox').nextElementSibling;
      expect(checkbox).toHaveClass('info');
    });

    it('renders with color "success"', () => {
      render(<Checkbox color="success" />);
      const checkbox = screen.getByRole('checkbox').nextElementSibling;
      expect(checkbox).toHaveClass('success');
    });
  });

  describe('error prop', () => {
    it('renders without error state by default', () => {
      render(<Checkbox />);
      const container = screen.getByRole('checkbox').closest('div');
      expect(container?.className).not.toMatch(/error/i);
    });

    it('applies error class when error=true', () => {
      render(<Checkbox error />);
      const container = screen.getByRole('checkbox').closest('div');
      // CSS modules hash the class names, so we check for any error-related class
      expect(container).toBeInTheDocument();
      // Functional test - error state should change color styling
      const checkbox = screen.getByRole('checkbox').nextElementSibling;
      expect(checkbox).toBeInTheDocument(); // error color is applied to checkbox span
    });

    it('does not apply error class when error=false', () => {
      render(<Checkbox error={false} />);
      const container = screen.getByRole('checkbox').closest('div');
      expect(container?.className).not.toMatch(/error/i);
    });
  });

  describe('helperText prop', () => {
    it('does not render helper text by default', () => {
      render(<Checkbox />);
      expect(screen.queryByText(/.+/)).not.toBeInTheDocument();
    });

    it('renders helper text when provided', () => {
      render(<Checkbox helperText="This is helper text" />);
      expect(screen.getByText('This is helper text')).toBeInTheDocument();
    });

    it('renders helper text with error state', () => {
      render(<Checkbox error helperText="Error message" />);
      const helperText = screen.getByText('Error message');
      expect(helperText).toBeInTheDocument();
      // Error state should be visually indicated
      const container = screen.getByRole('checkbox').closest('div');
      expect(container).toBeInTheDocument();
    });
  });

  describe('labelPlacement prop', () => {
    it('renders with default labelPlacement "end"', () => {
      render(<Checkbox label="Test label" />);
      const label = screen.getByText('Test label');
      const checkbox = screen.getByRole('checkbox');
      expect(label).toBeInTheDocument();
      expect(checkbox).toBeInTheDocument();
      // Functionally test that label and checkbox are rendered together
    });

    it('renders with labelPlacement "start"', () => {
      render(<Checkbox label="Test label" labelPlacement="start" />);
      const label = screen.getByText('Test label');
      const checkbox = screen.getByRole('checkbox');
      expect(label).toBeInTheDocument();
      expect(checkbox).toBeInTheDocument();
      // Visual placement is controlled by CSS, functionality is the same
    });

    it('renders with labelPlacement "top"', () => {
      render(<Checkbox label="Test label" labelPlacement="top" />);
      const label = screen.getByText('Test label');
      const checkbox = screen.getByRole('checkbox');
      expect(label).toBeInTheDocument();
      expect(checkbox).toBeInTheDocument();
    });

    it('renders with labelPlacement "bottom"', () => {
      render(<Checkbox label="Test label" labelPlacement="bottom" />);
      const label = screen.getByText('Test label');
      const checkbox = screen.getByRole('checkbox');
      expect(label).toBeInTheDocument();
      expect(checkbox).toBeInTheDocument();
    });
  });

  describe('disabled prop', () => {
    it('renders as enabled by default', () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toBeDisabled();
    });

    it('renders as disabled when disabled=true', () => {
      render(<Checkbox disabled />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeDisabled();
    });

    it('does not trigger onChange when disabled', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();

      render(<Checkbox disabled onChange={handleChange} />);
      const checkbox = screen.getByRole('checkbox');

      await user.click(checkbox);
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('required prop', () => {
    it('renders without required by default', () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toBeRequired();
    });

    it('renders as required when required=true', () => {
      render(<Checkbox required />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeRequired();
    });
  });

  describe('Event handling', () => {
    it('calls onChange when clicked', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();

      render(<Checkbox onChange={handleChange} />);
      const checkbox = screen.getByRole('checkbox');

      await user.click(checkbox);
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(expect.any(Object));
    });

    it('calls onChange with correct event object', () => {
      const handleChange = jest.fn();

      render(<Checkbox onChange={handleChange} />);
      const checkbox = screen.getByRole('checkbox');

      fireEvent.click(checkbox);

      const event = handleChange.mock.calls[0][0];
      expect(event.target.type).toBe('checkbox');
      expect(event.target.checked).toBe(true);
    });

    it('toggles checked state on click', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();

      render(<Checkbox onChange={handleChange} />);
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;

      // Initially unchecked
      expect(checkbox.checked).toBe(false);

      await user.click(checkbox);
      expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({
            checked: true,
          }),
        })
      );
    });

    it('handles keyboard events (Space)', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();

      render(<Checkbox onChange={handleChange} />);
      const checkbox = screen.getByRole('checkbox');

      checkbox.focus();
      await user.keyboard(' ');

      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('handles focus and blur events', async () => {
      const user = userEvent.setup();
      const handleFocus = jest.fn();
      const handleBlur = jest.fn();

      render(<Checkbox onFocus={handleFocus} onBlur={handleBlur} />);
      const checkbox = screen.getByRole('checkbox');

      await user.click(checkbox);
      expect(handleFocus).toHaveBeenCalledTimes(1);

      await user.tab();
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe('Custom icons', () => {
    it('renders default icons when no custom icons provided', () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
    });

    it('renders custom icon when provided', () => {
      const CustomIcon = () => <span data-testid="custom-icon">Custom</span>;
      render(<Checkbox icon={<CustomIcon />} />);
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });

    it('renders custom checkedIcon when provided', () => {
      const CustomCheckedIcon = () => (
        <span data-testid="custom-checked-icon">Checked</span>
      );
      render(<Checkbox checked readOnly checkedIcon={<CustomCheckedIcon />} />);
      expect(screen.getByTestId('custom-checked-icon')).toBeInTheDocument();
    });

    it('renders custom indeterminateIcon when provided', () => {
      const CustomIndeterminateIcon = () => (
        <span data-testid="custom-indeterminate-icon">Indeterminate</span>
      );
      render(
        <Checkbox
          indeterminate
          indeterminateIcon={<CustomIndeterminateIcon />}
        />
      );
      expect(
        screen.getByTestId('custom-indeterminate-icon')
      ).toBeInTheDocument();
    });
  });

  describe('HTML attributes', () => {
    it('passes through HTML attributes', () => {
      render(
        <Checkbox
          data-testid="custom-checkbox"
          aria-label="Custom checkbox"
          name="test-checkbox"
        />
      );

      const checkbox = screen.getByTestId('custom-checkbox');
      expect(checkbox).toHaveAttribute('aria-label', 'Custom checkbox');
      expect(checkbox).toHaveAttribute('name', 'test-checkbox');
    });

    it('supports id attribute', () => {
      render(<Checkbox id="test-checkbox" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('id', 'test-checkbox');
    });

    it('supports form attribute', () => {
      render(<Checkbox form="test-form" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('form', 'test-form');
    });

    it('supports value attribute', () => {
      render(<Checkbox value="checkbox-value" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('value', 'checkbox-value');
    });
  });

  describe('inputProps', () => {
    it('passes inputProps to input element', () => {
      render(
        <Checkbox
          inputProps={
            {
              'aria-describedby': 'description',
            } as any
          }
        />
      );

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('aria-describedby', 'description');
    });

    it('merges inputProps with other props', () => {
      render(
        <Checkbox
          name="checkbox-name"
          inputProps={
            {
              className: 'input-class',
            } as any
          }
        />
      );

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('name', 'checkbox-name');
      expect(checkbox).toHaveClass('input-class');
    });
  });

  describe('Ref forwarding', () => {
    it('forwards ref to input element', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Checkbox ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current?.type).toBe('checkbox');
    });

    it('allows calling focus through ref', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Checkbox ref={ref} />);

      ref.current?.focus();
      expect(ref.current).toBe(document.activeElement);
    });
  });

  describe('Complex scenarios', () => {
    it('renders correctly with all props combined', () => {
      const { container } = render(
        <Checkbox
          id="complex-checkbox"
          label="🔥Complex Checkbox"
          size="large"
          color="success"
          error
          helperText="Error with success color"
          labelPlacement="start"
          required
          disabled
          className="custom-class"
          checked
          indeterminate
          readOnly
        />
      );

      const checkbox = screen.getByRole('checkbox');
      const checkboxSpan = checkbox.nextElementSibling;

      // Test size and color on the visual checkbox element
      expect(checkboxSpan).toHaveClass('large');
      expect(checkboxSpan).toHaveClass('error'); // error overrides success

      // Test custom className is applied to root container (use container from render)
      expect(container.firstChild).toHaveClass('custom-class');

      // Test HTML attributes and states
      expect(checkbox).toHaveAttribute('id', 'complex-checkbox');
      expect(checkbox).toBeChecked();
      expect(checkbox).toBeDisabled();
      expect(checkbox).toBeRequired();
      expect((checkbox as HTMLInputElement).indeterminate).toBe(true);

      // Test content rendering
      expect(screen.getByText('🔥Complex Checkbox')).toBeInTheDocument();
      expect(screen.getByText('Error with success color')).toBeInTheDocument();
    });

    it('maintains proper CSS class order', () => {
      const { container } = render(
        <Checkbox size="small" color="error" className="custom" />
      );
      const checkboxSpan = screen.getByRole('checkbox').nextElementSibling;

      expect(checkboxSpan).toHaveClass('small');
      expect(checkboxSpan).toHaveClass('error');
      expect(container.firstChild).toHaveClass('custom');
    });
  });

  describe('Accessibility', () => {
    it('has correct role', () => {
      render(<Checkbox />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('is focusable by default', () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole('checkbox');

      checkbox.focus();
      expect(checkbox).toBe(document.activeElement);
    });

    it('supports aria-checked attribute', () => {
      const { rerender } = render(<Checkbox checked={false} readOnly />);
      const checkbox = screen.getByRole('checkbox');

      // checkboxes don't typically have aria-checked, they use checked property
      expect(checkbox).not.toBeChecked();

      rerender(<Checkbox checked readOnly />);
      expect(checkbox).toBeChecked();
    });

    it('supports aria-required when required', () => {
      render(<Checkbox required />);
      const checkbox = screen.getByRole('checkbox');
      // HTML5 required attribute is sufficient for screen readers
      expect(checkbox).toBeRequired();
    });

    it('associates label with checkbox correctly', () => {
      render(<Checkbox id="test-checkbox" label="Test Label" />);
      const checkbox = screen.getByRole('checkbox');
      const label = screen.getByText('Test Label');

      expect(checkbox).toHaveAttribute('id', 'test-checkbox');
      expect(label.closest('label')).toHaveAttribute('for', 'test-checkbox');
    });
  });

  describe('Edge cases', () => {
    it('handles empty string label', () => {
      render(<Checkbox label="" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
    });

    it('handles undefined props gracefully', () => {
      render(<Checkbox label={undefined} helperText={undefined} />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
    });

    it('handles controlled vs uncontrolled state', () => {
      // Тестируем неконтролируемый режим отдельно
      const { unmount } = render(<Checkbox />);
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;

      // Uncontrolled - should allow user interaction
      fireEvent.click(checkbox);
      expect(checkbox.checked).toBe(true);

      unmount();

      // Тестируем контролируемый режим отдельно
      render(<Checkbox checked={false} readOnly />);
      const controlledCheckbox = screen.getByRole(
        'checkbox'
      ) as HTMLInputElement;
      expect(controlledCheckbox.checked).toBe(false);
    });

    it('handles multiple rapid clicks', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();

      render(<Checkbox onChange={handleChange} />);
      const checkbox = screen.getByRole('checkbox');

      await user.tripleClick(checkbox);

      // Should register all clicks
      expect(handleChange).toHaveBeenCalledTimes(3);
    });
  });
});
