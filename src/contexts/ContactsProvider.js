import React, { useContext, useState, useEffect } from 'react'
import useLocalStorage from '../hooks/useLocalStorage';
import axios from 'axios'

const ContactsContext = React.createContext()

export function useContacts() {
  return useContext(ContactsContext)
}

export function ContactsProvider({ children }) {
  const [contacts, setContacts] = useLocalStorage('contacts', [])
  var token = localStorage.getItem('chat-app-token')
  const [wasSuccessful, setWasSuccessful] = useState(true)
  const wait = (timeToDelay) => new Promise((resolve) => setTimeout(resolve, timeToDelay));
  if (token) token = token.slice(1,-1)

  function createContact(id) {
    console.log(id)
    setWasSuccessful(true)
    axios.post('https://my-new-rest-api.herokuapp.com/api/users/friends', { id }, { headers: { Authorization: `Bearer ${token}` }})
      .then(res => {
        setContacts(res.data)
      }
    ).catch (err => {
      console.log(err)
      setWasSuccessful(false)
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
  
  useEffect(async () => {
    await wait(5000)
    var user = localStorage.getItem('chat-app-user')
    if (user) {
      user = JSON.parse(user)
      axios.get(`https://my-new-rest-api.herokuapp.com/api/users/friends/${user._id}`)
      .then(res => {
        setContacts(res.data)
      }).catch (err => {
        console.log(err)
      })
    }
  })

  function clearContacts(){
    setContacts([])
  }

  return (
    <ContactsContext.Provider value={{ contacts, setContacts, createContact, removeContact, clearContacts, wasSuccessful, setWasSuccessful }}>
      {children}
    </ContactsContext.Provider>
  )
}