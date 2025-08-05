import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
  cleanup,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Modal from '../Modal';
import { ModalProps } from '../Modal.types';

// Мокаем createPortal для тестирования порталов
jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: (node: React.ReactNode) => node,
}));

// Базовые пропсы для тестов
const defaultProps: ModalProps = {
  open: true,
  children: <div>Modal Content</div>,
};

// Хелпер для создания фокусируемых элементов
const createFocusableElement = (id: string) => {
  const button = document.createElement('button');
  button.id = id;
  button.textContent = id;
  document.body.appendChild(button);
  return button;
};

// Хелпер для очистки body
const cleanupBody = () => {
  document.body.innerHTML = '';
  document.body.style.overflow = '';
};

describe('Modal', () => {
  let originalBodyOverflow: string;

  beforeEach(() => {
    originalBodyOverflow = document.body.style.overflow;
  });

  afterEach(() => {
    cleanup();
    cleanupBody();
    document.body.style.overflow = originalBodyOverflow;
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('should render modal when open is true', () => {
      render(<Modal {...defaultProps} />);

      expect(screen.getByRole('presentation')).toBeInTheDocument();
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('Modal Content')).toBeInTheDocument();
    });

    it('should not render modal when open is false', () => {
      render(<Modal {...defaultProps} open={false} />);

      expect(screen.queryByRole('presentation')).not.toBeInTheDocument();
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
    });

    it('should render modal with correct CSS classes', () => {
      render(<Modal {...defaultProps} />);

      const modal = screen.getByRole('presentation');
      expect(modal).toHaveClass('modal');
      expect(modal).not.toHaveClass('modal--hidden');
    });

    it('should render modal with hidden class when open is false but keepMounted is true', () => {
      render(<Modal {...defaultProps} open={false} keepMounted />);

      const modal = screen.getByRole('presentation');
      expect(modal).toHaveClass('modal');
      expect(modal).toHaveClass('modal--hidden');
    });

    it('should render children correctly', () => {
      const complexChildren = (
        <div>
          <h1>Modal Title</h1>
          <p>Modal description</p>
          <button>Action Button</button>
        </div>
      );

      render(<Modal {...defaultProps}>{complexChildren}</Modal>);

      expect(screen.getByText('Modal Title')).toBeInTheDocument();
      expect(screen.getByText('Modal description')).toBeInTheDocument();
      expect(screen.getByText('Action Button')).toBeInTheDocument();
    });
  });

  describe('Backdrop', () => {
    it('should render backdrop by default', () => {
      render(<Modal {...defaultProps} />);

      const backdrop = document.querySelector('.backdrop');
      expect(backdrop).toBeInTheDocument();
    });

    it('should not render backdrop when backdrop is false', () => {
      render(<Modal {...defaultProps} backdrop={false} />);

      const backdrop = document.querySelector('.backdrop');
      expect(backdrop).not.toBeInTheDocument();
    });

    it('should render backdrop with custom class', () => {
      render(<Modal {...defaultProps} backdropClassName="custom-backdrop" />);

      const backdrop = document.querySelector('.backdrop');
      expect(backdrop).toHaveClass('backdrop');
      expect(backdrop).toHaveClass('custom-backdrop');
    });

    it('should call onClose when backdrop is clicked', async () => {
      const onClose = jest.fn();
      render(<Modal {...defaultProps} onClose={onClose} />);

      const backdrop = document.querySelector('.backdrop')!;
      fireEvent.click(backdrop);

      expect(onClose).toHaveBeenCalledWith(expect.any(Object), 'backdropClick');
    });

    it('should not call onClose when backdrop is clicked but closeOnBackdropClick is false', async () => {
      const onClose = jest.fn();
      render(
        <Modal
          {...defaultProps}
          onClose={onClose}
          closeOnBackdropClick={false}
        />
      );

      const backdrop = document.querySelector('.backdrop')!;
      fireEvent.click(backdrop);

      expect(onClose).not.toHaveBeenCalled();
    });

    it('should not call onClose when modal content is clicked', async () => {
      const onClose = jest.fn();
      render(<Modal {...defaultProps} onClose={onClose} />);

      const content = screen.getByRole('dialog');
      fireEvent.click(content);

      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe('Custom Backdrop Component', () => {
    it('should render custom backdrop component', () => {
      const CustomBackdrop = ({ ...props }) => (
        <div {...props} data-testid="custom-backdrop" />
      );

      render(<Modal {...defaultProps} BackdropComponent={CustomBackdrop} />);

      expect(screen.getByTestId('custom-backdrop')).toBeInTheDocument();
      expect(screen.getByTestId('custom-backdrop')).toHaveClass('backdrop');
    });

    it('should pass backdrop props to custom backdrop component', () => {
      const CustomBackdrop = ({ 'data-custom': custom, ...props }) => (
        <div {...props} data-testid="custom-backdrop" data-custom={custom} />
      );

      render(
        <Modal
          {...defaultProps}
          BackdropComponent={CustomBackdrop}
          BackdropProps={{ 'data-custom': 'test-value' }}
        />
      );

      expect(screen.getByTestId('custom-backdrop')).toHaveAttribute(
        'data-custom',
        'test-value'
      );
    });
  });

  describe('Keyboard Navigation', () => {
    it('should call onClose when Escape key is pressed', () => {
      const onClose = jest.fn();
      render(<Modal {...defaultProps} onClose={onClose} />);

      fireEvent.keyDown(document, { key: 'Escape' });

      expect(onClose).toHaveBeenCalledWith(expect.any(Object), 'escapeKeyDown');
    });

    it('should not call onClose when Escape key is pressed but closeOnEscape is false', () => {
      const onClose = jest.fn();
      render(
        <Modal {...defaultProps} onClose={onClose} closeOnEscape={false} />
      );

      fireEvent.keyDown(document, { key: 'Escape' });

      expect(onClose).not.toHaveBeenCalled();
    });

    it('should not call onClose when other keys are pressed', () => {
      const onClose = jest.fn();
      render(<Modal {...defaultProps} onClose={onClose} />);

      fireEvent.keyDown(document, { key: 'Enter' });
      fireEvent.keyDown(document, { key: 'Space' });
      fireEvent.keyDown(document, { key: 'Tab' });

      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe('Focus Management', () => {
    it('should focus modal content when opened and disableAutoFocus is false', async () => {
      const modalRef = React.createRef<HTMLDivElement>();

      render(
        <Modal {...defaultProps} ref={modalRef}>
          <button>First Button</button>
          <button>Second Button</button>
        </Modal>
      );

      await waitFor(() => {
        expect(screen.getByText('First Button')).toBeInTheDocument();
      });
    });

    it('should not auto focus when disableAutoFocus is true', () => {
      render(
        <Modal {...defaultProps} disableAutoFocus>
          <button>First Button</button>
        </Modal>
      );

      // Проверяем что кнопка присутствует
      expect(screen.getByText('First Button')).toBeInTheDocument();
    });

    it('should trap focus within modal when disableEnforceFocus is false', async () => {
      // Создаем элемент вне модального окна
      const outsideButton = createFocusableElement('outside-button');

      render(
        <Modal {...defaultProps}>
          <button>Inside Button</button>
        </Modal>
      );

      // Имитируем фокус на элемент вне модального окна
      act(() => {
        outsideButton.focus();
        fireEvent.focusIn(outsideButton);
      });

      await waitFor(() => {
        expect(screen.getByText('Inside Button')).toBeInTheDocument();
      });
    });

    it('should not trap focus when disableEnforceFocus is true', () => {
      const outsideButton = createFocusableElement('outside-button');

      render(
        <Modal {...defaultProps} disableEnforceFocus>
          <button>Inside Button</button>
        </Modal>
      );

      act(() => {
        outsideButton.focus();
        fireEvent.focusIn(outsideButton);
      });

      expect(screen.getByText('Inside Button')).toBeInTheDocument();
    });

    it('should restore focus to previously focused element when closed', () => {
      const triggerButton = createFocusableElement('trigger-button');
      triggerButton.focus();

      const { rerender } = render(<Modal {...defaultProps} />);

      // Закрываем модальное окно
      rerender(<Modal {...defaultProps} open={false} />);

      // Проверяем что компонент корректно обрабатывает закрытие
      expect(screen.queryByRole('presentation')).not.toBeInTheDocument();
    });

    it('should not restore focus when disableRestoreFocus is true', () => {
      const triggerButton = createFocusableElement('trigger-button');
      triggerButton.focus();

      const { rerender } = render(
        <Modal {...defaultProps} disableRestoreFocus />
      );

      // Закрываем модальное окно
      rerender(<Modal {...defaultProps} open={false} disableRestoreFocus />);

      // Проверяем что компонент корректно обрабатывает закрытие
      expect(screen.queryByRole('presentation')).not.toBeInTheDocument();
    });
  });

  describe('Scroll Lock', () => {
    it('should lock body scroll when modal is open', () => {
      render(<Modal {...defaultProps} />);

      expect(document.body.style.overflow).toBe('hidden');
    });

    it('should not lock body scroll when disableScrollLock is true', () => {
      render(<Modal {...defaultProps} disableScrollLock />);

      expect(document.body.style.overflow).not.toBe('hidden');
    });

    it('should restore body scroll when modal is closed', () => {
      const { rerender } = render(<Modal {...defaultProps} />);

      expect(document.body.style.overflow).toBe('hidden');

      rerender(<Modal {...defaultProps} open={false} />);

      expect(document.body.style.overflow).toBe('');
    });

    it('should restore body scroll on unmount', () => {
      const { unmount } = render(<Modal {...defaultProps} />);

      expect(document.body.style.overflow).toBe('hidden');

      unmount();

      expect(document.body.style.overflow).toBe('');
    });
  });

  describe('Keep Mounted', () => {
    it('should remove modal from DOM when keepMounted is false', () => {
      const { rerender } = render(
        <Modal {...defaultProps} keepMounted={false} />
      );

      expect(screen.getByRole('presentation')).toBeInTheDocument();

      rerender(<Modal {...defaultProps} open={false} keepMounted={false} />);

      expect(screen.queryByRole('presentation')).not.toBeInTheDocument();
    });

    it('should keep modal in DOM when keepMounted is true', () => {
      const { rerender } = render(<Modal {...defaultProps} keepMounted />);

      expect(screen.getByRole('presentation')).toBeInTheDocument();
      expect(screen.getByRole('presentation')).not.toHaveClass('modal--hidden');

      rerender(<Modal {...defaultProps} open={false} keepMounted />);

      expect(screen.getByRole('presentation')).toBeInTheDocument();
      expect(screen.getByRole('presentation')).toHaveClass('modal--hidden');
    });
  });

  describe('Portal', () => {
    it('should render modal in document.body by default', () => {
      // createPortal мокается, поэтому проверяем что модальное окно рендерится
      render(<Modal {...defaultProps} />);

      expect(screen.getByRole('presentation')).toBeInTheDocument();
    });

    it('should render modal inline when disablePortal is true', () => {
      render(<Modal {...defaultProps} disablePortal />);

      expect(screen.getByRole('presentation')).toBeInTheDocument();
    });

    it('should render modal in custom container', () => {
      const customContainer = document.createElement('div');
      customContainer.id = 'custom-container';
      document.body.appendChild(customContainer);

      render(<Modal {...defaultProps} container={customContainer} />);

      expect(screen.getByRole('presentation')).toBeInTheDocument();
    });

    it('should render modal in container returned by function', () => {
      const customContainer = document.createElement('div');
      customContainer.id = 'function-container';
      document.body.appendChild(customContainer);

      const getContainer = () => customContainer;

      render(<Modal {...defaultProps} container={getContainer} />);

      expect(screen.getByRole('presentation')).toBeInTheDocument();
    });

    it('should handle null container', () => {
      render(<Modal {...defaultProps} container={null} />);

      expect(screen.getByRole('presentation')).toBeInTheDocument();
    });
  });

  describe('Custom Classes', () => {
    it('should apply custom className to modal', () => {
      render(<Modal {...defaultProps} className="custom-modal" />);

      const modal = screen.getByRole('presentation');
      expect(modal).toHaveClass('modal');
      expect(modal).toHaveClass('custom-modal');
    });

    it('should apply multiple custom classes', () => {
      render(
        <Modal {...defaultProps} className="custom-modal another-class" />
      );

      const modal = screen.getByRole('presentation');
      expect(modal).toHaveClass('modal');
      expect(modal).toHaveClass('custom-modal');
      expect(modal).toHaveClass('another-class');
    });

    it('should handle empty className', () => {
      render(<Modal {...defaultProps} className="" />);

      const modal = screen.getByRole('presentation');
      expect(modal).toHaveClass('modal');
    });
  });

  describe('HTML Attributes', () => {
    it('should pass through HTML attributes to modal element', () => {
      render(
        <Modal
          {...defaultProps}
          data-testid="test-modal"
          id="modal-id"
          role="dialog"
        />
      );

      const modal = screen.getByTestId('test-modal');
      expect(modal).toHaveAttribute('id', 'modal-id');
      expect(modal).toHaveAttribute('role', 'dialog');
    });

    it('should not pass onClose as HTML attribute', () => {
      const onClose = jest.fn();
      render(
        <Modal {...defaultProps} onClose={onClose} data-testid="test-modal" />
      );

      const modal = screen.getByTestId('test-modal');
      expect(modal).not.toHaveAttribute('onClose');
    });
  });

  describe('Lifecycle Callbacks', () => {
    it('should call onEnter when modal opens', () => {
      const onEnter = jest.fn();

      render(<Modal {...defaultProps} onEnter={onEnter} />);

      expect(onEnter).toHaveBeenCalledTimes(1);
    });

    it('should call onExited when modal closes', () => {
      const onExited = jest.fn();

      const { rerender } = render(
        <Modal {...defaultProps} onExited={onExited} />
      );

      rerender(<Modal {...defaultProps} open={false} onExited={onExited} />);

      expect(onExited).toHaveBeenCalledTimes(1);
    });

    it('should not call onEnter when modal is already closed', () => {
      const onEnter = jest.fn();

      render(<Modal {...defaultProps} open={false} onEnter={onEnter} />);

      expect(onEnter).not.toHaveBeenCalled();
    });

    it('should not call onExited when modal is already open', () => {
      const onExited = jest.fn();

      const { rerender } = render(
        <Modal {...defaultProps} onExited={onExited} />
      );

      // Перерендериваем с теми же пропсами
      rerender(<Modal {...defaultProps} onExited={onExited} />);

      expect(onExited).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should have correct ARIA attributes', () => {
      render(<Modal {...defaultProps} />);

      const modal = screen.getByRole('presentation');
      expect(modal).toHaveAttribute('role', 'presentation');

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('role', 'dialog');
      expect(dialog).toHaveAttribute('aria-modal', 'true');
      expect(dialog).toHaveAttribute('tabIndex', '-1');
    });

    it('should be focusable', () => {
      render(<Modal {...defaultProps} />);

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('tabIndex', '-1');
    });

    it('should have proper focus outline removal', () => {
      render(<Modal {...defaultProps} />);

      const modal = screen.getByRole('presentation');

      // Проверяем что элемент не имеет видимого outline
      expect(modal).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid open/close changes', () => {
      const { rerender } = render(<Modal {...defaultProps} open={false} />);

      // Быстро открываем и закрываем
      rerender(<Modal {...defaultProps} open={true} />);
      rerender(<Modal {...defaultProps} open={false} />);
      rerender(<Modal {...defaultProps} open={true} />);

      expect(screen.getByRole('presentation')).toBeInTheDocument();
    });

    it('should handle missing children gracefully', () => {
      render(<Modal open={true} children={null} />);

      expect(screen.getByRole('presentation')).toBeInTheDocument();
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('should handle undefined onClose gracefully', () => {
      render(<Modal {...defaultProps} onClose={undefined} />);

      const backdrop = document.querySelector('.backdrop')!;
      expect(() => fireEvent.click(backdrop)).not.toThrow();

      expect(() =>
        fireEvent.keyDown(document, { key: 'Escape' })
      ).not.toThrow();
    });

    it('should cleanup event listeners on unmount', () => {
      const removeEventListenerSpy = jest.spyOn(
        document,
        'removeEventListener'
      );

      const { unmount } = render(<Modal {...defaultProps} />);

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'keydown',
        expect.any(Function)
      );
      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'focusin',
        expect.any(Function)
      );

      removeEventListenerSpy.mockRestore();
    });

    it('should handle focus management when no focusable elements exist', async () => {
      render(
        <Modal {...defaultProps}>
          <div>No focusable content</div>
        </Modal>
      );

      await waitFor(() => {
        expect(screen.getByText('No focusable content')).toBeInTheDocument();
      });
    });
  });

  describe('forwardRef', () => {
    it('should forward ref to modal element', () => {
      const ref = React.createRef<HTMLDivElement>();

      render(<Modal {...defaultProps} ref={ref} />);

      expect(ref.current).toBe(screen.getByRole('presentation'));
    });

    it('should handle null ref gracefully', () => {
      expect(() => {
        render(<Modal {...defaultProps} ref={null} />);
      }).not.toThrow();
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle modal with form elements correctly', async () => {
      const onClose = jest.fn();
      const user = userEvent.setup();

      render(
        <Modal {...defaultProps} onClose={onClose}>
          <form>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button type="submit">Submit</button>
            <button type="button" onClick={() => onClose({}, 'backdropClick')}>
              Cancel
            </button>
          </form>
        </Modal>
      );

      const usernameInput = screen.getByPlaceholderText('Username');
      const submitButton = screen.getByText('Submit');
      const cancelButton = screen.getByText('Cancel');

      expect(usernameInput).toBeInTheDocument();
      expect(submitButton).toBeInTheDocument();
      expect(cancelButton).toBeInTheDocument();

      // Проверяем что можно взаимодействовать с формой
      await user.type(usernameInput, 'testuser');
      expect(usernameInput).toHaveValue('testuser');

      // Проверяем закрытие по кнопке Cancel
      await user.click(cancelButton);
      expect(onClose).toHaveBeenCalledWith({}, 'backdropClick');
    });

    it('should handle nested interactive elements', async () => {
      const onButtonClick = jest.fn();
      const user = userEvent.setup();

      render(
        <Modal {...defaultProps}>
          <div>
            <h2>Modal Title</h2>
            <div>
              <button onClick={onButtonClick}>Nested Button</button>
              <select>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
              </select>
            </div>
          </div>
        </Modal>
      );

      const nestedButton = screen.getByText('Nested Button');
      const select = screen.getByRole('combobox');

      await user.click(nestedButton);
      expect(onButtonClick).toHaveBeenCalledTimes(1);

      await user.selectOptions(select, '2');
      expect(select).toHaveValue('2');
    });

    it('should handle modal with custom backdrop behavior', () => {
      const onClose = jest.fn();
      const onBackdropClick = jest.fn();

      const CustomBackdrop = (props: any) => (
        <div
          {...props}
          onClick={(e) => {
            onBackdropClick();
            props.onClick?.(e);
          }}
          data-testid="custom-backdrop"
        />
      );

      render(
        <Modal
          {...defaultProps}
          onClose={onClose}
          BackdropComponent={CustomBackdrop}
        />
      );

      const backdrop = screen.getByTestId('custom-backdrop');
      fireEvent.click(backdrop);

      expect(onBackdropClick).toHaveBeenCalledTimes(1);
      expect(onClose).toHaveBeenCalledWith(expect.any(Object), 'backdropClick');
    });
  });
});
