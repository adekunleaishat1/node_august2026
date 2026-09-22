import React,{useEffect, useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({socket}) => {
  console.log(socket);
  
    const token = localStorage.getItem("usertoken")
    console.log(token);
    const navigate = useNavigate()
    const [currentUser, setCurrentuser] = useState(null)
    const [message, setMessage] = useState({
      content:"",
      title:""
    })
    const [allmessage , setallmessage] = useState([])
    useEffect(()=>{
      axios.get("http://localhost:8006/user/verifytoken",{
        headers:{
            "Authorization": `Bearer ${token}`
        }
      })
      .then((res)=>{
        console.log(res);
        if (res) {
          setCurrentuser(res.data.currentUser)  
        }
      }).catch((err)=>{
        console.log(err);
        if (err) {
      
          localStorage.removeItem("usertoken")
              navigate("/login") 
        }
      })

    },[])

    const Sendmessage = () =>{
      // console.log(message);
      socket.emit("sendchat", message)
    }

    useEffect(()=>{
       socket.on("resend",(newmessage)=>{
         console.log(newmessage);
         setallmessage([...allmessage, newmessage])
       })
    },[allmessage])

  return (
    <div>
        <h1> Welcome to your Dashboard {currentUser && currentUser.username}</h1>


        <div className='mx-auto w-50 shadow py-3 px-3 '>
              <input className='form-control mb-3' onChange={(e)=>setMessage({...message, content:e.target.value})} type="text" placeholder='Insert Your Message'/>
              <input className='form-control mb-3' onChange={(e)=>setMessage({...message, title:e.target.value})} type="text" placeholder='Insert Your Message'/>
           <button onClick={Sendmessage} className='btn btn-dark'>Send</button>
        </div>

         {allmessage.map((message,i)=>(
          <>
          <div key={i}>
            <p>{message.content}</p>
            <p>{message.title}</p>
          </div>
          </>
         ))

         }

    </div>

    
  )
}

export default Dashboard