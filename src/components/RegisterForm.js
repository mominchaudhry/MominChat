import React, { useState, useRef } from 'react'
import { Container, Form, Button, Alert } from 'react-bootstrap'
import axios from 'axios'
import './Styles.css'

export default function RegisterForm({ setIsRegistered }) {
    const usernameRef = useRef()
    const passwordRef = useRef()
    const confirmPassRef = useRef()

    const [invalidPassword, setInvalidPassword] = useState(false)
    const [invalidConfirm, setInvalidConfirm] = useState(false)
    const [invalidUsername, setInvalidUsername] = useState(false)

    const [success, setSuccess] = useState(false)

    const [username, setUsername] = useState('')

    function handleSubmit(e) {
        e.preventDefault()
        if (passwordRef.current.value.length <8) return setInvalidPassword(true); else setInvalidPassword(false)
        if (passwordRef.current.value !== confirmPassRef.current.value) return setInvalidConfirm(true); else setInvalidConfirm(false)
        setInvalidUsername(false)

        axios.post('https://my-new-rest-api.herokuapp.com/api/users/register', {username:usernameRef.current.value, password:passwordRef.current.value}).then(
            res => {
                console.log(res.data)
                setUsername(res.data.user.username)
                setInvalidUsername(false)
                setSuccess(true)
            }
        ).catch (err => {
            console.log(err.response.data)
            if (err.response.data.message.split(' ')[0] === 'E11000') {
                setInvalidUsername(true)
            }

        })
    }

    function togglePage() {
        setIsRegistered(true)
    }

    return (
        <Container className="align-items-center d-flex login-container" style={{height:'100vh', flexDirection:'column', justifyContent:'center'}}>
            <h1 className="header">Create an Account</h1>
            <Form onSubmit={handleSubmit} className="w-100">
                <Form.Group>
                    <Form.Label className="subheader">Enter your username</Form.Label>
                    <Form.Control type="email" size="lg" className="inputs" ref={usernameRef} required/>
                    {invalidUsername && <Alert variant="danger" onClose={() => setInvalidUsername(false)} dismissible>Username is taken</Alert>}
                    <Form.Label className="subheader">Enter your password</Form.Label>
                    <Form.Control type="password" size="lg" className="inputs" ref={passwordRef} required/>
                    {invalidPassword && <Alert variant="danger" onClose={() => setInvalidPassword(false)} dismissible>Password must be at least 8 characters long</Alert>}
                    <Form.Label className="subheader">Confirm password</Form.Label>
                    <Form.Control type="password" size="lg" className="inputs" ref={confirmPassRef} required/>
                    {invalidConfirm && <Alert variant="danger" onClose={() => setInvalidConfirm(false)} dismissible>Passwords must match</Alert>}
                </Form.Group>
                <Button type="submit" size="lg" className="mr-3 mt-3">Register</Button>
                <Button variant="secondary" size="lg" className="ml-3 mt-3" onClick={togglePage}>Already have an account? Sign in</Button>
                {success && <Alert variant="success" className="mt-4" onClose={() => {setSuccess(false); setIsRegistered(true)}} dismissible>Successfully created user "{username}". Please Sign in.</Alert>}
            </Form>
        </Container>
    )
}