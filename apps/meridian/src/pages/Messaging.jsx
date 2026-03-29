import { useState } from 'react';
import { Search, Edit, MoreHorizontal, Paperclip, Image, Smile, Send, Phone, Video, Info } from 'lucide-react';
import { CONVERSATIONS, ACTIVE_CONVERSATION, CURRENT_USER } from '../data/network';

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

export default function Messaging() {
  const [activeConv, setActiveConv] = useState(0);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(ACTIVE_CONVERSATION.messages);
  const conv = CONVERSATIONS[activeConv];

  const handleSend = () => {
    if (!message.trim()) return;
    setMessages(prev => [...prev, {
      id: prev.length + 1,
      from: 'me',
      text: message,
      time: 'Just now',
    }]);
    setMessage('');
  };

  return (
    <div style={{ maxWidth: '1128px', margin: '0 auto', padding: '24px 16px' }}>
      <div style={{
        background: '#ffffff',
        border: '1px solid #e0dfdc',
        borderRadius: '8px',
        overflow: 'hidden',
        display: 'flex',
        height: 'calc(100vh - 100px)',
        maxHeight: '720px',
      }}>
        {/* Left — Conversation List */}
        <div style={{
          width: '320px',
          flexShrink: 0,
          borderRight: '1px solid #e0dfdc',
          display: 'flex',
          flexDirection: 'column',
        }}>
          {/* Header */}
          <div style={{
            padding: '16px',
            borderBottom: '1px solid #e0dfdc',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '16px', color: '#000000e6' }}>Messaging</div>
              <div style={{ fontSize: '12px', color: '#666666' }}>{CURRENT_USER.name}</div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666666', padding: '4px' }}>
                <MoreHorizontal size={18} />
              </button>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#0a66c2', padding: '4px' }}>
                <Edit size={18} />
              </button>
            </div>
          </div>

          {/* Search */}
          <div style={{ padding: '12px 16px', borderBottom: '1px solid #e0dfdc' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              background: '#f3f2ef', borderRadius: '20px', padding: '8px 14px',
            }}>
              <Search size={15} color="#666666" />
              <input
                placeholder="Search messages"
                style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '13px', color: '#000000e6', width: '100%' }}
              />
            </div>
          </div>

          {/* Filter tabs */}
          <div style={{ display: 'flex', padding: '8px 16px', gap: '8px', borderBottom: '1px solid #e0dfdc' }}>
            {['Focused', 'Other'].map((tab, i) => (
              <button key={tab} style={{
                padding: '4px 12px', borderRadius: '20px',
                border: 'none',
                background: i === 0 ? '#dbeafe' : 'transparent',
                color: i === 0 ? '#0a66c2' : '#666666',
                fontSize: '13px', fontWeight: i === 0 ? 600 : 400, cursor: 'pointer',
              }}>{tab}</button>
            ))}
          </div>

          {/* List */}
          <div style={{ overflowY: 'auto', flex: 1 }}>
            {CONVERSATIONS.map((c, i) => (
              <div
                key={c.id}
                onClick={() => setActiveConv(i)}
                style={{
                  display: 'flex', gap: '12px', padding: '14px 16px',
                  cursor: 'pointer', alignItems: 'flex-start',
                  background: i === activeConv ? '#f3f2ef' : 'transparent',
                  borderBottom: '1px solid #f3f2ef',
                }}
              >
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <Avatar initials={c.initials} color={c.avatarColor} size={44} />
                  {c.active && (
                    <div style={{
                      position: 'absolute', bottom: '2px', right: '2px',
                      width: '10px', height: '10px', borderRadius: '50%',
                      background: '#059669', border: '2px solid white',
                    }} />
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <div style={{ fontWeight: c.unread > 0 ? 700 : 600, fontSize: '14px', color: '#000000e6' }}>{c.name}</div>
                    <div style={{ fontSize: '11px', color: '#666666', flexShrink: 0, marginLeft: '6px' }}>{c.time}</div>
                  </div>
                  <div style={{ fontSize: '12px', color: '#666666', marginBottom: '2px' }}>{c.headline}</div>
                  <div style={{
                    fontSize: '12px',
                    color: c.unread > 0 ? '#000000e6' : '#666666',
                    fontWeight: c.unread > 0 ? 600 : 400,
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  }}>
                    {c.lastMessage}
                  </div>
                </div>
                {c.unread > 0 && (
                  <div style={{
                    width: '18px', height: '18px', borderRadius: '50%',
                    background: '#0a66c2', color: 'white',
                    fontSize: '11px', fontWeight: 700,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>{c.unread}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right — Chat */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          {/* Chat Header */}
          <div style={{
            padding: '14px 20px', borderBottom: '1px solid #e0dfdc',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <Avatar initials={conv.initials} color={conv.avatarColor} size={44} />
              <div>
                <div style={{ fontWeight: 700, fontSize: '15px', color: '#000000e6' }}>{conv.name}</div>
                <div style={{ fontSize: '12px', color: '#666666' }}>{conv.headline}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666666', padding: '6px' }}>
                <Phone size={18} />
              </button>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666666', padding: '6px' }}>
                <Video size={18} />
              </button>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666666', padding: '6px' }}>
                <Info size={18} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {messages.map((msg) => {
              const isMe = msg.from === 'me';
              return (
                <div key={msg.id} style={{
                  display: 'flex', justifyContent: isMe ? 'flex-end' : 'flex-start',
                  alignItems: 'flex-end', gap: '8px',
                }}>
                  {!isMe && <Avatar initials={conv.initials} color={conv.avatarColor} size={32} />}
                  <div style={{ maxWidth: '70%' }}>
                    <div style={{
                      padding: '10px 14px',
                      background: isMe ? '#0a66c2' : '#f3f2ef',
                      color: isMe ? 'white' : '#000000e6',
                      borderRadius: isMe ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                      fontSize: '14px', lineHeight: 1.5,
                    }}>
                      {msg.text}
                    </div>
                    <div style={{ fontSize: '11px', color: '#999', marginTop: '4px', textAlign: isMe ? 'right' : 'left' }}>
                      {msg.time}
                    </div>
                  </div>
                  {isMe && (
                    <div style={{
                      width: '32px', height: '32px', borderRadius: '50%',
                      background: '#0a66c2', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '12px',
                    }}>JB</div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Input */}
          <div style={{
            padding: '12px 20px', borderTop: '1px solid #e0dfdc',
          }}>
            <div style={{
              border: '1px solid #c0bfbc', borderRadius: '8px', overflow: 'hidden',
            }}>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                placeholder="Write a message..."
                style={{
                  width: '100%', padding: '12px 16px', border: 'none', outline: 'none',
                  resize: 'none', fontSize: '14px', color: '#000000e6',
                  fontFamily: 'inherit', minHeight: '48px', maxHeight: '120px',
                }}
              />
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '8px 12px', background: '#f9f9f9', borderTop: '1px solid #e0dfdc',
              }}>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {[Paperclip, Image, Smile].map((Icon, i) => (
                    <button key={i} style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: '#666666', padding: '6px', borderRadius: '4px',
                    }}>
                      <Icon size={18} />
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleSend}
                  disabled={!message.trim()}
                  style={{
                    padding: '8px 18px', border: 'none', borderRadius: '20px',
                    background: message.trim() ? '#0a66c2' : '#c0bfbc',
                    color: 'white', fontWeight: 600, fontSize: '14px',
                    cursor: message.trim() ? 'pointer' : 'default',
                    display: 'flex', alignItems: 'center', gap: '6px',
                  }}
                >
                  <Send size={14} /> Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
