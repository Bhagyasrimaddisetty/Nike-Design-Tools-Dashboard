import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useProductFilter } from '../hooks/useProducts';

const makeProduct = (overrides = {}) => ({
  id: 1,
  title: 'Test Product',
  price: 50,
  category: "men's clothing",
  rating: { rate: 4.0, count: 100 },
  status: 'active',
  ...overrides,
});

const PRODUCTS = [
  makeProduct({ id: 1, title: 'Air Max 90', price: 120, category: "men's clothing", status: 'active', rating: { rate: 4.5, count: 200 } }),
  makeProduct({ id: 2, title: 'Blazer Mid', price: 90, category: "men's clothing", status: 'review', rating: { rate: 4.0, count: 80 } }),
  makeProduct({ id: 3, title: 'React Infinity', price: 160, category: "women's clothing", status: 'active', rating: { rate: 4.8, count: 300 } }),
  makeProduct({ id: 4, title: 'Dunk Low', price: 110, category: "women's clothing", status: 'draft', rating: { rate: 3.9, count: 150 } }),
];

describe('useProductFilter', () => {
  it('returns all products by default', () => {
    const { result } = renderHook(() => useProductFilter(PRODUCTS));
    expect(result.current.filtered).toHaveLength(4);
  });

  it('filters by search query (case-insensitive)', () => {
    const { result } = renderHook(() => useProductFilter(PRODUCTS));
    act(() => result.current.setQuery('air'));
    expect(result.current.filtered).toHaveLength(1);
    expect(result.current.filtered[0].title).toBe('Air Max 90');
  });

  it('filters by category', () => {
    const { result } = renderHook(() => useProductFilter(PRODUCTS));
    act(() => result.current.setCategory("women's clothing"));
    expect(result.current.filtered).toHaveLength(2);
  });

  it('filters by status', () => {
    const { result } = renderHook(() => useProductFilter(PRODUCTS));
    act(() => result.current.setStatus('active'));
    expect(result.current.filtered).toHaveLength(2);
  });

  it('sorts by price ascending', () => {
    const { result } = renderHook(() => useProductFilter(PRODUCTS));
    act(() => result.current.setSortBy('price-asc'));
    const prices = result.current.filtered.map(p => p.price);
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  it('sorts by price descending', () => {
    const { result } = renderHook(() => useProductFilter(PRODUCTS));
    act(() => result.current.setSortBy('price-desc'));
    const prices = result.current.filtered.map(p => p.price);
    expect(prices).toEqual([...prices].sort((a, b) => b - a));
  });

  it('sorts by rating', () => {
    const { result } = renderHook(() => useProductFilter(PRODUCTS));
    act(() => result.current.setSortBy('rating'));
    const ratings = result.current.filtered.map(p => p.rating.rate);
    expect(ratings[0]).toBeGreaterThanOrEqual(ratings[1]);
  });

  it('returns empty array when no products match query', () => {
    const { result } = renderHook(() => useProductFilter(PRODUCTS));
    act(() => result.current.setQuery('xyznotexistent'));
    expect(result.current.filtered).toHaveLength(0);
  });

  it('combines query and category filters', () => {
    const { result } = renderHook(() => useProductFilter(PRODUCTS));
    act(() => {
      result.current.setQuery('dunk');
      result.current.setCategory("women's clothing");
    });
    expect(result.current.filtered).toHaveLength(1);
    expect(result.current.filtered[0].title).toBe('Dunk Low');
  });
});
