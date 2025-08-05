import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TextField from '../TextField';

describe('TextField', () => {
  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<TextField />);
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<TextField label="Full Name" />);
      expect(screen.getByText('Full Name')).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('renders without label', () => {
      render(<TextField />);
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
      // No label element should be present
      expect(screen.queryByRole('label')).not.toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<TextField className="custom-textfield" />);
      expect(container.firstChild).toHaveClass('custom-textfield');
    });
  });

  describe('label prop', () => {
    it('renders label when provided', () => {
      render(<TextField label="Email Address" />);
      const label = screen.getByText('Email Address');
      expect(label).toBeInTheDocument();
      expect(label.tagName).toBe('LABEL');
    });

    it('associates label with input correctly', () => {
      render(<TextField label="Username" />);
      const input = screen.getByRole('textbox');
      const label = screen.getByText('Username');

      const inputId = input.getAttribute('id');
      expect(inputId).toBeTruthy();
      expect(label).toHaveAttribute('for', inputId!);
    });

    it('handles empty string label', () => {
      render(<TextField label="" />);
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
    });
  });

  describe('variant prop', () => {
    it('renders with default variant "outlined"', () => {
      const { container } = render(<TextField />);
      const inputContainer = container.querySelector(
        '[class*="inputContainer"]'
      );
      expect(inputContainer!.className).toContain('outlined');
    });

    it('renders with variant "filled"', () => {
      const { container } = render(<TextField variant="filled" />);
      const inputContainer = container.querySelector(
        '[class*="inputContainer"]'
      );
      expect(inputContainer!.className).toContain('filled');
    });

    it('renders with variant "standard"', () => {
      const { container } = render(<TextField variant="standard" />);
      const inputContainer = container.querySelector(
        '[class*="inputContainer"]'
      );
      expect(inputContainer!.className).toContain('standard');
    });

    it('renders with variant "outlined"', () => {
      const { container } = render(<TextField variant="outlined" />);
      const inputContainer = container.querySelector(
        '[class*="inputContainer"]'
      );
      expect(inputContainer!.className).toContain('outlined');
    });
  });

  describe('size prop', () => {
    it('renders with default size "medium"', () => {
      const { container } = render(<TextField />);
      const input = container.querySelector('input');
      // Medium size has default padding, small size has different padding
      const computedStyle = window.getComputedStyle(input!);
      expect(computedStyle.padding).not.toBe('8.5px 14px'); // small size padding
    });

    it('renders with size "small"', () => {
      const { container } = render(<TextField size="small" />);
      const input = container.querySelector('input');
      expect(input!.className).toContain('Small');
    });

    it('renders with size "medium"', () => {
      const { container } = render(<TextField size="medium" />);
      const input = container.querySelector('input');
      // Medium is default, so it should not have small class
      expect(input!.className).not.toContain('Small');
    });
  });

  describe('fullWidth prop', () => {
    it('renders without fullWidth by default', () => {
      const { container } = render(<TextField />);
      const rootElement = container.firstChild;
      expect(rootElement).not.toHaveClass('fullWidth');
    });

    it('applies fullWidth class when fullWidth=true', () => {
      const { container } = render(<TextField fullWidth />);
      const rootElement = container.firstChild;
      expect(rootElement).toHaveClass('fullWidth');
    });

    it('does not apply fullWidth class when fullWidth=false', () => {
      const { container } = render(<TextField fullWidth={false} />);
      const rootElement = container.firstChild;
      expect(rootElement).not.toHaveClass('fullWidth');
    });
  });

  describe('error prop', () => {
    it('renders without error state by default', () => {
      const { container } = render(<TextField />);
      const rootElement = container.firstChild;
      expect(rootElement).not.toHaveClass('error');
    });

    it('applies error class when error=true', () => {
      const { container } = render(<TextField error />);
      const inputContainer = container.querySelector(
        '[class*="inputContainer"]'
      );
      expect(inputContainer!.className).toContain('Error');
    });

    it('sets aria-invalid when error=true', () => {
      render(<TextField error />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('does not set aria-invalid when error=false', () => {
      render(<TextField error={false} />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-invalid', 'false');
    });
  });

  describe('helperText prop', () => {
    it('does not render helper text by default', () => {
      render(<TextField />);
      expect(screen.queryByText(/.+/)).not.toBeInTheDocument();
    });

    it('renders helper text when provided', () => {
      render(<TextField helperText="Please enter your full name" />);
      expect(
        screen.getByText('Please enter your full name')
      ).toBeInTheDocument();
    });

    it('renders helper text with error state', () => {
      render(<TextField error helperText="This field is required" />);
      const helperText = screen.getByText('This field is required');
      expect(helperText).toBeInTheDocument();
      expect(helperText.className).toContain('Error');
    });

    it('associates helper text with input via aria-describedby', () => {
      render(<TextField helperText="Helper text" />);
      const input = screen.getByRole('textbox');
      const helperText = screen.getByText('Helper text');

      const ariaDescribedBy = input.getAttribute('aria-describedby');
      expect(ariaDescribedBy).toBeTruthy();
      expect(helperText).toHaveAttribute('id', ariaDescribedBy!);
    });

    it('does not set aria-describedby when no helper text', () => {
      render(<TextField />);
      const input = screen.getByRole('textbox');
      expect(input).not.toHaveAttribute('aria-describedby');
    });
  });

  describe('required prop', () => {
    it('renders without required by default', () => {
      render(<TextField />);
      const input = screen.getByRole('textbox');
      expect(input).not.toBeRequired();
    });

    it('renders as required when required=true', () => {
      render(<TextField required />);
      const input = screen.getByRole('textbox');
      expect(input).toBeRequired();
    });

    it('shows asterisk in label when required=true', () => {
      render(<TextField label="Full Name" required />);
      expect(screen.getByText('*')).toBeInTheDocument();
    });

    it('shows asterisk in legend for outlined variant when required=true and focused', async () => {
      const user = userEvent.setup();
      render(<TextField label="Full Name" required variant="outlined" />);

      const input = screen.getByRole('textbox');
      await user.click(input);

      // Legend with asterisk should appear when focused
      expect(screen.getByText(/Full Name.*\*/)).toBeInTheDocument();
    });
  });

  describe('disabled prop', () => {
    it('renders as enabled by default', () => {
      render(<TextField />);
      const input = screen.getByRole('textbox');
      expect(input).not.toBeDisabled();
    });

    it('renders as disabled when disabled=true', () => {
      render(<TextField disabled />);
      const input = screen.getByRole('textbox');
      expect(input).toBeDisabled();
    });

    it('applies disabled class to root element', () => {
      const { container } = render(<TextField disabled />);
      const inputContainer = container.querySelector(
        '[class*="inputContainer"]'
      );
      expect(inputContainer!.className).toContain('Disabled');
    });

    it('does not trigger events when disabled', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();
      const handleFocus = jest.fn();

      render(
        <TextField disabled onChange={handleChange} onFocus={handleFocus} />
      );
      const input = screen.getByRole('textbox');

      await user.click(input);
      await user.type(input, 'test');

      expect(handleChange).not.toHaveBeenCalled();
      expect(handleFocus).not.toHaveBeenCalled();
    });
  });

  describe('Value handling', () => {
    describe('Uncontrolled mode', () => {
      it('handles uncontrolled input', async () => {
        const user = userEvent.setup();
        render(<TextField />);
        const input = screen.getByRole('textbox') as HTMLInputElement;

        await user.type(input, 'Hello World');
        expect(input.value).toBe('Hello World');
      });

      it('uses defaultValue for uncontrolled input', () => {
        render(<TextField defaultValue="Initial value" />);
        const input = screen.getByRole('textbox') as HTMLInputElement;
        expect(input.value).toBe('Initial value');
      });

      it('calls onChange in uncontrolled mode', async () => {
        const user = userEvent.setup();
        const handleChange = jest.fn();

        render(<TextField onChange={handleChange} />);
        const input = screen.getByRole('textbox');

        await user.type(input, 'a');
        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith(
          expect.objectContaining({
            target: expect.objectContaining({
              value: 'a',
            }),
          })
        );
      });
    });

    describe('Controlled mode', () => {
      it('handles controlled input', () => {
        render(<TextField value="Controlled value" readOnly />);
        const input = screen.getByRole('textbox') as HTMLInputElement;
        expect(input.value).toBe('Controlled value');
      });

      it('updates when value prop changes', () => {
        const { rerender } = render(<TextField value="Initial" readOnly />);
        const input = screen.getByRole('textbox') as HTMLInputElement;
        expect(input.value).toBe('Initial');

        rerender(<TextField value="Updated" readOnly />);
        expect(input.value).toBe('Updated');
      });

      it('calls onChange in controlled mode', async () => {
        const user = userEvent.setup();
        const handleChange = jest.fn();

        render(<TextField value="" onChange={handleChange} />);
        const input = screen.getByRole('textbox');

        await act(async () => {
          await user.type(input, 'a');
        });
        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith(
          expect.objectContaining({
            target: expect.objectContaining({
              value: '',
            }),
          })
        );
      });
    });

    describe('Number values', () => {
      it('handles numeric defaultValue', () => {
        render(<TextField defaultValue={123} />);
        const input = screen.getByRole('textbox') as HTMLInputElement;
        expect(input.value).toBe('123');
      });

      it('handles numeric controlled value', () => {
        render(<TextField value={456} readOnly />);
        const input = screen.getByRole('textbox') as HTMLInputElement;
        expect(input.value).toBe('456');
      });
    });
  });

  describe('Focus and blur events', () => {
    it('calls onFocus when input is focused', async () => {
      const user = userEvent.setup();
      const handleFocus = jest.fn();

      render(<TextField onFocus={handleFocus} />);
      const input = screen.getByRole('textbox');

      await user.click(input);
      expect(handleFocus).toHaveBeenCalledTimes(1);
      expect(handleFocus).toHaveBeenCalledWith(expect.any(Object));
    });

    it('calls onBlur when input loses focus', async () => {
      const user = userEvent.setup();
      const handleBlur = jest.fn();

      render(<TextField onBlur={handleBlur} />);
      const input = screen.getByRole('textbox');

      await user.click(input);
      await user.tab(); // Move focus away

      expect(handleBlur).toHaveBeenCalledTimes(1);
      expect(handleBlur).toHaveBeenCalledWith(expect.any(Object));
    });

    it('applies focused class when input is focused', async () => {
      const user = userEvent.setup();
      const { container } = render(<TextField />);
      const input = screen.getByRole('textbox');
      const inputContainer = container.querySelector(
        '[class*="inputContainer"]'
      );

      expect(inputContainer!.className).not.toContain('Focused');

      await act(async () => {
        await user.click(input);
      });
      expect(inputContainer!.className).toContain('Focused');

      await act(async () => {
        await user.tab();
      });
      expect(inputContainer!.className).not.toContain('Focused');
    });
  });

  describe('Label behavior', () => {
    it('shrinks label when input has value', () => {
      render(<TextField label="Name" value="John" readOnly />);
      // With both label and legend present, select specifically the non-legend one
      const labels = screen.getAllByText('Name');
      const label = labels.find((el) => el.tagName === 'LABEL');
      expect(label!.className).toContain('Shrunk');
    });

    it('shrinks label when input is focused', async () => {
      const user = userEvent.setup();
      render(<TextField label="Name" />);
      const input = screen.getByRole('textbox');
      const label = screen.getByText('Name');

      expect(label.className).not.toContain('Shrunk');

      await act(async () => {
        await user.click(input);
      });
      expect(label.className).toContain('Shrunk');
    });

    it('does not shrink label when input is empty and not focused', () => {
      render(<TextField label="Name" />);
      const label = screen.getByText('Name');
      expect(label).not.toHaveClass('shrink');
    });

    it('shows placeholder only when no label is provided', () => {
      render(<TextField placeholder="Enter your name" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('placeholder', 'Enter your name');
    });

    it('does not show placeholder when label is provided', () => {
      render(<TextField label="Name" placeholder="Enter your name" />);
      const input = screen.getByRole('textbox');
      expect(input).not.toHaveAttribute('placeholder');
    });
  });

  describe('HTML attributes', () => {
    it('passes through HTML attributes', () => {
      render(
        <TextField
          data-testid="custom-textfield"
          name="username"
          autoComplete="username"
          maxLength={50}
        />
      );

      const input = screen.getByTestId('custom-textfield');
      expect(input).toHaveAttribute('name', 'username');
      expect(input).toHaveAttribute('autocomplete', 'username');
      expect(input).toHaveAttribute('maxlength', '50');
    });

    it('supports type attribute', () => {
      render(<TextField type="email" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'email');
    });

    it('supports id attribute override', () => {
      render(<TextField id="custom-id" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('id', 'custom-id');
    });
  });

  describe('Ref forwarding', () => {
    it('forwards ref to input element', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<TextField ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current?.type).toBe('text');
    });

    it('allows calling focus through ref', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<TextField ref={ref} />);

      act(() => {
        ref.current?.focus();
      });
      expect(ref.current).toBe(document.activeElement);
    });
  });

  describe('Outlined variant specifics', () => {
    it('renders fieldset for outlined variant', () => {
      render(<TextField variant="outlined" label="Name" />);
      const fieldset = document.querySelector('fieldset');
      expect(fieldset).toBeInTheDocument();
    });

    it('shows legend when label shrinks in outlined variant', async () => {
      const user = userEvent.setup();
      render(<TextField variant="outlined" label="Full Name" />);

      const input = screen.getByRole('textbox');
      await user.click(input);

      const legend = document.querySelector('legend');
      expect(legend).toBeInTheDocument();
      expect(legend).toHaveTextContent('Full Name');
    });

    it('does not show legend for non-outlined variants', async () => {
      const user = userEvent.setup();
      render(<TextField variant="filled" label="Full Name" />);

      const input = screen.getByRole('textbox');
      await user.click(input);

      const legend = document.querySelector('legend');
      expect(legend).not.toBeInTheDocument();
    });
  });

  describe('Complex scenarios', () => {
    it('renders correctly with all props combined', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();
      const handleFocus = jest.fn();

      const { container } = render(
        <TextField
          label="🔥Complex Field"
          variant="outlined"
          size="small"
          fullWidth
          required
          error
          helperText="Error message with all props"
          value="test value"
          onChange={handleChange}
          onFocus={handleFocus}
          className="custom-class"
          disabled={false}
          maxLength={100}
        />
      );

      const input = screen.getByRole('textbox');
      const rootElement = container.firstChild;
      const inputContainer = container.querySelector(
        '[class*="inputContainer"]'
      );

      // Test root classes
      expect(inputContainer!.className).toContain('outlined');
      expect(input!.className).toContain('Small');
      expect((rootElement as HTMLElement).className).toContain('fullWidth');
      expect(inputContainer!.className).toContain('Error');
      expect(rootElement).toHaveClass('custom-class');

      // Test input attributes and state
      expect(input).toHaveAttribute('maxlength', '100');
      expect(input).toBeRequired();
      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(input).toHaveValue('test value');

      // Test content rendering
      expect(screen.getByText('🔥Complex Field')).toBeInTheDocument();
      expect(screen.getByText('*')).toBeInTheDocument(); // Required asterisk
      expect(
        screen.getByText('Error message with all props')
      ).toBeInTheDocument();

      // Test interactions
      await act(async () => {
        await user.click(input);
      });
      expect(handleFocus).toHaveBeenCalledTimes(1);

      await act(async () => {
        await user.clear(input);
        await user.type(input, 'new');
      });
      expect(handleChange).toHaveBeenCalled();
    });

    it('handles rapid typing correctly', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();

      render(<TextField onChange={handleChange} />);
      const input = screen.getByRole('textbox');

      await user.type(input, 'hello world');

      expect(handleChange).toHaveBeenCalledTimes(11); // Each character
      expect((input as HTMLInputElement).value).toBe('hello world');
    });
  });

  describe('Accessibility', () => {
    it('has correct role', () => {
      render(<TextField />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('is focusable by default', () => {
      render(<TextField />);
      const input = screen.getByRole('textbox');

      act(() => {
        input.focus();
      });
      expect(input).toBe(document.activeElement);
    });

    it('supports ARIA attributes', () => {
      render(
        <TextField
          aria-label="Custom label"
          aria-describedby="custom-description"
          role="searchbox"
        />
      );

      const input = screen.getByRole('searchbox');
      expect(input).toHaveAttribute('aria-label', 'Custom label');
      expect(input).toHaveAttribute('aria-describedby', 'custom-description');
    });

    it('maintains proper label association', () => {
      render(<TextField label="Email" />);
      const input = screen.getByRole('textbox');
      const label = screen.getByText('Email');

      const inputId = input.getAttribute('id');
      expect(inputId).toBeTruthy();
      expect(label.tagName).toBe('LABEL');
      expect(label).toHaveAttribute('for', inputId!);
    });
  });

  describe('Edge cases', () => {
    it('handles empty string value', () => {
      render(<TextField value="" readOnly />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('');
    });

    it('handles undefined props gracefully', () => {
      render(<TextField label={undefined} helperText={undefined} />);
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
    });

    it('handles zero as value', () => {
      render(<TextField value={0} readOnly />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('0');
    });

    it('handles value changes from undefined to defined', () => {
      const { rerender } = render(<TextField />);
      const input = screen.getByRole('textbox') as HTMLInputElement;

      expect(input.value).toBe('');

      rerender(<TextField value="now controlled" readOnly />);
      expect(input.value).toBe('now controlled');
    });

    it('handles additional props gracefully', () => {
      // TextField should handle additional HTML input props
      render(<TextField data-custom="test" />);
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
    });
  });
});
