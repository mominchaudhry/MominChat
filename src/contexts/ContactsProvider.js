import React, { useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage';
import axios from 'axios'

const ContactsContext = React.createContext()

export function useContacts() {
  return useContext(ContactsContext)
}

export function ContactsProvider({ children }) {
  const [contacts, setContacts] = useLocalStorage('contacts', [])
  var token = localStorage.getItem('chat-app-token')
  if (token) token = token.slice(1,-1)

  function createContact(id) {
    console.log(token)
    axios.post('https://my-new-rest-api.herokuapp.com/api/users/friends', { id }, { headers: { Authorization: `Bearer ${token}` }})
      .then(res => {
        setContacts(res.data)
      }
    ).catch (err => {
      console.log(err)
    })
  }

  function removeContact(id) {
    console.log(token)
    axios.delete(`https://my-new-rest-api.herokuapp.com/api/users/friends/${id}`, { headers: { Authorization: `Bearer ${token}` }})
      .then(res => {
        setContacts(res.data)
      }
    ).catch (err => {
      console.log(err)
    })
  }

  function clearContacts(){
    setContacts([])
  }

  return (
    <ContactsContext.Provider value={{ contacts, setContacts, createContact, removeContact, clearContacts }}>
      {children}
    </ContactsContext.Provider>
  )
}