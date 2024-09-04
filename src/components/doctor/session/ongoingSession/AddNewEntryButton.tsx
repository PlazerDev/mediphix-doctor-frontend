import { PlusSquareFilled } from "@ant-design/icons";
import { Button } from "antd";

const buttonStyle = {
  border: "1px solid black",
};

const AddNewEntryButton = () => {
  return (
    <>
      <div className="grid justify-items-end">
        <Button style={buttonStyle} icon={<PlusSquareFilled />}>
          Add New Entry
        </Button>
      </div>
    </>
  );
};

export default AddNewEntryButton;
