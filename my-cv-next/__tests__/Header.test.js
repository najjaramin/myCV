import { render, screen } from '@testing-library/react';
import Header from '../components/Header';

describe('Header', () => {
  it('affiche le logo "AN."', () => {
    render(<Header />);
    // Le logo contient "AN" et un point "."
    const logo = screen.getByRole('link', { name: /AN\s*\./i });
    expect(logo).toBeInTheDocument();
  });

  it('affiche les liens de navigation', () => {
    render(<Header />);
    expect(screen.getByText(/About/i)).toBeInTheDocument();
    expect(screen.getByText(/Skills/i)).toBeInTheDocument();
    expect(screen.getByText(/Projects/i)).toBeInTheDocument();
  });

  it('affiche le bouton Contact', () => {
    render(<Header />);
    expect(screen.getByText(/Contact/i)).toBeInTheDocument();
  });
});
