import React, { useEffect } from 'react';
import HomeNavbar from './Navbar';
import "./Home.css";
import Footer from './Footer';
import AboutCard1 from './AboutCard1';
import AboutFounder from './AboutFounder';

function About() {
  useEffect(()=>{
    document.documentElement.scrollTop = 0;
  })
  return (
    <>
      <HomeNavbar />
      <AboutCard1/>
      <AboutFounder/>
      <Footer/>
    </>
  );
}

export default About;
