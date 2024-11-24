import { Breadcrumb, TableProps } from "antd";
import CenterSearchBar from "./CenterSearchBar";
import { FaCheckCircle } from "react-icons/fa";
import DataTable from "./DataTable";
import { useNavigate } from "react-router-dom";

const previousSessions = [
  {
    key: "1",
    refNumber: "REF_1598",
    date: "2024/05/20",
    timeSlot: "10:00 AM - 10:30 AM",
    startTime: "10:00 AM",
    category: "OPD",
    medicalCenter: "City Hospital",
    diagnosisCategory: "Cardiology",
    labReportStatus: "received",
  },
  {
    key: "2",
    refNumber: "REF_1598",
    date: "2024/05/22",
    timeSlot: "10:00 AM - 10:30 AM",
    startTime: "10:00 AM",
    category: "OPD",
    medicalCenter: "Central Clinic",
    diagnosisCategory: "Infectious Diseases",
    labReportStatus: "N/A",
  },
  {
    key: "3",
    refNumber: "REF_1598",
    date: "2024/05/22",
    timeSlot: "10:00 AM - 10:30 AM",
    startTime: "10:00 AM",
    category: "OPD",
    medicalCenter: "Central Clinic",
    diagnosisCategory: "Infectious Diseases",
    labReportStatus: "pending",
  },
];

const columns: TableProps["columns"] = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Time Slot",
    dataIndex: "timeSlot",
    key: "timeSlot",
  },
  {
    title: "Start Time",
    dataIndex: "startTime",
    key: "startTime",
  },
  {
    title: "Apt. Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Medical Center",
    dataIndex: "medicalCenter",
    key: "mcenter",
  },
  {
    title: "Diagnosis Category",
    dataIndex: "diagnosisCategory",
    key: "diagnosisCategory",
  },
  {
    title: "Lab Report Status",
    dataIndex: "labReportStatus",
    key: "lbstatus",
    render: (status: string) => {
      let color = "";
      let icon = null;
      if (status === "N/A") {
        color = "#868686";
      } else if (status === "received") {
        color = "#363636";
        icon = <FaCheckCircle style={{ color }} />;
      } else if (status === "pending") {
        color = "#FF7300";
      }
      return (
        <span style={{ color, display: "flex", alignItems: "center" }}>
          {icon}
          <span style={{ marginLeft: icon ? 4 : 0 }}>
            {toPascalCase(status)}
          </span>
        </span>
      );
    },
  },
];

const toPascalCase = (str: string) => {
  return str
    .toLowerCase()
    .replace(
      /(\w)(\w*)/g,
      (_, firstChar, rest) => firstChar.toUpperCase() + rest.toLowerCase()
    );
};

const PreviousSession = () => {
  const navigate = useNavigate();

  const rowClick = (record: any) => {
    navigate("/doctor/sessions/previoussessions/" + record.refNumber);
  };

  return (
    <div>
      <div>
        <p className="text-xl font-bold ml-[1%] mt-[1%]">Previous Sessions</p>
      </div>
      <div>
        <Breadcrumb
          className="ml-[1%]"
          items={[
            {
              title: "Sessions",
            },
            {
              title: <a href="">Previous Sessions</a>,
            },
          ]}
        />
      </div>
      <CenterSearchBar />
      <DataTable
        dataSource={previousSessions}
        columns={columns}
        onRowClick={rowClick}
      />
    </div>
  );
};

export default PreviousSession;
