export default function Topbar() {
  return (
    <header className="topbar">
      <div className="topbar-brand">
        <span className="topbar-swoosh">NIKE</span>
        <span className="topbar-label">Design Studio ITC</span>
      </div>
      <div className="topbar-right">
        <button className="icon-btn" title="Search">🔍</button>
        <button className="icon-btn" title="Notifications" style={{ position: 'relative' }}>
          🔔
          <span className="notif-dot" />
        </button>
        <div className="avatar" title="Bhagya Sri M.">B</div>
      </div>
    </header>
  );
}
