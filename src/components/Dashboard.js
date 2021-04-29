import React, {useState} from 'react'
import MyNavbar from './MyNavbar'
import './Main.css'
import Chat from './Chat'
import Friends from './Friends'


export default function Dashboard({token, setToken, setUser, user}) {

    const [activeKey, setActiveKey] = useState("chat")

    return (
        <>
            <MyNavbar user={user} setToken={setToken} setUser={setUser} activeKey={activeKey} setActiveKey={setActiveKey}/>
            {activeKey === "chat" ? <Chat className="background"/> : <Friends className="background"/>}
        </>
    )
}
