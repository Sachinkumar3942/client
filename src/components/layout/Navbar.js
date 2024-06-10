import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../index'
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { GiHamburgerMenu } from "react-icons/gi";
const Navbar = () => {
  const [show,setShow]=useState(false);
  const {isAuthorized,setIsAuthorized,user}=useContext(Context);
  const navigateTo=useNavigate();
  
  const [check,setCheck]=useState({})
  
  useEffect(()=>{
    const handleCheck=async ()=>{
      try{
        const response=await axios.get("http://localhost:5600/api/v1/user/getuser",{withCredentials: true});
        console.log(check);
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
      const response=await axios.get("http://localhost:5600/api/v1/user/logout",{withCredentials: true});
      toast.success(response.data.message);
      // setIsAuthorized(false);
      setCheck(null);
      navigateTo("/login");
    }catch(error){
      setIsAuthorized(true);
      toast.error(error.response.data.message);
    }
  }

  return (
    <div>
      {/* className={check?"navbarShow":"navbarHide"} */}
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
              <Link to={"/applications/me"} onClick={()=>setShow(false)}>
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