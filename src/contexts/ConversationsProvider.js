import React, { useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage';
import {useContacts} from './ContactsProvider'

const ConversationsContext = React.createContext()

export function useConversations() {
  return useContext(ConversationsContext)
}

export function ConversationsProvider({ children }) {
  const [Conversations, setConversations] = useLocalStorage('Conversations', [])
  const {contacts} = useContacts()

  function createConversation(id) {
    if (!Conversations.find(c => c.user.id===id)) {
      setConversations(prevConversations => {
        const user = contacts.find(contact => contact.id===id)
        return [...prevConversations, { user, messages:[] }]
      })
    }
  }

  function removeConversation(id) {
    setConversations(Conversations.filter(Conversation => Conversation.user.id !== id))
  }

  return (
    <ConversationsContext.Provider value={{ Conversations, setConversations, createConversation, removeConversation }}>
      {children}
    </ConversationsContext.Provider>
  )
}