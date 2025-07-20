import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

// Мета информация о компоненте для Storybook
const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Переиспользуемый компонент кнопки с различными вариантами отображения.

## Особенности
- 3 варианта отображения: text, contained, outlined
- 3 размера: small, medium, large  
- 6 цветовых схем: primary, secondary, error, warning, info, success
- Поддерживает все стандартные HTML атрибуты кнопки
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'contained', 'outlined'],
      description: 'Вариант отображения кнопки',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Размер кнопки',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'warning', 'info', 'success'],
      description: 'Цветовая схема кнопки',
    },
    disabled: {
      control: 'boolean',
      description: 'Отключает кнопку',
    },
    children: {
      control: 'text',
      description: 'Содержимое кнопки',
    },
  },
  args: {
    // onClick можно добавить по мере необходимости
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Основная история с настройками по умолчанию
export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'contained',
    size: 'medium',
    color: 'primary',
  },
};

// Варианты отображения
export const Contained: Story = {
  args: {
    children: 'Contained Button',
    variant: 'contained',
  },
};

export const Outlined: Story = {
  args: {
    children: 'Outlined Button',
    variant: 'outlined',
  },
};

export const Text: Story = {
  args: {
    children: 'Text Button',
    variant: 'text',
  },
};

// Размеры
export const Small: Story = {
  args: {
    children: 'Small Button',
    size: 'small',
  },
};

export const Medium: Story = {
  args: {
    children: 'Medium Button',
    size: 'medium',
  },
};

export const Large: Story = {
  args: {
    children: 'Large Button',
    size: 'large',
  },
};

// Цветовые схемы
export const Primary: Story = {
  args: {
    children: 'Primary',
    color: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    color: 'secondary',
  },
};

export const Error: Story = {
  args: {
    children: 'Error',
    color: 'error',
  },
};

export const Warning: Story = {
  args: {
    children: 'Warning',
    color: 'warning',
  },
};

export const Info: Story = {
  args: {
    children: 'Info',
    color: 'info',
  },
};

export const Success: Story = {
  args: {
    children: 'Success',
    color: 'success',
  },
};

// Отключенная кнопка
export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};

// Демонстрация всех вариантов
export const AllVariants: Story = {
  args: {
    children: 'Button',
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '1rem',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>
        <Button variant="text">Text</Button>
      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Button size="small">Small</Button>
        <Button size="medium">Medium</Button>
        <Button size="large">Large</Button>
      </div>
    </div>
  ),
};
