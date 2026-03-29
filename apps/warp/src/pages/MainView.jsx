import { useState } from 'react'
import LeftNav from '../components/LeftNav'
import ChatList from '../components/ChatList'
import ConversationArea from '../components/ConversationArea'
import { chats } from '../data/chats'

export default function MainView() {
  const [selectedChat, setSelectedChat] = useState(chats[0])

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <LeftNav />
      <ChatList selectedChatId={selectedChat?.id} onSelectChat={setSelectedChat} />
      <ConversationArea chat={selectedChat} />
    </div>
  )
}