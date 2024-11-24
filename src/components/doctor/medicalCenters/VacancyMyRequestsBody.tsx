import React from "react";
import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";

interface DataType {
  key: string;
  medicalCenter: string;
  dateRange: string;
  timeSlots: { timeSlot: string; noOfPatients: number }[];
  status: string;
}

const obj = [
  {
    medicalCenter: "Nawaloka",
    dateRange: "2024-11-01 - 2024-11-30",
    timeSlots: [
      { timeSlot: "08:00 - 09:00", noOfPatients: 10 },
      { timeSlot: "09:00 - 10:00", noOfPatients: 15 },
    ],
    status: "Pending",
  },
  {
    medicalCenter: "Asiri Medical Center",
    dateRange: "2024-12-01 - 2024-12-31",
    timeSlots: [
      { timeSlot: "10:00 - 11:00", noOfPatients: 8 },
      { timeSlot: "11:00 - 12:00", noOfPatients: 12 },
    ],
    status: "Approved",
  },
];

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Medical Center",
    dataIndex: "medicalCenter",
    key: "medicalCenter",
  },
  {
    title: "Date Range",
    dataIndex: "dateRange",
    key: "dateRange",
  },
  {
    title: "Time Slots and No. of Patients",
    dataIndex: "timeSlots",
    key: "timeSlots",
    render: (timeSlots: { timeSlot: string; noOfPatients: number }[]) => (
      <ul>
        {timeSlots.map((slot, index) => (
          <li key={index}>
            {slot.timeSlot}: {slot.noOfPatients} patients
          </li>
        ))}
      </ul>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: string) => {
      let color = "blue";
      if (status === "Pending") color = "orange";
      if (status === "Approved") color = "green";
      if (status === "Rejected") color = "red";
      return <Tag color={color}>{status}</Tag>;
    },
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>View Details</a>
        <a>Cancel Request</a>
      </Space>
    ),
  },
];

const VacancyMyRequestsBody = () => {
  // Add keys to data for Ant Design Table
  const dataWithKeys = obj.map((item, index) => ({
    key: String(index + 1),
    ...item,
  }));

  return (
    <div className="mx-4 mt-8">
      <Table<DataType> columns={columns} dataSource={dataWithKeys} />
    </div>
  );
};

export default VacancyMyRequestsBody;
