import { GraduationCap, Search } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  return (
    <header style={{ borderBottom: '1px solid #e5e5e5' }} className="fixed top-0 left-0 right-0 z-50 bg-white">
      <div className="flex items-center gap-4 px-6 h-16 max-w-screen-xl mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0" style={{ textDecoration: 'none' }}>
          <GraduationCap size={28} style={{ color: '#0056d2' }} />
          <span className="font-bold text-xl" style={{ color: '#1f1f1f', letterSpacing: '-0.3px' }}>Learn</span>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-1 ml-2">
          <Link
            to="/courses"
            className="px-3 py-2 text-sm font-medium rounded-md transition-colors"
            style={{
              color: location.pathname === '/courses' ? '#0056d2' : '#1f1f1f',
              textDecoration: 'none',
            }}
          >
            Explore
          </Link>
        </nav>

        {/* Search bar */}
        <div className="flex-1 max-w-xl mx-4">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border" style={{ borderColor: '#c5c5c5', backgroundColor: '#f9f9f9' }}>
            <Search size={16} style={{ color: '#636363' }} />
            <input
              type="text"
              placeholder="What do you want to learn?"
              className="flex-1 bg-transparent outline-none text-sm"
              style={{ color: '#1f1f1f' }}
            />
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3 ml-auto shrink-0">
          <span className="hidden lg:block text-sm font-medium cursor-pointer" style={{ color: '#1f1f1f' }}>For Enterprise</span>
          <Link
            to="/mylearning"
            className="hidden sm:block text-sm font-medium px-4 py-2 rounded border transition-colors"
            style={{ color: '#0056d2', borderColor: '#0056d2', textDecoration: 'none' }}
          >
            My Learning
          </Link>
          <button
            className="text-sm font-medium px-4 py-2 rounded border"
            style={{ color: '#1f1f1f', borderColor: '#c5c5c5' }}
          >
            Log In
          </button>
          <button
            className="text-sm font-semibold px-4 py-2 rounded text-white"
            style={{ backgroundColor: '#0056d2' }}
          >
            Join for Free
          </button>
        </div>
      </div>
    </header>
  );
}
