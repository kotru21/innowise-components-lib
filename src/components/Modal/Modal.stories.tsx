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
    children: {
      control: false,
      description: 'Содержимое модального окна',
    },
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
    className: {
      control: 'text',
      description: 'Дополнительный CSS класс для модального окна',
    },
    backdropClassName: {
      control: 'text',
      description: 'Дополнительный CSS класс для backdrop',
    },
    container: {
      control: false,
      description: 'Контейнер для портала',
    },
    BackdropComponent: {
      control: false,
      description: 'Компонент для backdrop',
    },
    BackdropProps: {
      control: false,
      description: 'Пропсы для компонента backdrop',
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
  const handleClose = (event?: any, reason?: string) => {
    setOpen(false);
    args.onClose?.(event || {}, reason as any);
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
  render: (args) => {
    const [open, setOpen] = useState(args.open || false);

    const handleOpen = () => setOpen(true);
    const handleClose = (event?: any, reason?: string) => {
      setOpen(false);
      args.onClose?.(event || {}, reason as any);
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
          Open Confirm Dialog
        </button>
        <Modal {...args} open={open} onClose={handleClose}>
          <div style={simpleContentStyle}>
            <h2 style={{ margin: '0 0 16px 0', color: '#333' }}>
              Confirm Action
            </h2>
            <p style={{ margin: '0 0 24px 0', color: '#666' }}>
              Are you sure you want to delete this item? This action cannot be
              undone.
            </p>
            <div
              style={{
                display: 'flex',
                gap: '8px',
                justifyContent: 'flex-end',
              }}
            >
              <button
                onClick={handleClose}
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
                onClick={() => {
                  alert('Item deleted!');
                  handleClose();
                }}
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
        </Modal>
      </>
    );
  },
};

/**
 * Modal без backdrop
 */
export const WithoutBackdrop: Story = {
  render: (args) => {
    const [open, setOpen] = useState(args.open || false);
    const [bgClickCount, setBgClickCount] = useState(0);
    const [inputValue, setInputValue] = useState('');

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
      setOpen(false);
      args.onClose?.({}, 'escapeKeyDown');
    };

    const handleBgClick = () => {
      setBgClickCount((prev) => prev + 1);
    };

    const modalContentStyle = {
      position: 'fixed' as const,
      top: '20px',
      right: '20px',
      width: '320px',
      backgroundColor: 'white',
      padding: '24px',
      borderRadius: '8px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
      border: '1px solid #e0e0e0',
      zIndex: 1000,
    };

    return (
      <>
        <div
          style={{
            padding: '20px',
            minHeight: '100vh',
            backgroundColor: '#f5f5f5',
          }}
        >
          <h1 style={{ marginBottom: '20px', color: '#333' }}>
            Background Content
          </h1>

          <button
            onClick={handleOpen}
            style={{
              padding: '12px 24px',
              backgroundColor: '#1976d2',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              marginBottom: '20px',
              fontSize: '16px',
            }}
          >
            Open Modal without backdrop
          </button>

          <div
            style={{
              marginBottom: '20px',
              padding: '20px',
              backgroundColor: 'white',
              borderRadius: '8px',
            }}
          >
            <h3 style={{ marginTop: 0 }}>Interactive Elements Behind Modal:</h3>
            <p>
              You can interact with all these elements even when the modal is
              open:
            </p>

            <div style={{ marginBottom: '16px' }}>
              <button
                onClick={handleBgClick}
                style={{
                  padding: '10px 16px',
                  backgroundColor: '#2e7d32',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  marginRight: '10px',
                  fontSize: '14px',
                }}
              >
                Click Counter: {bgClickCount}
              </button>

              <button
                onClick={() => alert('Background button clicked!')}
                style={{
                  padding: '10px 16px',
                  backgroundColor: '#ed6c02',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                Show Alert
              </button>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: '4px',
                  fontWeight: 'bold',
                }}
              >
                Type something:
              </label>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="You can type here while modal is open"
                style={{
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  width: '300px',
                  fontSize: '14px',
                }}
              />
              <p
                style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#666' }}
              >
                Current value: "{inputValue}"
              </p>
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  marginBottom: '4px',
                  fontWeight: 'bold',
                }}
              >
                Select an option:
              </label>
              <select
                style={{
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px',
                }}
              >
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
              </select>
            </div>
          </div>

          <div
            style={{
              padding: '20px',
              backgroundColor: 'white',
              borderRadius: '8px',
            }}
          >
            <h3 style={{ marginTop: 0 }}>Scrollable Content</h3>
            <p>
              This content demonstrates that you can scroll the page even with
              the modal open:
            </p>
            {Array.from({ length: 20 }, (_, i) => (
              <p key={i} style={{ marginBottom: '10px' }}>
                Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
              </p>
            ))}
          </div>
        </div>

        <Modal {...args} open={open} onClose={handleClose}>
          <div style={modalContentStyle}>
            <h2
              style={{ margin: '0 0 16px 0', fontSize: '18px', color: '#333' }}
            >
              Modal without backdrop
            </h2>
            <p
              style={{
                margin: '0 0 16px 0',
                fontSize: '14px',
                lineHeight: '1.5',
              }}
            >
              This modal doesn't have a backdrop. You can:
            </p>
            <ul
              style={{
                margin: '0 0 16px 0',
                paddingLeft: '20px',
                fontSize: '14px',
              }}
            >
              <li>Click buttons behind this modal</li>
              <li>Type in input fields</li>
              <li>Scroll the page</li>
              <li>Interact with any element</li>
            </ul>
            <button
              onClick={handleClose}
              style={{
                padding: '10px 16px',
                backgroundColor: '#1976d2',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
                width: '100%',
              }}
            >
              Close Modal
            </button>
          </div>
        </Modal>
      </>
    );
  },
  args: {
    backdrop: false,
    disableScrollLock: true, // Отключаем блокировку прокрутки
    disableEnforceFocus: true, // Отключаем захват фокуса
    disableAutoFocus: true, // Отключаем автофокус
    disableRestoreFocus: true, // Отключаем восстановление фокуса
  },
};

/**
 * Modal с статичным backdrop (не закрывается при клике)
 */
export const StaticBackdrop: Story = {
  render: (args) => {
    const [open, setOpen] = useState(args.open || false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
      setOpen(false);
      args.onClose?.({}, 'buttonClick' as any);
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
          Open Static Modal
        </button>
        <Modal {...args} open={open} onClose={handleClose}>
          <div style={simpleContentStyle}>
            <h2 style={{ margin: '0 0 16px 0' }}>Static backdrop</h2>
            <p style={{ margin: '0 0 16px 0' }}>
              This modal cannot be closed by clicking on the backdrop or
              pressing Escape. Only the button below can close it.
            </p>
            <button
              onClick={handleClose}
              style={{
                padding: '8px 16px',
                backgroundColor: '#1976d2',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Close Modal
            </button>
          </div>
        </Modal>
      </>
    );
  },
  args: {
    backdrop: 'static',
    closeOnBackdropClick: false,
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
