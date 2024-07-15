import React,{useContext, useEffect} from 'react'
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import {Context} from "./index";
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import Home from "./components/home/Home"
import Application from "./components/application/Application"
import MyApplications from "./components/application/MyApplications"
import NotFound from "./components/notFound/NotFound"
import JobDetails from "./components/job/JobDetails"
import MyJobs from "./components/job/MyJobs"
import Jobs from "./components/job/Jobs"
import PostJob from "./components/job/PostJob"
import axios from "axios";
import { Toaster } from "react-hot-toast"
       
function App() {

  const {isAuthorized,setIsAuthorized,setUser}=useContext(Context);
  
  useEffect(()=>{
    const fetchUser = async ()=>{
      try{
        const response=axios.get("https://job-server-9p16.onrender.com/api/v1/user/getuser",{withCredentials: true});
        setUser(response.data.user)
        setIsAuthorized(true)
      }catch(error){
        setIsAuthorized(false);
      }
    };
    fetchUser();
  },[isAuthorized]);

  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/" element={<Home/>}/>
      <Route path="/job/getall" element={<Jobs/>}/>
      <Route path="/job/:id" element={<JobDetails/>}/>
      <Route path="/job/post" element={<PostJob/>}/>
      <Route path="/job/me" element={<MyJobs/>}/>
      <Route path="/application/:id" element={<Application/>}/>
      <Route path="/application/me" element={<MyApplications/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
    <Footer/>
    <Toaster/>
    </BrowserRouter>
  );
}

export default App;
