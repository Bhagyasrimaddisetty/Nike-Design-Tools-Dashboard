import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const { id, title, price, image, category, rating, status } = product;

  return (
    <Link to={`/products/${id}`} className="product-card">
      <div className="product-card-img">
        <img src={image} alt={title} loading="lazy" />
      </div>
      <div className="product-card-body">
        <div className="product-card-category">{category}</div>
        <div className="product-card-name">{title}</div>
        <div className="product-card-footer">
          <span className="product-price">${price.toFixed(2)}</span>
          <span className="product-rating">
            ★ {rating.rate}
            <span style={{ color: 'var(--text-dim)', fontWeight: 400 }}>({rating.count})</span>
          </span>
        </div>
        <div style={{ marginTop: 10 }}>
          <span className={`status-badge ${status}`}>
            {status === 'active' ? '● ' : status === 'review' ? '◑ ' : '○ '}{status}
          </span>
        </div>
      </div>
    </Link>
  );
}
