import { useEffect, useState } from "react";
// import Loading from "../../components/Loading";
// import Footer from "../../components/Footer";
import { FaPlusCircle } from "react-icons/fa";
import { useAuthContext } from "@asgardeo/auth-react";
import { DoctorService } from "../../../services/DoctorService";
import { useLoading } from "../../../contexts/LoadingContext";

function PreviousSession() {
  const { startLoading, stopLoading, isLoading } = useLoading();
  const { getAccessToken } = useAuthContext();
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    startLoading();
    DoctorService.getMedicalRcordData(getAccessToken, setData, stopLoading);
  }, []);

  // setting breadcrumb
  const breadcrumbItems = [
    {
      title: "Home",
      link: "/medicalCenterAdmin",
    },
    {
      title: "Sessions",
      link: "/medicalCenterAdmin/sessions",
    },
    {
      title: "Vacancies",
      link: "",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar  */}
      <MCSNavBar />
      {/* Body */}
      {!isLoading && (
        <div className="flex-grow px-8">
          <MCSMainGreeting
            title={TimeService.getGreeting()}
            titleMemberName={StorageService.getUserName() || ""}
            breadcrumbItems={breadcrumbItems}
            role="Medical Center Admin"
            medicalCenterName={StorageService.getMedicalCenterName() || ""}
          />
          {/* Main Body div */}
          <div className="flex flex-col items-start">
            <div className="h-8 mb-4">
              <NormalButtonWithIcon
                buttonIcon={FaPlusCircle}
                colorType={2}
                link="/medicalCenterAdmin/sessions/vacancies/createNew"
                title="Create a new vacancy"
              />
            </div>
            <MedicalRecordsTable data={data} />
          </div>
        </div>
      )}
      {isLoading && (
        <div className="flex-grow flex justify-center items-center">
          <Loading />
        </div>
      )}
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default PreviousSession;






































































// import { Breadcrumb, TableProps } from "antd";
// import CenterSearchBar from "./CenterSearchBar";
// import { FaCheckCircle } from "react-icons/fa";
// import DataTable from "./DataTable";
// import { useNavigate } from "react-router-dom";

// const previousSessions = [
//   {
//     key: "1",
//     refNumber: "REF_1598",
//     date: "2024/05/20",
//     timeSlot: "10:00 AM - 10:30 AM",
//     startTime: "10:00 AM",
//     category: "OPD",
//     medicalCenter: "City Hospital",
//     diagnosisCategory: "Cardiology",
//     labReportStatus: "received",
//   },
//   {
//     key: "2",
//     refNumber: "REF_1598",
//     date: "2024/05/22",
//     timeSlot: "10:00 AM - 10:30 AM",
//     startTime: "10:00 AM",
//     category: "OPD",
//     medicalCenter: "Central Clinic",
//     diagnosisCategory: "Infectious Diseases",
//     labReportStatus: "N/A",
//   },
//   {
//     key: "3",
//     refNumber: "REF_1598",
//     date: "2024/05/22",
//     timeSlot: "10:00 AM - 10:30 AM",
//     startTime: "10:00 AM",
//     category: "OPD",
//     medicalCenter: "Central Clinic",
//     diagnosisCategory: "Infectious Diseases",
//     labReportStatus: "pending",
//   },
// ];

// const columns: TableProps["columns"] = [
//   {
//     title: "Date",
//     dataIndex: "date",
//     key: "date",
//   },
//   {
//     title: "Time Slot",
//     dataIndex: "timeSlot",
//     key: "timeSlot",
//   },
//   {
//     title: "Start Time",
//     dataIndex: "startTime",
//     key: "startTime",
//   },
//   {
//     title: "Apt. Category",
//     dataIndex: "category",
//     key: "category",
//   },
//   {
//     title: "Medical Center",
//     dataIndex: "medicalCenter",
//     key: "mcenter",
//   },
//   {
//     title: "Diagnosis Category",
//     dataIndex: "diagnosisCategory",
//     key: "diagnosisCategory",
//   },
//   {
//     title: "Lab Report Status",
//     dataIndex: "labReportStatus",
//     key: "lbstatus",
//     render: (status: string) => {
//       let color = "";
//       let icon = null;
//       if (status === "N/A") {
//         color = "#868686";
//       } else if (status === "received") {
//         color = "#363636";
//         icon = <FaCheckCircle style={{ color }} />;
//       } else if (status === "pending") {
//         color = "#FF7300";
//       }
//       return (
//         <span style={{ color, display: "flex", alignItems: "center" }}>
//           {icon}
//           <span style={{ marginLeft: icon ? 4 : 0 }}>
//             {toPascalCase(status)}
//           </span>
//         </span>
//       );
//     },
//   },
// ];

// const toPascalCase = (str: string) => {
//   return str
//     .toLowerCase()
//     .replace(
//       /(\w)(\w*)/g,
//       (_, firstChar, rest) => firstChar.toUpperCase() + rest.toLowerCase()
//     );
// };

// const PreviousSession = () => {
//   const navigate = useNavigate();

//   const rowClick = (record: any) => {
//     navigate("/doctor/sessions/previoussessions/" + record.refNumber);
//   };



//   return (
//     <div>
//       <div>
//         <p className="text-xl font-bold ml-[1%] mt-[1%]">Previous Sessions</p>
//       </div>
//       <div>
//         <Breadcrumb
//           className="ml-[1%]"
//           items={[
//             {
//               title: "Sessions",
//             },
//             {
//               title: <a href="">Previous Sessions</a>,
//             },
//           ]}
//         />
//       </div>
//       <CenterSearchBar />
//       <DataTable
//         dataSource={previousSessions}
//         columns={columns}
//         onRowClick={rowClick}
//       />
//     </div>
//   );
// };

// export default PreviousSession;



