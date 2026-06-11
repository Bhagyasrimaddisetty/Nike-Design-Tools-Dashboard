import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import ProductCard from '../components/ProductCard';

const mockProduct = {
  id: 1,
  title: 'Air Max Test Shoe',
  price: 129.99,
  image: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_FMwebp_QL65_.jpg',
  category: "men's clothing",
  rating: { rate: 4.2, count: 98 },
  status: 'active',
  sku: 'NK-00001',
  season: 'SS26',
  colorway: 'Triple Black',
  emoji: '👕',
};

function renderCard(product = mockProduct) {
  return render(
    <MemoryRouter>
      <ProductCard product={product} />
    </MemoryRouter>
  );
}

describe('ProductCard', () => {
  it('renders product title', () => {
    renderCard();
    expect(screen.getByText('Air Max Test Shoe')).toBeInTheDocument();
  });

  it('renders formatted price', () => {
    renderCard();
    expect(screen.getByText('$129.99')).toBeInTheDocument();
  });

  it('renders category', () => {
    renderCard();
    expect(screen.getByText("men's clothing")).toBeInTheDocument();
  });

  it('renders status badge', () => {
    renderCard();
    expect(screen.getByText(/active/i)).toBeInTheDocument();
  });

  it('renders rating', () => {
    renderCard();
    expect(screen.getByText(/4\.2/)).toBeInTheDocument();
  });

  it('links to the correct product detail route', () => {
    renderCard();
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/products/1');
  });

  it('renders review status badge correctly', () => {
    renderCard({ ...mockProduct, status: 'review' });
    expect(screen.getByText(/review/i)).toBeInTheDocument();
  });

  it('renders draft status badge correctly', () => {
    renderCard({ ...mockProduct, status: 'draft' });
    expect(screen.getByText(/draft/i)).toBeInTheDocument();
  });
});
