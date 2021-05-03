import React, { useState } from 'react'
import { Button, Navbar, Nav, Container} from 'react-bootstrap'
import logo from '../MominChat1.png'
import useLocalStorage from '../hooks/useLocalStorage'
import {useContacts} from '../contexts/ContactsProvider'

export default function MyNavbar({user, setToken, setUser, activeKey, setContacts, setConversations, setOpenChat, setActiveKey}) {

    const [expanded, setExpanded] = useState(false);

    function logout () {
        setToken('')
        setUser({})
        setContacts([])
        setConversations([])
        setOpenChat("")
    }

    const click = () => {

        setExpanded(false)
    }
    return (
        <Navbar variant="dark" collapseOnSelect expand="lg" expanded={expanded} >
            <Navbar.Brand>
                <img src={logo} width="300vw"/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")}/>
            <Navbar.Collapse id="responsive-navbar-nav">
                <h1 className="header w-50">{user.username}</h1>
                <Nav className="w-100 d-flex justify-content-around">
                    <Nav.Item>
                        <Nav.Link onClick={() => {setActiveKey("chat"); setExpanded(false)}}>Chats</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={() => {setActiveKey("friends"); setExpanded(false)}}>Friends</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Nav className="w-50 d-flex justify-content-end">
                    <Button onClick={logout} size="lg" className="w-50">Log Out</Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
