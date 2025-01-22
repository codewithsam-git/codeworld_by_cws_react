import React from 'react';
import HomeNavbar from './Navbar';
import "./Home.css";
import HomeImage from './HomeImage';
import Tech from './Tech';
import Card1 from './Card1';
import Choose from './Choose';
import Footer from './Footer';
import HomeCourses from './HomeCourses';

function Home() {
  return (
    <>
      <HomeNavbar />
      <HomeImage/>
      <Card1/>
      <Tech/>
      <Choose/>
      <HomeCourses/>
      <Footer/>
    </>
  );
}

export default Home;
