import { AuthProvider } from "@asgardeo/auth-react";
import Home from "./components/Home.tsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DoctorRoutes from "./routes/DoctorRoutes.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SignUpPage from "./components/signup/SignUpPage.tsx";

const queryClient = new QueryClient();

function App() {
  const asgardioConfig = {
    signInRedirectURL: "http://localhost:5174",
    signOutRedirectURL: "http://localhost:5174",
    clientID: import.meta.env.VITE_ASGARDEO_CLIENT_ID,
    baseUrl: import.meta.env.VITE_ASGARDEO_BASE_URL,
    scope: [
      "openid",
      "email",
      "profile",
      "update_own_doctor_sessions",
      "retrive_appoinments",
      "submit_patient_records",
    ],
  };
  return (
    <>
      <AuthProvider config={asgardioConfig}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<SignUpPage />} />
              {/* doctor Rotes  */}
              <Route path="/doctor/*" element={<DoctorRoutes />} />
            </Routes>
          </Router>
        </QueryClientProvider>
      </AuthProvider>
    </>
  );
}

export default App;
