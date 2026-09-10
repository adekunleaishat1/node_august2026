import React,{useEffect, useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const token = localStorage.getItem("usertoken")
    console.log(token);
    const navigate = useNavigate()
    const [currentUser, setCurrentuser] = useState(null)
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

  return (
    <div>Welcome to your Dashboard {currentUser && currentUser.username}</div>
  )
}

export default Dashboard