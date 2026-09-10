import React, {useState} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [userdetail, setuserdetail] = useState({
           email:"",
           password:"" 
        })
        const navigate = useNavigate()

    const handlelogin = async () =>{
         try {
        const response = await axios.post("http://localhost:8006/user/login",userdetail)
        if (response) {
          console.log(response);
         localStorage.setItem("usertoken", response.data.token)
         toast.success(response.data.message)
         navigate("/dashboard")
        }
         
      } catch (error) {
        console.log(error);
        if (error) {
            const errormessage = error?.response?.data?.message
        toast.error(errormessage)
        }
      
      }
    }
  return (
    <div>
        <h1>Login</h1>
        <input onChange={(e)=> setuserdetail({...userdetail, email:e.target.value})} type="text" placeholder='Email'/>
        <input onChange={(e)=> setuserdetail({...userdetail, password:e.target.value})}  type="password" placeholder='Password'/>
        <button onClick={handlelogin}>Login</button>
    </div>
  )
}

export default Login