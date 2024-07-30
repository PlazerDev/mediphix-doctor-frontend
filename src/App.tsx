import { AuthProvider } from "@asgardeo/auth-react";
import Home from "./components/Home.tsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DoctorRoutes from "./routes/DoctorRoutes.tsx";

function App() {

    const asgardioConfig = {
        signInRedirectURL: "http://localhost:5174",
        signOutRedirectURL: "http://localhost:5174",
        clientID: import.meta.env.VITE_PATIENT_ASGARDEO_CLIENT_ID,
        baseUrl: import.meta.env.VITE_PATIENT_ASGARDEO_BASE_URL,
        scope: ["openid", "email", "profile", "update_own_doctor_sessions"]
    };
    return (
        <>
            <AuthProvider config={asgardioConfig}>
                <Router>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                      {/* doctor Rotes  */}
            <Route path="/doctor/*" element={<DoctorRoutes />} />
                    </Routes>
                </Router>
            </AuthProvider>
        </>
    )

}

export default App;
