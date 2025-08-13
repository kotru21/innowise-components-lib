import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Switch from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Switch компонент для переключения состояния настроек.

Основные особенности:
- Поддерживает состояния: включен/выключен
- 3 размера: small, medium, large  
- 6 цветовых схем: primary, secondary, error, warning, info, success
- Поддерживает ярлыки с различным расположением
- Поддерживает состояние ошибки и вспомогательный текст
- Полная доступность (a11y)
- TypeScript типизация
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Состояние переключателя (включен/выключен)',
    },
    disabled: {
      control: 'boolean',
      description: 'Блокирует взаимодействие с переключателем',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Размер переключателя',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'warning', 'info', 'success'],
      description: 'Цветовая схема переключателя',
    },
    label: {
      control: 'text',
      description: 'Ярлык для переключателя',
    },
    error: {
      control: 'boolean',
      description: 'Показывает состояние ошибки',
    },
    helperText: {
      control: 'text',
      description: 'Текст сообщения об ошибке или вспомогательный текст',
    },
    labelPlacement: {
      control: 'select',
      options: ['start', 'end', 'top', 'bottom'],
      description: 'Расположение ярлыка относительно переключателя',
    },
    onChange: {
      action: 'changed',
      description: 'Обработчик изменения состояния переключателя',
    },
  },
  args: {
    onChange: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Controlled компонент для демонстрации
const ControlledSwitch = (args: any) => {
  const [checked, setChecked] = useState(args.checked || false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    args.onChange?.(event);
  };

  return <Switch {...args} checked={checked} onChange={handleChange} />;
};

/**
 * Базовый пример Switch компонента
 */
export const Default: Story = {
  render: (args) => <ControlledSwitch {...args} />,
  args: {
    checked: false,
  },
};

/**
 * Switch с ярлыком
 */
export const WithLabel: Story = {
  render: (args) => <ControlledSwitch {...args} />,
  args: {
    checked: true,
    label: 'Enable notifications',
  },
};

/**
 * Различные размеры Switch
 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <ControlledSwitch size="small" label="Small" checked={true} />
      <ControlledSwitch size="medium" label="Medium" checked={true} />
      <ControlledSwitch size="large" label="Large" checked={true} />
    </div>
  ),
};

/**
 * Различные цветовые схемы
 */
export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <ControlledSwitch color="primary" label="Primary" checked={true} />
      <ControlledSwitch color="secondary" label="Secondary" checked={true} />
      <ControlledSwitch color="error" label="Error" checked={true} />
      <ControlledSwitch color="warning" label="Warning" checked={true} />
      <ControlledSwitch color="info" label="Info" checked={true} />
      <ControlledSwitch color="success" label="Success" checked={true} />
    </div>
  ),
};

/**
 * Отключенный Switch
 */
export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Switch disabled={false} label="Enabled" checked={false} />
      <Switch disabled={true} label="Disabled (unchecked)" checked={false} />
      <Switch disabled={true} label="Disabled (checked)" checked={true} />
    </div>
  ),
};

/**
 * Switch с состоянием ошибки
 */
export const WithError: Story = {
  render: (args) => <ControlledSwitch {...args} />,
  args: {
    checked: false,
    label: 'Accept terms',
    error: true,
    helperText: 'You must accept the terms and conditions',
  },
};

/**
 * Switch с вспомогательным текстом
 */
export const WithHelperText: Story = {
  render: (args) => <ControlledSwitch {...args} />,
  args: {
    checked: true,
    label: 'Email notifications',
    helperText: 'Get notified about new messages and updates',
  },
};

/**
 * Различные варианты расположения ярлыка
 */
export const LabelPlacement: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        alignItems: 'flex-start',
      }}
    >
      <ControlledSwitch
        labelPlacement="start"
        label="Label Start"
        checked={true}
      />
      <ControlledSwitch labelPlacement="end" label="Label End" checked={true} />
      <ControlledSwitch labelPlacement="top" label="Label Top" checked={true} />
      <ControlledSwitch
        labelPlacement="bottom"
        label="Label Bottom"
        checked={true}
      />
    </div>
  ),
};

/**
 * Комплексный пример с группой Switch'ей
 */
export const FormExample: Story = {
  render: () => {
    const [settings, setSettings] = useState({
      notifications: true,
      darkMode: false,
      autoSave: true,
      analytics: false,
    });

    const handleChange =
      (key: keyof typeof settings) =>
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setSettings((prev) => ({
          ...prev,
          [key]: event.target.checked,
        }));
      };

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          maxWidth: '300px',
        }}
      >
        <h3 style={{ margin: '0 0 16px 0', fontFamily: 'Arial, sans-serif' }}>
          Settings
        </h3>
        <Switch
          checked={settings.notifications}
          onChange={handleChange('notifications')}
          label="Email notifications"
          helperText="Receive notifications about new messages"
        />
        <Switch
          checked={settings.darkMode}
          onChange={handleChange('darkMode')}
          label="Dark mode"
          color="secondary"
        />
        <Switch
          checked={settings.autoSave}
          onChange={handleChange('autoSave')}
          label="Auto-save"
          color="success"
          helperText="Automatically save your work"
        />
        <Switch
          checked={settings.analytics}
          onChange={handleChange('analytics')}
          label="Analytics"
          error={!settings.analytics}
          helperText={
            !settings.analytics
              ? 'Analytics helps us improve the product'
              : 'Thank you for helping us improve!'
          }
        />
      </div>
    );
  },
};
