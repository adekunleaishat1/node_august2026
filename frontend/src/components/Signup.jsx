import React, {useState} from 'react'
import axios from "axios"
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const [userdetail, setuserdetail] = useState({
       username:"",
       email:"",
       password:"" 
    })
    const navigate = useNavigate()

    const handleSignup = async () =>{

      try {
        const response = await axios.post("http://localhost:8006/user/signup",userdetail)
         console.log(response);
         toast.success(response.data.message)
         navigate("/login")
      } catch (error) {
        console.log(error.response.data.message);
        const errormessage = error?.response?.data?.message
        toast.error(errormessage)
      }
    }
  return (
    <div>
        <input onChange={(e)=> setuserdetail({...userdetail,  username:e.target.value})}  type="text" placeholder='Username'/>
        <input onChange={(e)=> setuserdetail({...userdetail, email:e.target.value})} type="text" placeholder='Email'/>
        <input onChange={(e)=> setuserdetail({...userdetail, password:e.target.value})}  type="text" placeholder='Password'/>
        <button onClick={handleSignup}>Register</button>
    </div>
  )
}

export default Signup