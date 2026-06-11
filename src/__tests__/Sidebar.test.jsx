import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Sidebar from '../components/Sidebar';

function renderSidebar(initialPath = '/') {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Sidebar />
    </MemoryRouter>
  );
}

describe('Sidebar', () => {
  it('renders Dashboard link', () => {
    renderSidebar();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('renders Products link', () => {
    renderSidebar();
    expect(screen.getByText('Products')).toBeInTheDocument();
  });

  it('renders Analytics link', () => {
    renderSidebar();
    expect(screen.getByText('Analytics')).toBeInTheDocument();
  });

  it('renders all section labels', () => {
    renderSidebar();
    expect(screen.getByText('Main')).toBeInTheDocument();
    expect(screen.getByText('Tools')).toBeInTheDocument();
  });

  it('marks Dashboard as active on root path', () => {
    renderSidebar('/');
    const dashLink = screen.getByText('Dashboard').closest('a');
    expect(dashLink).toHaveClass('active');
  });

  it('marks Products as active on /products path', () => {
    renderSidebar('/products');
    const productsLink = screen.getByText('Products').closest('a');
    expect(productsLink).toHaveClass('active');
  });

  it('shows product count badge', () => {
    renderSidebar();
    expect(screen.getByText('20')).toBeInTheDocument();
  });
});
