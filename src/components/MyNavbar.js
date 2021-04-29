import React, { useState } from 'react'
import { Tab, Button, Navbar, Nav, Container} from 'react-bootstrap'

export default function MyNavbar({user, setToken, setUser, activeKey, setActiveKey}) {

    function logout () {
        setToken('')
        setUser({})
    }

    return (
        <Navbar variant="dark">
            <h1 className="header">{user.username}</h1>
            <Container className="justify-content-center">
                <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
                    <Nav className="w-50 d-flex justify-content-around">
                        <Nav.Item>
                            <Nav.Link eventKey='chat'>Chats</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey='friends'>Friends</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Tab.Container>
            </Container>
            <Button onClick={logout} size="lg">Log Out</Button>
        </Navbar>
    )
}
