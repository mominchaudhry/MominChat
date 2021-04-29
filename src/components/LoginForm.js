import React, { useState, useRef } from 'react'
import { Container, Form, Button, Alert } from 'react-bootstrap'
import axios from 'axios'
import './Styles.css'

export default function LoginForm({ setIsRegistered, setToken, setUser }) {
    const usernameRef = useRef()
    const passwordRef = useRef()

    const [unsuccess, setUnsuccess] = useState(false)

    function togglePage() {
        setIsRegistered(false)
    }

    function handleSubmit(e) {
        e.preventDefault()
        

        axios.post('https://my-new-rest-api.herokuapp.com/api/users/login', {username:usernameRef.current.value, password:passwordRef.current.value}).then(
            res => {
                console.log(res.data)
                setToken(res.data.token)
                setUser(res.data.user)
            }
        ).catch (err => {
            console.log(err.response.data)
            setUnsuccess(true)
        })
    }

    return (
        <Container className="align-items-center d-flex login-container" style={{height:'100vh', flexDirection:'column', justifyContent:'center'}}>
            <h1 className="header">Sign In</h1>
            <Form onSubmit={handleSubmit} className="w-100">
                <Form.Group>
                    <Form.Label className="subheader">Enter your username</Form.Label>
                    <Form.Control type="text" size="lg" className="inputs" ref={usernameRef} required/>
                    <Form.Label className="subheader">Enter your password</Form.Label>
                    <Form.Control type="text" size="lg" className="inputs" ref={passwordRef} required/>
                </Form.Group>
                <Button type="submit" size="lg" className="mr-3 mt-3">Sign in</Button>
                <Button variant="secondary" size="lg" className="ml-3 mt-3" onClick={togglePage}>Create an account</Button>
            </Form>
            {unsuccess && <Alert variant="danger" className="mt-4" onClose={() => setUnsuccess(false)} dismissible>Username and/or password is incorrect</Alert>}
        </Container>
    )
}
