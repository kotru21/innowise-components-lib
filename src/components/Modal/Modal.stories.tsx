import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Modal from './Modal';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Modal компонент - базовое модальное окно для создания диалогов, lightbox и других overlay компонентов.

Основные особенности:
- Управление стеком модальных окон
- Блокировка прокрутки страницы
- Управление фокусом и доступностью
- Поддержка backdrop с возможностью кастомизации
- Поддержка порталов и SSR
- Обработка клавиш (Escape)
- Анимации входа/выхода
- TypeScript типизация
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Показывает или скрывает модальное окно',
    },
    backdrop: {
      control: 'select',
      options: [true, false, 'static'],
      description: 'Показывать ли затемненный фон (backdrop)',
    },
    closeOnBackdropClick: {
      control: 'boolean',
      description: 'Закрывать ли модальное окно при клике на backdrop',
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Закрывать ли модальное окно при нажатии клавиши Escape',
    },
    keepMounted: {
      control: 'boolean',
      description: 'Сохранять ли содержимое модального окна в DOM при закрытии',
    },
    disableAutoFocus: {
      control: 'boolean',
      description: 'Отключить автоматическую установку фокуса',
    },
    disableEnforceFocus: {
      control: 'boolean',
      description: 'Отключить перехват фокуса в модальном окне',
    },
    disableRestoreFocus: {
      control: 'boolean',
      description: 'Отключить восстановление фокуса при закрытии',
    },
    disableScrollLock: {
      control: 'boolean',
      description: 'Отключить блокировку прокрутки страницы',
    },
    disablePortal: {
      control: 'boolean',
      description: 'Отключить использование портала (для SSR)',
    },
    onClose: {
      action: 'closed',
      description: 'Обработчик закрытия модального окна',
    },
    onEnter: {
      action: 'entered',
      description: 'Обработчик начала анимации входа',
    },
    onExited: {
      action: 'exited',
      description: 'Обработчик завершения анимации выхода',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Controlled компонент для демонстрации
const ControlledModal = (args: any) => {
  const [open, setOpen] = useState(args.open || false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    args.onClose?.();
  };

  return (
    <>
      <button
        onClick={handleOpen}
        style={{
          padding: '8px 16px',
          backgroundColor: '#1976d2',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Open Modal
      </button>
      <Modal {...args} open={open} onClose={handleClose}>
        {args.children}
      </Modal>
    </>
  );
};

// Стили для содержимого модального окна
const modalContentStyle: React.CSSProperties = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: 'white',
  border: '2px solid #000',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  padding: 16,
  borderRadius: '4px',
  outline: 'none',
};

const simpleContentStyle: React.CSSProperties = {
  backgroundColor: 'white',
  padding: '32px',
  borderRadius: '8px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  outline: 'none',
  maxWidth: '400px',
  width: '90%',
};

/**
 * Базовый пример Modal компонента
 */
export const Default: Story = {
  render: (args) => <ControlledModal {...args} />,
  args: {
    children: (
      <div style={modalContentStyle}>
        <h2 id="modal-title" style={{ margin: '0 0 16px 0' }}>
          Text in a modal
        </h2>
        <p id="modal-description" style={{ margin: 0 }}>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </p>
      </div>
    ),
  },
};

/**
 * Простой модальный диалог
 */
export const SimpleDialog: Story = {
  render: (args) => <ControlledModal {...args} />,
  args: {
    children: (
      <div style={simpleContentStyle}>
        <h2 style={{ margin: '0 0 16px 0', color: '#333' }}>Confirm Action</h2>
        <p style={{ margin: '0 0 24px 0', color: '#666' }}>
          Are you sure you want to delete this item? This action cannot be
          undone.
        </p>
        <div
          style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}
        >
          <button
            style={{
              padding: '8px 16px',
              backgroundColor: '#f5f5f5',
              border: '1px solid #ddd',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
          <button
            style={{
              padding: '8px 16px',
              backgroundColor: '#d32f2f',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Delete
          </button>
        </div>
      </div>
    ),
  },
};

/**
 * Modal без backdrop
 */
export const WithoutBackdrop: Story = {
  render: (args) => <ControlledModal {...args} />,
  args: {
    backdrop: false,
    children: (
      <div style={simpleContentStyle}>
        <h2 style={{ margin: '0 0 16px 0' }}>Modal without backdrop</h2>
        <p style={{ margin: 0 }}>
          This modal doesn't have a backdrop, so you can interact with the
          content behind it.
        </p>
      </div>
    ),
  },
};

/**
 * Modal с статичным backdrop (не закрывается при клике)
 */
export const StaticBackdrop: Story = {
  render: (args) => <ControlledModal {...args} />,
  args: {
    backdrop: 'static',
    closeOnBackdropClick: false,
    children: (
      <div style={simpleContentStyle}>
        <h2 style={{ margin: '0 0 16px 0' }}>Static backdrop</h2>
        <p style={{ margin: '0 0 16px 0' }}>
          This modal cannot be closed by clicking on the backdrop or pressing
          Escape.
        </p>
        <button
          onClick={() => window.location.reload()}
          style={{
            padding: '8px 16px',
            backgroundColor: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Close via button only
        </button>
      </div>
    ),
    closeOnEscape: false,
  },
};

/**
 * Modal с формой
 */
export const WithForm: Story = {
  render: (args) => <ControlledModal {...args} />,
  args: {
    children: (
      <div style={{ ...simpleContentStyle, width: '500px' }}>
        <h2 style={{ margin: '0 0 24px 0' }}>Contact Form</h2>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label
              style={{
                display: 'block',
                marginBottom: '4px',
                fontWeight: 'bold',
              }}
            >
              Name:
            </label>
            <input
              type="text"
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px',
              }}
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label
              style={{
                display: 'block',
                marginBottom: '4px',
                fontWeight: 'bold',
              }}
            >
              Email:
            </label>
            <input
              type="email"
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px',
              }}
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label
              style={{
                display: 'block',
                marginBottom: '4px',
                fontWeight: 'bold',
              }}
            >
              Message:
            </label>
            <textarea
              rows={4}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px',
                resize: 'vertical',
              }}
              placeholder="Enter your message"
            />
          </div>
          <div
            style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}
          >
            <button
              type="button"
              style={{
                padding: '8px 16px',
                backgroundColor: '#f5f5f5',
                border: '1px solid #ddd',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: '8px 16px',
                backgroundColor: '#1976d2',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    ),
  },
};

/**
 * Вложенные модальные окна
 */
export const NestedModals: Story = {
  render: () => {
    const [parentOpen, setParentOpen] = useState(false);
    const [childOpen, setChildOpen] = useState(false);

    return (
      <>
        <button
          onClick={() => setParentOpen(true)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Open Parent Modal
        </button>

        <Modal open={parentOpen} onClose={() => setParentOpen(false)}>
          <div style={{ ...simpleContentStyle, width: '400px' }}>
            <h2 style={{ margin: '0 0 16px 0' }}>Parent Modal</h2>
            <p style={{ margin: '0 0 16px 0' }}>
              This is the parent modal. You can open another modal from here.
            </p>
            <button
              onClick={() => setChildOpen(true)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#2e7d32',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Open Child Modal
            </button>
          </div>
        </Modal>

        <Modal open={childOpen} onClose={() => setChildOpen(false)}>
          <div style={{ ...simpleContentStyle, width: '300px' }}>
            <h2 style={{ margin: '0 0 16px 0' }}>Child Modal</h2>
            <p style={{ margin: '0 0 16px 0' }}>
              This is a nested modal. It appears on top of the parent modal.
            </p>
            <button
              onClick={() => setChildOpen(false)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#d32f2f',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Close Child Modal
            </button>
          </div>
        </Modal>
      </>
    );
  },
};

/**
 * Modal с keepMounted (содержимое остается в DOM)
 */
export const KeepMounted: Story = {
  render: (args) => <ControlledModal {...args} />,
  args: {
    keepMounted: true,
    children: (
      <div style={simpleContentStyle}>
        <h2 style={{ margin: '0 0 16px 0' }}>Keep Mounted Modal</h2>
        <p style={{ margin: '0 0 16px 0' }}>
          This modal's content stays in the DOM even when closed. Useful for SEO
          or expensive components.
        </p>
        <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>
          Current time: {new Date().toLocaleTimeString()}
        </p>
      </div>
    ),
  },
};
