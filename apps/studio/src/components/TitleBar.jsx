const menus = ['File', 'Edit', 'View', 'Go', 'Run', 'Terminal', 'Help']

export default function TitleBar() {
  return (
    <div style={{
      height: 30,
      background: '#3c3c3c',
      display: 'flex',
      alignItems: 'center',
      flexShrink: 0,
      userSelect: 'none',
    }}>
      {/* macOS dots */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0 12px', flexShrink: 0 }}>
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840' }} />
      </div>

      {/* App name */}
      <span style={{ color: '#cccccc', fontSize: 12, fontWeight: 500, marginRight: 16, flexShrink: 0 }}>STUDIO</span>

      {/* Menu items */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
        {menus.map(menu => (
          <button
            key={menu}
            style={{
              background: 'none',
              border: 'none',
              color: '#cccccc',
              fontSize: 12,
              padding: '0 8px',
              height: 30,
              cursor: 'default',
              display: 'flex',
              alignItems: 'center',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#505050'}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}
          >
            {menu}
          </button>
        ))}
      </div>

      {/* Center: file name */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <span style={{ color: '#cccccc', fontSize: 12 }}>App.tsx — PARANET-UI</span>
      </div>
    </div>
  )
}
