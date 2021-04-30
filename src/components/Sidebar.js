import React, { useState } from 'react'
import { Tab, Button, Nav, Container, Modal, Form} from 'react-bootstrap'
import { useContacts } from '../contexts/ContactsProvider'
import ChatItem from './ChatItem'
import {useConversations} from '../contexts/ConversationsProvider'

export default function Sidebar({ setOpenChat }) {

    const {contacts} = useContacts()
    const {Conversations, createConversation} = useConversations()

    const [modalOpen, setModalOpen] = useState(false)
    const [selectedContactId, setSelectedContactId] = useState('')

    function closeModal() { setModalOpen(false) }

    function handleSubmit(e) {
        e.preventDefault()
        createConversation(selectedContactId)
        closeModal()

    }

    function handleChange (selectedid) {
        setSelectedContactId(selectedid)
    }

    return (
        <div style={{width:'25vw'}} className='d-flex flex-column'>
            <Button size="lg" className="m-3" onClick={() => setModalOpen(true)}>New Chat</Button>
            {Conversations.map(person => {
                return <ChatItem key={person.user.id} name={person.user.name} setOpenChat={setOpenChat}/>
            })}
            <Modal show={modalOpen} onHide={closeModal}>
                <Modal.Header closeButton>Select Friend To Chat With</Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        {contacts.map(contact => (
                            <Form.Group controlId={contact.id} key={contact.id}>
                                <Form.Check type="radio" checked={contact.id===selectedContactId} label={contact.name} onChange={() => handleChange(contact.id)} />
                            </Form.Group>
                        ))}
                        <Button type="submit">Start Chatting!</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}
