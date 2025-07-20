import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Select from './Select';
import { SelectOption } from './Select.types';

// Опции для примеров
const ageOptions: SelectOption[] = [
  { value: 10, label: 'Ten' },
  { value: 20, label: 'Twenty' },
  { value: 30, label: 'Thirty' },
  { value: 40, label: 'Forty' },
  { value: 50, label: 'Fifty' },
];

const countryOptions: SelectOption[] = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'mx', label: 'Mexico' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
  { value: 'au', label: 'Australia' },
];

const colorOptions: SelectOption[] = [
  { value: 'red', label: 'Красный' },
  { value: 'green', label: 'Зеленый' },
  { value: 'blue', label: 'Синий' },
  { value: 'yellow', label: 'Желтый' },
  { value: 'purple', label: 'Фиолетовый' },
  { value: 'orange', label: 'Оранжевый' },
];

// Мета информация о компоненте для Storybook
const meta = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Выпадающий список с поддержкой различных вариантов отображения.

## Особенности
- 3 варианта отображения: outlined, filled, standard
- Анимированный лейбл, который поднимается при фокусе или заполнении
- Состояние ошибки с красным выделением
- Helper text для подсказок или сообщений об ошибках
- Поддержка множественного выбора с чипами
- Кастомная иконка стрелки
- Hover и focus эффекты
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Ярлык для поля выбора',
    },
    variant: {
      control: 'select',
      options: ['outlined', 'filled', 'standard'],
      description: 'Вариант отображения поля',
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
      description: 'Размер поля',
    },
    error: {
      control: 'boolean',
      description: 'Показывает состояние ошибки',
    },
    helperText: {
      control: 'text',
      description: 'Текст сообщения об ошибке или вспомогательный текст',
    },
    disabled: {
      control: 'boolean',
      description: 'Отключает компонент',
    },
    required: {
      control: 'boolean',
      description: 'Показывает, что поле обязательно для заполнения',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Растягивает компонент на всю ширину контейнера',
    },
    multiple: {
      control: 'boolean',
      description: 'Разрешает выбор нескольких значений',
    },
    placeholder: {
      control: 'text',
      description: 'Текст плейсхолдера',
    },
    autoWidth: {
      control: 'boolean',
      description: 'Автоматическая ширина по содержимому',
    },
    includeNoneOption: {
      control: 'boolean',
      description: 'Добавляет опцию "none" (пустое значение) в начало списка',
    },
    noneOptionText: {
      control: 'text',
      description: 'Текст для опции "none"',
    },
    noneOptionValue: {
      control: 'text',
      description: 'Значение для опции "none"',
    },
    options: {
      description: 'Массив опций для выбора',
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

// Базовые примеры
export const Default: Story = {
  args: {
    label: 'Age',
    options: ageOptions,
  },
};

export const Filled: Story = {
  args: {
    label: 'Age',
    variant: 'filled',
    options: ageOptions,
  },
};

export const Standard: Story = {
  args: {
    label: 'Age',
    variant: 'standard',
    options: ageOptions,
  },
};

// Состояния
export const WithError: Story = {
  args: {
    label: 'Age',
    options: ageOptions,
    error: true,
    helperText: 'This field is required',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Age',
    options: ageOptions,
    disabled: true,
    value: 30,
  },
};

export const Required: Story = {
  args: {
    label: 'Age',
    options: ageOptions,
    required: true,
  },
};

// Размеры
export const Small: Story = {
  args: {
    label: 'Age',
    size: 'small',
    options: ageOptions,
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Country',
    options: countryOptions,
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};

export const AutoWidth: Story = {
  args: {
    label: 'Short',
    options: [
      { value: 'a', label: 'A' },
      { value: 'b', label: 'B' },
      { value: 'c', label: 'C' },
    ],
    autoWidth: true,
  },
};

// Опция "none"
export const WithNoneOption: Story = {
  args: {
    label: 'Country',
    options: countryOptions,
    includeNoneOption: true,
    noneOptionText: 'Не выбрано',
    noneOptionValue: '',
  },
};

export const WithCustomNoneOption: Story = {
  args: {
    label: 'Priority',
    options: [
      { value: 'high', label: 'High Priority' },
      { value: 'medium', label: 'Medium Priority' },
      { value: 'low', label: 'Low Priority' },
    ],
    includeNoneOption: true,
    noneOptionText: 'No Priority Set',
    noneOptionValue: 'none',
  },
};

export const WithoutNoneOption: Story = {
  args: {
    label: 'Required Selection',
    options: ageOptions,
    includeNoneOption: false,
  },
};

// Примеры без лейбла (только с placeholder)
export const NoLabelWithPlaceholder: Story = {
  args: {
    options: ageOptions,
    placeholder: 'Choose your age',
    includeNoneOption: false,
  },
};

export const NoLabelMultiple: Story = {
  args: {
    options: colorOptions,
    placeholder: 'Select colors',
    multiple: true,
  },
};

// Множественный выбор
export const Multiple: Story = {
  args: {
    label: 'Colors',
    options: colorOptions,
    multiple: true,
  },
};

export const MultipleWithValues: Story = {
  args: {
    label: 'Colors',
    options: colorOptions,
    multiple: true,
    value: ['red', 'blue'],
  },
};

// С helper text
export const WithHelperText: Story = {
  args: {
    label: 'Country',
    options: countryOptions,
    helperText: 'Choose your country of residence',
    placeholder: 'Select country',
  },
};

// Контролируемый компонент
export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | number>('');

    return (
      <div style={{ minWidth: 300 }}>
        <Select
          {...args}
          value={value}
          onChange={(_, newValue) => setValue(newValue as string | number)}
        />
        <div style={{ marginTop: 16, fontSize: 14, color: '#666' }}>
          Selected value: {value || 'none'}
        </div>
      </div>
    );
  },
  args: {
    label: 'Controlled Select',
    options: ageOptions,
  },
};

// Контролируемый множественный выбор
export const ControlledMultiple: Story = {
  render: (args) => {
    const [values, setValues] = useState<(string | number)[]>([]);

    return (
      <div style={{ minWidth: 300 }}>
        <Select
          {...args}
          value={values}
          onChange={(_, newValue) => setValues(newValue as (string | number)[])}
          multiple
        />
        <div style={{ marginTop: 16, fontSize: 14, color: '#666' }}>
          Selected values: {values.length > 0 ? values.join(', ') : 'none'}
        </div>
      </div>
    );
  },
  args: {
    label: 'Multiple Colors',
    options: colorOptions,
  },
};

// Контролируемое открытие/закрытие
export const ControlledOpen: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<string | number>('');

    return (
      <div style={{ minWidth: 300 }}>
        <button
          onClick={() => setOpen(!open)}
          style={{ marginBottom: 16, padding: '8px 16px', borderRadius: 4 }}
        >
          {open ? 'Close' : 'Open'} Select
        </button>
        <Select
          {...args}
          value={value}
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          onChange={(_, newValue) => setValue(newValue as string | number)}
        />
      </div>
    );
  },
  args: {
    label: 'Controlled Open',
    options: ageOptions,
  },
};

// Демонстрация всех вариантов
export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        minWidth: 300,
      }}
    >
      <Select
        label="Outlined (default)"
        variant="outlined"
        options={ageOptions}
      />
      <Select label="Filled" variant="filled" options={ageOptions} />
      <Select label="Standard" variant="standard" options={ageOptions} />
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
  args: {
    options: ageOptions,
  },
};

export const Playground: Story = {
  args: {
    label: 'Select Age',
    options: ageOptions,
    variant: 'outlined',
    size: 'medium',
    helperText: 'This information will help us personalize your experience',
  },
};
