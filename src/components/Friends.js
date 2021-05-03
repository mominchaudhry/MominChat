import React, { useRef, useEffect, useState } from 'react'
import { Form, Container, Button, Alert } from 'react-bootstrap'
import { useContacts } from '../contexts/ContactsProvider'
import FriendItem from './FriendItem'
import './Styles.css'

export default function Friends() {

    const {createContact, wasSuccessful, setWasSuccessful} = useContacts()
    const [contacts, setContacts] = useState([])
    const [showAlert, setShowAlert] = useState(false)

    const idRef = useRef()
    const wait = (timeToDelay) => new Promise((resolve) => setTimeout(resolve, timeToDelay));

    function handleSubmit(e) {
        e.preventDefault()
        createContact(idRef.current.value)
        idRef.current.value = ""
    }

    useEffect(() => {
        async function fetchContacts() {
            await wait(100)
            const c = await localStorage.getItem('chat-app-contacts')
            setContacts(JSON.parse(c))
        }
        if (!wasSuccessful) { setShowAlert(true); setWasSuccessful(true)}
        fetchContacts()
    }, [contacts])

    return (
        <div className="chat-background" style={{height:'100vh'}}>
            <Container className="align-items-center d-flex flex-column" style={{justifyContent:'center'}}>
                <h1 className="header">Add Friend</h1>
                <Form onSubmit={handleSubmit} className="w-100">
                    <Form.Group>
                        <Form.Label className="subheader">Enter your freinds username/email</Form.Label>
                        <Form.Control type="text" size="lg" className="inputs" ref={idRef} required/>
                    </Form.Group>
                    <Button type="submit" size="lg" className="mr-3 mt-3 mb-5">Add Friend</Button>
                </Form>
            </Container>
            {showAlert && <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>Cannot find user.</Alert>}

            {contacts.map(user => {
                return <FriendItem key={user.id} name={`${user.firstName} ${user.lastName}`} id={user.id}/>
            })}
        </div>
    )
}
