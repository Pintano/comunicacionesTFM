import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextButton } from './text-button';

describe('TextButton', () => {
  it('should render with text', () => {
    render(<TextButton onClick={() => {}}>Ver más</TextButton>);
    expect(
      screen.getByRole('button', { name: /ver más/i }),
    ).toBeInTheDocument();
  });

  it('should call onClick when clicked', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<TextButton onClick={handleClick}>Click me</TextButton>);

    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should not call onClick when disabled', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(
      <TextButton onClick={handleClick} disabled>
        Click me
      </TextButton>,
    );

    await user.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should render with primary variant by default', () => {
    render(<TextButton onClick={() => {}}>Link</TextButton>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('text-button--primary');
  });

  it('should render with primary variant', () => {
    render(
      <TextButton onClick={() => {}} variant="primary">
        Link
      </TextButton>,
    );
    const button = screen.getByRole('button');
    expect(button.className).toContain('text-button--primary');
  });

  it('should render with secondary variant', () => {
    render(
      <TextButton onClick={() => {}} variant="secondary">
        Link
      </TextButton>,
    );
    const button = screen.getByRole('button');
    expect(button.className).toContain('text-button--secondary');
  });

  it('should render with default size', () => {
    render(<TextButton onClick={() => {}}>Link</TextButton>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('text-button--default');
  });

  it('should render with small size', () => {
    render(
      <TextButton onClick={() => {}} size="small">
        Link
      </TextButton>,
    );
    const button = screen.getByRole('button');
    expect(button.className).toContain('text-button--small');
  });

  it('should render with icon', () => {
    render(
      <TextButton onClick={() => {}} icono="arrowRight">
        Ver más
      </TextButton>,
    );
    const button = screen.getByRole('button');
    expect(button.querySelector('svg')).toBeInTheDocument();
  });

  it('should apply disabled class when disabled', () => {
    render(
      <TextButton onClick={() => {}} disabled>
        Link
      </TextButton>,
    );
    const button = screen.getByRole('button');
    expect(button.className).toContain('text-button--disabled');
    expect(button).toBeDisabled();
  });

  it('should accept custom className', () => {
    render(
      <TextButton onClick={() => {}} className="custom-class">
        Link
      </TextButton>,
    );
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('should have aria-label when textoAccesibilidad is provided', () => {
    render(
      <TextButton onClick={() => {}} aria-label="Custom aria label">
        Link
      </TextButton>,
    );
    expect(
      screen.getByRole('button', { name: /custom aria label/i }),
    ).toBeInTheDocument();
  });

  it('should have button type="button"', () => {
    render(<TextButton onClick={() => {}}>Link</TextButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'button');
  });

  it('should render icon with aria-hidden', () => {
    render(
      <TextButton onClick={() => {}} icono="check">
        Success
      </TextButton>,
    );
    const icon = screen.getByRole('button').querySelector('svg');
    expect(icon).toBeTruthy();
  });

  describe('unstyled variant', () => {
    it('should render with unstyled variant', () => {
      render(
        <TextButton onClick={() => {}} variant="unstyled">
          Unstyled
        </TextButton>,
      );
      const button = screen.getByRole('button');
      expect(button.className).toContain('text-button');
      expect(button.className).not.toContain('text-button--primary');
      expect(button.className).not.toContain('text-button--secondary');
      expect(button.className).not.toContain('text-button--default');
    });

    it('should inherit color from parent', () => {
      render(
        <div data-testid="parent-color" style={{ color: 'rgb(255, 0, 0)' }}>
          <TextButton onClick={() => {}} variant="unstyled">
            Red text
          </TextButton>
        </div>,
      );
      const parentDiv = screen.getByTestId('parent-color');
      expect(parentDiv).toHaveStyle({ color: 'rgb(255, 0, 0)' });
    });

    it('should render with icon children when unstyled', () => {
      const IconComponent = () => <svg data-testid="test-icon" />;

      render(
        <TextButton
          onClick={() => {}}
          variant="unstyled"
          aria-label="Icon button"
        >
          <IconComponent />
        </TextButton>,
      );

      expect(
        screen.getByRole('button', { name: 'Icon button' }),
      ).toBeInTheDocument();
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });

    it('should support additional button props', () => {
      render(
        <TextButton
          onClick={() => {}}
          variant="unstyled"
          type="submit"
          data-testid="submit-button"
        >
          Submit
        </TextButton>,
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
      expect(button).toHaveAttribute('data-testid', 'submit-button');
    });
  });

  describe('ref forwarding', () => {
    it('should forward ref correctly', () => {
      const ref = vi.fn();
      render(
        <TextButton onClick={() => {}} ref={ref}>
          With ref
        </TextButton>,
      );

      expect(ref).toHaveBeenCalled();
      expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLButtonElement);
    });
  });
});
