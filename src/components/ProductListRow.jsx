import { Link } from 'react-router-dom';

export default function ProductListRow({ product }) {
  const { id, title, price, image, category, rating, status, sku } = product;

  return (
    <Link to={`/products/${id}`} className="product-list-card">
      <div className="product-list-thumb">
        <img src={image} alt={title} loading="lazy" />
      </div>
      <div className="product-list-info">
        <div className="product-list-name">{title}</div>
        <div className="product-list-cat">{sku} · {category}</div>
      </div>
      <div className="product-list-right">
        <span className="product-rating" style={{ color: 'var(--yellow)', fontSize: 13 }}>
          ★ {rating.rate}
        </span>
        <span className={`status-badge ${status}`}>{status}</span>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, minWidth: 70, textAlign: 'right' }}>
          ${price.toFixed(2)}
        </span>
      </div>
    </Link>
  );
}
