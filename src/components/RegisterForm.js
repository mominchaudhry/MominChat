import React, { useRef } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import axios from 'axios'
import './Register.css'

export default function RegisterForm({ setIsRegistered }) {
    const usernameRef = useRef()
    const passwordRef = useRef()
    const confirmPassRef = useRef()

    function handleSubmit(e) {
        e.preventDefault()
        axios.post('https://my-new-rest-api.herokuapp.com/api/users/register', {username:usernameRef.current.value, password:passwordRef.current.value}).then(
            res => {
                console.log(res)
                console.log(res.data)
            }
        )
    }

    return (
        <Container className="align-items-center d-flex login-container" style={{height:'100vh', flexDirection:'column', justifyContent:'center'}}>
            <h1 className="header">Register</h1>
            <Form onSubmit={handleSubmit} className="w-100">
                <Form.Group>
                    <Form.Label>Enter your username</Form.Label>
                    <Form.Control type="text" ref={usernameRef} required/>
                    <Form.Label>Enter your password</Form.Label>
                    <Form.Control type="text" ref={passwordRef} required/>
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control type="text" ref={confirmPassRef} required/>
                </Form.Group>
                <Button type="submit" className="mr-2">Register</Button>
                <Button variant="secondary">Login</Button>
            </Form>
        </Container>
    )
}