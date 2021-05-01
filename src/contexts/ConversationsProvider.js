import React, { useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage';
import {useContacts} from './ContactsProvider'

const ConversationsContext = React.createContext()

export function useConversations() {
  return useContext(ConversationsContext)
}

export function ConversationsProvider({ children, user }) {
  const [conversations, setConversations] = useLocalStorage('conversations', [])
  const {contacts} = useContacts()

  function createConversation(id) {
    if (!conversations.find(c => c.user.id===id)) {
      setConversations(prevConversations => {
        return [...prevConversations, { id, messages:[] }]
      })
    }
  }
  
  function addMessageToConversation({ id, text, sender }) {
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
  }

  function sendMessage(id, text) {
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