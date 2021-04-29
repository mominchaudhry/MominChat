import React from 'react'
import './Main.css'
import Sidebar from './Sidebar'

export default function Chat() {
    return (
        <div className="background d-flex" style={{height:'100vh'}}>
            <Sidebar />
            <div className="chat-background w-100">
                <h1>chat</h1>
            </div>
        </div>
    )
}
