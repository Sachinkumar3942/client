import React, { useState } from 'react'
import { Context } from '../../index'
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { GiHamburgerMenu } from "react-icons/gi";
const Navbar = () => {
  const [show,setShow]=useState(false);
  const [isAuthorized,setIsAuthorized,user]=useState(Context);
  const navigateTo=useNavigate();

  const handleLogout=async ()=>{
    try{
      const response=await axios.get("http://localhost:5600/api/v1/user/logout",{withCredentials: true});
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    }catch(error){
      setIsAuthorized(true);
      toast.error(error.response.data.message);
    }
  }

  return (
    <div>
      <nav className={isAuthorized?"navbarShow":"navbarHide"}>
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
              <Link to={"/applications/me"} onClick={()=>setShow(false)}>
              {
                user && user.role==="Employer"?"APPLICANT'S APPLICATIONS":"MY APPLICATIONS"
              }
              </Link>
            </li>
            {user && user.role === "Employer" ? (
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