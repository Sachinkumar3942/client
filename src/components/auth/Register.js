import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../index';
import { FaPencilAlt, FaRegUser } from 'react-icons/fa';
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FaPhoneFlip } from "react-icons/fa6";
import toast from 'react-hot-toast';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
const Register = () => {
  const[name,setName]=useState("");
  const[email,setEmail]=useState("");
  const[phone,setPhone]=useState("");
  const[password,setPassword]=useState("");
  const[role,setRole]=useState("");
  const { isAuthorized,setIsAuthorized,user,setUser} =useContext(Context)
  const [check1,setCheck1]=useState({});
  useEffect(()=>{
    const handleCheck=async ()=>{
      try{
        const response=await axios.get("http://localhost:5600/api/v1/user/getuser",{withCredentials: true});
        // console.log(check);
        if(response.data.user){
          setCheck1(response.data.user);
        }      
      }catch(error){
        toast.error(error.response.data.message);
      }
    }
    handleCheck()
  },[])
  if (check1) {
    return <Navigate to='/' />;
  }

  const handleRegister=async(e)=>{
    e.preventDefault();
    try{
      const {data} = await axios.post("http://localhost:5600/api/v1/user/register",
        {name,email,password,phone,role},
        {
          headers:{
            "Content-Type":"application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setEmail("");
      setName("");
      setPassword("");
      setIsAuthorized(true);
      setPhone("");
      setRole("");
    }catch(error){
      toast.error(error.response.data.message);
    }
  }
  if(isAuthorized){
    return <Navigate to={'/'}/>
  }
  return (
    <section className='authPage'>
      <div className='container'>
        <div className='header'>
          <img src="OpportuNet.png" alt="logo"/>
          <h3>Create a new Account</h3>
        </div>
        <form>
          <div className='inputTag'>
            <label>Register As</label>
            <div>
              <select value={role} onChange={(e)=>setRole(e.target.value)}>
                <option value="">Select Role</option>
                <option value="Employer">Employer</option>
                <option value="Job Seeker">Job Seeker</option>
              </select>
              <FaRegUser />
            </div>
          </div>
          <div className='inputTag'>
            <label>Name</label>
            <div>
              <input type='text' value={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter your full name'/>
              <FaPencilAlt />
            </div>
          </div>
          <div className='inputTag'>
            <label>Email</label>
            <div>
              <input type='text' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter your Email'/>
              <MdOutlineMailOutline />
            </div>
          </div>
          <div className='inputTag'>
            <label>Phone</label>
            <div>
              <input type='number' value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder='Enter your Phone no.'/>
              <FaPhoneFlip />
            </div>
          </div>
          <div className='inputTag'>
            <label>Password</label>
            <div>
              <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter your Password'/>
              <RiLock2Fill />
            </div>
          </div>
          <button type="submit" onClick={handleRegister}>
              Register
            </button>
            <Link to={"/login"}>Already Registered? Login!</Link>
        </form>
      </div>
      <div className="banner">
          <img src="/register.png" alt="register" />
      </div>
    </section>
  )
}

export default Register