import React,{useRef} from 'react'
import { Routes , Route } from 'react-router-dom'
import Signup from './components/Signup'
import {ToastContainer} from "react-toastify"
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import socketCilent from "socket.io-client"

const App = () => {
  const BaseUrl = "http://localhost:8006"
  const socketclient = useRef(socketCilent(BaseUrl))

  return (
    <div>
      <ToastContainer/>
      <Routes>
         <Route path='/' element={<Signup/>} />
         <Route path='/login' element={<Login/>} />
         <Route path='/dashboard' element={<Dashboard socket={socketclient.current} />} />
      </Routes>
    </div>
  )
}

export default App