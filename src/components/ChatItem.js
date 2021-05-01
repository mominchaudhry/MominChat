import React, { useState, useEffect } from 'react'
import './Main.css'
import { useContacts } from '../contexts/ContactsProvider'

export default function ChatItem({ id, setOpenChat, openChat }) {

    const {contacts} = useContacts()
    const [person, setPerson] = useState({})

    function openChat () {
        if (openChat !== id)
            setOpenChat(id)
    }

    useEffect(() => {
        setPerson(contacts.find(c => c.id === id))
    }, [])


    return (
        <div className="chat-item" onClick={openChat}>
            <h2>{`${person.firstName} ${person.lastName}`}</h2>
        </div>
    )
}
