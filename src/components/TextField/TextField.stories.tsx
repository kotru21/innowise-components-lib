import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import TextField from './TextField';

// Мета информация о компоненте для Storybook
const meta = {
  title: 'Components/TextField',
  component: TextField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Поле ввода с лейблом, поддержкой ошибок и различными вариантами отображения.

## Особенности
- 3 варианта отображения: outlined, filled, standard
- Анимированный лейбл, который поднимается при фокусе или заполнении
- Состояние ошибки с красным выделением
- Helper text для подсказок или сообщений об ошибках
- Hover и focus эффекты
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Ярлык для поля ввода',
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
      description: 'Отключает поле ввода',
    },
    required: {
      control: 'boolean',
      description: 'Делает поле обязательным для заполнения',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Поле занимает всю доступную ширину',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder текст',
    },
  },
  args: {
    // Стандартные значения
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

// Основная история с настройками по умолчанию
export const Default: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
  },
};

// Варианты отображения
export const Outlined: Story = {
  args: {
    label: 'Outlined TextField',
    variant: 'outlined',
    placeholder: 'Enter text...',
  },
};

export const Filled: Story = {
  args: {
    label: 'Filled TextField',
    variant: 'filled',
    placeholder: 'Enter text...',
  },
};

export const Standard: Story = {
  args: {
    label: 'Standard TextField',
    variant: 'standard',
    placeholder: 'Enter text...',
  },
};

// Размеры
export const Small: Story = {
  args: {
    label: 'Small TextField',
    size: 'small',
    placeholder: 'Small size',
  },
};

export const Medium: Story = {
  args: {
    label: 'Medium TextField',
    size: 'medium',
    placeholder: 'Medium size',
  },
};

// Состояния
export const WithError: Story = {
  args: {
    label: 'TextField с ошибкой',
    error: true,
    helperText: 'Это поле содержит ошибку',
    defaultValue: 'Invalid input',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'TextField с помощником',
    helperText: 'Это вспомогательный текст',
    placeholder: 'Enter text...',
  },
};

export const Required: Story = {
  args: {
    label: 'Обязательное поле',
    required: true,
    placeholder: 'This field is required',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Отключенное поле',
    disabled: true,
    placeholder: 'Disabled field',
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Full Width TextField',
    fullWidth: true,
    placeholder: 'This field takes full width',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

// Демонстрация всех вариантов
export const AllVariants: Story = {
  args: {
    label: 'TextField',
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '2rem',
        flexDirection: 'column',
        minWidth: '300px',
      }}
    >
      <div style={{ display: 'flex', gap: '1rem' }}>
        <TextField
          variant="outlined"
          label="Outlined"
          placeholder="Outlined variant"
        />
        <TextField
          variant="filled"
          label="Filled"
          placeholder="Filled variant"
        />
        <TextField
          variant="standard"
          label="Standard"
          placeholder="Standard variant"
        />
      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <TextField size="small" label="Small" placeholder="Small size" />
        <TextField size="medium" label="Medium" placeholder="Medium size" />
      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <TextField label="Normal" placeholder="Normal state" />
        <TextField label="With Error" error helperText="Error message" />
        <TextField label="Disabled" disabled placeholder="Disabled field" />
      </div>
    </div>
  ),
};
