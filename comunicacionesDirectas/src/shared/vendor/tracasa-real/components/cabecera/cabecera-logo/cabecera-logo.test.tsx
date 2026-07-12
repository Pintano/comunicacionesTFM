import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CabeceraLogo } from './cabecera-logo';

describe('CabeceraLogo', () => {
  it('renders img when url provided', () => {
    render(
      <CabeceraLogo
        url="http://example.com/logo.png"
        height="40px"
        width="80px"
      />,
    );
    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'http://example.com/logo.png');
  });

  it('renders children when no url', () => {
    render(
      <CabeceraLogo>
        <span>Custom Child</span>
      </CabeceraLogo>,
    );
    expect(screen.getByText('Custom Child')).toBeInTheDocument();
  });
});
