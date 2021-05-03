import React, {useState} from 'react'
import MyNavbar from './MyNavbar'
import './Main.css'
import Chat from './Chat'
import Friends from './Friends'


export default function Dashboard({token, setToken, setUser, setContacts, setConversations, setOpenChat, user}) {

    const [activeKey, setActiveKey] = useState("chat")

    return (
        <div style={{height:'100%', display:'flex', flexDirection: 'column', alignItems:'stretch'}}>
            <MyNavbar user={user} setToken={setToken} setUser={setUser} setContacts={setContacts} setConversations={setConversations} setOpenChat={setOpenChat} activeKey={activeKey} setActiveKey={setActiveKey}/>
            {activeKey === "chat" ? <Chat className="background"/> : <Friends className="background"/>}
        </div>
    )
}
