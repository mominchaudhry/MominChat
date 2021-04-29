import React, { useState } from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

export default function Login() {

    const [isRegistered, setIsRegistered] = useState(false)

    return (
        isRegistered ?
        <LoginForm setIsRegistered={setIsRegistered} /> :
        <RegisterForm setIsRegistered={setIsRegistered} />
    )
}
