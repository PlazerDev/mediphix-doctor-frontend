import { useAuthContext } from "@asgardeo/auth-react";
import LogoImg from "../../src/assets/images/mediphix.jpg";
import LandingImg from "../assets/images/signup/LandingImg.jpg";

function GuestHomePage() {
  const { signIn } = useAuthContext();

  return <></>;
}

export default GuestHomePage;
