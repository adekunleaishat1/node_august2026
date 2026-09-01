import React from 'react'
import { Routes , Route } from 'react-router-dom'
import Signup from './components/Signup'
import {ToastContainer} from "react-toastify"
import Login from './components/Login'

const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Routes>
         <Route path='/' element={<Signup/>} />
         <Route path='/login' element={<Login/>} />
      </Routes>
    </div>
  )
}

export default App