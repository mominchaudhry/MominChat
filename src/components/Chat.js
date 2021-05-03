import React, { useEffect, useState, useCallback } from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'
import './Main.css'
import Sidebar from './Sidebar'
import { useConversations } from '../contexts/ConversationsProvider'
import useLocalStorage from "../hooks/useLocalStorage"

export default function Chat() {

    const [openChat, setOpenChat] = useLocalStorage('openChat', '')
    const [text, setText] = useState('')
    var { conversations, sendMessage } = useConversations()
    const [selectedConvo, setSelectedConvo] = useState({})
    const user = JSON.parse(localStorage.getItem('chat-app-user'))
    const setRef = useCallback(node => {
        if (node) node.scrollIntoView({smooth:true})
    }, [])
    const wait = (timeToDelay) => new Promise((resolve) => setTimeout(resolve, timeToDelay));
    const [selectedUser, setSelectedUser] = useState({firstName:"", lastName:""})
    const [contacts, setContacts] = useState([])

    async function handleSubmit(e) {
        e.preventDefault()
        if (openChat) {
            await sendMessage(openChat, text)
            setText('')
            conversations = await localStorage.getItem('chat-app-conversations')
            conversations = JSON.parse(conversations)

            setSelectedConvo(conversations.find(c => {return c.id===openChat}))
        }
    }

    useEffect(() => {
        async function fetchConversations() {
            await wait(200)
            conversations = await localStorage.getItem('chat-app-conversations')
            conversations = JSON.parse(conversations)
            if (conversations) setSelectedConvo(conversations.find(c => {return c.id===openChat}))
            const c = await localStorage.getItem('chat-app-contacts')
            const d = JSON.parse(c)
            setContacts(d)
            const t = d.find(u => u.id===openChat)
            setSelectedUser(t)
        }
        fetchConversations()
    }, [openChat, conversations])

    return (
        <div className="background d-flex overflow-auto flex-grow-1">
            <Sidebar setOpenChat={setOpenChat} openChat={openChat}/>
            <div className="chat-background w-100 d-flex flex-column flex-grow-1">
                {selectedUser && <h1 className="text-white chat-name">{`${selectedUser.firstName} ${selectedUser.lastName}`}</h1>}
                <div className="flex-grow-1 overflow-auto">
                    <div className="d-flex flex-column align-items-start justify-content-end px-3 overflow-scroll">
                        {selectedConvo && selectedConvo.messages && selectedConvo.messages.map((message, index) => {
                            const lastMessage = selectedConvo.messages.length -1 === index
                            return (
                                <div ref={lastMessage ? setRef: null} key={index} className={`my-1 d-flex flex-column ${message.sender===user._id ? 'align-self-end align-items-end' : 'align-items-start'}`}>
                                    <div className={`rounded px-2 py-1 ${message.sender===user._id ? 'bg-primary text-white' : 'border text-white'}`}><p className="message-text">{message.text}</p></div>
                                    <div className={`text-muted small ${message.sender===user._id ? 'text-right' : ''}`}>
                                        {
                                            selectedUser && <p className="message-text">{message.sender===user._id ? "You" : selectedUser.firstName}</p>
                                        }
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                </div>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="m-2">
                        <InputGroup>
                            <Form.Control as="textarea" required value={text} onChange={e => setText(e.target.value)} style={{height:'75px', resize:'none'}} />
                            <InputGroup.Append>
                                <Button type="submit" style={{width:"5vw", minWidth:"75px"}}>Send</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form.Group>
                </Form>
            </div>
        </div>
    )
}
