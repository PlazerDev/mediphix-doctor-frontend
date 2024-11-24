import { useState } from "react";
import { Input, Tag } from "antd";
import { PlusOutlined } from "@ant-design/icons";

interface DiagnosisEntryProps {
  diagnosisCategories: string[];
  setDiagnosisCategories: (categories: string[]) => void;
  onAddDiagnosis: (categories: string[]) => void;
}

const DiagnosisEntry: React.FC<DiagnosisEntryProps> = ({
  diagnosisCategories,
  setDiagnosisCategories,
  onAddDiagnosis,
}) => {
  const [diagnosisInputVisible, setDiagnosisInputVisible] = useState(false);
  const [diagnosisInputValue, setDiagnosisInputValue] = useState("");

  const handleDiagnosisClose = (removedDiagnosis: string) => {
    const updatedCategories = diagnosisCategories.filter(
      (category) => category !== removedDiagnosis
    );
    setDiagnosisCategories(updatedCategories);
    onAddDiagnosis(updatedCategories);
  };

  const handleDiagnosisInputConfirm = () => {
    if (
      diagnosisInputValue &&
      !diagnosisCategories.includes(diagnosisInputValue)
    ) {
      const updatedCategories = [...diagnosisCategories, diagnosisInputValue];
      setDiagnosisCategories(updatedCategories);
      onAddDiagnosis(updatedCategories);
    }
    setDiagnosisInputVisible(false);
    setDiagnosisInputValue("");
  };

  return (
    <div>
      <h2 className="font-bold mb-2">Diagnosis</h2>
      <label htmlFor="diagnosis" className="mb-2">
        Diagnosis Category(s) <span className="text-red-500">*</span>
      </label>
      <div className="border rounded px-2 pb-2 ">
        {diagnosisCategories.map((category, index) => (
          <Tag
            key={index}
            closable
            onClose={() => handleDiagnosisClose(category)}
          >
            {category}
          </Tag>
        ))}
        {diagnosisInputVisible ? (
          <Input
            type="text"
            size="small"
            value={diagnosisInputValue}
            onChange={(e) => setDiagnosisInputValue(e.target.value)}
            onBlur={handleDiagnosisInputConfirm}
            onPressEnter={handleDiagnosisInputConfirm}
            className=""
          />
        ) : (
          <Tag
            onClick={() => setDiagnosisInputVisible(true)}
            className="mt-2 cursor-pointer"
          >
            <PlusOutlined /> New Diagnosis
          </Tag>
        )}
      </div>
    </div>
  );
};

export default DiagnosisEntry;
