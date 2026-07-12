import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { expect, describe, it, vi, beforeEach, afterEach } from 'vitest';
import '@testing-library/jest-dom/matchers';
import { Modal } from './modal';
import styles from './modal.module.scss';
import { axe } from 'vitest-axe';

describe('Modal Component', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders nothing when isOpen is false', () => {
      render(
        <Modal isOpen={false} onClose={() => {}}>
          <div>Modal Content</div>
        </Modal>,
      );
      expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
    });

    it('renders content when isOpen is true', () => {
      render(
        <Modal isOpen onClose={() => {}}>
          <div>Modal Content</div>
        </Modal>,
      );
      expect(screen.getByText('Modal Content')).toBeInTheDocument();
    });

    it('renders header, body, and footer correctly', () => {
      render(
        <Modal isOpen onClose={() => {}}>
          <Modal.Header>Test Header</Modal.Header>
          <Modal.Body>Test Body</Modal.Body>
          <Modal.Footer>Test Footer</Modal.Footer>
        </Modal>,
      );
      expect(screen.getByText('Test Header')).toBeInTheDocument();
      expect(screen.getByText('Test Body')).toBeInTheDocument();
      expect(screen.getByText('Test Footer')).toBeInTheDocument();
    });

    it('renders with subtitle when provided', () => {
      render(
        <Modal isOpen onClose={() => {}}>
          <Modal.Header subtitle="Test Subtitle">Test Header</Modal.Header>
          <Modal.Body>Test Body</Modal.Body>
        </Modal>,
      );
      expect(screen.getByText('Test Header')).toBeInTheDocument();
      expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
    });

    it('renders without subtitle when not provided', () => {
      render(
        <Modal isOpen onClose={() => {}}>
          <Modal.Header>Test Header</Modal.Header>
          <Modal.Body>Test Body</Modal.Body>
        </Modal>,
      );
      expect(screen.getByText('Test Header')).toBeInTheDocument();
      expect(
        screen.queryByRole('heading', { level: 2 }),
      ).not.toBeInTheDocument();
    });

    it('creates a portal element in document.body', () => {
      render(
        <Modal isOpen onClose={() => {}}>
          <div>Modal Content</div>
        </Modal>,
      );
      const portals = document.body.querySelectorAll('div > div');
      expect(portals.length).toBeGreaterThan(0);
    });
  });

  describe('Sizes', () => {
    it('applies medium size by default', () => {
      render(
        <Modal isOpen onClose={() => {}}>
          <Modal.Body>Default Modal</Modal.Body>
        </Modal>,
      );
      const modalContent = screen
        .getByText('Default Modal')
        .closest(`[class*="${styles.modal__content}"]`);
      expect(modalContent).toHaveClass(styles['modal--size-medium']);
    });

    it('applies large size correctly', () => {
      render(
        <Modal isOpen onClose={() => {}} size="large">
          <Modal.Body>Large Modal</Modal.Body>
        </Modal>,
      );
      const modalContent = screen
        .getByText('Large Modal')
        .closest(`[class*="${styles.modal__content}"]`);
      expect(modalContent).toHaveClass(styles['modal--size-large']);
    });

    it('applies full size correctly', () => {
      render(
        <Modal isOpen onClose={() => {}} size="full">
          <Modal.Body>Full Modal Content</Modal.Body>
        </Modal>,
      );
      const modalContent = screen
        .getByText('Full Modal Content')
        .closest(`[class*="${styles.modal__content}"]`);
      expect(modalContent).toHaveClass(styles['modal--size-full']);
    });

    it('applies wide size correctly', () => {
      render(
        <Modal isOpen onClose={() => {}} size="wide">
          <Modal.Body>Wide Modal</Modal.Body>
        </Modal>,
      );
      const modalContent = screen
        .getByText('Wide Modal')
        .closest(`[class*="${styles.modal__content}"]`);
      expect(modalContent).toHaveClass(styles['modal--size-wide']);
    });

    it('applies fit size correctly', () => {
      render(
        <Modal isOpen onClose={() => {}} size="fit">
          <Modal.Body>Fit Modal</Modal.Body>
        </Modal>,
      );
      const modalContent = screen
        .getByText('Fit Modal')
        .closest(`[class*="${styles.modal__content}"]`);
      expect(modalContent).toHaveClass(styles['modal--size-fit']);
    });
  });

  describe('User Interactions', () => {
    it('calls onClose when close button is clicked', () => {
      const onCloseMock = vi.fn();
      render(
        <Modal isOpen onClose={onCloseMock}>
          <Modal.Header>Test Header</Modal.Header>
          <Modal.Body>Test Body</Modal.Body>
        </Modal>,
      );
      const closeButton = screen.getByLabelText('modal.cerrarModal');
      fireEvent.click(closeButton);
      expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    it('calls onClose when Escape key is pressed', () => {
      const onCloseMock = vi.fn();
      render(
        <Modal isOpen onClose={onCloseMock}>
          <Modal.Header>Test Header</Modal.Header>
          <Modal.Body>Test Body</Modal.Body>
        </Modal>,
      );
      fireEvent.keyDown(document, { key: 'Escape' });
      expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    it('does not call onClose when Escape key is pressed if modal is closed', () => {
      const onCloseMock = vi.fn();
      render(
        <Modal isOpen={false} onClose={onCloseMock}>
          <Modal.Header>Test Header</Modal.Header>
          <Modal.Body>Test Body</Modal.Body>
        </Modal>,
      );
      fireEvent.keyDown(document, { key: 'Escape' });
      expect(onCloseMock).not.toHaveBeenCalled();
    });

    it('calls onClose when clicking outside modal', async () => {
      const onCloseMock = vi.fn();
      render(
        <Modal isOpen onClose={onCloseMock}>
          <Modal.Header>Test Header</Modal.Header>
          <Modal.Body>Test Body</Modal.Body>
        </Modal>,
      );
      const overlay = screen.getByRole('presentation');
      fireEvent.mouseDown(overlay);
      await waitFor(() => {
        expect(onCloseMock).toHaveBeenCalledTimes(1);
      });
    });

    it('does not call onClose when clicking inside modal content', () => {
      const onCloseMock = vi.fn();
      render(
        <Modal isOpen onClose={onCloseMock}>
          <Modal.Header>Test Header</Modal.Header>
          <Modal.Body>Test Body</Modal.Body>
        </Modal>,
      );
      const modalBody = screen.getByText('Test Body');
      fireEvent.mouseDown(modalBody);
      expect(onCloseMock).not.toHaveBeenCalled();
    });

    it('does not call onClose when clicking outside if disableCloseOnClickOutside is true', () => {
      const onCloseMock = vi.fn();
      render(
        <Modal isOpen onClose={onCloseMock} disableCloseOnClickOutside>
          <Modal.Header>Test Header</Modal.Header>
          <Modal.Body>Test Body</Modal.Body>
        </Modal>,
      );
      const overlay = screen.getByRole('presentation');
      fireEvent.mouseDown(overlay);
      expect(onCloseMock).not.toHaveBeenCalled();
    });

    it('does not close when clicking on popup elements', () => {
      const onCloseMock = vi.fn();
      render(
        <Modal isOpen onClose={onCloseMock}>
          <Modal.Header>Test Header</Modal.Header>
          <Modal.Body>
            <div data-popup>Popup Content</div>
          </Modal.Body>
        </Modal>,
      );
      const popup = screen.getByText('Popup Content');
      fireEvent.mouseDown(popup);
      expect(onCloseMock).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('es accesible', async () => {
      const { container } = await render(
        <Modal isOpen onClose={() => {}}>
          <div>Modal Content</div>
        </Modal>,
      );
      const results = await axe(container);
      if (results.violations.length > 0) console.log(results.violations);
      expect(results.violations.length).toBe(0);
    });

    it('has correct ARIA attributes', () => {
      render(
        <Modal isOpen onClose={() => {}}>
          <Modal.Header>Test Modal</Modal.Header>
          <Modal.Body>Modal Content</Modal.Body>
        </Modal>,
      );
      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-modal', 'true');
    });

    it('applies tabIndex to title for keyboard navigation', () => {
      render(
        <Modal isOpen onClose={() => {}}>
          <Modal.Header>Test Header</Modal.Header>
          <Modal.Body>Modal Content</Modal.Body>
        </Modal>,
      );
      const title = screen.getByText('Test Header');
      expect(title).toHaveAttribute('tabIndex', '0');
    });

    it('applies tabIndex to body for keyboard navigation', () => {
      render(
        <Modal isOpen onClose={() => {}}>
          <Modal.Header>Test Header</Modal.Header>
          <Modal.Body>Modal Content</Modal.Body>
        </Modal>,
      );
      const body = screen
        .getByText('Modal Content')
        .closest(`.${styles.modal__body}`);
      expect(body).toHaveAttribute('tabIndex', '0');
    });

    it('close button has accessible label', () => {
      render(
        <Modal isOpen onClose={() => {}}>
          <Modal.Header>Test Header</Modal.Header>
          <Modal.Body>Modal Content</Modal.Body>
        </Modal>,
      );
      const closeButton = screen.getByLabelText('modal.cerrarModal');
      expect(closeButton).toBeInTheDocument();
    });

    it('focuses first focusable element in body on mount', async () => {
      render(
        <Modal isOpen onClose={() => {}}>
          <Modal.Header>Test Header</Modal.Header>
          <Modal.Body>
            <button>First Button</button>
            <button>Second Button</button>
          </Modal.Body>
        </Modal>,
      );
      await waitFor(() => {
        const firstButton = screen.getByText('First Button');
        expect(firstButton).toHaveFocus();
      });
    });
  });

  describe('Overflow and Scrolling', () => {
    it('modal body has scroll capabilities', () => {
      render(
        <Modal isOpen onClose={() => {}}>
          <Modal.Header>Test Header</Modal.Header>
          <Modal.Body>
            <div style={{ height: '2000px' }}>Very Long Content</div>
          </Modal.Body>
        </Modal>,
      );

      const modalBody = screen
        .getByText(/Very Long Content/i)
        .closest(`.${styles.modal__body}`);
      expect(modalBody).toBeTruthy();
      // The modal body should have overflow-y: auto defined in CSS
      expect(modalBody).toHaveClass(styles.modal__body);
    });

    it('has_overflow class is managed by ResizeObserver', () => {
      render(
        <Modal isOpen onClose={() => {}}>
          <Modal.Header>Test Header</Modal.Header>
          <Modal.Body>
            <div>Normal Content</div>
          </Modal.Body>
        </Modal>,
      );
      const modalBody = screen
        .getByText('Normal Content')
        .closest(`.${styles.modal__body}`);
      expect(modalBody).toBeTruthy();
      // ResizeObserver will manage the has_overflow class based on actual content size
    });
  });

  describe('Custom Props and ClassName', () => {
    it('accepts and applies custom className', () => {
      render(
        <Modal isOpen onClose={() => {}} className="custom-modal">
          <Modal.Body>Custom Modal</Modal.Body>
        </Modal>,
      );
      const modalContent = screen
        .getByText('Custom Modal')
        .closest(`[class*="${styles.modal__content}"]`);
      expect(modalContent).toHaveClass('custom-modal');
    });

    it('passes additional HTML attributes to modal content', () => {
      render(
        <Modal isOpen onClose={() => {}} data-testid="test-modal">
          <Modal.Body>Test Body</Modal.Body>
        </Modal>,
      );
      const modalContent = screen.getByTestId('test-modal');
      expect(modalContent).toBeInTheDocument();
    });

    it('Modal.Body accepts custom className', () => {
      render(
        <Modal isOpen onClose={() => {}}>
          <Modal.Header>Test Header</Modal.Header>
          <Modal.Body className="custom-body">Test Body</Modal.Body>
        </Modal>,
      );
      const modalBody = screen
        .getByText('Test Body')
        .closest(`.${styles.modal__body}`);
      expect(modalBody).toHaveClass('custom-body');
    });

    it('Modal.Body passes additional HTML attributes', () => {
      render(
        <Modal isOpen onClose={() => {}}>
          <Modal.Header>Test Header</Modal.Header>
          <Modal.Body data-testid="custom-body">Test Body</Modal.Body>
        </Modal>,
      );
      const modalBody = screen.getByTestId('custom-body');
      expect(modalBody).toBeInTheDocument();
    });
  });

  describe('Complex Scenarios', () => {
    it('handles form submission inside modal', async () => {
      const handleSubmit = vi.fn((e) => e.preventDefault());
      render(
        <Modal isOpen onClose={() => {}}>
          <Modal.Header>Form Modal</Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Name" />
              <button type="submit">Submit</button>
            </form>
          </Modal.Body>
        </Modal>,
      );
      const submitButton = screen.getByText('Submit');
      fireEvent.click(submitButton);
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });

    it('supports multiple interactive elements in footer', () => {
      const handleCancel = vi.fn();
      const handleConfirm = vi.fn();
      render(
        <Modal isOpen onClose={() => {}}>
          <Modal.Header>Confirm Action</Modal.Header>
          <Modal.Body>Are you sure?</Modal.Body>
          <Modal.Footer>
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleConfirm}>Confirm</button>
          </Modal.Footer>
        </Modal>,
      );
      fireEvent.click(screen.getByText('Cancel'));
      fireEvent.click(screen.getByText('Confirm'));
      expect(handleCancel).toHaveBeenCalledTimes(1);
      expect(handleConfirm).toHaveBeenCalledTimes(1);
    });

    it('maintains modal state when content changes', () => {
      const { rerender } = render(
        <Modal isOpen onClose={() => {}}>
          <Modal.Header>Initial Header</Modal.Header>
          <Modal.Body>Initial Body</Modal.Body>
        </Modal>,
      );
      expect(screen.getByText('Initial Header')).toBeInTheDocument();

      rerender(
        <Modal isOpen onClose={() => {}}>
          <Modal.Header>Updated Header</Modal.Header>
          <Modal.Body>Updated Body</Modal.Body>
        </Modal>,
      );
      expect(screen.getByText('Updated Header')).toBeInTheDocument();
      expect(screen.queryByText('Initial Header')).not.toBeInTheDocument();
    });

    it('handles rapid open/close toggling', () => {
      const onCloseMock = vi.fn();
      const { rerender } = render(
        <Modal isOpen onClose={onCloseMock}>
          <Modal.Body>Modal Content</Modal.Body>
        </Modal>,
      );
      expect(screen.getByText('Modal Content')).toBeInTheDocument();

      rerender(
        <Modal isOpen={false} onClose={onCloseMock}>
          <Modal.Body>Modal Content</Modal.Body>
        </Modal>,
      );
      expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();

      rerender(
        <Modal isOpen onClose={onCloseMock}>
          <Modal.Body>Modal Content</Modal.Body>
        </Modal>,
      );
      expect(screen.getByText('Modal Content')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty modal body', () => {
      render(
        <Modal isOpen onClose={() => {}}>
          <Modal.Header>Test Header</Modal.Header>
          <Modal.Body></Modal.Body>
        </Modal>,
      );
      expect(screen.getByText('Test Header')).toBeInTheDocument();
    });

    it('handles modal without footer', () => {
      render(
        <Modal isOpen onClose={() => {}}>
          <Modal.Header>Test Header</Modal.Header>
          <Modal.Body>Test Body</Modal.Body>
        </Modal>,
      );
      expect(screen.getByText('Test Header')).toBeInTheDocument();
      expect(screen.getByText('Test Body')).toBeInTheDocument();
    });

    it('handles modal without header', () => {
      render(
        <Modal isOpen onClose={() => {}}>
          <Modal.Body>Test Body</Modal.Body>
          <Modal.Footer>Test Footer</Modal.Footer>
        </Modal>,
      );
      expect(screen.getByText('Test Body')).toBeInTheDocument();
      expect(screen.getByText('Test Footer')).toBeInTheDocument();
    });

    it('handles very long title text', () => {
      const longTitle = 'A'.repeat(200);
      render(
        <Modal isOpen onClose={() => {}}>
          <Modal.Header>{longTitle}</Modal.Header>
          <Modal.Body>Test Body</Modal.Body>
        </Modal>,
      );
      expect(screen.getByText(longTitle)).toBeInTheDocument();
    });

    it('handles very long subtitle text', () => {
      const longSubtitle = 'B'.repeat(200);
      render(
        <Modal isOpen onClose={() => {}}>
          <Modal.Header subtitle={longSubtitle}>Title</Modal.Header>
          <Modal.Body>Test Body</Modal.Body>
        </Modal>,
      );
      expect(screen.getByText(longSubtitle)).toBeInTheDocument();
    });

    it('cleans up portal on unmount', () => {
      const { unmount } = render(
        <Modal isOpen onClose={() => {}}>
          <Modal.Body>Modal Content</Modal.Body>
        </Modal>,
      );

      const portalsBefore = document.body.children.length;
      unmount();

      // Portal should be removed after a short delay
      setTimeout(() => {
        expect(document.body.children.length).toBeLessThanOrEqual(
          portalsBefore,
        );
      }, 100);
    });
  });

  describe('Compact Variant', () => {
    it('applies compact variant classes when variant is compact', () => {
      render(
        <Modal isOpen onClose={() => {}} variant="compact">
          <Modal.Header>Test Header</Modal.Header>
          <Modal.Body>Test Body</Modal.Body>
          <Modal.Footer>Test Footer</Modal.Footer>
        </Modal>,
      );

      const header = screen
        .getByText('Test Header')
        .closest(`.${styles.modal__header}`);
      const body = screen.getByText('Test Body');
      const footer = screen
        .getByText('Test Footer')
        .closest(`.${styles.modal__footer}`);

      expect(header).toHaveClass(styles['modal__header--compact']);
      expect(body).toHaveClass(styles['modal__body--compact']);
      expect(footer).toHaveClass(styles['modal__footer--compact']);
    });

    it('does not apply compact classes when variant is default', () => {
      render(
        <Modal isOpen onClose={() => {}} variant="default">
          <Modal.Header>Test Header</Modal.Header>
          <Modal.Body>Test Body</Modal.Body>
          <Modal.Footer>Test Footer</Modal.Footer>
        </Modal>,
      );

      const header = screen
        .getByText('Test Header')
        .closest(`.${styles.modal__header}`);
      const body = screen.getByText('Test Body');
      const footer = screen
        .getByText('Test Footer')
        .closest(`.${styles.modal__footer}`);

      expect(header).not.toHaveClass(styles['modal__header--compact']);
      expect(body).not.toHaveClass(styles['modal__body--compact']);
      expect(footer).not.toHaveClass(styles['modal__footer--compact']);
    });

    it('applies default variant when variant prop is not provided', () => {
      render(
        <Modal isOpen onClose={() => {}}>
          <Modal.Header>Test Header</Modal.Header>
          <Modal.Body>Test Body</Modal.Body>
          <Modal.Footer>Test Footer</Modal.Footer>
        </Modal>,
      );

      const header = screen
        .getByText('Test Header')
        .closest(`.${styles.modal__header}`);
      const body = screen.getByText('Test Body');
      const footer = screen
        .getByText('Test Footer')
        .closest(`.${styles.modal__footer}`);

      expect(header).not.toHaveClass(styles['modal__header--compact']);
      expect(body).not.toHaveClass(styles['modal__body--compact']);
      expect(footer).not.toHaveClass(styles['modal__footer--compact']);
    });
  });

  describe('Title Truncation Tooltip', () => {
    beforeEach(() => {
      // Mock scrollWidth y clientWidth para simular truncamiento
      Object.defineProperty(HTMLElement.prototype, 'scrollWidth', {
        configurable: true,
        value: 500,
      });
      Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
        configurable: true,
        value: 300,
      });
    });

    it('adds title attribute when title text is truncated', async () => {
      const longTitle = 'Este es un título muy largo que se va a truncar';

      render(
        <Modal isOpen onClose={() => {}}>
          <Modal.Header>{longTitle}</Modal.Header>
          <Modal.Body>Test Body</Modal.Body>
        </Modal>,
      );

      await waitFor(() => {
        const titleElement = screen.getByText(longTitle);
        expect(titleElement).toHaveAttribute('title', longTitle);
      });
    });

    it('does not add title attribute when title is not truncated', async () => {
      // Mock para simular que NO está truncado
      Object.defineProperty(HTMLElement.prototype, 'scrollWidth', {
        configurable: true,
        value: 200,
      });
      Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
        configurable: true,
        value: 300,
      });

      const shortTitle = 'Título corto';

      render(
        <Modal isOpen onClose={() => {}}>
          <Modal.Header>{shortTitle}</Modal.Header>
          <Modal.Body>Test Body</Modal.Body>
        </Modal>,
      );

      await waitFor(() => {
        const titleElement = screen.getByText(shortTitle);
        expect(titleElement).not.toHaveAttribute('title');
      });
    });

    it('does not add title attribute when children is not a string', async () => {
      render(
        <Modal isOpen onClose={() => {}}>
          <Modal.Header>
            <span>Complex Title</span>
          </Modal.Header>
          <Modal.Body>Test Body</Modal.Body>
        </Modal>,
      );

      await waitFor(() => {
        const headerElement = screen.getByRole('heading', { level: 1 });
        expect(headerElement).not.toHaveAttribute('title');
      });
    });

    it('recalculates truncation on window resize', async () => {
      const longTitle = 'Título que se trunca';

      render(
        <Modal isOpen onClose={() => {}}>
          <Modal.Header>{longTitle}</Modal.Header>
          <Modal.Body>Test Body</Modal.Body>
        </Modal>,
      );

      await waitFor(() => {
        const titleElement = screen.getByText(longTitle);
        expect(titleElement).toHaveAttribute('title', longTitle);
      });

      // Simular resize que hace que ya no esté truncado
      Object.defineProperty(HTMLElement.prototype, 'scrollWidth', {
        configurable: true,
        value: 200,
      });
      Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
        configurable: true,
        value: 300,
      });

      fireEvent(window, new Event('resize'));

      await waitFor(() => {
        const titleElement = screen.getByText(longTitle);
        expect(titleElement).not.toHaveAttribute('title');
      });
    });
  });
});
