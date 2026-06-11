import { useState, useEffect } from 'react';

const CATEGORY_EMOJI = {
  "men's clothing": '👕',
  "women's clothing": '👗',
  "jewelery": '💍',
  "electronics": '⚡',
};

const STATUS_MAP = ['active', 'active', 'active', 'review', 'draft'];

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch('https://fakestoreapi.com/products')
      .then(r => r.json())
      .then(data => {
        if (cancelled) return;
        // Enrich data with Nike-style metadata
        const enriched = data.map((p, i) => ({
          ...p,
          emoji: CATEGORY_EMOJI[p.category] || '📦',
          status: STATUS_MAP[i % STATUS_MAP.length],
          season: ['SS25', 'FW25', 'SS26'][i % 3],
          colorway: ['Triple Black', 'Sail/White', 'University Red', 'Court Blue', 'Volt'][i % 5],
          sku: `NK-${String(p.id).padStart(5, '0')}`,
        }));
        setProducts(enriched);
        setLoading(false);
      })
      .catch(err => {
        if (cancelled) return;
        setError(err.message);
        setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  return { products, loading, error };
}

export function useProduct(id) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    setLoading(true);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(r => r.json())
      .then(data => {
        if (cancelled) return;
        setProduct({
          ...data,
          emoji: CATEGORY_EMOJI[data.category] || '📦',
          status: STATUS_MAP[data.id % STATUS_MAP.length],
          season: ['SS25', 'FW25', 'SS26'][data.id % 3],
          colorway: ['Triple Black', 'Sail/White', 'University Red', 'Court Blue', 'Volt'][data.id % 5],
          sku: `NK-${String(data.id).padStart(5, '0')}`,
        });
        setLoading(false);
      })
      .catch(err => {
        if (cancelled) return;
        setError(err.message);
        setLoading(false);
      });
    return () => { cancelled = true; };
  }, [id]);

  return { product, loading, error };
}

export function useProductFilter(products) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [status, setStatus] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  const categories = ['all', ...new Set(products.map(p => p.category))];

  const filtered = products
    .filter(p => {
      const q = query.toLowerCase();
      const matchesQuery = !q || p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
      const matchesCat = category === 'all' || p.category === category;
      const matchesStatus = status === 'all' || p.status === status;
      return matchesQuery && matchesCat && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating.rate - a.rating.rate;
      return 0;
    });

  return { query, setQuery, category, setCategory, status, setStatus, sortBy, setSortBy, filtered, categories };
}
