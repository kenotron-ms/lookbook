import { Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const levelColors = {
  Beginner: { bg: '#d4edda', text: '#155724' },
  Intermediate: { bg: '#cce5ff', text: '#004085' },
  Advanced: { bg: '#e8d5f5', text: '#5b2c8f' },
};

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      <Star size={13} fill="#f5c518" stroke="#f5c518" />
      <span className="text-sm font-semibold" style={{ color: '#1f1f1f' }}>{rating.toFixed(1)}</span>
    </div>
  );
}

export function ProviderCircle({ initial, color, size = 28 }) {
  return (
    <div
      className="flex items-center justify-center rounded-full shrink-0 font-bold"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        color: '#fff',
        fontSize: size * 0.38,
        letterSpacing: '-0.5px',
      }}
    >
      {initial}
    </div>
  );
}

export default function CourseCard({ course, onClick }) {
  const navigate = useNavigate();
  const levelStyle = levelColors[course.level] || levelColors.Beginner;

  const handleClick = onClick || (() => navigate('/course'));

  return (
    <div
      onClick={handleClick}
      className="flex flex-col rounded-lg overflow-hidden cursor-pointer transition-all duration-200"
      style={{
        background: '#fff',
        border: '1px solid #e5e5e5',
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.12)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.06)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Thumbnail */}
      <div
        className="w-full"
        style={{
          height: 120,
          background: course.gradient,
          position: 'relative',
        }}
      >
        <div className="absolute top-3 left-3">
          <ProviderCircle initial={course.providerInitial} color={course.providerColor} size={36} />
        </div>
        {course.certificate && (
          <div
            className="absolute top-3 right-3 text-xs font-semibold px-2 py-0.5 rounded"
            style={{ backgroundColor: 'rgba(0,86,210,0.92)', color: '#fff', fontSize: 11 }}
          >
            {course.certificate}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        <h3
          className="font-bold leading-snug line-clamp-2"
          style={{ color: '#1f1f1f', fontSize: 14 }}
        >
          {course.title}
        </h3>
        <p className="text-xs" style={{ color: '#636363' }}>{course.provider}</p>

        <div className="flex items-center gap-2 mt-auto pt-2">
          <StarRating rating={course.rating} />
          <span className="text-xs" style={{ color: '#636363' }}>({(course.reviews / 1000).toFixed(0)}K)</span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="text-xs font-medium px-2 py-0.5 rounded-full"
            style={{ backgroundColor: levelStyle.bg, color: levelStyle.text }}
          >
            {course.level}
          </span>
          <span className="text-xs" style={{ color: '#636363' }}>{course.duration}</span>
        </div>
      </div>
    </div>
  );
}
