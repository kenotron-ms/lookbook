import ServerList from '../components/ServerList'
import ChannelList from '../components/ChannelList'
import ChatArea from '../components/ChatArea'
import MemberList from '../components/MemberList'
import UserPanel from '../components/UserPanel'

export default function ServerView() {
  return (
    <div style={{ display: 'flex', width: '100%', height: '100vh', overflow: 'hidden' }}>
      {/* Column 1: Server list (72px) */}
      <ServerList />

      {/* Column 2: Channel list (240px) */}
      <div style={{ display: 'flex', flexDirection: 'column', width: '240px', minWidth: '240px', background: '#2b2d31' }}>
        <ChannelList />
        <UserPanel />
      </div>

      {/* Column 3: Chat area (flex-1) */}
      <ChatArea />

      {/* Column 4: Member list (240px) */}
      <MemberList />
    </div>
  )
}
