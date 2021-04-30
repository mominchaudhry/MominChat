import React, {useState} from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'
import './Main.css'
import Sidebar from './Sidebar'
import { useConversations } from '../contexts/ConversationsProvider'

export default function Chat() {

    const [openChat, setOpenChat] = useState('')
    const [text, setText] = useState('')
    // const { sendMessage } = useConversations()

    function handleSubmit(e) {
        e.preventDefault()

        // sendMessage(openChat.recipient.id, text)
        setText('')
    }

    return (
        <div className="background d-flex overflow-auto flex-grow-1">
            <Sidebar setOpenChat={setOpenChat}/>
            <div className="chat-background w-100 d-flex flex-column flex-grow-1">
                <div className="flex-grow-1 overflow-auto">

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
