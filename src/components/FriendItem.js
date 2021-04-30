import { Button } from 'react-bootstrap'
import React from 'react'
import { useContacts } from '../contexts/ContactsProvider'
import './Main.css'

export default function FriendItem({ name, id }) {

    const { removeContact } = useContacts()

    function removeFriend () {
        removeContact(id)
    }

    return (
        <div className="friend-item d-flex justify-content-between">
            <h2>{name}</h2>
            <Button variant="danger" onClick={removeFriend}>Remove</Button>
        </div>
    )
}