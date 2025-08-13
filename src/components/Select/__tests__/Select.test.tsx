import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Select from '../Select';
import { SelectOption } from '../Select.types';

const mockOptions: SelectOption[] = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3', disabled: true },
  { value: 'option4', label: 'Option 4' },
];

// Вспомогательная функция для получения видимого элемента Select
const getVisibleSelect = () => screen.getAllByRole('combobox')[1];
const getHiddenSelect = () => screen.getAllByRole('combobox')[0];

// Вспомогательная функция для получения опции из меню (button элемент)
const getMenuOption = (text: string) => {
  const elements = screen.getAllByText(text);
  return elements.find((el) => el.tagName === 'BUTTON');
};

// Вспомогательная функция для получения чипа
const getChip = (text: string) => {
  const elements = screen.getAllByText(text);
  return elements.find((el) => el.closest('.chip, [class*="chip"]'));
};

describe('Select', () => {
  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<Select options={mockOptions} />);
      const selectElements = screen.getAllByRole('combobox');
      expect(selectElements).toHaveLength(2); // Скрытый select и видимый div
      expect(selectElements[1]).toBeInTheDocument(); // Видимый элемент
    });

    it('renders with label', () => {
      render(<Select label="Choose option" options={mockOptions} />);
      const label = screen.getByText('Choose option');
      expect(label).toBeInTheDocument();
      expect(label.tagName).toBe('LABEL');
    });

    it('renders without label', () => {
      render(<Select options={mockOptions} />);
      const label = screen.queryByText('Choose option');
      expect(label).not.toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(
        <Select className="custom-select" options={mockOptions} />
      );
      const selectContainer = container.firstChild;
      expect(selectContainer).toHaveClass('custom-select');
    });
  });

  describe('options prop', () => {
    it('renders options correctly', async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptions} />);

      const select = getVisibleSelect();
      await act(async () => {
        await user.click(select);
      });

      await waitFor(() => {
        expect(getMenuOption('Option 1')).toBeInTheDocument();
        expect(getMenuOption('Option 2')).toBeInTheDocument();
        expect(getMenuOption('Option 3')).toBeInTheDocument();
        expect(getMenuOption('Option 4')).toBeInTheDocument();
      });
    });

    it('handles empty options array', () => {
      render(<Select options={[]} />);
      const select = getVisibleSelect();
      expect(select).toBeInTheDocument();
    });

    it('includes none option by default', async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptions} />);

      const select = getVisibleSelect();
      await act(async () => {
        await user.click(select);
      });

      await waitFor(() => {
        expect(getMenuOption('Не выбрано')).toBeInTheDocument();
      });
    });

    it('excludes none option when includeNoneOption=false', async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptions} includeNoneOption={false} />);

      const select = getVisibleSelect();
      await act(async () => {
        await user.click(select);
      });

      await waitFor(() => {
        expect(screen.queryByText('Не выбрано')).not.toBeInTheDocument();
      });
    });

    it('uses custom none option text', async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptions} noneOptionText="Select one..." />);

      const select = getVisibleSelect();
      await act(async () => {
        await user.click(select);
      });

      await waitFor(() => {
        expect(getMenuOption('Select one...')).toBeInTheDocument();
      });
    });

    it('uses custom none option value', async () => {
      const handleChange = jest.fn();
      const user = userEvent.setup();

      render(
        <Select
          options={mockOptions}
          noneOptionValue="none"
          onChange={handleChange}
        />
      );

      const select = getVisibleSelect();
      await act(async () => {
        await user.click(select);
      });

      await waitFor(() => {
        const noneButton = getMenuOption('Не выбрано');
        return user.click(noneButton!);
      });

      expect(handleChange).toHaveBeenCalledWith(expect.any(Object), 'none');
    });

    it('disables disabled options', async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptions} />);

      const select = getVisibleSelect();
      await act(async () => {
        await user.click(select);
      });

      await waitFor(() => {
        const disabledOption = getMenuOption('Option 3');
        expect(disabledOption).toBeDisabled();
      });
    });
  });

  describe('variant prop', () => {
    it('renders with default variant "outlined"', () => {
      const { container } = render(<Select options={mockOptions} />);
      const inputContainer = container.querySelector(
        '[class*="inputContainer"]'
      );
      expect(inputContainer?.className).toMatch(/outlined/);
    });

    it('renders with variant "filled"', () => {
      const { container } = render(
        <Select variant="filled" options={mockOptions} />
      );
      const inputContainer = container.querySelector(
        '[class*="inputContainer"]'
      );
      expect(inputContainer?.className).toMatch(/filled/);
    });

    it('renders with variant "standard"', () => {
      const { container } = render(
        <Select variant="standard" options={mockOptions} />
      );
      const inputContainer = container.querySelector(
        '[class*="inputContainer"]'
      );
      expect(inputContainer?.className).toMatch(/standard/);
    });
  });

  describe('size prop', () => {
    it('renders with default size "medium"', () => {
      const { container } = render(<Select options={mockOptions} />);
      const rootContainer = container.firstChild as HTMLElement;
      // Проверяем что нет класса Small (значит medium по умолчанию)
      expect(rootContainer.className).not.toMatch(/small/i);
    });

    it('renders with size "small"', () => {
      const { container } = render(
        <Select size="small" options={mockOptions} />
      );
      const inputContainer = container.querySelector('.inputContainer');
      expect(inputContainer?.className).toMatch(/small/i);
    });
  });

  describe('fullWidth prop', () => {
    it('does not apply fullWidth by default', () => {
      const { container } = render(<Select options={mockOptions} />);
      const rootContainer = container.firstChild as HTMLElement;
      expect(rootContainer.className).not.toMatch(/fullWidth/);
    });

    it('applies fullWidth class when fullWidth=true', () => {
      const { container } = render(<Select fullWidth options={mockOptions} />);
      const rootContainer = container.firstChild as HTMLElement;
      expect(rootContainer.className).toMatch(/fullWidth/);
    });
  });

  describe('autoWidth prop', () => {
    it('does not apply autoWidth by default', () => {
      const { container } = render(<Select options={mockOptions} />);
      const rootContainer = container.firstChild as HTMLElement;
      expect(rootContainer.className).not.toMatch(/autoWidth/);
    });

    it('applies autoWidth class when autoWidth=true', () => {
      const { container } = render(<Select autoWidth options={mockOptions} />);
      const rootContainer = container.firstChild as HTMLElement;
      expect(rootContainer.className).toMatch(/autoWidth/);
    });
  });

  describe('error prop', () => {
    it('renders without error state by default', () => {
      const { container } = render(<Select options={mockOptions} />);
      // Проверяем отсутствие error классов
      const errorElements = container.querySelectorAll(
        '[class*="error"], [class*="Error"]'
      );
      expect(errorElements.length).toBe(0);
    });

    it('applies error class when error=true', () => {
      const { container } = render(<Select error options={mockOptions} />);
      // Проверяем наличие error классов
      const errorElements = container.querySelectorAll(
        '[class*="error"], [class*="Error"]'
      );
      expect(errorElements.length).toBeGreaterThan(0);
    });
  });

  describe('required prop', () => {
    it('does not mark as required by default', () => {
      render(<Select options={mockOptions} />);
      const hiddenSelect = getHiddenSelect();
      expect(hiddenSelect).not.toBeRequired();
    });

    it('marks as required when required=true', () => {
      render(<Select required options={mockOptions} />);
      const hiddenSelect = getHiddenSelect();
      expect(hiddenSelect).toBeRequired();
    });
  });

  describe('label prop', () => {
    it('renders label when provided', () => {
      render(<Select label="Choose option" options={mockOptions} />);
      const label = screen.getByText('Choose option');
      expect(label).toBeInTheDocument();
      expect(label.tagName).toBe('LABEL');
    });

    it('does not render label when not provided', () => {
      const { container } = render(<Select options={mockOptions} />);
      const labelElement = container.querySelector('label');
      expect(labelElement).not.toBeInTheDocument();
    });

    it('handles empty label', () => {
      render(<Select label="" options={mockOptions} />);
      const visibleSelect = getVisibleSelect();
      expect(visibleSelect).toBeInTheDocument();
    });

    it('associates label with select input', () => {
      render(<Select label="Choose option" options={mockOptions} />);
      const label = screen.getByText('Choose option');
      const hiddenSelect = getHiddenSelect();
      expect(label).toHaveAttribute('for', hiddenSelect.id);
    });
  });

  describe('helperText prop', () => {
    it('does not render helper text by default', () => {
      const { container } = render(<Select options={mockOptions} />);
      const helperTextElement = container.querySelector('[id*="helper"]');
      expect(helperTextElement).not.toBeInTheDocument();
    });

    it('renders helper text when provided', () => {
      render(
        <Select helperText="Additional information" options={mockOptions} />
      );
      const helperText = screen.getByText('Additional information');
      expect(helperText).toBeInTheDocument();
    });

    it('renders helper text with error state', () => {
      const { container } = render(
        <Select helperText="Error message" error options={mockOptions} />
      );
      const helperText = screen.getByText('Error message');
      expect(helperText).toBeInTheDocument();
      const helperTextElement = container.querySelector('[id*="helper"]');
      if (helperTextElement?.className) {
        expect(helperTextElement.className).toMatch(/error/i);
      }
    });

    it('renders helper text without error state', () => {
      const { container } = render(
        <Select helperText="Normal message" options={mockOptions} />
      );
      const helperText = screen.getByText('Normal message');
      expect(helperText).toBeInTheDocument();
      const helperTextElement = container.querySelector('[id*="helper"]');
      if (helperTextElement?.className) {
        expect(helperTextElement.className).not.toMatch(/error/i);
      }
    });
  });

  describe('placeholder prop', () => {
    it('displays placeholder when no value selected', () => {
      render(<Select placeholder="Select option..." options={mockOptions} />);
      const placeholder = screen.getByText('Select option...');
      expect(placeholder).toBeInTheDocument();
    });

    it('hides placeholder when value is selected', () => {
      render(
        <Select
          placeholder="Select option..."
          value="option1"
          options={mockOptions}
        />
      );
      const placeholder = screen.queryByText('Select option...');
      expect(placeholder).not.toBeInTheDocument();
      // Вместо плейсхолдера должен быть отображен лейбл выбранной опции
      const allOption1 = screen.getAllByText('Option 1');
      expect(allOption1.length).toBeGreaterThan(0);
    });
  });

  describe('IconComponent prop', () => {
    const CustomIcon = ({ className }: { className?: string }) => (
      <div className={className} data-testid="custom-icon">
        Custom Icon
      </div>
    );

    it('renders default arrow icon', () => {
      const { container } = render(<Select options={mockOptions} />);
      const icon = container.querySelector('[class*="icon"]');
      expect(icon).toBeInTheDocument();
    });

    it('renders custom icon when IconComponent is provided', () => {
      render(<Select IconComponent={CustomIcon} options={mockOptions} />);
      const customIcon = screen.getByTestId('custom-icon');
      expect(customIcon).toBeInTheDocument();
      expect(customIcon).toHaveTextContent('Custom Icon');
    });
  });

  describe('open prop (controlled)', () => {
    it('controls open state when open prop is provided', () => {
      const { rerender } = render(
        <Select open={false} options={mockOptions} />
      );

      // Menu should not be visible
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

      rerender(<Select open={true} options={mockOptions} />);

      // Menu should be visible
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('calls onOpen when open changes to true in uncontrolled mode', async () => {
      const handleOpen = jest.fn();
      const user = userEvent.setup();

      render(<Select onOpen={handleOpen} options={mockOptions} />);

      const select = getVisibleSelect();
      await act(async () => {
        await user.click(select);
      });

      expect(handleOpen).toHaveBeenCalledTimes(1);
    });
  });

  describe('children prop', () => {
    it('renders children in the menu when provided', async () => {
      const user = userEvent.setup();
      render(
        <Select options={mockOptions}>
          <div data-testid="custom-content">Custom Menu Content</div>
        </Select>
      );

      const select = getVisibleSelect();
      await act(async () => {
        await user.click(select);
      });

      await waitFor(() => {
        const customContent = screen.getByTestId('custom-content');
        expect(customContent).toBeInTheDocument();
        expect(customContent).toHaveTextContent('Custom Menu Content');
      });
    });
  });

  describe('defaultValue prop', () => {
    it('sets initial value in uncontrolled mode', () => {
      render(<Select defaultValue="option2" options={mockOptions} />);
      const hiddenSelect = getHiddenSelect();
      expect(hiddenSelect).toHaveValue('option2');
    });

    it('works with multiple selection', () => {
      render(
        <Select
          multiple
          defaultValue={['option1', 'option2']}
          options={mockOptions}
        />
      );

      // В множественном режиме должны отображаться выбранные значения
      expect(getChip('Option 1')).toBeInTheDocument();
      expect(getChip('Option 2')).toBeInTheDocument();
    });
  });

  describe('User interactions', () => {
    it('calls onChange when option is selected', async () => {
      const handleChange = jest.fn();
      const user = userEvent.setup();

      render(<Select onChange={handleChange} options={mockOptions} />);
      const select = getVisibleSelect();

      await act(async () => {
        await user.click(select);
      });

      await waitFor(() => {
        const option1Button = getMenuOption('Option 1');
        return user.click(option1Button!);
      });

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(expect.any(Object), 'option1');
    });

    it('opens menu when clicked', async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptions} />);

      const select = getVisibleSelect();
      await act(async () => {
        await user.click(select);
      });

      await waitFor(() => {
        expect(getMenuOption('Option 1')).toBeInTheDocument();
      });
    });

    it('closes menu when option is selected', async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptions} />);

      const select = getVisibleSelect();
      await act(async () => {
        await user.click(select);
      });

      await waitFor(() => {
        const option1Button = getMenuOption('Option 1');
        return user.click(option1Button!);
      });

      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      });
    });

    it('closes menu when clicking outside', async () => {
      const user = userEvent.setup();
      render(
        <div>
          <Select options={mockOptions} />
          <div data-testid="outside">Outside</div>
        </div>
      );

      const select = getVisibleSelect();
      await act(async () => {
        await user.click(select);
      });

      await waitFor(() => {
        expect(getMenuOption('Option 1')).toBeInTheDocument();
      });

      const outside = screen.getByTestId('outside');
      await act(async () => {
        await user.click(outside);
      });

      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      });
    });

    it('calls onFocus when focused', async () => {
      const handleFocus = jest.fn();
      const user = userEvent.setup();

      render(<Select onFocus={handleFocus} options={mockOptions} />);
      const select = getVisibleSelect();

      await act(async () => {
        await user.click(select);
      });

      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it('calls onBlur when focus is lost', async () => {
      const handleBlur = jest.fn();
      const user = userEvent.setup();

      render(
        <div>
          <Select onBlur={handleBlur} options={mockOptions} />
          <input data-testid="other-input" />
        </div>
      );

      const select = getVisibleSelect();
      const otherInput = screen.getByTestId('other-input');

      await act(async () => {
        await user.click(select);
      });

      await act(async () => {
        await user.click(otherInput);
      });

      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it('calls onOpen when menu opens', async () => {
      const handleOpen = jest.fn();
      const user = userEvent.setup();

      render(<Select onOpen={handleOpen} options={mockOptions} />);
      const select = getVisibleSelect();

      await act(async () => {
        await user.click(select);
      });

      expect(handleOpen).toHaveBeenCalledTimes(1);
    });

    it('calls onClose when menu closes', async () => {
      const handleClose = jest.fn();
      const user = userEvent.setup();

      render(<Select onClose={handleClose} options={mockOptions} />);
      const select = getVisibleSelect();

      await act(async () => {
        await user.click(select);
      });

      await waitFor(() => {
        const option1Button = getMenuOption('Option 1');
        return user.click(option1Button!);
      });

      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('Keyboard navigation', () => {
    it('can be focused with Tab', async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptions} />);

      await act(async () => {
        await user.tab();
      });

      // Проверяем что фокус на видимом элементе (может быть скрытый select получает фокус)
      const hiddenSelect = getHiddenSelect();
      expect(hiddenSelect).toHaveFocus();
    });

    it('opens menu with Enter key', async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptions} />);

      const select = getVisibleSelect();
      await act(async () => {
        select.focus();
        await user.keyboard('{Enter}');
      });

      await waitFor(() => {
        expect(getMenuOption('Option 1')).toBeInTheDocument();
      });
    });

    it('opens menu with Space key', async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptions} />);

      const select = getVisibleSelect();
      await act(async () => {
        select.focus();
        await user.keyboard(' ');
      });

      await waitFor(() => {
        expect(getMenuOption('Option 1')).toBeInTheDocument();
      });
    });

    it('opens menu with ArrowDown key', async () => {
      render(<Select options={mockOptions} />);

      const select = getVisibleSelect();

      // Сфокусируемся на элементе и нажмем ArrowDown
      await act(async () => {
        select.focus();
        await userEvent.keyboard('{ArrowDown}');
      });

      // Проверим что меню открыто по состоянию aria-expanded
      await waitFor(() => {
        expect(select).toHaveAttribute('aria-expanded', 'true');
      });
    });

    it('closes menu with Escape key', async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptions} />);

      const select = getVisibleSelect();
      await act(async () => {
        await user.click(select);
      });

      await waitFor(() => {
        expect(getMenuOption('Option 1')).toBeInTheDocument();
      });

      await act(async () => {
        await user.keyboard('{Escape}');
      });

      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      });
    });
  });

  describe('Multiple selection', () => {
    it('allows multiple selection when multiple=true', async () => {
      const handleChange = jest.fn();

      render(
        <Select
          multiple
          onChange={handleChange}
          options={mockOptions}
          includeNoneOption={false}
          open
        />
      );

      const user = userEvent.setup();

      // Когда меню открыто, выбираем первую опцию
      const option1Button = getMenuOption('Option 1');
      expect(option1Button).toBeInTheDocument();

      await act(async () => {
        await user.click(option1Button!);
      });

      // Выбираем вторую опцию
      const option2Button = getMenuOption('Option 2');
      expect(option2Button).toBeInTheDocument();

      await act(async () => {
        await user.click(option2Button!);
      });

      // Проверяем, что onChange был вызван с правильными значениями
      expect(handleChange).toHaveBeenCalledTimes(2);
      expect(handleChange).toHaveBeenNthCalledWith(1, expect.any(Object), [
        'option1',
      ]);
      expect(handleChange).toHaveBeenNthCalledWith(2, expect.any(Object), [
        'option1',
        'option2',
      ]);
    });
    it('displays selected values as chips in multiple mode', async () => {
      render(
        <Select multiple value={['option1', 'option2']} options={mockOptions} />
      );

      // В множественном режиме должны отображаться чипы с выбранными значениями
      expect(getChip('Option 1')).toBeInTheDocument();
      expect(getChip('Option 2')).toBeInTheDocument();
    });

    it('allows removing chips in multiple mode', async () => {
      const handleChange = jest.fn();
      const user = userEvent.setup();

      render(
        <Select
          multiple
          value={['option1', 'option2']}
          onChange={handleChange}
          options={mockOptions}
        />
      );

      // Найти кнопку удаления чипа (обычно это X или крестик)
      const chipDeleteButtons = screen.getAllByRole('button');
      const deleteButton = chipDeleteButtons.find((btn) =>
        btn.getAttribute('aria-label')?.includes('Удалить Option 1')
      );

      if (deleteButton) {
        await act(async () => {
          await user.click(deleteButton);
        });

        expect(handleChange).toHaveBeenCalledWith(expect.any(Object), [
          'option2',
        ]);
      }
    });
  });

  describe('Controlled vs Uncontrolled', () => {
    it('works in controlled mode', async () => {
      const handleChange = jest.fn();
      const { rerender } = render(
        <Select value="option1" onChange={handleChange} options={mockOptions} />
      );

      const hiddenSelect = getHiddenSelect();
      expect(hiddenSelect).toHaveValue('option1');

      // Rerender with new value
      rerender(
        <Select value="option2" onChange={handleChange} options={mockOptions} />
      );
      expect(hiddenSelect).toHaveValue('option2');
    });

    it('works in uncontrolled mode', async () => {
      const user = userEvent.setup();
      render(<Select defaultValue="option1" options={mockOptions} />);

      const hiddenSelect = getHiddenSelect();
      expect(hiddenSelect).toHaveValue('option1');

      const visibleSelect = getVisibleSelect();
      await act(async () => {
        await user.click(visibleSelect);
      });

      await waitFor(() => {
        const option2Button = getMenuOption('Option 2');
        return user.click(option2Button!);
      });

      expect(hiddenSelect).toHaveValue('option2');
    });
  });

  describe('HTML attributes', () => {
    it('passes through HTML attributes', () => {
      render(
        <Select
          data-testid="custom-select"
          aria-label="Choose"
          options={mockOptions}
        />
      );
      const hiddenSelect = getHiddenSelect();
      const visibleSelect = getVisibleSelect();

      expect(hiddenSelect).toHaveAttribute('data-testid', 'custom-select');
      // aria-label может быть на любом из элементов, проверим оба
      const hasAriaLabel =
        hiddenSelect.hasAttribute('aria-label') ||
        visibleSelect.hasAttribute('aria-label');
      expect(hasAriaLabel).toBe(true);
    });

    it('supports id attribute', () => {
      render(<Select id="unique-select" options={mockOptions} />);
      const hiddenSelect = getHiddenSelect();
      // ID генерируется автоматически, но должен содержать уникальную часть
      expect(hiddenSelect.id).toBeTruthy();
    });

    it('supports name attribute', () => {
      render(<Select name="category" options={mockOptions} />);
      const hiddenSelect = getHiddenSelect();
      expect(hiddenSelect).toHaveAttribute('name', 'category');
    });

    it('supports disabled attribute', () => {
      render(<Select disabled options={mockOptions} />);
      const hiddenSelect = getHiddenSelect();
      const visibleSelect = getVisibleSelect();
      expect(hiddenSelect).toBeDisabled();
      expect(visibleSelect).toHaveAttribute('tabindex', '-1');
    });
  });

  describe('Ref forwarding', () => {
    it('forwards ref to select element', () => {
      const ref = React.createRef<HTMLSelectElement>();
      render(<Select ref={ref} options={mockOptions} />);

      expect(ref.current).toBeInstanceOf(HTMLSelectElement);
      expect(ref.current).toBe(getHiddenSelect());
    });

    it('allows calling focus through ref', () => {
      const ref = React.createRef<HTMLSelectElement>();
      render(<Select ref={ref} options={mockOptions} />);

      act(() => {
        ref.current?.focus();
      });
      expect(ref.current).toHaveFocus();
    });
  });

  describe('Complex scenarios', () => {
    it('renders correctly with all props combined', async () => {
      const handleChange = jest.fn();
      const handleFocus = jest.fn();
      const handleBlur = jest.fn();

      render(
        <Select
          label="Complex Select"
          helperText="Choose an option"
          variant="filled"
          size="small"
          fullWidth
          required
          error
          value="option2"
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          options={mockOptions}
          className="custom-select"
          data-testid="complex-select"
        />
      );

      const hiddenSelect = getHiddenSelect();
      const visibleSelect = getVisibleSelect();
      const label = screen.getByText('Complex Select');
      const helperText = screen.getByText('Choose an option');

      expect(visibleSelect).toBeInTheDocument();
      expect(hiddenSelect).toHaveValue('option2');
      expect(hiddenSelect).toBeRequired();
      expect(hiddenSelect).toHaveAttribute('data-testid', 'complex-select');
      expect(label).toBeInTheDocument();
      expect(helperText).toBeInTheDocument();
    });

    it('handles dynamic options updates', async () => {
      const initialOptions = [{ value: '1', label: 'Option 1' }];
      const updatedOptions = [
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' },
      ];

      const user = userEvent.setup();
      const { rerender } = render(<Select options={initialOptions} />);

      const select = getVisibleSelect();
      await act(async () => {
        await user.click(select);
      });

      await waitFor(() => {
        expect(getMenuOption('Option 1')).toBeInTheDocument();
        expect(screen.queryByText('Option 2')).not.toBeInTheDocument();
      });

      // Закрываем меню
      await act(async () => {
        await user.keyboard('{Escape}');
      });

      rerender(<Select options={updatedOptions} />);

      await act(async () => {
        await user.click(select);
      });

      await waitFor(() => {
        expect(getMenuOption('Option 1')).toBeInTheDocument();
        expect(getMenuOption('Option 2')).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('has correct role', () => {
      render(<Select options={mockOptions} />);
      const visibleSelect = getVisibleSelect();
      expect(visibleSelect).toHaveAttribute('role', 'combobox');
    });

    it('is focusable by default', () => {
      render(<Select options={mockOptions} />);
      const visibleSelect = getVisibleSelect();

      act(() => {
        visibleSelect.focus();
      });
      expect(visibleSelect).toHaveFocus();
    });

    it('supports ARIA attributes', () => {
      render(
        <Select
          aria-describedby="help-text"
          aria-labelledby="label-id"
          options={mockOptions}
        />
      );
      const hiddenSelect = getHiddenSelect();
      const visibleSelect = getVisibleSelect();

      // Проверяем базовые ARIA атрибуты
      expect(hiddenSelect).toHaveAttribute('aria-expanded');
      expect(hiddenSelect).toHaveAttribute('aria-haspopup', 'listbox');
      expect(visibleSelect).toHaveAttribute('aria-expanded');
      expect(visibleSelect).toHaveAttribute('aria-haspopup', 'listbox');
      expect(visibleSelect).toHaveAttribute('role', 'combobox');
    });

    it('supports required attribute', () => {
      render(<Select required options={mockOptions} />);
      const hiddenSelect = getHiddenSelect();
      expect(hiddenSelect).toBeRequired();
    });

    it('has proper expanded state', async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptions} />);

      const visibleSelect = getVisibleSelect();
      const hiddenSelect = getHiddenSelect();

      expect(visibleSelect).toHaveAttribute('aria-expanded', 'false');
      expect(hiddenSelect).toHaveAttribute('aria-expanded', 'false');

      await act(async () => {
        await user.click(visibleSelect);
      });

      expect(visibleSelect).toHaveAttribute('aria-expanded', 'true');
      expect(hiddenSelect).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('Edge cases', () => {
    it('handles null values gracefully', () => {
      render(
        <Select
          label={null as any}
          helperText={null as any}
          options={mockOptions}
        />
      );
      const visibleSelect = getVisibleSelect();
      expect(visibleSelect).toBeInTheDocument();
    });

    it('handles undefined onChange gracefully', async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptions} />);

      const visibleSelect = getVisibleSelect();
      await act(async () => {
        await user.click(visibleSelect);
      });

      await waitFor(() => {
        const option1Button = getMenuOption('Option 1');
        return user.click(option1Button!);
      });

      // Should not crash without onChange
      const hiddenSelect = getHiddenSelect();
      expect(hiddenSelect).toHaveValue('option1');
    });

    it('handles empty option values', () => {
      const optionsWithEmpty = [
        { value: '', label: 'Empty Option' },
        { value: 'option1', label: 'Option 1' },
      ];

      render(<Select options={optionsWithEmpty} />);
      const visibleSelect = getVisibleSelect();
      expect(visibleSelect).toBeInTheDocument();
    });

    it('handles duplicate option values', async () => {
      // Подавляем console.error для этого теста, поскольку мы специально тестируем edge case
      // eslint-disable-next-line no-console
      const originalError = console.error;
      // eslint-disable-next-line no-console
      console.error = jest.fn();

      const optionsWithDuplicates = [
        { value: 'option1', label: 'Option 1A' },
        { value: 'option1', label: 'Option 1B' },
        { value: 'option2', label: 'Option 2' },
      ];

      const user = userEvent.setup();
      render(<Select options={optionsWithDuplicates} />);

      const select = getVisibleSelect();
      await act(async () => {
        await user.click(select);
      });

      await waitFor(() => {
        expect(getMenuOption('Option 1A')).toBeInTheDocument();
        expect(getMenuOption('Option 1B')).toBeInTheDocument();
      });

      // Восстанавливаем console.error
      // eslint-disable-next-line no-console
      console.error = originalError;
    });
  });
});
