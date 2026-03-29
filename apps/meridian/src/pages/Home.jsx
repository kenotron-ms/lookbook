import { Image, FileText, Calendar, ThumbsUp, MessageCircle, Repeat2, Send, Globe, MoreHorizontal, Bookmark, BookmarkCheck } from 'lucide-react';
import { useState } from 'react';
import { CURRENT_USER, FEED_POSTS, SUGGESTED_CONNECTIONS } from '../data/network';

function Avatar({ initials, color, size = 40 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: color || '#0a66c2',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: 'white', fontWeight: 700,
      fontSize: size > 50 ? '20px' : '14px',
      flexShrink: 0,
    }}>
      {initials}
    </div>
  );
}

function Card({ children, style = {} }) {
  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid #e0dfdc',
      borderRadius: '8px',
      overflow: 'hidden',
      ...style,
    }}>
      {children}
    </div>
  );
}

function LeftProfileCard() {
  return (
    <Card>
      {/* Cover */}
      <div style={{
        height: '56px',
        background: 'linear-gradient(135deg, #0a66c2 0%, #083a73 100%)',
      }} />
      <div style={{ padding: '0 16px 16px', marginTop: '-28px' }}>
        <div style={{
          width: '60px', height: '60px', borderRadius: '50%',
          background: '#0a66c2',
          border: '3px solid white',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', fontWeight: 700, fontSize: '20px',
        }}>JB</div>
        <div style={{ marginTop: '8px' }}>
          <div style={{ fontWeight: 700, fontSize: '15px', color: '#000000e6' }}>{CURRENT_USER.name}</div>
          <div style={{ fontSize: '12px', color: '#666666', marginTop: '2px', lineHeight: 1.4 }}>{CURRENT_USER.headline}</div>
        </div>
        <div style={{ borderTop: '1px solid #e0dfdc', marginTop: '12px', paddingTop: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ fontSize: '12px', color: '#666666' }}>Profile viewers</span>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#0a66c2' }}>248</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '12px', color: '#666666' }}>Post impressions</span>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#0a66c2' }}>1,842</span>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #e0dfdc', marginTop: '12px', paddingTop: '12px' }}>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: '#666666', fontSize: '13px', marginBottom: '8px' }}>
            <Bookmark size={15} />
            <span>Saved items</span>
          </a>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: '#666666', fontSize: '13px' }}>
            <BookmarkCheck size={15} />
            <span>My network</span>
          </a>
        </div>
        <div style={{ borderTop: '1px solid #e0dfdc', marginTop: '12px', paddingTop: '12px' }}>
          <div style={{ fontSize: '12px', color: '#0a66c2', fontWeight: 600 }}>
            {CURRENT_USER.connections.toLocaleString()} connections
          </div>
          <div style={{ fontSize: '12px', color: '#666666', marginTop: '2px' }}>Grow your network</div>
        </div>
      </div>
    </Card>
  );
}

function PostComposer() {
  return (
    <Card style={{ padding: '12px 16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
        <div style={{
          width: '40px', height: '40px', borderRadius: '50%',
          background: '#0a66c2',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', fontWeight: 700, fontSize: '14px', flexShrink: 0,
        }}>JB</div>
        <div style={{
          flex: 1, border: '1px solid #c0bfbc', borderRadius: '35px',
          padding: '10px 16px', cursor: 'pointer',
          color: '#666666', fontSize: '14px',
        }}>
          Start a post, try writing with AI
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        {[
          { icon: Image, label: 'Media', color: '#378FE9' },
          { icon: Calendar, label: 'Event', color: '#C37D16' },
          { icon: FileText, label: 'Article', color: '#E06847' },
        ].map(({ icon: Icon, label, color }) => (
          <button key={label} style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '8px 12px', border: 'none', background: 'none',
            cursor: 'pointer', borderRadius: '4px', color: '#666666',
            fontSize: '13px', fontWeight: 600,
          }}>
            <Icon size={18} style={{ color }} />
            {label}
          </button>
        ))}
      </div>
    </Card>
  );
}

function ReactionBar({ reactions }) {
  if (!reactions) return null;
  const total = Object.values(reactions).reduce((a, b) => a + b, 0);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
      <div style={{ display: 'flex', gap: '-2px' }}>
        {reactions.like && <span style={{ fontSize: '13px' }}>👍</span>}
        {reactions.celebrate && <span style={{ fontSize: '13px' }}>🎉</span>}
        {reactions.insightful && <span style={{ fontSize: '13px' }}>💡</span>}
      </div>
      <span style={{ fontSize: '12px', color: '#666666' }}>{total.toLocaleString()}</span>
    </div>
  );
}

function FeedPost({ post }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <Card>
      {post.sponsored && (
        <div style={{ padding: '4px 16px', background: '#f3f2ef', fontSize: '11px', color: '#666666' }}>
          Sponsored
        </div>
      )}
      <div style={{ padding: '12px 16px' }}>
        {/* Author */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <Avatar initials={post.initials} color={post.avatarColor} size={44} />
            <div>
              <div style={{ fontWeight: 700, fontSize: '14px', color: '#000000e6' }}>{post.author}</div>
              <div style={{ fontSize: '12px', color: '#666666', marginTop: '1px' }}>{post.headline}</div>
              {post.time && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                  <span style={{ fontSize: '12px', color: '#666666' }}>{post.time}</span>
                  <Globe size={12} color="#666666" />
                </div>
              )}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '4px' }}>
            {!post.sponsored && (
              <button onClick={() => setSaved(!saved)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#0a66c2', padding: '4px' }}>
                {saved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
              </button>
            )}
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666666', padding: '4px' }}>
              <MoreHorizontal size={18} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div style={{ fontSize: '14px', color: '#000000e6', lineHeight: 1.6, whiteSpace: 'pre-line', marginBottom: '10px' }}>
          {post.content}
        </div>

        {/* Article Preview */}
        {post.articlePreview && (
          <div style={{
            border: '1px solid #e0dfdc', borderRadius: '8px', overflow: 'hidden', marginBottom: '10px', cursor: 'pointer',
          }}>
            <div style={{ height: '80px', background: 'linear-gradient(135deg, #0a66c2, #083a73)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileText size={32} color="rgba(255,255,255,0.7)" />
            </div>
            <div style={{ padding: '10px 12px', background: '#f3f2ef' }}>
              <div style={{ fontWeight: 600, fontSize: '13px', color: '#000000e6', marginBottom: '2px' }}>{post.articlePreview.title}</div>
              <div style={{ fontSize: '12px', color: '#666666' }}>{post.articlePreview.source}</div>
            </div>
          </div>
        )}

        {/* Sponsored CTA */}
        {post.sponsored && post.ctaText && (
          <button style={{
            padding: '8px 20px', border: '1px solid #0a66c2', borderRadius: '20px',
            background: 'transparent', color: '#0a66c2', fontWeight: 600,
            fontSize: '14px', cursor: 'pointer', marginBottom: '10px',
          }}>
            {post.ctaText}
          </button>
        )}

        {/* Reactions count */}
        {post.reactions && (
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', paddingBottom: '6px', borderBottom: '1px solid #e0dfdc' }}>
            <ReactionBar reactions={post.reactions} />
            <div style={{ fontSize: '12px', color: '#666666' }}>
              {post.comments > 0 && `${post.comments} comments`}
              {post.comments > 0 && post.reposts > 0 && ' · '}
              {post.reposts > 0 && `${post.reposts} reposts`}
            </div>
          </div>
        )}

        {/* Actions */}
        {!post.sponsored && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            {[
              { icon: ThumbsUp, label: liked ? 'Liked' : 'Like', action: () => setLiked(!liked), active: liked },
              { icon: MessageCircle, label: 'Comment', action: null },
              { icon: Repeat2, label: 'Repost', action: null },
              { icon: Send, label: 'Send', action: null },
            ].map(({ icon: Icon, label, action, active }) => (
              <button
                key={label}
                onClick={action}
                style={{
                  display: 'flex', alignItems: 'center', gap: '5px',
                  padding: '10px 12px', border: 'none', background: 'none',
                  cursor: 'pointer', borderRadius: '4px', flex: 1,
                  justifyContent: 'center',
                  color: active ? '#0a66c2' : '#666666',
                  fontSize: '13px', fontWeight: 600,
                }}
              >
                <Icon size={18} style={active ? { color: '#0a66c2', fill: '#0a66c2' } : {}} />
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}

function RightSidebar() {
  const [followed, setFollowed] = useState({});
  const suggestions = SUGGESTED_CONNECTIONS.slice(0, 4);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {/* Add to your feed */}
      <Card style={{ padding: '12px 0' }}>
        <div style={{ padding: '0 16px 8px', fontWeight: 600, fontSize: '14px', color: '#000000e6' }}>
          Add to your feed
        </div>
        {suggestions.map((person) => (
          <div key={person.id} style={{
            display: 'flex', alignItems: 'flex-start', gap: '10px',
            padding: '8px 16px',
          }}>
            <Avatar initials={person.initials} color={person.avatarColor} size={40} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 600, fontSize: '13px', color: '#000000e6', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{person.name}</div>
              <div style={{ fontSize: '11px', color: '#666666', lineHeight: 1.3, marginBottom: '8px' }}>{person.headline}</div>
              <button
                onClick={() => setFollowed(f => ({ ...f, [person.id]: !f[person.id] }))}
                style={{
                  padding: '4px 14px',
                  border: `1px solid ${followed[person.id] ? '#e0dfdc' : '#0a66c2'}`,
                  borderRadius: '20px', background: 'transparent',
                  color: followed[person.id] ? '#666666' : '#0a66c2',
                  fontWeight: 600, fontSize: '13px', cursor: 'pointer',
                }}
              >
                {followed[person.id] ? '✓ Following' : '+ Follow'}
              </button>
            </div>
          </div>
        ))}
      </Card>

      {/* Meridian News */}
      <Card style={{ padding: '12px 16px' }}>
        <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '12px', color: '#000000e6' }}>Meridian News</div>
        {[
          { title: 'AI investment surges 40% in Q1', time: '2h ago · 8,243 readers' },
          { title: 'Remote work policies reshape Bay Area housing', time: '4h ago · 5,102 readers' },
          { title: 'VC funding rebounds after 18-month slump', time: '6h ago · 3,847 readers' },
          { title: 'Tech layoffs slow as hiring rebounds', time: '8h ago · 2,914 readers' },
          { title: 'Design tools war: Figma vs. new challengers', time: '12h ago · 1,703 readers' },
        ].map((item, i) => (
          <div key={i} style={{ marginBottom: '10px', cursor: 'pointer' }}>
            <div style={{ fontWeight: 600, fontSize: '13px', color: '#000000e6', marginBottom: '2px' }}>
              · {item.title}
            </div>
            <div style={{ fontSize: '11px', color: '#666666' }}>{item.time}</div>
          </div>
        ))}
        <a href="#" style={{ fontSize: '13px', color: '#666666', textDecoration: 'none', fontWeight: 600 }}>
          Show more ›
        </a>
      </Card>
    </div>
  );
}

export default function Home() {
  return (
    <div style={{ maxWidth: '1128px', margin: '0 auto', padding: '24px 16px', display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
      {/* Left */}
      <div style={{ width: '225px', flexShrink: 0, position: 'sticky', top: '68px' }}>
        <LeftProfileCard />
      </div>

      {/* Center */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <PostComposer />
        {/* Sort */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ flex: 1, height: '1px', background: '#e0dfdc' }} />
          <span style={{ fontSize: '12px', color: '#666666', fontWeight: 600 }}>Sort by: Top ▾</span>
        </div>
        {FEED_POSTS.map(post => <FeedPost key={post.id} post={post} />)}
      </div>

      {/* Right */}
      <div style={{ width: '300px', flexShrink: 0, position: 'sticky', top: '68px' }}>
        <RightSidebar />
      </div>
    </div>
  );
}
