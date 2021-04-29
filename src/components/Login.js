import React, { useState } from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

export default function Login({setToken, setUser}) {

    const [isRegistered, setIsRegistered] = useState(true)

    return (
        isRegistered ?
        <LoginForm setIsRegistered={setIsRegistered} setToken={setToken} setUser={setUser}/> :
        <RegisterForm setIsRegistered={setIsRegistered} />
    )
}
