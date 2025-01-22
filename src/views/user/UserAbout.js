import React, { useEffect } from 'react';
import "../Common/Home.css";
import Footer from '../Common/Footer';
import AboutCard1 from '../Common/AboutCard1';
import AboutFounder from '../Common/AboutFounder';
import UserNavbar from './UserNavbar';

function UserAbout() {
  useEffect(() => {
    document.documentElement.scrollTop = 0;
  })
  return (
    <>
      <UserNavbar />
      <AboutCard1 />
      <AboutFounder />
      <Footer />
    </>
  );
}

export default UserAbout;
