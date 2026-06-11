import { NavLink } from 'react-router-dom';

const NAV = [
  { label: 'Main', items: [
    { to: '/', icon: '⊞', text: 'Dashboard' },
    { to: '/products', icon: '◈', text: 'Products', badge: '20' },
    { to: '/analytics', icon: '▦', text: 'Analytics' },
  ]},
  { label: 'Tools', items: [
    { to: '/assets', icon: '◇', text: 'Assets' },
    { to: '/seasons', icon: '◎', text: 'Seasons' },
    { to: '/team', icon: '◉', text: 'Team' },
  ]},
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      {NAV.map(section => (
        <div key={section.label}>
          <div className="sidebar-section-label">{section.label}</div>
          {section.items.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
            >
              <span className="icon">{item.icon}</span>
              {item.text}
              {item.badge && <span className="sidebar-badge">{item.badge}</span>}
            </NavLink>
          ))}
        </div>
      ))}
    </aside>
  );
}
