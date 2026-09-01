import React, {useState} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
    const [userdetail, setuserdetail] = useState({
           email:"",
           password:"" 
        })

    const handlelogin = async () =>{
         try {
        const response = await axios.post("http://localhost:8006/user/login",userdetail)
         console.log(response);
         toast.success(response.data.message)
      } catch (error) {
        console.log(error.response.data.message);
        const errormessage = error?.response?.data?.message
        toast.error(errormessage)
      }
    }
  return (
    <div>
        <h1>Login</h1>
        <input onChange={(e)=> setuserdetail({...userdetail, email:e.target.value})} type="text" placeholder='Email'/>
        <input onChange={(e)=> setuserdetail({...userdetail, password:e.target.value})}  type="text" placeholder='Password'/>
        <button onClick={handlelogin}>Register</button>
    </div>
  )
}

export default Login