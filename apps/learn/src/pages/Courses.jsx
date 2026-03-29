import { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CourseCard from '../components/CourseCard.jsx';
import { courses } from '../data/courses.js';

const filterConfig = {
  Subject: ['Data Science', 'Business', 'Computer Science', 'Social Sciences'],
  Level: ['Beginner', 'Intermediate', 'Advanced'],
  Language: ['English', 'Spanish', 'French', 'Chinese'],
  Duration: ['1-4 weeks', '1-3 months', '3-6 months', '6+ months'],
  Partnership: ['University', 'Industry', 'Government'],
  'Credit eligibility': ['ACE Credit', 'ECTS Credit'],
};

const sortOptions = ['Most Popular', 'Highest Rated', 'Newest'];

export default function Courses() {
  const [search, setSearch] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);
  const [sortBy, setSortBy] = useState('Most Popular');
  const [expandedFilter, setExpandedFilter] = useState(null);
  const navigate = useNavigate();

  const toggleFilter = (filter) => {
    setActiveFilters(prev =>
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    );
  };

  const filteredCourses = courses.filter(course => {
    if (search && !course.title.toLowerCase().includes(search.toLowerCase()) &&
        !course.provider.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    if (activeFilters.length > 0) {
      const levelMatch = activeFilters.some(f => ['Beginner', 'Intermediate', 'Advanced'].includes(f) && course.level === f);
      const subjectMatch = activeFilters.some(f => ['Data Science', 'Business', 'Computer Science', 'Social Sciences'].includes(f) && course.category === f);
      if ((activeFilters.some(f => ['Beginner', 'Intermediate', 'Advanced'].includes(f)) && !levelMatch) ||
          (activeFilters.some(f => ['Data Science', 'Business', 'Computer Science', 'Social Sciences'].includes(f)) && !subjectMatch)) {
        return false;
      }
    }
    return true;
  });

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortBy === 'Highest Rated') return b.rating - a.rating;
    if (sortBy === 'Newest') return b.id - a.id;
    return b.reviews - a.reviews; // Most Popular
  });

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      {/* Search header */}
      <div style={{ backgroundColor: '#f9f9f9', borderBottom: '1px solid #e5e5e5' }} className="px-6 py-6">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="font-bold text-2xl mb-4" style={{ color: '#1f1f1f' }}>Browse All Courses</h1>
          <div className="flex items-center gap-3 max-w-2xl">
            <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-lg border bg-white" style={{ borderColor: '#c5c5c5' }}>
              <Search size={18} style={{ color: '#636363' }} />
              <input
                type="text"
                placeholder="Search courses, skills, or providers..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="flex-1 outline-none text-sm bg-transparent"
                style={{ color: '#1f1f1f' }}
              />
            </div>
            <button
              className="flex items-center gap-2 px-4 py-3 rounded-lg border text-sm font-medium"
              style={{ borderColor: '#c5c5c5', color: '#1f1f1f', backgroundColor: '#fff' }}
            >
              <SlidersHorizontal size={16} />
              Filters
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 py-8 flex gap-8">
        {/* Sidebar Filters */}
        <aside className="hidden lg:block w-56 shrink-0">
          <div className="sticky top-20">
            {Object.entries(filterConfig).map(([group, options]) => (
              <div key={group} className="mb-6">
                <button
                  className="flex items-center justify-between w-full font-semibold text-sm mb-3"
                  style={{ color: '#1f1f1f' }}
                  onClick={() => setExpandedFilter(expandedFilter === group ? null : group)}
                >
                  {group}
                  <span style={{ fontSize: 10, color: '#636363' }}>{expandedFilter === group ? '▲' : '▼'}</span>
                </button>
                {(expandedFilter !== group) && (
                  <div className="flex flex-col gap-2">
                    {options.map(opt => (
                      <label key={opt} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={activeFilters.includes(opt)}
                          onChange={() => toggleFilter(opt)}
                          className="rounded"
                          style={{ accentColor: '#0056d2' }}
                        />
                        <span className="text-sm" style={{ color: '#1f1f1f' }}>{opt}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Active filters + sort */}
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm" style={{ color: '#636363' }}>
                {sortedCourses.length} results
              </span>
              {activeFilters.map(f => (
                <span
                  key={f}
                  className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border cursor-pointer"
                  style={{ borderColor: '#0056d2', color: '#0056d2', backgroundColor: '#e8f0fe' }}
                  onClick={() => toggleFilter(f)}
                >
                  {f} <X size={12} />
                </span>
              ))}
              {activeFilters.length > 0 && (
                <button
                  onClick={() => setActiveFilters([])}
                  className="text-xs font-medium underline"
                  style={{ color: '#636363' }}
                >
                  Clear all
                </button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm" style={{ color: '#636363' }}>Sort by:</span>
              <div className="flex gap-1">
                {sortOptions.map(opt => (
                  <button
                    key={opt}
                    onClick={() => setSortBy(opt)}
                    className="px-3 py-1.5 rounded text-xs font-medium border transition-colors"
                    style={sortBy === opt
                      ? { backgroundColor: '#0056d2', color: '#fff', borderColor: '#0056d2' }
                      : { backgroundColor: '#fff', color: '#1f1f1f', borderColor: '#c5c5c5' }
                    }
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Course grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {sortedCourses.map(course => (
              <CourseCard
                key={course.id}
                course={course}
                onClick={() => navigate('/course')}
              />
            ))}
          </div>

          {sortedCourses.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 gap-3">
              <Search size={48} style={{ color: '#c5c5c5' }} />
              <p className="text-lg font-semibold" style={{ color: '#636363' }}>No courses found</p>
              <p className="text-sm" style={{ color: '#636363' }}>Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
