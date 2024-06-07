import React, { useContext, useState, useEffect } from 'react';
import { FaRegUser } from 'react-icons/fa';
import { MdOutlineMailOutline } from 'react-icons/md';
import { RiLock2Fill } from 'react-icons/ri';
import { Context } from '../../index';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5600/api/v1/user/login",
        { email, password, role },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setEmail("");
      setPassword("");
      setIsAuthorized(true);
      setUser(data.user);
      setRole("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    console.log('isAuthorized changed:', isAuthorized);
  }, [isAuthorized]);

  if (isAuthorized) {
    return <Navigate to='/' />;
  }

  return (
    <section className='authPage'>
      <div className='container'>
        <div className='header'>
          <img src="OpportuNet.png" alt="logo" />
          <h3>Sign in your Account</h3>
        </div>
        <form onSubmit={handleLogin}>
          <div className='inputTag'>
            <label>Login As</label>
            <div>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Select Role</option>
                <option value="Employer">Employer</option>
                <option value="Job Seeker">Job Seeker</option>
              </select>
              <FaRegUser />
            </div>
          </div>

          <div className='inputTag'>
            <label>Email</label>
            <div>
              <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your Email' />
              <MdOutlineMailOutline />
            </div>
          </div>

          <div className='inputTag'>
            <label>Password</label>
            <div>
              <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter your Password' />
              <RiLock2Fill />
            </div>
          </div>
          <button type="submit">Login</button>
          <Link to="/register">Yet to be Registered? Register!</Link>
        </form>
      </div>
      <div className="banner">
        <img src="/login.png" alt="login" />
      </div>
    </section>
  );
}

export default Login;
