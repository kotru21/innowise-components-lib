import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Checkbox from './Checkbox';

// Мета информация о компоненте для Storybook
const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Переиспользуемый компонент чекбокса с различными состояниями и вариантами отображения.

## Особенности
- Поддерживает стандартные состояния: checked, unchecked
- Промежуточное состояние (indeterminate)
- 3 размера: small, medium, large
- 6 цветовых схем: primary, secondary, error, warning, info, success
- Различные варианты расположения ярлыка
- Поддержка кастомных иконок
- Accessibility-friendly
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Размер чекбокса',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'warning', 'info', 'success'],
      description: 'Цветовая схема чекбокса',
    },
    labelPlacement: {
      control: 'select',
      options: ['start', 'end', 'top', 'bottom'],
      description: 'Расположение ярлыка',
    },
    label: {
      control: 'text',
      description: 'Текст ярлыка',
    },
    helperText: {
      control: 'text',
      description: 'Вспомогательный текст',
    },
    disabled: {
      control: 'boolean',
      description: 'Отключает чекбокс',
    },
    error: {
      control: 'boolean',
      description: 'Показывает состояние ошибки',
    },
    required: {
      control: 'boolean',
      description: 'Обязательное поле',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Промежуточное состояние',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Базовый пример
export const Default: Story = {
  render: (args) => {
    const [checked, setChecked] = React.useState(false);

    return (
      <Checkbox
        {...args}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
    );
  },
  args: {
    label: 'Checkbox',
  },
};

// Контролируемый компонент
export const Controlled: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);

    return (
      <Checkbox
        {...args}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
    );
  },
  args: {
    label: 'Контролируемый чекбокс',
  },
};

// Различные размеры
export const Sizes: Story = {
  render: () => {
    const [smallChecked, setSmallChecked] = React.useState(true);
    const [mediumChecked, setMediumChecked] = React.useState(true);
    const [largeChecked, setLargeChecked] = React.useState(true);

    return (
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <Checkbox
          size="small"
          label="Small"
          checked={smallChecked}
          onChange={(e) => setSmallChecked(e.target.checked)}
        />
        <Checkbox
          size="medium"
          label="Medium"
          checked={mediumChecked}
          onChange={(e) => setMediumChecked(e.target.checked)}
        />
        <Checkbox
          size="large"
          label="Large"
          checked={largeChecked}
          onChange={(e) => setLargeChecked(e.target.checked)}
        />
      </div>
    );
  },
};

// Различные цвета
export const Colors: Story = {
  render: () => {
    const [states, setStates] = React.useState({
      primary: true,
      secondary: true,
      error: true,
      warning: true,
      info: true,
      success: true,
    });

    const handleChange =
      (color: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setStates((prev) => ({
          ...prev,
          [color]: e.target.checked,
        }));
      };

    return (
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          maxWidth: '400px',
        }}
      >
        <Checkbox
          color="primary"
          label="Primary"
          checked={states.primary}
          onChange={handleChange('primary')}
        />
        <Checkbox
          color="secondary"
          label="Secondary"
          checked={states.secondary}
          onChange={handleChange('secondary')}
        />
        <Checkbox
          color="error"
          label="Error"
          checked={states.error}
          onChange={handleChange('error')}
        />
        <Checkbox
          color="warning"
          label="Warning"
          checked={states.warning}
          onChange={handleChange('warning')}
        />
        <Checkbox
          color="info"
          label="Info"
          checked={states.info}
          onChange={handleChange('info')}
        />
        <Checkbox
          color="success"
          label="Success"
          checked={states.success}
          onChange={handleChange('success')}
        />
      </div>
    );
  },
};

// Состояния
export const States: Story = {
  render: () => {
    const [unchecked, setUnchecked] = React.useState(false);
    const [checked, setChecked] = React.useState(true);
    const [indeterminate, setIndeterminate] = React.useState(false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Checkbox
          label="Unchecked"
          checked={unchecked}
          onChange={(e) => setUnchecked(e.target.checked)}
        />
        <Checkbox
          label="Checked"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        <Checkbox
          label="Indeterminate"
          checked={indeterminate}
          indeterminate={true}
          onChange={(e) => setIndeterminate(e.target.checked)}
        />
        <Checkbox label="Disabled" disabled />
        <Checkbox label="Disabled Checked" disabled defaultChecked />
      </div>
    );
  },
};

// Расположение ярлыка
export const LabelPlacement: Story = {
  render: () => {
    const [states, setStates] = React.useState({
      start: true,
      end: true,
      top: true,
      bottom: true,
    });

    const handleChange =
      (placement: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setStates((prev) => ({
          ...prev,
          [placement]: e.target.checked,
        }));
      };

    return (
      <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
        <Checkbox
          label="Start"
          labelPlacement="start"
          checked={states.start}
          onChange={handleChange('start')}
        />
        <Checkbox
          label="End"
          labelPlacement="end"
          checked={states.end}
          onChange={handleChange('end')}
        />
        <Checkbox
          label="Top"
          labelPlacement="top"
          checked={states.top}
          onChange={handleChange('top')}
        />
        <Checkbox
          label="Bottom"
          labelPlacement="bottom"
          checked={states.bottom}
          onChange={handleChange('bottom')}
        />
      </div>
    );
  },
};

// С вспомогательным текстом
export const WithHelperText: Story = {
  render: () => {
    const [normal, setNormal] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [required, setRequired] = React.useState(false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Checkbox
          label="Обычный чекбокс"
          helperText="Это вспомогательный текст"
          checked={normal}
          onChange={(e) => setNormal(e.target.checked)}
        />
        <Checkbox
          label="С ошибкой"
          helperText="Это сообщение об ошибке"
          error
          checked={error}
          onChange={(e) => setError(e.target.checked)}
        />
        <Checkbox
          label="Обязательное поле"
          helperText="Это поле обязательно к заполнению"
          required
          checked={required}
          onChange={(e) => setRequired(e.target.checked)}
        />
      </div>
    );
  },
};

// Без ярлыка
export const WithoutLabel: Story = {
  render: () => {
    const [states, setStates] = React.useState([false, true, false, false]);

    const handleChange =
      (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setStates((prev) => {
          const newStates = [...prev];
          newStates[index] = e.target.checked;
          return newStates;
        });
      };

    return (
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <Checkbox checked={states[0]} onChange={handleChange(0)} />
        <Checkbox checked={states[1]} onChange={handleChange(1)} />
        <Checkbox
          checked={states[2]}
          indeterminate={true}
          onChange={handleChange(2)}
        />
        <Checkbox disabled />
      </div>
    );
  },
};

// Группа чекбоксов
export const CheckboxGroup: Story = {
  render: () => {
    const [parent, setParent] = useState(false);
    const [children, setChildren] = useState([false, false, false]);

    const handleParentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.checked;
      setParent(newValue);
      setChildren([newValue, newValue, newValue]);
    };

    const handleChildChange =
      (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newChildren = [...children];
        newChildren[index] = event.target.checked;
        setChildren(newChildren);

        const checkedCount = newChildren.filter(Boolean).length;
        setParent(checkedCount === newChildren.length);
      };

    const indeterminate = children.some(Boolean) && !children.every(Boolean);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Checkbox
          label="Родительский чекбокс"
          checked={parent}
          indeterminate={indeterminate}
          onChange={handleParentChange}
        />
        <div
          style={{
            marginLeft: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <Checkbox
            label="Дочерний 1"
            checked={children[0]}
            onChange={handleChildChange(0)}
          />
          <Checkbox
            label="Дочерний 2"
            checked={children[1]}
            onChange={handleChildChange(1)}
          />
          <Checkbox
            label="Дочерний 3"
            checked={children[2]}
            onChange={handleChildChange(2)}
          />
        </div>
      </div>
    );
  },
};

// Кастомные иконки
export const CustomIcons: Story = {
  render: () => {
    const [heart, setHeart] = React.useState(false);
    const [star, setStar] = React.useState(false);

    return (
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <Checkbox
          label="Сердце"
          icon={<span style={{ fontSize: '18px' }}>♡</span>}
          checkedIcon={
            <span style={{ fontSize: '18px', color: 'red' }}>♥</span>
          }
          checked={heart}
          onChange={(e) => setHeart(e.target.checked)}
        />
        <Checkbox
          label="Звезда"
          icon={<span style={{ fontSize: '18px' }}>☆</span>}
          checkedIcon={
            <span style={{ fontSize: '18px', color: 'gold' }}>★</span>
          }
          checked={star}
          onChange={(e) => setStar(e.target.checked)}
        />
      </div>
    );
  },
};
