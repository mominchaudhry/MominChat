import { getSuggestedQuery } from '@testing-library/dom'
import React, { useRef, useEffect, useState, useReducer } from 'react'
import { Form, Container, Button, ListGroup } from 'react-bootstrap'
import { useContacts } from '../contexts/ContactsProvider'
import FriendItem from './FriendItem'
import './Styles.css'
import axios from 'axios'
import useLocalStorage from '../hooks/useLocalStorage'

export default function Friends() {

    var {contacts, createContact} = useContacts()

    const idRef = useRef()

    function handleSubmit(e) {
        e.preventDefault()
        createContact(idRef.current.value)
        idRef.current.value = ""
    }

    useEffect(async () => {
        contacts = await localStorage.getItem('chat-app-contacts')
        console.log(contacts)
    }, [])

    return (
        <div className="chat-background" style={{height:'100vh'}}>
            <Container className="align-items-center d-flex flex-column" style={{justifyContent:'center'}}>
                <h1 className="header">Add Friend</h1>
                <Form onSubmit={handleSubmit} className="w-100">
                    <Form.Group>
                        <Form.Label className="subheader">Enter your freinds ID</Form.Label>
                        <Form.Control type="text" size="lg" className="inputs" ref={idRef} required/>
                    </Form.Group>
                    <Button type="submit" size="lg" className="mr-3 mt-3 mb-5">Add Friend</Button>
                </Form>
            </Container>

            {contacts.map(user => {
                return <FriendItem key={user.id} name={`${user.firstName} ${user.lastName}`} id={user.id}/>
            })}
        </div>
    )
}
