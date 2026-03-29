import { BookOpen, Star, TrendingUp, Shield, Lock } from 'lucide-react'
import { earnCourses, stakingOptions } from '../data/crypto.js'

function CourseCard({ course }) {
  return (
    <div style={{
      background: '#ffffff', border: '1px solid #e6e8ea',
      borderRadius: 12, padding: '20px',
      display: 'flex', flexDirection: 'column', gap: 14,
      transition: 'box-shadow 0.15s', cursor: 'pointer',
    }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = ''}
    >
      {/* Coin icon */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 48, height: 48, borderRadius: '50%',
          background: `${course.color}18`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: course.color }}>{course.symbol}</span>
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#0a0b0d' }}>{course.desc}</div>
          <div style={{ fontSize: 12, color: '#8a919e', marginTop: 2 }}>{course.name}</div>
        </div>
      </div>

      {/* Progress bar placeholder */}
      <div style={{ height: 4, borderRadius: 2, background: '#e6e8ea', overflow: 'hidden' }}>
        <div style={{ width: '0%', height: '100%', background: course.color, borderRadius: 2 }} />
      </div>

      {/* Reward + CTA */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Star size={13} color="#f7931a" fill="#f7931a" />
          <span style={{ fontSize: 13, fontWeight: 600, color: '#0a0b0d' }}>
            Earn ${course.reward}
          </span>
        </div>
        <button style={{
          padding: '6px 14px', borderRadius: 6,
          background: '#1652f0', color: '#ffffff',
          fontSize: 12, fontWeight: 600, border: 'none', cursor: 'pointer',
        }}>
          Start
        </button>
      </div>
    </div>
  )
}

function StakingRow({ option }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14,
      padding: '14px 0', borderBottom: '1px solid #f5f7fa',
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: '50%',
        background: `${option.color}18`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: option.color }}>{option.symbol}</span>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#0a0b0d' }}>{option.name}</div>
        <div style={{ fontSize: 12, color: '#8a919e', marginTop: 1 }}>Min. {option.minAmount}</div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: '#05b169' }}>{option.apy}</div>
        <div style={{ fontSize: 11, color: '#8a919e' }}>APY</div>
      </div>
      <button style={{
        padding: '8px 18px', borderRadius: 8,
        background: '#eef1fe', color: '#1652f0',
        fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer', marginLeft: 8,
      }}>
        Stake
      </button>
    </div>
  )
}

export default function Earn() {
  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '32px 24px' }}>

      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #1652f0 0%, #0d3ec7 100%)',
        borderRadius: 16, padding: '36px 40px', marginBottom: 32, color: '#ffffff',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, letterSpacing: '-0.3px' }}>
            Earn crypto while learning
          </div>
          <div style={{ fontSize: 15, opacity: 0.85, maxWidth: 460, lineHeight: 1.6 }}>
            Watch short videos, answer questions, and earn real crypto rewards. 
            Over $50 in rewards available today.
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
            <button style={{
              padding: '10px 22px', borderRadius: 8, background: '#ffffff',
              color: '#1652f0', fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer',
            }}>
              Browse Courses
            </button>
            <button style={{
              padding: '10px 22px', borderRadius: 8, background: 'rgba(255,255,255,0.15)',
              color: '#ffffff', fontWeight: 600, fontSize: 14, border: '1px solid rgba(255,255,255,0.3)', cursor: 'pointer',
            }}>
              My Rewards
            </button>
          </div>
        </div>
        <div style={{ display: 'flex', gap: -8 }}>
          {['BTC', 'ETH', 'SOL'].map((sym, i) => (
            <div key={sym} style={{
              width: 56, height: 56, borderRadius: '50%',
              background: ['#f7931a', '#627eea', '#9945ff'][i],
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginLeft: i > 0 ? -12 : 0,
              border: '2px solid rgba(255,255,255,0.4)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#fff' }}>{sym}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 32 }}>
        {[
          { icon: BookOpen, label: 'Courses Available', value: '24', color: '#1652f0' },
          { icon: TrendingUp, label: 'Total Rewards Paid', value: '$2.1M+', color: '#05b169' },
          { icon: Star, label: 'Learners Earning', value: '4.2M', color: '#f7931a' },
        ].map(stat => (
          <div key={stat.label} style={{
            background: '#ffffff', border: '1px solid #e6e8ea',
            borderRadius: 10, padding: '16px 20px',
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: 8,
              background: `${stat.color}14`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <stat.icon size={18} color={stat.color} />
            </div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#0a0b0d' }}>{stat.value}</div>
              <div style={{ fontSize: 12, color: '#8a919e', marginTop: 1 }}>{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Course cards */}
      <div style={{ marginBottom: 36 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#0a0b0d' }}>Earn by Learning</div>
          <button style={{ fontSize: 13, color: '#1652f0', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>
            View all →
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {earnCourses.map(course => <CourseCard key={course.id} course={course} />)}
        </div>
      </div>

      {/* Staking section */}
      <div style={{
        background: '#ffffff', border: '1px solid #e6e8ea',
        borderRadius: 12, padding: '24px 28px',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <Shield size={16} color="#1652f0" />
              <span style={{ fontSize: 18, fontWeight: 700, color: '#0a0b0d' }}>Vault Rewards — Staking</span>
            </div>
            <div style={{ fontSize: 13, color: '#8a919e' }}>
              Put your crypto to work. Earn rewards simply by holding supported assets.
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 6, background: '#e6f9f0' }}>
            <Lock size={12} color="#05b169" />
            <span style={{ fontSize: 12, fontWeight: 600, color: '#05b169' }}>Non-custodial</span>
          </div>
        </div>

        {stakingOptions.map(opt => <StakingRow key={opt.symbol} option={opt} />)}

        <div style={{
          marginTop: 16, padding: '12px 16px', borderRadius: 8,
          background: '#f5f7fa', fontSize: 12, color: '#8a919e', lineHeight: 1.6,
        }}>
          <strong style={{ color: '#0a0b0d' }}>Staking note:</strong> APY rates are estimates and can vary. Staked assets may be subject to a bonding period before you can unstake. 
          Rewards are distributed daily to your Vault account.
        </div>
      </div>
    </div>
  )
}
