import { Route, Routes } from "react-router-dom";
import Navigation from "../components/Navigation";
import {
  HomeOutlined,
  AppstoreOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import DoctorHome from "../components/doctor/home/DoctorHome";
import AppointmentSection from "../components/doctor/session/AppoinmentSection";
import { FaRegAddressBook } from "react-icons/fa";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import AllMedicalCenters from "../components/doctor/medicalCenters/AllMedicalCenters";
import NotRegisteredCenter from "../components/doctor/medicalCenters/NotRegisteredCenter";
import RegisteredCenter from "../components/doctor/medicalCenters/RegisteredCenter";
import AppointmentDetailsForEachCatagory from "../components/doctor/medicalCenters/AppointmentDetailsForEachCatagory";
import MyMedicalCenters from "../components/doctor/medicalCenters/MyMedicalCenters";
import MedicalCenterSection from "../components/doctor/medicalCenters/MedicalCenterSection";
import { TbHeartHandshake } from "react-icons/tb";
import { TbHeart } from "react-icons/tb";
import PreviousSession from "../components/doctor/session/PreviousSession";
import SessionDetails from "../components/doctor/session/SessionDetails";
import RecordBook from "../components/doctor/session/RecordBook";
import RecordBookList from "../components/doctor/session/RecordBookList";
import OngoingSession from "../components/doctor/session/ongoingSession/OngoingSession";
import PatientConsultationDataEntry from "../components/doctor/session/ongoingSession/PatientConsultationDataEntry";
import UpComingClinicSessionDetail from "../components/doctor/session/UpComingClinicSessionDetail";

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
        <Route path="/home" element={<DoctorHome/>} />
        <Route
          path="/medicalcenters"
          element={
            <MedicalCenterSection
              name={" Dr. V.ALWIS "}
              title={"Manage medical centers here"}
              buttontitles={["My Medical Centers", "All Medical Centers"]}
              buttonimages={[TbHeartHandshake, TbHeart]}
              navigations={[
                "/doctor/medicalcenters/mymedicalcenters",
                "/doctor/medicalcenters/allmedicalcenters",
              ]}
            />
          }
        />
        <Route
          path="/medicalcenters/allmedicalcenters"
          element={<AllMedicalCenters />}
        />
        <Route
          path="/medicalcenters/allmedicalcenters/:centerName"
          element={<NotRegisteredCenter />}
        />
        <Route
          path="/medicalcenters/mymedicalcenters"
          element={<MyMedicalCenters />}
        />
        <Route
          path="/medicalcenters/mymedicalcenters/:centerName"
          element={<RegisteredCenter />}
        />
        <Route
          path="/medicalcenters/mymedicalcenters/:centerName/:category"
          element={<AppointmentDetailsForEachCatagory />}
        />
        <Route
          path="/sessions"
          element={
            <AppointmentSection
              name={" Dr. V.ALWIS "}
              title={"Manage your sessions here"}
              buttontitles={[
                "Upcoming Clinic Sessions",
                "Ongoing Session",
                "Previous Clinic Sessions",
              ]}
              buttonimages={[
                FaRegAddressBook,
                MdOutlineCreateNewFolder,
                FaRegAddressBook,
              ]}
              navigations={[
                "/doctor/sessions/upcommingsessions",
                "/doctor/sessions/ongoingsession",
                "/doctor/sessions/previoussessions",
              ]}
            />
          }
        />
        <Route
          path="/sessions/upcommingsessions"
          element={<UpComingClinicSessionDetail />}
        />
        <Route
          path="/sessions/previoussessions"
          element={<PreviousSession />}
        />
        <Route
          path="/sessions/previoussessions/:refNumber"
          element={<SessionDetails />}
        />
        <Route path="/sessions/recordbook" element={<RecordBookList />} />
        <Route
          path="/sessions/recordbook/:refNumber"
          element={<RecordBook />}
        />
        <Route path="/sessions/ongoingsession" element={<OngoingSession />} />
        <Route path="/sessions/ongoingsession/:refNumber" element={<PatientConsultationDataEntry />} />
      </Routes>
      
    </div>
  );
}

export default DoctorRoutes;
