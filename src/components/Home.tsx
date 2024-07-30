import {useAuthContext} from "@asgardeo/auth-react";
import DoctorHome from "./doctor/DoctorHome.tsx";
import GuestHomePage from "./GuestHomePage.tsx";

function Home() {
    const {state} = useAuthContext();
    return (
        !state.isAuthenticated ?
            <GuestHomePage/>
            :
            <DoctorHome/>

    );
}


export default Home
