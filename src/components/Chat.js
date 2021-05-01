import React, {useEffect, useState} from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'
import './Main.css'
import Sidebar from './Sidebar'
import { useConversations } from '../contexts/ConversationsProvider'

export default function Chat() {

    const [openChat, setOpenChat] = useState('')
    const [text, setText] = useState('')
    const { conversations, sendMessage } = useConversations()
    const [selectedConvo, setSelectedConvo] = useState({})
    const user = localStorage.getItem('chat-app-user')

    function handleSubmit(e) {
        e.preventDefault()

        setSelectedConvo(conversations.find(c => {return c.id===openChat}))
        console.log(user)
        // console.log(selectedConvo.messages[0].sender, user._id)

        sendMessage(openChat, text)
        setText('')
    }

    return (
        <div className="background d-flex overflow-auto flex-grow-1">
            <Sidebar setOpenChat={setOpenChat} openChat={openChat}/>
            <div className="chat-background w-100 d-flex flex-column flex-grow-1">
                <div className="flex-grow-1 overflow-auto">
                    <h1 className="text-white">{openChat}</h1>
                    
                    <div className=" d-flex flex-column align-items-start justify-content-end px-3">
                        {selectedConvo.messages.map((message, index) => {
                            return (
                                <div key={index} className="my-1 d-flex flex-column">
                                    <div className={`rounded px-2 py-1 ${message.sender===user._id ? 'bg-primary text-white' : 'border text-white'}`}>{message.text}</div>
                                    <div className={`text-muted small ${message.sender===user._id ? 'text-right' : ''}`}>{message.sender===user._id ? "You" : message.sender}</div>
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
                                <Button type="submit" style={{width:"5vw"}}>Send</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form.Group>
                </Form>
            </div>
        </div>
    )
}
