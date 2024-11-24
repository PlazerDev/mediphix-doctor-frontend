import { Table } from "antd";
import "../../../assets/css/table.css";

const DataTable = ({ dataSource, columns, onRowClick }: any) => {
  return (
    <>
      <Table
        className="mx-4"
        dataSource={dataSource}
        columns={columns}
        pagination={{
          className: "custom-pagination", // Apply custom pagination styles
        }}
        onRow={(record) => ({
          onClick: () => onRowClick(record),
        })}
      />
    </>
  );
};

export default DataTable;
