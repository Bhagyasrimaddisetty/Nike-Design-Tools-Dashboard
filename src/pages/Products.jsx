import { useState } from 'react';
import { useProducts, useProductFilter } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import ProductListRow from '../components/ProductListRow';
import { SkeletonCard, SkeletonList } from '../components/Skeleton';

export default function Products() {
  const { products, loading, error } = useProducts();
  const [view, setView] = useState('grid');
  const { query, setQuery, category, setCategory, status, setStatus, sortBy, setSortBy, filtered, categories } = useProductFilter(products);

  return (
    <div>
      <div className="page-header">
        <div className="page-eyebrow">Catalog</div>
        <h1 className="page-title">All Products</h1>
        <p className="page-subtitle">{loading ? '—' : `${filtered.length} of ${products.length} products`}</p>
      </div>

      <div className="toolbar">
        <div className="toolbar-left">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search products…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              aria-label="Search products"
            />
          </div>

          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            aria-label="Filter by category"
          >
            {categories.map(c => (
              <option key={c} value={c}>{c === 'all' ? 'All categories' : c}</option>
            ))}
          </select>

          <select
            value={status}
            onChange={e => setStatus(e.target.value)}
            aria-label="Filter by status"
          >
            <option value="all">All statuses</option>
            <option value="active">Active</option>
            <option value="review">In review</option>
            <option value="draft">Draft</option>
          </select>

          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            aria-label="Sort products"
          >
            <option value="default">Default sort</option>
            <option value="price-asc">Price: low → high</option>
            <option value="price-desc">Price: high → low</option>
            <option value="rating">Top rated</option>
          </select>
        </div>

        <div className="view-toggle">
          <button className={view === 'grid' ? 'active' : ''} onClick={() => setView('grid')} title="Grid view">⊞</button>
          <button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')} title="List view">☰</button>
        </div>
      </div>

      {error && (
        <div style={{ color: 'var(--accent)', padding: 20, background: 'rgba(229,0,0,0.08)', borderRadius: 'var(--radius)', marginBottom: 20 }}>
          Failed to load products: {error}
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">◈</div>
          <h3>No products found</h3>
          <p>Try adjusting your search or filters.</p>
        </div>
      )}

      {view === 'grid' ? (
        <div className="product-grid">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            : filtered.map(p => <ProductCard key={p.id} product={p} />)
          }
        </div>
      ) : (
        <div className="product-list">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <SkeletonList key={i} />)
            : filtered.map(p => <ProductListRow key={p.id} product={p} />)
          }
        </div>
      )}
    </div>
  );
}
