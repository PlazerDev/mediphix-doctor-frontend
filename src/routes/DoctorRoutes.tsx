import { Route, Routes } from "react-router-dom";
import Navigation from "../components/Navigation";
import {
  HomeOutlined,
  AppstoreOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import DoctorHome from "../components/doctor/home/DoctorHome";

function DoctorRoutes() {
  return (
    <div>
      <Navigation
        role="doctor"
        buttonNames={["Home", "Sessions", "Medical Centers"]}
        buttonImages={[
          <HomeOutlined />,
          <AppstoreOutlined />,
          <HeartOutlined />,
        ]}
      />
      <Routes>
        <Route path="/home" element={<DoctorHome />} />
      </Routes>
    </div>
  );
}

export default DoctorRoutes;
