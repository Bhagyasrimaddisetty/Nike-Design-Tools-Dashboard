import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import { SkeletonCard } from '../components/Skeleton';

const STATS = [
  { label: 'Total Products', value: '20', delta: '+4 this season', pos: true },
  { label: 'Live', value: '12', delta: '↑ 2 from last sprint', pos: true },
  { label: 'In Review', value: '5', delta: '3 pending approval', pos: null },
  { label: 'Draft', value: '3', delta: '↓ 1 from last week', pos: false },
];

export default function Dashboard() {
  const { products, loading } = useProducts();
  const featured = products.slice(0, 4);

  return (
    <div>
      <div className="page-header">
        <div className="page-eyebrow">Nike ITC · SS26</div>
        <h1 className="page-title">Design Dashboard</h1>
        <p className="page-subtitle">Track product creation status across footwear and apparel.</p>
      </div>

      <div className="stats-row">
        {STATS.map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-label">{s.label}</div>
            <div className="stat-value">{s.value}</div>
            <div className={`stat-delta${s.pos === false ? ' neg' : ''}`}>
              {s.delta}
            </div>
          </div>
        ))}
      </div>

      <div className="section-divider">
        <span className="section-divider-title">Recently Updated</span>
        <div className="section-divider-line" />
        <Link to="/products" style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 600, whiteSpace: 'nowrap' }}>
          View all →
        </Link>
      </div>

      <div className="product-grid">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          : featured.map(p => <ProductCard key={p.id} product={p} />)
        }
      </div>

      <div className="section-divider" style={{ marginTop: 32 }}>
        <span className="section-divider-title">Activity Feed</span>
        <div className="section-divider-line" />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[
          { time: '2h ago', user: 'Priya R.', action: 'approved colorway update on', item: 'NK-00003', color: 'var(--green)' },
          { time: '5h ago', user: 'Arjun K.', action: 'submitted for review:', item: 'NK-00007', color: 'var(--yellow)' },
          { time: '1d ago', user: 'You', action: 'created draft asset for', item: 'NK-00012', color: 'var(--text-muted)' },
          { time: '1d ago', user: 'Priya R.', action: 'left a comment on', item: 'NK-00001', color: 'var(--text-muted)' },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: 13 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: item.color, flexShrink: 0 }} />
            <span style={{ color: 'var(--text-muted)', flexShrink: 0, fontSize: 11 }}>{item.time}</span>
            <span><strong style={{ color: 'var(--text)' }}>{item.user}</strong> <span style={{ color: 'var(--text-muted)' }}>{item.action}</span> <strong style={{ color: 'var(--accent)' }}>{item.item}</strong></span>
          </div>
        ))}
      </div>
    </div>
  );
}
