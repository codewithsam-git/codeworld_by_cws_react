import React, { useEffect } from 'react';
import "./UserHome.css";
import UserNavbar from './UserNavbar';
import { Redirect } from 'react-router';
import HomeImage from 'views/Common/HomeImage';
import Tech from 'views/Common/Tech';
import Choose from 'views/Common/Choose';
import UserHomeCourses from './UserHomeCourses';
import Footer from 'views/Common/Footer';

function UserHome() {
    useEffect(() => {
        if (!sessionStorage.getItem('usersession')) {
            return <Redirect to="/user-login" />
        }
    })
    return (
        <>
            <UserNavbar />
            <HomeImage />
            <Tech />
            <Choose />
            <UserHomeCourses/>
            <Footer/>
        </>
    );
}

export default UserHome;
