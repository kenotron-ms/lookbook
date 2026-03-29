import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ChevronUp, ChevronDown, MessageSquare, Share2, Bookmark, Flag,
  Award, Minus, Plus as PlusIcon, ArrowLeft,
} from 'lucide-react'
import Header from '../components/Header.jsx'
import { posts, communities, comments } from '../data/posts.js'

function formatNum(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M'
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k'
  return n.toString()
}

const authorColors = [
  '#ff6314', '#46d160', '#9494ff', '#06b6d4', '#f59e0b', '#ec4899', '#10b981',
]

function getAuthorColor(name) {
  let hash = 0
  for (let c of name) hash = (hash * 31 + c.charCodeAt(0)) % authorColors.length
  return authorColors[hash]
}

function CommentTree({ comment, depth = 0 }) {
  const [collapsed, setCollapsed] = useState(false)
  const [vote, setVote] = useState(null)

  const score = comment.votes + (vote === 'up' ? 1 : vote === 'down' ? -1 : 0)
  const color = getAuthorColor(comment.author)
  const indent = depth * 20

  return (
    <div style={{
      marginLeft: depth > 0 ? 0 : 0,
      borderLeft: depth > 0 ? `2px solid ${depth === 1 ? '#ff6314' : depth === 2 ? '#343536' : '#272729'}` : 'none',
      paddingLeft: depth > 0 ? 12 : 0,
      marginBottom: depth === 0 ? 16 : 8,
    }}>
      {/* Comment header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
        <button
          onClick={() => setCollapsed(c => !c)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#818384', padding: 0, lineHeight: 1, fontSize: 16,
            display: 'flex', alignItems: 'center',
          }}
          title={collapsed ? 'Expand' : 'Collapse'}
        >
          <div style={{
            width: 16, height: 16, border: '1px solid #818384', borderRadius: 2,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {collapsed ? <PlusIcon size={10} /> : <Minus size={10} />}
          </div>
        </button>
        <span style={{ fontWeight: 700, fontSize: 13, color }}>u/{comment.author}</span>
        <span style={{ fontSize: 12, color: '#818384' }}>{formatNum(comment.karma)} karma</span>
        <span style={{ fontSize: 12, color: '#818384' }}>•</span>
        <span style={{ fontSize: 12, color: '#818384' }}>{comment.timeAgo}</span>
      </div>

      {!collapsed && (
        <>
          <p style={{
            fontSize: 14, color: '#d7dadc', lineHeight: 1.6,
            marginBottom: 8, marginLeft: 24,
          }}>
            {comment.text}
          </p>

          {/* Action row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 24, marginBottom: 12 }}>
            <button
              onClick={() => setVote(v => v === 'up' ? null : 'up')}
              style={{
                background: 'none', border: 'none', cursor: 'pointer', padding: '2px 4px',
                color: vote === 'up' ? '#ff6314' : '#818384', borderRadius: 2,
              }}
            >
              <ChevronUp size={16} />
            </button>
            <span style={{
              fontSize: 12, fontWeight: 700,
              color: vote === 'up' ? '#ff6314' : vote === 'down' ? '#9494ff' : '#818384',
            }}>{formatNum(score)}</span>
            <button
              onClick={() => setVote(v => v === 'down' ? null : 'down')}
              style={{
                background: 'none', border: 'none', cursor: 'pointer', padding: '2px 4px',
                color: vote === 'down' ? '#9494ff' : '#818384', borderRadius: 2,
              }}
            >
              <ChevronDown size={16} />
            </button>

            {[
              { icon: <MessageSquare size={13} />, label: 'Reply' },
              { icon: <Share2 size={13} />, label: 'Share' },
              { icon: <Award size={13} />, label: 'Award' },
              { icon: <Flag size={13} />, label: 'Report' },
            ].map(({ icon, label }) => (
              <button
                key={label}
                style={{
                  display: 'flex', alignItems: 'center', gap: 4,
                  padding: '2px 6px', background: 'none', border: 'none',
                  borderRadius: 2, cursor: 'pointer', color: '#818384',
                  fontSize: 12, fontWeight: 700,
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#272729'; e.currentTarget.style.color = '#d7dadc'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#818384'; }}
              >
                {icon}
                {label}
              </button>
            ))}
          </div>

          {/* Replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div style={{ marginLeft: 24 }}>
              {comment.replies.map(reply => (
                <CommentTree key={reply.id} comment={reply} depth={depth + 1} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default function PostDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [vote, setVote] = useState(null)
  const [commentText, setCommentText] = useState('')

  const post = posts.find(p => p.id === parseInt(id)) || posts[0]
  const community = communities.find(c => c.id === post.community) || communities[0]
  const postComments = comments.filter(c => c.postId === post.id)
  const score = post.score + (vote === 'up' ? 1 : vote === 'down' ? -1 : 0)

  return (
    <div style={{ background: '#1a1a1b', minHeight: '100vh' }}>
      <Header />

      <div style={{
        display: 'flex', maxWidth: 1200, margin: '0 auto',
        paddingTop: 64, paddingLeft: 16, paddingRight: 16, gap: 24,
      }}>
        {/* Main content */}
        <main style={{ flex: 1, minWidth: 0, paddingTop: 16 }}>
          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: 'none', border: 'none', cursor: 'pointer',
              color: '#818384', fontSize: 13, fontWeight: 700, marginBottom: 12, padding: 4,
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#d7dadc'}
            onMouseLeave={e => e.currentTarget.style.color = '#818384'}
          >
            <ArrowLeft size={15} />
            Back
          </button>

          {/* Post card */}
          <div style={{
            background: '#1a1a1b', border: '1px solid #343536', borderRadius: 4,
            display: 'flex', marginBottom: 16,
          }}>
            {/* Vote column */}
            <div style={{
              width: 40, minWidth: 40, background: '#161617',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              padding: '12px 4px', gap: 4, borderRadius: '4px 0 0 4px',
            }}>
              <button
                onClick={() => setVote(v => v === 'up' ? null : 'up')}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer', padding: 2,
                  color: vote === 'up' ? '#ff6314' : '#818384', borderRadius: 2,
                }}
              >
                <ChevronUp size={20} strokeWidth={2.5} />
              </button>
              <span style={{
                fontSize: 14, fontWeight: 700,
                color: vote === 'up' ? '#ff6314' : vote === 'down' ? '#9494ff' : '#d7dadc',
              }}>
                {formatNum(score)}
              </span>
              <button
                onClick={() => setVote(v => v === 'down' ? null : 'down')}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer', padding: 2,
                  color: vote === 'down' ? '#9494ff' : '#818384', borderRadius: 2,
                }}
              >
                <ChevronDown size={20} strokeWidth={2.5} />
              </button>
            </div>

            {/* Post content */}
            <div style={{ flex: 1, padding: '16px 16px 12px' }}>
              {/* Meta */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10, flexWrap: 'wrap' }}>
                <span
                  style={{ fontSize: 12, fontWeight: 700, color: '#d7dadc', cursor: 'pointer' }}
                  onClick={() => navigate(`/g/${post.community}`)}
                  onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                  onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
                >
                  g/{post.community}
                </span>
                <span style={{ color: '#343536', fontSize: 12 }}>•</span>
                <span style={{ fontSize: 12, color: '#818384' }}>
                  Posted by u/{post.author}
                </span>
                <span style={{ fontSize: 12, color: '#818384' }}>{post.timeAgo}</span>
                {post.flair && (
                  <span style={{
                    fontSize: 11, fontWeight: 600, padding: '2px 10px', borderRadius: 12,
                    background: post.flairBg, color: post.flairColor,
                  }}>
                    {post.flair}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 style={{
                fontSize: 22, fontWeight: 600, color: '#d7dadc', lineHeight: 1.3,
                marginBottom: 14,
              }}>
                {post.title}
              </h1>

              {/* Full body */}
              <p style={{
                fontSize: 15, color: '#d7dadc', lineHeight: 1.7, marginBottom: 16,
                background: '#272729', borderRadius: 4, padding: 16,
              }}>
                {post.preview}
              </p>

              {/* Actions */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {[
                  { icon: <MessageSquare size={14} />, label: `${formatNum(post.commentCount)} Comments` },
                  { icon: <Share2 size={14} />, label: 'Share' },
                  { icon: <Bookmark size={14} />, label: 'Save' },
                  { icon: <Award size={14} />, label: 'Award' },
                  { icon: <Flag size={14} />, label: 'Report' },
                ].map(({ icon, label }) => (
                  <button
                    key={label}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 4,
                      padding: '6px 8px', background: 'none', border: 'none',
                      borderRadius: 2, cursor: 'pointer', color: '#818384',
                      fontSize: 12, fontWeight: 700,
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#272729'; e.currentTarget.style.color = '#d7dadc'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#818384'; }}
                  >
                    {icon}
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Comment input */}
          <div style={{
            background: '#1a1a1b', border: '1px solid #343536', borderRadius: 4,
            padding: 16, marginBottom: 16,
          }}>
            <p style={{ fontSize: 13, color: '#818384', marginBottom: 10 }}>
              Comment as <span style={{ color: '#ff6314', fontWeight: 700 }}>u/you</span>
            </p>
            <textarea
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              placeholder="What are your thoughts?"
              rows={5}
              style={{
                width: '100%', background: '#272729', border: '1px solid #343536',
                borderRadius: 4, padding: 12, color: '#d7dadc', fontSize: 14,
                resize: 'vertical', outline: 'none', fontFamily: 'inherit',
                lineHeight: 1.6, boxSizing: 'border-box',
              }}
              onFocus={e => e.target.style.border = '1px solid #ff6314'}
              onBlur={e => e.target.style.border = '1px solid #343536'}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
              <button
                disabled={!commentText.trim()}
                style={{
                  padding: '8px 20px', background: commentText.trim() ? '#ff6314' : '#343536',
                  border: 'none', borderRadius: 20, color: '#fff',
                  fontWeight: 700, fontSize: 14, cursor: commentText.trim() ? 'pointer' : 'not-allowed',
                }}
                onMouseEnter={e => { if (commentText.trim()) e.currentTarget.style.background = '#e55a10'; }}
                onMouseLeave={e => { if (commentText.trim()) e.currentTarget.style.background = '#ff6314'; }}
              >
                Comment
              </button>
            </div>
          </div>

          {/* Comments */}
          <div style={{
            background: '#1a1a1b', border: '1px solid #343536', borderRadius: 4,
            padding: '16px 16px 8px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#d7dadc' }}>
                {formatNum(post.commentCount)} Comments
              </h2>
              <select style={{
                background: '#272729', border: '1px solid #343536', borderRadius: 4,
                color: '#d7dadc', padding: '4px 8px', fontSize: 13, cursor: 'pointer', outline: 'none',
              }}>
                <option>Best</option>
                <option>Top</option>
                <option>New</option>
                <option>Controversial</option>
              </select>
            </div>

            {postComments.length > 0 ? postComments.map(comment => (
              <CommentTree key={comment.id} comment={comment} depth={0} />
            )) : (
              <div style={{ textAlign: 'center', padding: '40px 0', color: '#818384' }}>
                <MessageSquare size={40} color="#343536" style={{ marginBottom: 12 }} />
                <p style={{ fontSize: 16, fontWeight: 700, color: '#d7dadc', marginBottom: 6 }}>No Comments Yet</p>
                <p>Be the first to share what you think!</p>
              </div>
            )}
          </div>
        </main>

        {/* Right sidebar */}
        <aside style={{ width: 312, minWidth: 312, paddingTop: 16 }}>
          {/* Community info */}
          <div style={{
            background: '#1a1a1b', border: '1px solid #343536',
            borderRadius: 4, overflow: 'hidden', marginBottom: 16,
          }}>
            <div style={{
              background: community.color, padding: '10px 16px',
            }}>
              <span style={{ fontWeight: 700, fontSize: 14, color: '#fff' }}>
                g/{community.name}
              </span>
            </div>
            <div style={{ padding: 16 }}>
              <p style={{ fontSize: 13, color: '#d7dadc', lineHeight: 1.6, marginBottom: 16 }}>
                {community.description}
              </p>
              <div style={{ display: 'flex', gap: 24, marginBottom: 16 }}>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: '#d7dadc' }}>{formatNum(community.members)}</div>
                  <div style={{ fontSize: 12, color: '#818384' }}>Members</div>
                </div>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: '#46d160' }}>{formatNum(community.online)}</div>
                  <div style={{ fontSize: 12, color: '#818384' }}>Online</div>
                </div>
              </div>
              <button
                onClick={() => navigate(`/g/${community.id}`)}
                style={{
                  width: '100%', padding: '8px 0', background: '#ff6314',
                  border: 'none', borderRadius: 20, color: '#fff',
                  fontWeight: 700, fontSize: 14, cursor: 'pointer',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#e55a10'}
                onMouseLeave={e => e.currentTarget.style.background = '#ff6314'}
              >
                Join Community
              </button>
            </div>
          </div>

          {/* Rules */}
          <div style={{
            background: '#1a1a1b', border: '1px solid #343536',
            borderRadius: 4, overflow: 'hidden',
          }}>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid #343536' }}>
              <span style={{ fontWeight: 700, fontSize: 14, color: '#d7dadc' }}>Posting Rules</span>
            </div>
            {community.rules.slice(0, 3).map((rule, i) => (
              <div key={i} style={{
                display: 'flex', gap: 10, padding: '10px 16px',
                borderBottom: i < 2 ? '1px solid #272729' : 'none',
              }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#ff6314', minWidth: 18 }}>{i + 1}.</span>
                <span style={{ fontSize: 13, color: '#d7dadc', lineHeight: 1.5 }}>{rule}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}
