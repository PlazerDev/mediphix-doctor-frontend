import { useAuthContext } from "@asgardeo/auth-react";
import logo from "./../../../assets/images/landing-page/mediphix_logo.png";
import DropDown from "./DropDown";
import BtnWithoutBorder from "./BtnWithoutBorder";
import { Link } from "react-router-dom";

function Navigation() {
  const { signIn } = useAuthContext();
  return (
    <div className="bg-mediphix_text_a px-24 py-4 flex flex-row justify-between items-center ">
      <img src={logo} alt="logo" className="object-contain h-8" />
      <div className="flex gap-4 text-[#ededed] ">
        <DropDown />
        <p className="hover:cursor-pointer hover:text-white">Features</p>
        <p className="hover:cursor-pointer hover:text-white">Feedbacks</p>
        <p className="hover:cursor-pointer hover:text-white">FAQ</p>
      </div>
      <div className="flex flex-row gap-4">
        <BtnWithoutBorder title="Login" onClickFunction={() => signIn()} />
        <Link to="/signup">
          <div className="border-2 border-white flex items-center justify-center rounded-md px-4 py-1 text-white hover:bg-white hover:text-mediphix_accent hover:cursor-pointer">
            Register
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Navigation;
