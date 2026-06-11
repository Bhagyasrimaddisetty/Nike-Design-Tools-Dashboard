export default function Placeholder({ title, icon }) {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">{title}</h1>
      </div>
      <div className="empty-state">
        <div className="empty-icon">{icon}</div>
        <h3>{title}</h3>
        <p style={{ maxWidth: 320, margin: '0 auto' }}>
          This section is under construction. Check back in the next sprint.
        </p>
      </div>
    </div>
  );
}
