import React, {  useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { GiHamburgerMenu } from "react-icons/gi";
const Navbar = () => {
  const [show,setShow]=useState(false);
  const navigateTo=useNavigate();
  
  const [check,setCheck]=useState({})
  
  useEffect(()=>{
    const handleCheck=async ()=>{
      try{
        const response=await axios.get("https://job-server-9p16.onrender.com/user/getuser",{withCredentials: true});
        if(response.data.user){
          setCheck(response.data.user);
        }        
      }catch(error){
        toast.error(error.response.data.message);
      }
    }
    handleCheck()
  },[])
  const handleLogout=async ()=>{
    try{
      const response=await axios.get("https://job-server-9p16.onrender.com/user/logout",{withCredentials: true});
      toast.success(response.data.message);
      setCheck(null);
      navigateTo("/login");
    }catch(error){
      toast.error(error.response.data.message);
    }
  }

  return (
    <div>
      <nav className={check?"navbarShow":"navbarHide"}>
        <div className='container'>
          <div className='logo'>
            <img src="OpportuNet.png" alt="logo"/>
          </div>
          <ul className={show?"show-menu menu":"menu"}>
            <li>
              <Link to={"/"} onClick={()=>setShow(false)}>HOME
              </Link>
            </li>
            <li>
              <Link  to={"/job/getall"} onClick={()=> setShow(false)}>All JOBS
              </Link>
            </li>
            <li>
              <Link to={"/application/me"} onClick={()=>setShow(false)}>
              {
                check && check.role==="Employer"?"APPLICANT'S APPLICATIONS":"MY APPLICATIONS"
              }
              </Link>
            </li>
            {check && check.role === "Employer" ? (
            <>
              <li>
                <Link to={"/job/post"} onClick={() => setShow(false)}>
                  POST NEW JOB
                </Link>
              </li>
              <li>
                <Link to={"/job/me"} onClick={() => setShow(false)}>
                  VIEW YOUR JOBS
                </Link>
              </li>
            </>
          ) : (
            <></>
          )}

          <button onClick={handleLogout}>LOGOUT</button>
        </ul>
        <div className="hamburger">
          <GiHamburgerMenu onClick={() => setShow(!show)} />
        </div>
    
        </div>
      </nav>
    </div>
  )
}

export default Navbar
