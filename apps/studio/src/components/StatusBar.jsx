import { GitBranch, AlertTriangle, AlertCircle, Check } from 'lucide-react'

function StatusItem({ children, leftBorder, rightBorder, onClick, title }) {
  return (
    <div
      title={title}
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        padding: '0 8px',
        height: '100%',
        cursor: onClick ? 'pointer' : 'default',
        fontSize: 12,
        color: '#ffffff',
        borderLeft: leftBorder ? '1px solid rgba(255,255,255,0.15)' : 'none',
        borderRight: rightBorder ? '1px solid rgba(255,255,255,0.15)' : 'none',
        whiteSpace: 'nowrap',
        userSelect: 'none',
      }}
      onMouseEnter={e => { if (onClick) e.currentTarget.style.background = 'rgba(255,255,255,0.12)' }}
      onMouseLeave={e => { if (onClick) e.currentTarget.style.background = 'transparent' }}
    >
      {children}
    </div>
  )
}

export default function StatusBar() {
  return (
    <div style={{
      height: 24,
      background: '#007acc',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexShrink: 0,
    }}>
      {/* Left side */}
      <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <StatusItem title="Source Control" onClick={() => {}}>
          <GitBranch size={13} />
          <span>main</span>
          <Check size={11} />
        </StatusItem>
        <StatusItem leftBorder title="Errors and Warnings" onClick={() => {}}>
          <AlertCircle size={13} />
          <span>0</span>
          <AlertTriangle size={13} />
          <span>2</span>
        </StatusItem>
      </div>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <StatusItem leftBorder title="TypeScript version" onClick={() => {}}>
          TypeScript 5.3.3
        </StatusItem>
        <StatusItem leftBorder title="Go to Line/Column" onClick={() => {}}>
          Ln 15, Col 8
        </StatusItem>
        <StatusItem leftBorder title="Select Indentation" onClick={() => {}}>
          Spaces: 2
        </StatusItem>
        <StatusItem leftBorder title="Select Encoding" onClick={() => {}}>
          UTF-8
        </StatusItem>
        <StatusItem leftBorder title="Select End of Line Sequence" onClick={() => {}}>
          LF
        </StatusItem>
        <StatusItem leftBorder rightBorder title="Select Language Mode" onClick={() => {}}>
          TypeScript React
        </StatusItem>
      </div>
    </div>
  )
}
