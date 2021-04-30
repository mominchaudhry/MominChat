import Login from "./components/Login"
import Dashboard from "./components/Dashboard"
import {useState} from 'react'
import './App.css'
import useLocalStorage from "./hooks/useLocalStorage"
import { ContactsProvider } from "./contexts/ContactsProvider"
import { ConversationsProvider } from "./contexts/ConversationsProvider"

function App() {

  const [token, setToken] = useLocalStorage('token','')
  const [user, setUser] = useLocalStorage('user', {})

  const dashboard = (
    <ContactsProvider>
      <ConversationsProvider>
        <Dashboard token={token} setToken={setToken} setUser={setUser} user={user}/>
      </ConversationsProvider>
    </ContactsProvider>
  )

  return (
    <div className="app">
      {token.length<1 ? <Login setToken={setToken} setUser={setUser}/> : dashboard}
    </div>
  );
}

export default App;
