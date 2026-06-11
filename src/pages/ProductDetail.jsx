import { useParams, useNavigate } from 'react-router-dom';
import { useProduct } from '../hooks/useProducts';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product: p, loading, error } = useProduct(id);

  if (loading) {
    return (
      <div>
        <button className="btn-ghost" onClick={() => navigate(-1)}>← Back</button>
        <div style={{ marginTop: 24 }} className="detail-layout">
          <div className="skeleton" style={{ aspectRatio: '1', borderRadius: 'var(--radius-lg)' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="skeleton" style={{ height: 48, width: '80%' }} />
            <div className="skeleton" style={{ height: 32, width: '40%' }} />
            <div className="skeleton" style={{ height: 80, width: '100%' }} />
          </div>
        </div>
      </div>
    );
  }

  if (error || !p) {
    return (
      <div className="empty-state">
        <div className="empty-icon">◈</div>
        <h3>Product not found</h3>
        <p>{error || 'This product does not exist.'}</p>
        <button className="btn-ghost" onClick={() => navigate('/products')} style={{ marginTop: 16 }}>
          ← Back to products
        </button>
      </div>
    );
  }

  return (
    <div>
      <button className="btn-ghost" onClick={() => navigate(-1)}>← Back</button>

      <div style={{ marginTop: 24 }} className="detail-layout">
        <div className="detail-img-panel">
          <img src={p.image} alt={p.title} />
        </div>

        <div className="detail-info">
          <div className="page-eyebrow">{p.category}</div>
          <h1>{p.title}</h1>
          <div className="detail-price">${p.price.toFixed(2)}</div>

          <div className="detail-meta">
            <span className={`status-badge ${p.status}`}>{p.status}</span>
            <span className="detail-tag">{p.season}</span>
            <span className="detail-tag">{p.colorway}</span>
            <span className="detail-tag">{p.sku}</span>
          </div>

          <p className="detail-desc">{p.description}</p>

          <div className="detail-specs">
            <div className="spec-item">
              <div className="spec-label">Rating</div>
              <div className="spec-value" style={{ color: 'var(--yellow)' }}>★ {p.rating.rate} / 5</div>
            </div>
            <div className="spec-item">
              <div className="spec-label">Reviews</div>
              <div className="spec-value">{p.rating.count} reviews</div>
            </div>
            <div className="spec-item">
              <div className="spec-label">Season</div>
              <div className="spec-value">{p.season}</div>
            </div>
            <div className="spec-item">
              <div className="spec-label">Colorway</div>
              <div className="spec-value">{p.colorway}</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <button className="btn-primary">Approve Design</button>
            <button className="btn-ghost" style={{ marginLeft: 8 }}>Request Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
}
