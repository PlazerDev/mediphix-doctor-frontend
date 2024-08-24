import { Route, Routes } from "react-router-dom";
import Navigation from "../components/Navigation";
import {
  HomeOutlined,
  AppstoreOutlined,
  HeartOutlined,
  AppstoreAddOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
} from "@ant-design/icons";
import DoctorHome from "../components/doctor/home/DoctorHome";
import AppointmentSection from "../components/doctor/session/AppoinmentSection";
import { FaRegAddressBook } from "react-icons/fa";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import AllMedicalCenters from "../components/doctor/medicalCenters/AllMedicalCenters";
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
        <Route path="/allmedicalcenters" element={<AllMedicalCenters />} />
        <Route path="/sessions" element={<AppointmentSection 
        name={" Dr. V.ALWIS "} 
        title={"Manage your sessions here"} 
        buttontitles={[
          "UpcomingClinic Sessions",
          "Create New Clinic Session",
          "Previous Clinic Sessions",
        ]} 
        buttonimages={[
          FaRegAddressBook,
          MdOutlineCreateNewFolder,
          FaRegAddressBook,
        ]}
        navigations={[
          "/doctor/session/",
          "/doctor/session/",
          "/doctor/session/",
        ]} />} />
      </Routes>
    </div>
  );
}

export default DoctorRoutes;
