import React, { useRef } from 'react'
import { Container, Form } from 'react-bootstrap'
import './Register.css'

export default function LoginForm({ setIsRegistered }) {
    const usernameRef = useRef()
    const passwordRef = useRef()

    return (
        <Container className="align-items-center d-flex login-container" style={{height:'100vh', flexDirection:'column', justifyContent:'center'}}>
            <h1 className="header">Login</h1>
            <Form className="w-100">
                <Form.Group>
                    <Form.Label>Enter your username</Form.Label>
                    <Form.Control type="text" ref={usernameRef} required/>
                    <Form.Label>Enter your password</Form.Label>
                    <Form.Control type="text" ref={passwordRef} required/>
                </Form.Group>
            </Form>
        </Container>
    )
}
