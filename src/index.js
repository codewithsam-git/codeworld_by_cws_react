import React, { useState } from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "./assets/scss/argon-design-system-react.scss";
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import '@fortawesome/fontawesome-free/css/brands.min.css';
import '@fortawesome/fontawesome-free/css/solid.min.css';

import AdminLayout from "layouts/Admin.js";
import AdminLogin from "layouts/AdminLogin";
import Home from "views/Common/Home";
import UserLogin from "views/user/UserLogin";
import About from "views/Common/About";
import Courses from "views/Common/Courses";
import UserHome from "views/user/UserHome";
import UserAbout from "views/user/UserAbout";
import userCourse from "views/user/userCourse";
import UserCourseDetail from "views/user/UserCourseDetail";
import UserAccount from "views/user/UserAccount";
// import LoadingBar from 'react-top-loading-bar'

const App = () => {
  // const [progress, setProgress] = useState(100);

  return (
    <BrowserRouter>
      {/* <LoadingBar
        color='#4a319e'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      /> */}
      <Switch>
        {/* Common Routes */}
        <Route path="/home" component={Home} />
        <Route path="/about" component={About} />      
        <Route path="/courses" component={Courses} />      

        {/* User Routes */}
        <Route path="/user-login" component={UserLogin} />   
        <Route path="/user-home" component={UserHome} />   
        <Route path="/user-about" component={UserAbout} />   
        <Route path="/user-course" component={userCourse} />  
        <Route path="/user-course-detail" component={UserCourseDetail} /> 
        <Route path="/user-account" component={UserAccount} /> 

        {/* Admin Routes */}
        <Route path="/admin/login" component={AdminLogin} />
        <Route path="/admin" render={(props) => <AdminLayout {...props} />} /> 
        <Redirect from="/" to="/home" />      
      </Switch>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
