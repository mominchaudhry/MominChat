import React from 'react'
import './Main.css'

export default function ChatItem({ name, setOpenChat }) {

    function openChat () {
        setOpenChat(name)
    }

    return (
        <div className="chat-item" onClick={openChat}>
            <h2>{name}</h2>
        </div>
    )
}
