import { Newspaper } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'new', to: '/new' },
  { label: 'past', to: '#' },
  { label: 'comments', to: '#' },
  { label: 'ask', to: '/ask' },
  { label: 'show', to: '#' },
  { label: 'jobs', to: '#' },
  { label: 'submit', to: '#' },
]

export default function Header() {
  const location = useLocation()

  return (
    <div style={{ backgroundColor: '#ff6600', padding: '2px 4px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', maxWidth: 860, margin: '0 auto' }}>
        <tbody>
          <tr>
            <td style={{ width: 18, padding: '0 4px 0 0' }}>
              <Link to="/">
                <div style={{
                  width: 18, height: 18,
                  border: '1px solid white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Newspaper size={12} color="white" strokeWidth={2} />
                </div>
              </Link>
            </td>
            <td style={{ padding: '0 6px 0 0', whiteSpace: 'nowrap' }}>
              <Link to="/" style={{ color: 'white', fontWeight: 'bold', fontSize: 13, fontFamily: 'Verdana, sans-serif' }}>
                Source
              </Link>
            </td>
            <td style={{ padding: '0 4px', color: 'white', fontSize: 13, fontWeight: 'bold' }}>|</td>
            <td style={{ fontSize: 10, fontFamily: 'Verdana, sans-serif' }}>
              <span style={{ display: 'flex', gap: 4, flexWrap: 'wrap', alignItems: 'center' }}>
                {NAV_LINKS.map((link, i) => (
                  <span key={link.label} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Link
                      to={link.to}
                      style={{
                        color: 'white',
                        textDecoration: 'none',
                        fontWeight: location.pathname === link.to ? 'bold' : 'normal',
                      }}
                    >
                      {link.label}
                    </Link>
                    {i < NAV_LINKS.length - 1 && (
                      <span style={{ color: 'white', opacity: 0.6 }}>|</span>
                    )}
                  </span>
                ))}
              </span>
            </td>
            <td style={{ textAlign: 'right', fontSize: 10, fontFamily: 'Verdana, sans-serif' }}>
              <Link to="#" style={{ color: 'white' }}>login</Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
