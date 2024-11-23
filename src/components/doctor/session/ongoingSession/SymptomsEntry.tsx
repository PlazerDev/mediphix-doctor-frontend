import { useState } from "react";
import { Input, Tag } from "antd";
import { PlusOutlined } from "@ant-design/icons";

interface SymptomsEntryProps {
  symptoms: string[];
  setSymptoms: (symptoms: string[]) => void;
  onAddSymptom: (symptoms: string[]) => void;
}

const SymptomsEntry: React.FC<SymptomsEntryProps> = ({ symptoms, setSymptoms, onAddSymptom  }) => {
  const [symptomInputVisible, setSymptomInputVisible] = useState(false);
  const [symptomInputValue, setSymptomInputValue] = useState("");

  const handleSymptomClose = (removedSymptom: string) => {
    const updatedSymptoms = symptoms.filter((symptom) => symptom !== removedSymptom);
    setSymptoms(updatedSymptoms);
    onAddSymptom(updatedSymptoms);
  };

  const handleSymptomInputConfirm = () => {
    if (symptomInputValue && !symptoms.includes(symptomInputValue)) {
      const updatedSymptoms = [...symptoms, symptomInputValue];
      setSymptoms(updatedSymptoms);
      onAddSymptom(updatedSymptoms);
    }
    setSymptomInputVisible(false);
    setSymptomInputValue("");
  };

  return (
    <div>
       <label htmlFor="symptoms" className="block mb-2">
            Symptoms <span className="text-red-500">*</span>
          </label>
      <div className="border rounded px-2 pb-2 ">
        {symptoms.map((symptom, index) => (
          <Tag key={index} closable onClose={() => handleSymptomClose(symptom)}>
            {symptom}
          </Tag>
        ))}
        {symptomInputVisible ? (
          <Input
            type="text"
            size="small"
            value={symptomInputValue}
            onChange={(e) => setSymptomInputValue(e.target.value)}
            onBlur={handleSymptomInputConfirm}
            onPressEnter={handleSymptomInputConfirm}
            className=""
          />
        ) : (
          <Tag onClick={() => setSymptomInputVisible(true)}  className="mt-2 cursor-pointer">
            <PlusOutlined /> New Symptom
          </Tag>
        )}
      </div>
    </div>
  );
};

export default SymptomsEntry;
