import { useState } from 'react';
import { Star, Users, Clock, ChevronDown, ChevronUp, Play, FileText, HelpCircle, Check, Share2, BookmarkPlus } from 'lucide-react';
import { detailedCourse } from '../data/courses.js';
import { ProviderCircle } from '../components/CourseCard.jsx';

function StarRating({ rating, size = 14 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          size={size}
          fill={i <= Math.floor(rating) ? '#f5c518' : (i - 0.5 <= rating ? '#f5c518' : 'none')}
          stroke="#f5c518"
        />
      ))}
    </div>
  );
}

function LessonIcon({ type }) {
  if (type === 'video') return <Play size={14} style={{ color: '#636363' }} />;
  if (type === 'quiz') return <HelpCircle size={14} style={{ color: '#636363' }} />;
  return <FileText size={14} style={{ color: '#636363' }} />;
}

export default function CourseDetail() {
  const course = detailedCourse;
  const [expandedModules, setExpandedModules] = useState([0]);

  const toggleModule = (idx) => {
    setExpandedModules(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}>
        <div className="max-w-screen-xl mx-auto px-6 py-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs mb-6" style={{ color: 'rgba(255,255,255,0.6)' }}>
            <span>Courses</span>
            <span>›</span>
            <span>Data Science</span>
            <span>›</span>
            <span style={{ color: 'rgba(255,255,255,0.9)' }}>Machine Learning</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-10">
            <div className="flex-1">
              <h1 className="font-bold text-3xl mb-4 leading-tight" style={{ color: '#ffffff', letterSpacing: '-0.5px' }}>
                {course.title}
              </h1>
              <p className="mb-5 text-base" style={{ color: 'rgba(255,255,255,0.8)', maxWidth: 600 }}>
                {course.description}
              </p>

              {/* Ratings row */}
              <div className="flex items-center gap-4 flex-wrap mb-6">
                <div className="flex items-center gap-2">
                  <span className="font-bold" style={{ color: '#f5c518' }}>{course.rating}</span>
                  <StarRating rating={course.rating} />
                  <span className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    ({(course.reviews / 1000).toFixed(0)}K reviews)
                  </span>
                </div>
                <div className="flex items-center gap-1.5" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  <Users size={14} />
                  <span className="text-sm">{course.enrolled} students enrolled</span>
                </div>
                <div className="flex items-center gap-1.5" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  <Clock size={14} />
                  <span className="text-sm">{course.duration}</span>
                </div>
              </div>

              {/* Provider */}
              <div className="flex items-center gap-3 mb-6">
                <ProviderCircle initial={course.providerInitial} color={course.providerColor} size={32} />
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.8)' }}>{course.provider}</span>
              </div>

              {/* Level badge */}
              <div className="flex items-center gap-3 flex-wrap">
                <span
                  className="text-xs font-semibold px-3 py-1 rounded-full"
                  style={{ backgroundColor: 'rgba(212,237,218,0.2)', color: '#86efac' }}
                >
                  ✓ Beginner Friendly
                </span>
                <span
                  className="text-xs font-semibold px-3 py-1 rounded-full"
                  style={{ backgroundColor: 'rgba(0,86,210,0.3)', color: '#93c5fd' }}
                >
                  Professional Certificate
                </span>
              </div>
            </div>

            {/* CTA Card */}
            <div
              className="lg:w-80 rounded-2xl p-6 shrink-0 self-start"
              style={{ backgroundColor: '#ffffff', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}
            >
              <div
                className="w-full rounded-lg mb-5 flex items-center justify-center"
                style={{ height: 140, background: course.gradient }}
              >
                <Play size={40} color="white" fill="white" />
              </div>
              <button
                className="w-full py-3.5 rounded-lg font-bold text-white mb-3 transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#0056d2', fontSize: 15 }}
              >
                Enroll for Free
              </button>
              <button
                className="w-full py-3 rounded-lg font-medium border text-sm mb-4"
                style={{ borderColor: '#c5c5c5', color: '#1f1f1f' }}
              >
                Full Course, Full Price
              </button>
              <div className="flex items-center justify-center gap-4">
                <button className="flex items-center gap-1.5 text-xs" style={{ color: '#636363' }}>
                  <Share2 size={14} /> Share
                </button>
                <button className="flex items-center gap-1.5 text-xs" style={{ color: '#636363' }}>
                  <BookmarkPlus size={14} /> Save
                </button>
              </div>
              <div className="mt-4 pt-4 border-t" style={{ borderColor: '#e5e5e5' }}>
                <div className="text-xs text-center" style={{ color: '#636363' }}>
                  Financial aid available · Try free for 7 days
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-screen-xl mx-auto px-6 py-10 flex flex-col lg:flex-row gap-12">
        <div className="flex-1 min-w-0">

          {/* What you'll learn */}
          <section className="mb-10 p-6 rounded-xl border" style={{ borderColor: '#e5e5e5' }}>
            <h2 className="font-bold text-xl mb-5" style={{ color: '#1f1f1f' }}>What you'll learn</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {course.whatYoullLearn.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center mt-0.5 shrink-0"
                    style={{ backgroundColor: '#e6f4ea' }}
                  >
                    <Check size={12} style={{ color: '#137333' }} />
                  </div>
                  <span className="text-sm leading-relaxed" style={{ color: '#1f1f1f' }}>{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section className="mb-10">
            <h2 className="font-bold text-xl mb-4" style={{ color: '#1f1f1f' }}>Skills you'll gain</h2>
            <div className="flex flex-wrap gap-2">
              {course.skills.map(skill => (
                <span
                  key={skill}
                  className="px-4 py-2 rounded-full text-sm font-medium border"
                  style={{ borderColor: '#c5c5c5', color: '#1f1f1f', backgroundColor: '#f9f9f9' }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Course Content */}
          <section className="mb-10">
            <h2 className="font-bold text-xl mb-2" style={{ color: '#1f1f1f' }}>Course content</h2>
            <p className="text-sm mb-5" style={{ color: '#636363' }}>
              {course.modules.length} modules · {course.modules.reduce((acc, m) => acc + m.lessons.length, 0)} lessons
            </p>
            <div className="border rounded-xl overflow-hidden" style={{ borderColor: '#e5e5e5' }}>
              {course.modules.map((module, idx) => (
                <div key={idx} style={{ borderBottom: idx < course.modules.length - 1 ? '1px solid #e5e5e5' : 'none' }}>
                  <button
                    className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors hover:bg-gray-50"
                    onClick={() => toggleModule(idx)}
                    style={{ backgroundColor: expandedModules.includes(idx) ? '#f9f9f9' : '#fff' }}
                  >
                    <div>
                      <span className="font-semibold text-sm" style={{ color: '#1f1f1f' }}>{module.title}</span>
                      <span className="ml-3 text-xs" style={{ color: '#636363' }}>{module.lessons.length} lessons</span>
                    </div>
                    {expandedModules.includes(idx)
                      ? <ChevronUp size={18} style={{ color: '#636363' }} />
                      : <ChevronDown size={18} style={{ color: '#636363' }} />
                    }
                  </button>
                  {expandedModules.includes(idx) && (
                    <div style={{ backgroundColor: '#fafafa' }}>
                      {module.lessons.map((lesson, lIdx) => (
                        <div
                          key={lIdx}
                          className="flex items-center gap-3 px-6 py-3 border-t"
                          style={{ borderColor: '#f0f0f0' }}
                        >
                          <LessonIcon type={lesson.type} />
                          <span className="flex-1 text-sm" style={{ color: '#1f1f1f' }}>{lesson.title}</span>
                          <span className="text-xs shrink-0" style={{ color: '#636363' }}>{lesson.duration}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Instructors */}
          <section className="mb-10">
            <h2 className="font-bold text-xl mb-6" style={{ color: '#1f1f1f' }}>Instructors</h2>
            <div className="flex flex-col gap-5">
              {course.instructors.map(instructor => (
                <div key={instructor.name} className="flex items-start gap-4 p-5 rounded-xl border" style={{ borderColor: '#e5e5e5' }}>
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-white shrink-0 text-lg"
                    style={{ backgroundColor: instructor.color }}
                  >
                    {instructor.initial}
                  </div>
                  <div>
                    <div className="font-bold" style={{ color: '#1f1f1f' }}>{instructor.name}</div>
                    <div className="text-sm" style={{ color: '#636363' }}>{instructor.title}</div>
                    <div className="text-sm font-medium mt-0.5" style={{ color: '#0056d2' }}>{instructor.institution}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Reviews */}
          <section>
            <div className="flex items-center gap-6 mb-6">
              <div className="text-center">
                <div className="font-bold text-5xl" style={{ color: '#1f1f1f' }}>{course.rating}</div>
                <StarRating rating={course.rating} size={18} />
                <div className="text-xs mt-1" style={{ color: '#636363' }}>Course rating</div>
              </div>
              <div className="flex-1">
                {[5, 4, 3, 2, 1].map(star => {
                  const pct = star === 5 ? 78 : star === 4 ? 17 : star === 3 ? 4 : star === 2 ? 1 : 0;
                  return (
                    <div key={star} className="flex items-center gap-3 mb-1.5">
                      <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#e5e5e5' }}>
                        <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: '#0056d2' }} />
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <Star size={11} fill="#f5c518" stroke="#f5c518" />
                        <span className="text-xs" style={{ color: '#636363' }}>{star}</span>
                        <span className="text-xs" style={{ color: '#636363' }}>({pct}%)</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {course.reviews.map((review, i) => (
                <div key={i} className="p-5 rounded-xl border" style={{ borderColor: '#e5e5e5' }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-sm"
                        style={{ backgroundColor: `hsl(${i * 60}, 60%, 45%)` }}
                      >
                        {review.name[0]}
                      </div>
                      <div>
                        <div className="font-semibold text-sm" style={{ color: '#1f1f1f' }}>{review.name}</div>
                        <div className="text-xs" style={{ color: '#636363' }}>{review.date}</div>
                      </div>
                    </div>
                    <StarRating rating={review.rating} size={13} />
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: '#1f1f1f' }}>{review.text}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
