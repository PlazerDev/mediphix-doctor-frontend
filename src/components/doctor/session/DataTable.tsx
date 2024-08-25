import { Table } from "antd";
import "../../../assets/css/table.css";

const DataTable = ({ dataSource, columns }: any) => {
  return (
    <>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{
          className: "custom-pagination", // Apply custom pagination styles
        }}
      />
    </>
  );
};

export default DataTable;
