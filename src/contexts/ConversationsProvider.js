import React, { useContext, useEffect, useCallback } from 'react'
import useLocalStorage from '../hooks/useLocalStorage';
import {useContacts} from './ContactsProvider'
import {useSocket} from './SocketProvider'

const ConversationsContext = React.createContext()

export function useConversations() {
  return useContext(ConversationsContext)
}

export function ConversationsProvider({ children, user }) {
  const [conversations, setConversations] = useLocalStorage('conversations', [])
  const {contacts} = useContacts()
  const socket = useSocket()
  const [openChat, setOpenChat] = useLocalStorage('openChat', '')

  function createConversation(id) {
    if (!conversations.find(c => c.id===id)) {
      setConversations(prevConversations => {
        return [...prevConversations, { id, messages:[] }]
      })
    }
  }
  
  const addMessageToConversation = useCallback(({ id, text, sender }) => {
    setConversations(prevConversations => {
      let madeChange = false
      const newMessage = {sender, text}
      const newConversations = prevConversations.map(conversation => {
        if (conversation.id === id) {
          madeChange = true
          return {...conversation, messages:[...conversation.messages, newMessage]}
        }
        return conversation
      })

      if(madeChange) {

        return newConversations

      } else {
        return [...prevConversations, {id, messages:[newMessage]}]
      }
    })
  }, [setConversations])

  useEffect(() => {
    if (socket == null) return

    socket.on('receive-message', addMessageToConversation)
    return () => socket.off('receive-message')
  }, [socket, addMessageToConversation])

  useEffect(() => {
    const ids = contacts.map(c => c.id)
    setConversations(conversations.filter(c => ids.includes(c.id)))
    setOpenChat('')
  }, [contacts])

  function sendMessage(id, text) {
    socket.emit('send-message', {sendTo:id, text})
    addMessageToConversation({id, text, sender:user._id})
  }

  function removeConversation(id) {
    setConversations(conversations.filter(conversation => conversation.user.id !== id))
  }

  return (
    <ConversationsContext.Provider value={{ conversations, setConversations, createConversation, removeConversation, sendMessage}}>
      {children}
    </ConversationsContext.Provider>
  )
}