import {useAuthContext} from "@asgardeo/auth-react";
import CustomButton from "./doctor/CustomButton.tsx";

function GuestHomePage() {
    const {signIn} = useAuthContext();

    return (
        <>
            <div style={{minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
                <CustomButton onClick={() => signIn()} label={"Log In"}/>
            </div>
        </>
    )
}

export default GuestHomePage;