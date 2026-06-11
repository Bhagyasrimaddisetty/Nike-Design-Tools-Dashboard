export function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton" style={{ aspectRatio: '1', width: '100%' }} />
      <div style={{ padding: 14, borderTop: '1px solid var(--border)' }}>
        <div className="skeleton" style={{ height: 10, width: '60%', marginBottom: 8 }} />
        <div className="skeleton" style={{ height: 13, width: '90%', marginBottom: 12 }} />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className="skeleton" style={{ height: 18, width: '35%' }} />
          <div className="skeleton" style={{ height: 14, width: '30%' }} />
        </div>
      </div>
    </div>
  );
}

export function SkeletonList() {
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 16 }}>
      <div className="skeleton" style={{ width: 52, height: 52, borderRadius: 'var(--radius)', flexShrink: 0 }} />
      <div style={{ flex: 1 }}>
        <div className="skeleton" style={{ height: 14, width: '50%', marginBottom: 6 }} />
        <div className="skeleton" style={{ height: 12, width: '30%' }} />
      </div>
      <div className="skeleton" style={{ height: 18, width: 60 }} />
    </div>
  );
}
