import Login from "./components/Login"
import Dashboard from "./components/Dashboard"
import {useState} from 'react'
import './App.css'
import useLocalStorage from "./hooks/useLocalStorage"

function App() {

  const [token, setToken] = useLocalStorage('token','')
  const [user, setUser] = useLocalStorage('user', {})

  return (
    <div className="app">
      {token.length<1 ? <Login setToken={setToken} setUser={setUser}/> : <Dashboard token={token} setToken={setToken} setUser={setUser} user={user}/>}
    </div>
  );
}

export default App;
