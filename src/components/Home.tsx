import { useEffect } from 'react';
import { useAuthContext } from "@asgardeo/auth-react";
import GuestHomePage from "./GuestHomePage.tsx";
import { useNavigate } from 'react-router-dom';
import DoctorHome from './doctor/home/DoctorHome.tsx';

function Home() {
  const { state } = useAuthContext();
  console.log("Home comp");


  return !state.isAuthenticated ? <GuestHomePage /> : <DoctorHome />;
}

export default Home;
