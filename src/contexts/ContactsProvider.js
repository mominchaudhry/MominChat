import React, { useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage';

const ContactsContext = React.createContext()

export function useContacts() {
  return useContext(ContactsContext)
}

export function ContactsProvider({ children }) {
  const [contacts, setContacts] = useLocalStorage('contacts', [])

  function createContact(id, name) {
    setContacts(prevContacts => {
      return [...prevContacts, { id, name }]
    })
  }

  function removeContact(id) {
    setContacts(contacts.filter(contact => contact.id !== id))
    console.log(id, contacts[0].id)
  }

  return (
    <ContactsContext.Provider value={{ contacts, setContacts, createContact, removeContact }}>
      {children}
    </ContactsContext.Provider>
  )
}