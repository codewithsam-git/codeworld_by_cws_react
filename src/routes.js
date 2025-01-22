import Dashboard from "views/admin/Dashboard.js";
import OnlineCourses from "views/admin/OnlineCourses";
import Internship from "views/admin/Internship";
import OfflineCourses from "views/admin/OfflineCourses"
import Enrollments from "views/admin/Enrollments";

const dashboardRoutes = [
 
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/onlinecourses",
    name: "ONLINE COURSES",
    icon: "nc-icon nc-notes",
    component: OnlineCourses,
    layout: "/admin"
  },
  // {
  //   path: "/internship",
  //   name: "INTERNSHIP",
  //   icon: "nc-icon nc-notes",
  //   component: Internship,
  //   layout: "/admin"
  // },
  {
    path: "/offlinecourses",
    name: "OFFLINE COURSES",
    icon: "nc-icon nc-paper-2",
    component: OfflineCourses,
    layout: "/admin"
  },
  {
    path: "/enrollments",
    name: "ENROLLMENTS",
    icon: "nc-icon nc-circle-09",
    component: Enrollments,
    layout: "/admin"
  },
];

export default dashboardRoutes;
