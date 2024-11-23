import { PlusSquareFilled } from "@ant-design/icons";
import { Button } from "antd";

interface AddNewEntryButtonProps {
  onClick: () => void;
}

const buttonStyle = {
  border: "1px solid black",
};

const AddNewEntryButton = ({ onClick }: AddNewEntryButtonProps) => {
  
  return (
    <div className="grid justify-items-end">
      <Button style={buttonStyle} icon={<PlusSquareFilled />} onClick={onClick}>
        Add New Entry
      </Button>
    </div>
  );
};

export default AddNewEntryButton;
