import React, { useContext } from 'react';
import HeroSection from './HeroSection';
import HowItWorks from './HowItWorks';
import { Context } from '../../index';
import PopularCategories from './PopularCategories';
import PopularCompanies from './PopularCompanies';
import { Navigate } from 'react-router-dom';

const Home = () => {
  const { isAuthorized } = useContext(Context);

  if (!isAuthorized) {
    return <Navigate to="/login" />;
  }

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
