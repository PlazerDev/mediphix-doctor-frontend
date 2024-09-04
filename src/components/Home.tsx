import { useEffect } from 'react';
import { useAuthContext } from "@asgardeo/auth-react";
import GuestHomePage from "./GuestHomePage.tsx";
import { useNavigate } from 'react-router-dom';
import DoctorHome from './doctor/home/DoctorHome.tsx';
import { Navigate } from "react-router-dom";



function Home() {
  const { state } = useAuthContext();



  return !state.isAuthenticated ? <GuestHomePage /> : <Navigate to={"doctor/home"} />;
}

export default Home;
