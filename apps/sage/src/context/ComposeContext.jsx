import { createContext, useContext, useState } from 'react'

const ComposeContext = createContext(null)

export function ComposeProvider({ children }) {
  const [open, setOpen] = useState(false)
  const [replyTo, setReplyTo] = useState(null)

  const openCompose = (msg = null) => {
    setReplyTo(msg)
    setOpen(true)
  }
  const closeCompose = () => {
    setOpen(false)
    setReplyTo(null)
  }

  return (
    <ComposeContext.Provider value={{ open, replyTo, openCompose, closeCompose }}>
      {children}
    </ComposeContext.Provider>
  )
}

export function useCompose() {
  return useContext(ComposeContext)
}
