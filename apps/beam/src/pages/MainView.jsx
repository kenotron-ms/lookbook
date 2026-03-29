import { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import LeftPanel from '../components/LeftPanel.jsx'
import RightPanel from '../components/RightPanel.jsx'

export default function MainView() {
  const [activeChatId, setActiveChatId] = useState(1)

  return (
    <div className="flex h-screen w-full overflow-hidden" style={{ background: '#0b141a' }}>
      <LeftPanel activeChatId={activeChatId} onSelectChat={setActiveChatId} />
      {activeChatId ? (
        <RightPanel chatId={activeChatId} />
      ) : (
        /* Empty state when no chat selected */
        <div
          className="flex-1 flex flex-col items-center justify-center gap-4"
          style={{ background: '#0b141a' }}
        >
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center"
            style={{ background: '#202c33' }}
          >
            <MessageCircle size={44} fill="#25d366" color="#25d366" />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-light mb-2" style={{ color: '#e9edef' }}>Beam</h2>
            <p className="text-sm" style={{ color: '#8696a0' }}>
              Stay close, wherever you are
            </p>
          </div>
          <p className="text-xs" style={{ color: '#8696a0' }}>
            Select a chat to start messaging
          </p>
        </div>
      )}
    </div>
  )
}
