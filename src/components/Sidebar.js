import React, { useState, useEffect } from 'react'
import { Button, Modal, Form} from 'react-bootstrap'
import ChatItem from './ChatItem'
import {useConversations} from '../contexts/ConversationsProvider'
import './Styles.css'

export default function Sidebar({ setOpenChat, openChat }) {

    const [contacts, setContacts] = useState([])
    const {conversations, createConversation} = useConversations()

    const [modalOpen, setModalOpen] = useState(false)
    const [selectedContactId, setSelectedContactId] = useState('')
    const wait = (timeToDelay) => new Promise((resolve) => setTimeout(resolve, timeToDelay));

    function closeModal() { setModalOpen(false) }

    function handleSubmit(e) {
        e.preventDefault()
        console.log(selectedContactId)
        createConversation(selectedContactId)
        closeModal()

    }

    function handleChange (selectedid) {
        setSelectedContactId(selectedid)
    }

    function exitChat() {
        setOpenChat("")
    }

    useEffect(() => {
        async function fetchContacts() {
            await wait(100)
            const c = await localStorage.getItem('chat-app-contacts')
            setContacts(JSON.parse(c))
        }
        fetchContacts()
    }, [])

    return (
        <div style={{width:'25vw', minWidth:'150px'}} className='d-flex flex-column'>
            <Button size="lg" className="m-3 new-chat" onClick={() => setModalOpen(true)}>New Chat</Button>
            {conversations.map(person => {
                return <ChatItem key={person.id} id={person.id} setOpenChat={setOpenChat} openChat={openChat}/>
            })}
            <Modal show={modalOpen} onHide={closeModal}>
                <Modal.Header closeButton>Select Friend To Chat With</Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        {contacts.map(contact => (
                            <Form.Group controlId={contact.id} key={contact.id}>
                                <Form.Check type="radio" checked={contact.id===selectedContactId} label={`${contact.firstName} ${contact.lastName}`} onChange={() => handleChange(contact.id)} />
                            </Form.Group>
                        ))}
                        <Button type="submit">Start Chatting!</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}
