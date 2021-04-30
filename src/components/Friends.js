import React, { useRef } from 'react'
import { Form, Container, Button, ListGroup } from 'react-bootstrap'
import { useContacts } from '../contexts/ContactsProvider'
import FriendItem from './FriendItem'
import './Styles.css'

export default function Friends() {

    const {contacts} = useContacts()

    const idRef = useRef()
    const nameRef = useRef()
    const { createContact } = useContacts()

    function handleSubmit(e) {
        e.preventDefault()
        createContact(idRef.current.value, nameRef.current.value)
        idRef.current.value = ""
        nameRef.current.value = ""
    }

    return (
        <div className="chat-background" style={{height:'100vh'}}>
            <Container className="align-items-center d-flex flex-column" style={{justifyContent:'center'}}>
                <h1 className="header">Add Friend</h1>
                <Form onSubmit={handleSubmit} className="w-100">
                    <Form.Group>
                        <Form.Label className="subheader">Enter your freinds ID</Form.Label>
                        <Form.Control type="text" size="lg" className="inputs" ref={idRef} required/>
                        <Form.Label className="subheader">What would you like to call this friend?</Form.Label>
                        <Form.Control type="text" size="lg" className="inputs" ref={nameRef} required/>
                    </Form.Group>
                    <Button type="submit" size="lg" className="mr-3 mt-3 mb-5">Add Friend</Button>
                </Form>
            </Container>

            {contacts.map(person => {
                return <FriendItem key={person.id} name={person.name} id={person.id}/>
            })}
        </div>
    )
}
