import React from "react";
import { Table, Tag, Button } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { useNavigate } from "react-router-dom";
import { TimeService } from "../../services/TimeService";

interface DataType {
  key: React.Key;
  openedDate: string;
  aptCategory: JSX.Element;
  status: string;
  noOfResponses: number;
}

const onChange: TableProps<DataType>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log("params", pagination, filters, sorter, extra);
  // navigate to /medicalCenterAdmin/sessions/vacancies/keyValue
};

interface Props {
  data: any | null;
}

function MCATable({ data }: Props) {
  const navigate = useNavigate();

  let dataRow;
  if (data == null) {
    dataRow = [];
  } else {
    dataRow = data.map((item: any, index: number) => ({
      key: index,
      openedDate: TimeService.formatDate(item.vacancyOpenedTimestamp),
      aptCategory: (
        <>
          {item.aptCategories.map((c: string) => (
            <Tag color="default">{c}</Tag>
          ))}
        </>
      ),
      status: item.vacancyStatus,
      noOfResponses: item.responses.length,
    }));
  }

  const columns: TableColumnsType<DataType> = [
    {
      title: "Opened Date",
      dataIndex: "openedDate",
      defaultSortOrder: "descend",
      sorter: (a, b) =>
        new Date(a.openedDate).getTime() - new Date(b.openedDate).getTime(),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Appointment Categories",
      dataIndex: "aptCategory",
    },
    {
      title: "Status",
      dataIndex: "status",
      filters: [
        {
          text: "OPEN",
          value: "OPEN",
        },
        {
          text: "CLOSED",
          value: "CLOSED",
        },
      ],
      onFilter: (value, record) => record.status.indexOf(value as string) === 0,
      render: (status) => {
        const color = status === "OPEN" ? "green" : "red";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Number of Responses",
      dataIndex: "noOfResponses",
      sorter: (a, b) => a.noOfResponses - b.noOfResponses,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => {
            const urlData = encodeURIComponent(
              JSON.stringify(data[Number(record.key)])
            );
            navigate(
              `/medicalCenterAdmin/sessions/vacancies/view?data=${urlData}`
            );
          }}
        >
          View More
        </Button>
      ),
    },
  ];

  return (
    <Table<DataType>
      className="w-full"
      columns={columns}
      dataSource={dataRow}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
}

export default MCATable;
