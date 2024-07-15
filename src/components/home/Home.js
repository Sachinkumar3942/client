import React, { useContext, useEffect, useState } from 'react';
import HeroSection from './HeroSection';
import HowItWorks from './HowItWorks';
import PopularCategories from './PopularCategories';
import PopularCompanies from './PopularCompanies';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
const Home = () => {
  const [check,setCheck]=useState({})
  
  useEffect(()=>{
    const handleCheck=async ()=>{
      try{
        const response=await axios.get("https://job-server-9p16.onrender.com/user/getuser",{withCredentials: true});
        // console.log(check);
        if(response.data.user){
          setCheck(response.data.user);
        }  
        else {
          return <Navigate to="/login" />;
        }      
      }catch(error){
        toast.error(error.response.data.message);
      }
    }
    handleCheck()
  },[])
  

  return (
    <section>
      <HeroSection />
      <HowItWorks />
      <PopularCategories />
      <PopularCompanies />
    </section>
  );
}

export default Home;
