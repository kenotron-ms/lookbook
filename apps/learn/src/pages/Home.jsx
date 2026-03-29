import { useState } from 'react';
import { ArrowRight, ChevronRight, Briefcase, Award, GraduationCap, Users, Compass, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CourseCard from '../components/CourseCard.jsx';
import { courses } from '../data/courses.js';

const goalCards = [
  { icon: Briefcase, label: 'Advance my career', color: '#e8f0fe', iconColor: '#0056d2' },
  { icon: Award, label: 'Get ready for a certification', color: '#fce8e6', iconColor: '#c5221f' },
  { icon: GraduationCap, label: 'Complete a degree', color: '#e6f4ea', iconColor: '#137333' },
  { icon: Users, label: 'Upskill my team', color: '#fef7e0', iconColor: '#f9ab00' },
  { icon: Compass, label: 'Explore a new topic', color: '#f3e8fd', iconColor: '#7b1fa2' },
  { icon: Zap, label: 'Start building skills', color: '#e8f0fe', iconColor: '#0056d2' },
];

const skillTabs = ['Data Science', 'Business', 'Computer Science', 'Social Sciences', 'Language Learning'];

const universities = [
  { name: 'MIT', subtitle: 'Massachusetts Institute of Technology', initial: 'MIT', color: '#8C1515', degrees: '12 degrees' },
  { name: 'Duke University', subtitle: 'Fuqua School of Business', initial: 'D', color: '#003087', degrees: '8 degrees' },
  { name: 'University of Michigan', subtitle: 'College of Engineering', initial: 'M', color: '#00274C', degrees: '15 degrees' },
  { name: 'Imperial College', subtitle: 'Imperial College London', initial: 'IC', color: '#003E74', degrees: '6 degrees' },
];

const companies = ['Google', 'Microsoft', 'Apple', 'Meta', 'IBM'];

export default function Home() {
  const [activeTab, setActiveTab] = useState('Data Science');
  const navigate = useNavigate();

  const filteredCourses = courses
    .filter(c => c.category === activeTab)
    .slice(0, 4);

  const topRated = [...courses].sort((a, b) => b.rating - a.rating).slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #f0f4ff 0%, #ffffff 60%)' }}>
        <div className="max-w-screen-xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h1 className="font-bold leading-tight mb-4" style={{ fontSize: 42, color: '#1f1f1f', letterSpacing: '-1px' }}>
              Open Doors with the<br />Right Skills
            </h1>
            <p className="mb-8 text-lg" style={{ color: '#636363', maxWidth: 460 }}>
              Learn from world-class universities and companies. Build job-ready skills with expert-led courses, certificates, and degrees.
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <button
                className="px-7 py-3 rounded font-semibold text-white text-sm transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#0056d2' }}
              >
                Join for free
              </button>
              <button className="flex items-center gap-2 text-sm font-medium" style={{ color: '#0056d2' }}>
                Try for Business <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Hero image placeholder */}
          <div
            className="hidden md:block rounded-2xl overflow-hidden shrink-0"
            style={{ width: 340, height: 260, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', position: 'relative' }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                <GraduationCap size={36} color="#fff" />
              </div>
              <div className="text-white text-center">
                <div className="font-bold text-lg">Skills for the real world</div>
                <div className="text-white/80 text-sm mt-1">3,900+ courses available</div>
              </div>
              <div className="flex gap-2 mt-2">
                {['ML', 'Web Dev', 'Finance', 'Design'].map(tag => (
                  <span key={tag} className="text-xs px-2 py-1 rounded-full bg-white/20 text-white">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted by */}
      <section style={{ backgroundColor: '#f9f9f9', borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5' }}>
        <div className="max-w-screen-xl mx-auto px-6 py-8">
          <p className="text-sm font-medium text-center mb-6" style={{ color: '#636363' }}>
            Trusted by teams at leading companies worldwide
          </p>
          <div className="flex items-center justify-center gap-10 flex-wrap">
            {companies.map(company => (
              <span
                key={company}
                className="font-bold text-lg tracking-wide"
                style={{ color: '#c0c0c0', letterSpacing: '1px' }}
              >
                {company}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Goals */}
      <section className="max-w-screen-xl mx-auto px-6 py-16">
        <h2 className="font-bold text-2xl mb-2" style={{ color: '#1f1f1f' }}>Choose your learning goal</h2>
        <p className="mb-8 text-sm" style={{ color: '#636363' }}>We'll help you find the right path</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {goalCards.map(({ icon: Icon, label, color, iconColor }) => (
            <div
              key={label}
              onClick={() => navigate('/courses')}
              className="flex items-center gap-4 p-5 rounded-xl cursor-pointer transition-all hover:shadow-md border"
              style={{ backgroundColor: '#fff', borderColor: '#e5e5e5' }}
            >
              <div className="p-3 rounded-xl shrink-0" style={{ backgroundColor: color }}>
                <Icon size={22} style={{ color: iconColor }} />
              </div>
              <span className="font-semibold text-sm leading-snug" style={{ color: '#1f1f1f' }}>{label}</span>
              <ChevronRight size={16} className="ml-auto shrink-0" style={{ color: '#636363' }} />
            </div>
          ))}
        </div>
      </section>

      {/* Popular Skills */}
      <section style={{ backgroundColor: '#f9f9f9' }} className="py-16">
        <div className="max-w-screen-xl mx-auto px-6">
          <h2 className="font-bold text-2xl mb-6" style={{ color: '#1f1f1f' }}>Popular skills</h2>

          {/* Tabs */}
          <div className="flex gap-2 flex-wrap mb-8">
            {skillTabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all border"
                style={activeTab === tab
                  ? { backgroundColor: '#0056d2', color: '#fff', borderColor: '#0056d2' }
                  : { backgroundColor: '#fff', color: '#1f1f1f', borderColor: '#c5c5c5' }
                }
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Course grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filteredCourses.length > 0
              ? filteredCourses.map(course => (
                  <CourseCard key={course.id} course={course} />
                ))
              : courses.slice(0, 4).map(course => (
                  <CourseCard key={course.id} course={course} />
                ))
            }
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => navigate('/courses')}
              className="px-6 py-2.5 rounded border font-medium text-sm transition-colors hover:bg-gray-50"
              style={{ color: '#0056d2', borderColor: '#0056d2' }}
            >
              See all {activeTab} courses
            </button>
          </div>
        </div>
      </section>

      {/* Top Rated */}
      <section className="max-w-screen-xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold text-2xl" style={{ color: '#1f1f1f' }}>Top rated courses</h2>
          <button className="text-sm font-medium flex items-center gap-1" style={{ color: '#0056d2' }}>
            See all <ChevronRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {topRated.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* Earn Your Degree */}
      <section style={{ backgroundColor: '#f9f9f9' }} className="py-16">
        <div className="max-w-screen-xl mx-auto px-6">
          <h2 className="font-bold text-2xl mb-2" style={{ color: '#1f1f1f' }}>Earn your degree</h2>
          <p className="text-sm mb-8" style={{ color: '#636363' }}>
            Stand out with an accredited degree from a world-class university
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {universities.map(uni => (
              <div
                key={uni.name}
                className="bg-white rounded-xl p-6 border cursor-pointer transition-all hover:shadow-md flex flex-col gap-4"
                style={{ borderColor: '#e5e5e5' }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-sm"
                  style={{ backgroundColor: uni.color }}
                >
                  {uni.initial}
                </div>
                <div>
                  <div className="font-bold text-sm" style={{ color: '#1f1f1f' }}>{uni.name}</div>
                  <div className="text-xs mt-0.5" style={{ color: '#636363' }}>{uni.subtitle}</div>
                </div>
                <div
                  className="text-xs font-semibold px-3 py-1 rounded-full self-start mt-auto"
                  style={{ backgroundColor: '#e8f0fe', color: '#0056d2' }}
                >
                  {uni.degrees}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #e5e5e5', backgroundColor: '#ffffff' }} className="py-12">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="flex items-center gap-2 mb-6">
            <GraduationCap size={22} style={{ color: '#0056d2' }} />
            <span className="font-bold text-lg" style={{ color: '#1f1f1f' }}>Learn</span>
            <span className="text-sm ml-2" style={{ color: '#636363' }}>Skills for the real world</span>
          </div>
          <p className="text-xs" style={{ color: '#636363' }}>
            © 2025 ParaNet · Learn Platform. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
