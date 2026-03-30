import { useParams } from 'react-router-dom'
import ChatArea from '../components/ChatArea'

export default function Conversation() {
  const { convoId } = useParams()
  return <ChatArea convoId={Number(convoId)} key={convoId} />
}
