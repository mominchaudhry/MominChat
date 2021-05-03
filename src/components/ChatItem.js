import React, { useState, useEffect } from 'react'
import './Main.css'
import { useContacts } from '../contexts/ContactsProvider'

export default function ChatItem({ id, setOpenChat, openChat }) {

    const [contacts, setContacts] = useState([])
    const [person, setPerson] = useState({})
    const wait = (timeToDelay) => new Promise((resolve) => setTimeout(resolve, timeToDelay));

    function openChat () {
        if (openChat !== id)
            setOpenChat(id)
    }


    useEffect(() => {
        async function fetchContacts() {
            await wait(100)
            const c = await localStorage.getItem('chat-app-contacts')
            const c2 = JSON.parse(c)
            setContacts(JSON.parse(c))
            const temp = c2.find(c => c.id === id)
            setPerson(temp)
        }
        fetchContacts()
    }, [])


    return (
        <div className="chat-item" onClick={openChat}>
            {person && <h2>{`${person.firstName} ${person.lastName}`}</h2>}
        </div>
    )
}
