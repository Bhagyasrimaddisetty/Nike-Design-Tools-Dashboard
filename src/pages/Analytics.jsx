const MONTHLY = [
  { m: 'Jul', v: 38 }, { m: 'Aug', v: 55 }, { m: 'Sep', v: 47 },
  { m: 'Oct', v: 72 }, { m: 'Nov', v: 61 }, { m: 'Dec', v: 88 },
  { m: 'Jan', v: 65 }, { m: 'Feb', v: 79 }, { m: 'Mar', v: 91 },
  { m: 'Apr', v: 83 }, { m: 'May', v: 95 }, { m: 'Jun', v: 74 },
];

const CATEGORIES = [
  { name: "Men's", pct: 38, color: '#e50000' },
  { name: "Women's", pct: 28, color: '#ff6b6b' },
  { name: 'Footwear', pct: 22, color: '#ff9999' },
  { name: 'Other', pct: 12, color: '#3a3a3a' },
];

const max = Math.max(...MONTHLY.map(d => d.v));

function DonutChart({ data }) {
  const r = 54, cx = 64, cy = 64;
  const circumference = 2 * Math.PI * r;
  let offset = 0;
  const slices = data.map(d => {
    const dash = (d.pct / 100) * circumference;
    const s = { ...d, dash, offset };
    offset += dash;
    return s;
  });

  return (
    <div className="donut-wrap">
      <svg width="128" height="128" style={{ flexShrink: 0 }}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--border)" strokeWidth="16" />
        {slices.map((s, i) => (
          <circle
            key={i} cx={cx} cy={cy} r={r}
            fill="none"
            stroke={s.color}
            strokeWidth="16"
            strokeDasharray={`${s.dash} ${circumference - s.dash}`}
            strokeDashoffset={-s.offset + circumference * 0.25}
            style={{ transform: 'rotate(-90deg)', transformOrigin: `${cx}px ${cy}px` }}
          />
        ))}
        <text x={cx} y={cy - 4} textAnchor="middle" fill="var(--text)" fontSize="18" fontWeight="800" fontFamily="'Barlow Condensed',sans-serif">100</text>
        <text x={cx} y={cy + 14} textAnchor="middle" fill="var(--text-muted)" fontSize="10">PRODUCTS</text>
      </svg>
      <div className="donut-legend">
        {data.map((d, i) => (
          <div key={i} className="donut-legend-item">
            <span className="donut-dot" style={{ background: d.color }} />
            {d.name} — {d.pct}%
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Analytics() {
  return (
    <div>
      <div className="page-header">
        <div className="page-eyebrow">Reporting</div>
        <h1 className="page-title">Analytics</h1>
        <p className="page-subtitle">Season-to-date performance across all creation pipelines.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { l: 'Approval Rate', v: '84%', d: '↑ 6% vs FW25', pos: true },
          { l: 'Avg Time-to-Live', v: '11d', d: '↓ 2 days faster', pos: true },
          { l: 'Rejected Designs', v: '7', d: '↑ 2 this sprint', pos: false },
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div className="stat-label">{s.l}</div>
            <div className="stat-value">{s.v}</div>
            <div className={`stat-delta${s.pos ? '' : ' neg'}`}>{s.d}</div>
          </div>
        ))}
      </div>

      <div className="analytics-grid">
        <div className="chart-card">
          <div className="chart-card-title">Products submitted / month</div>
          <div className="bar-chart">
            {MONTHLY.map(d => (
              <div key={d.m} className="bar-group">
                <div className="bar" style={{ height: `${(d.v / max) * 100}%` }} title={`${d.m}: ${d.v}`} />
                <div className="bar-label">{d.m}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-card-title">Category breakdown</div>
          <DonutChart data={CATEGORIES} />
        </div>

        <div className="chart-card" style={{ gridColumn: '1 / -1' }}>
          <div className="chart-card-title">Pipeline status overview</div>
          <div style={{ display: 'flex', gap: 24, marginTop: 8 }}>
            {[
              { label: 'Concept', n: 8, pct: 80 },
              { label: 'Design', n: 5, pct: 50 },
              { label: 'Review', n: 5, pct: 50 },
              { label: 'Approved', n: 12, pct: 100 },
              { label: 'Live', n: 12, pct: 100 },
            ].map((stage, i) => (
              <div key={i} style={{ flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: 8 }}>{stage.label}</div>
                <div style={{ height: 6, background: 'var(--surface-2)', borderRadius: 3, marginBottom: 6, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${stage.pct}%`, background: 'var(--accent)', borderRadius: 3, opacity: 0.7 }} />
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800 }}>{stage.n}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
