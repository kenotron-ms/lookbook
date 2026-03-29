import { Download, Play, ChevronRight, Award, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { inProgressCourses, completedCourses, courses } from '../data/courses.js';
import { ProviderCircle } from '../components/CourseCard.jsx';
import CourseCard from '../components/CourseCard.jsx';

function ProgressBar({ percent }) {
  return (
    <div className="w-full rounded-full overflow-hidden" style={{ height: 6, backgroundColor: '#e5e5e5' }}>
      <div
        className="h-full rounded-full transition-all"
        style={{ width: `${percent}%`, backgroundColor: '#0056d2' }}
      />
    </div>
  );
}

export default function MyLearning() {
  const navigate = useNavigate();
  const recommended = courses.slice(4, 8);

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      {/* Header banner */}
      <div style={{ background: 'linear-gradient(135deg, #0056d2 0%, #1a73e8 100%)' }} className="px-6 py-10">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="font-bold text-2xl mb-1" style={{ color: '#ffffff' }}>My Learning</h1>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.8)' }}>
            Track your progress and continue learning
          </p>
          <div className="flex items-center gap-6 mt-6">
            <div className="text-center">
              <div className="font-bold text-3xl text-white">{inProgressCourses.length}</div>
              <div className="text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>In Progress</div>
            </div>
            <div className="w-px h-10" style={{ backgroundColor: 'rgba(255,255,255,0.3)' }} />
            <div className="text-center">
              <div className="font-bold text-3xl text-white">{completedCourses.length}</div>
              <div className="text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>Completed</div>
            </div>
            <div className="w-px h-10" style={{ backgroundColor: 'rgba(255,255,255,0.3)' }} />
            <div className="text-center">
              <div className="font-bold text-3xl text-white">{completedCourses.length}</div>
              <div className="text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>Certificates</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 py-10">

        {/* In Progress */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-xl flex items-center gap-2" style={{ color: '#1f1f1f' }}>
              <BookOpen size={20} style={{ color: '#0056d2' }} />
              In Progress
            </h2>
            <button className="text-sm font-medium flex items-center gap-1" style={{ color: '#0056d2' }}>
              View all <ChevronRight size={15} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {inProgressCourses.map(course => (
              <div
                key={course.id}
                className="flex gap-4 p-5 rounded-xl border cursor-pointer transition-all hover:shadow-md"
                style={{ borderColor: '#e5e5e5', backgroundColor: '#fff' }}
                onClick={() => navigate('/course')}
              >
                {/* Thumbnail */}
                <div
                  className="shrink-0 rounded-xl overflow-hidden"
                  style={{ width: 100, height: 75, background: course.gradient, position: 'relative' }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <Play size={16} color="white" fill="white" />
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2 mb-1">
                    <ProviderCircle initial={course.providerInitial} color={course.providerColor} size={22} />
                    <span className="text-xs" style={{ color: '#636363' }}>{course.provider}</span>
                  </div>
                  <h3 className="font-bold text-sm leading-snug mb-2" style={{ color: '#1f1f1f' }}>
                    {course.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs mb-2" style={{ color: '#636363' }}>
                    <span>{course.module}</span>
                    <span className="font-semibold" style={{ color: '#0056d2' }}>{course.progress}%</span>
                  </div>
                  <ProgressBar percent={course.progress} />
                  <div className="text-xs mt-2" style={{ color: '#636363' }}>
                    Next: <span style={{ color: '#1f1f1f', fontWeight: 500 }}>{course.nextLesson}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Completed */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-xl flex items-center gap-2" style={{ color: '#1f1f1f' }}>
              <Award size={20} style={{ color: '#137333' }} />
              Completed
            </h2>
            <button className="text-sm font-medium flex items-center gap-1" style={{ color: '#0056d2' }}>
              View certificates <ChevronRight size={15} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {completedCourses.map(course => (
              <div
                key={course.id}
                className="rounded-xl border overflow-hidden"
                style={{ borderColor: '#e5e5e5', backgroundColor: '#fff' }}
              >
                {/* Thumbnail */}
                <div
                  className="w-full"
                  style={{ height: 100, background: course.gradient, position: 'relative' }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: 'rgba(255,255,255,0.25)' }}
                    >
                      <Award size={20} color="white" />
                    </div>
                  </div>
                  <div className="absolute top-2 right-2">
                    <ProviderCircle initial={course.providerInitial} color={course.providerColor} size={28} />
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="font-bold text-sm leading-snug mb-1" style={{ color: '#1f1f1f' }}>
                    {course.title}
                  </h3>
                  <p className="text-xs mb-1" style={{ color: '#636363' }}>{course.provider}</p>
                  <div className="flex items-center gap-2 mb-4 mt-2">
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: '#e6f4ea', color: '#137333' }}
                    >
                      ✓ Completed
                    </span>
                    <span className="text-xs" style={{ color: '#636363' }}>{course.completedDate}</span>
                    <span className="text-xs font-semibold ml-auto" style={{ color: '#0056d2' }}>{course.grade}</span>
                  </div>
                  <button
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold border transition-colors hover:bg-blue-50"
                    style={{ borderColor: '#0056d2', color: '#0056d2' }}
                  >
                    <Download size={14} />
                    Download Certificate
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recommended */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-xl" style={{ color: '#1f1f1f' }}>Recommended for you</h2>
            <button className="text-sm font-medium flex items-center gap-1" style={{ color: '#0056d2' }}>
              Browse all <ChevronRight size={15} />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {recommended.map(course => (
              <CourseCard
                key={course.id}
                course={course}
                onClick={() => navigate('/course')}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
