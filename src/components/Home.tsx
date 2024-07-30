import { useEffect } from 'react';
import { useAuthContext } from "@asgardeo/auth-react";
import GuestHomePage from "./GuestHomePage.tsx";
import { useNavigate } from 'react-router-dom';

function Home() {
  const { state } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (state.isAuthenticated) {
      navigate("/doctor/home");
    }
  }, [state.isAuthenticated, navigate]);

  return !state.isAuthenticated ? <GuestHomePage /> : null;
}

export default Home;
