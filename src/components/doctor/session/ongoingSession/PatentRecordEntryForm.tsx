import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Button, Tag, Select, Switch } from "antd";
import { PlusOutlined, PlusSquareFilled } from "@ant-design/icons";
import AddNewEntryButton from "./AddNewEntryButton";

const { TextArea } = Input;

const PatentRecordEntryForm = () => {
  const { handleSubmit, control } = useForm();
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [symptomInputVisible, setSymptomInputVisible] = useState(false);
  const [symptomInputValue, setSymptomInputValue] = useState("");
  const [diagnosisCategories, setDiagnosisCategories] = useState<string[]>([]);
  const [diagnosisInputVisible, setDiagnosisInputVisible] = useState(false);
  const [diagnosisInputValue, setDiagnosisInputValue] = useState("");

  const handleSymptomClose = (removedSymptom: string) => {
    setSymptoms(symptoms.filter((symptom) => symptom !== removedSymptom));
  };

  const handleSymptomInputConfirm = () => {
    if (symptomInputValue && !symptoms.includes(symptomInputValue)) {
      setSymptoms([...symptoms, symptomInputValue]);
    }
    setSymptomInputVisible(false);
    setSymptomInputValue("");
  };

  const showSymptomInput = () => {
    setSymptomInputVisible(true);
  };

  const handleDiagnosisClose = (removedDiagnosis: string) => {
    setDiagnosisCategories(
      diagnosisCategories.filter((category) => category !== removedDiagnosis)
    );
  };

  const handleDiagnosisInputConfirm = () => {
    if (
      diagnosisInputValue &&
      !diagnosisCategories.includes(diagnosisInputValue)
    ) {
      setDiagnosisCategories([...diagnosisCategories, diagnosisInputValue]);
    }
    setDiagnosisInputVisible(false);
    setDiagnosisInputValue("");
  };

  const showDiagnosisInput = () => {
    setDiagnosisInputVisible(true);
  };
  const onSubmit = (data: any) => {
    console.log("Submitted Data:", data);
    // handle form submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="symptoms" className="block font-bold mb-2 ">
          Symptoms <span className="text-red-500">*</span>
        </label>
        <div className="border rounded p-2">
          {symptoms.map((symptom, index) => (
            <Tag
              key={index}
              closable
              onClose={() => handleSymptomClose(symptom)}
            >
              {symptom}
            </Tag>
          ))}
          {symptomInputVisible && (
            <Input
              type="text"
              size="small"
              value={symptomInputValue}
              onChange={(e) => setSymptomInputValue(e.target.value)}
              onBlur={handleSymptomInputConfirm}
              onPressEnter={handleSymptomInputConfirm}
              className="mt-2"
            />
          )}
          {!symptomInputVisible && (
            <Tag onClick={showSymptomInput} className="mt-2 cursor-pointer">
              <PlusOutlined /> New Symptom
            </Tag>
          )}
        </div>
      </div>

      <h2 className="font-bold ">Diagnosis</h2>
      <div className="flex flex-col">
        <label htmlFor="diagnosis" className="mb-2">
          Diagnosis Category(s) <span className="text-red-500">*</span>
        </label>
        <div className="border rounded p-2">
          {diagnosisCategories.map((category, index) => (
            <Tag
              key={index}
              closable
              onClose={() => handleDiagnosisClose(category)}
            >
              {category}
            </Tag>
          ))}
          {diagnosisInputVisible && (
            <Input
              type="text"
              size="small"
              value={diagnosisInputValue}
              onChange={(e) => setDiagnosisInputValue(e.target.value)}
              onBlur={handleDiagnosisInputConfirm}
              onPressEnter={handleDiagnosisInputConfirm}
              className="mt-2"
            />
          )}
          {!diagnosisInputVisible && (
            <Tag onClick={showDiagnosisInput} className="mt-2 cursor-pointer">
              <PlusOutlined /> New Diagnosis
            </Tag>
          )}
        </div>
        <label htmlFor="detailed_diagnosis" className=" mt-4 mb-2">
          Detailed Diagnosis <span className="text-red-500">*</span>
        </label>
        <Controller
          name="detailed_diagnosis"
          control={control}
          render={({ field }) => (
            <TextArea
              rows={4}
              placeholder="Enter detailed diagnosis here"
              {...field}
            />
          )}
        />
      </div>

      <h2 className="font-bold ">Medications</h2>
      <div className="flex flex-col border p-4">
        <label htmlFor="medication_name_and_dosage" className="mb-2">
          Medication Name and Dosage <span className="text-red-500">*</span>
        </label>
        <Controller
          name="medication_name_and_dosage"
          control={control}
          render={({ field }) => (
            <Input placeholder="Enter medication name and dosage" {...field} />
          )}
        />
        <label htmlFor="dosage_frequency" className="mb-2 mt-4">
          Dosage Frequency <span className="text-red-500">*</span>
        </label>
        <Controller
          name="dosage_frequency"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              className="w-1/3"
              placeholder="Select dosage frequency"
            >
              <Select.Option value="daily">Daily</Select.Option>
              <Select.Option value="weekly">Weekly</Select.Option>
              <Select.Option value="monthly">Monthly</Select.Option>
            </Select>
          )}
        />
      </div>
      <AddNewEntryButton />

      <h2 className="font-bold ">Procedures</h2>
      <div className="flex flex-col border p-4">
        <label htmlFor="procedure_to_follow" className="mb-2">
          Procedure to follow <span className="text-red-500">*</span>
        </label>
        <Controller
          name="procedure_to_follow"
          control={control}
          render={({ field }) => (
            <Input placeholder="Enter any procedure to follow" {...field} />
          )}
        />
      </div>
      <AddNewEntryButton />

      <label htmlFor="special_note" className="block font-bold ">
        Special Note <span className="text-red-500">*</span>
      </label>
      <Controller
        name="special_note"
        control={control}
        render={({ field }) => (
          <TextArea
            rows={4}
            placeholder="Enter special note for the patient"
            {...field}
          />
        )}
      />

      <div className="flex items-center">
        <span className="font-bold ">Lab Report(s)</span>
        <Switch className="ml-2" defaultChecked />
      </div>
      <div className="flex flex-col border p-4">
        <div className="flex gap-4 mb-4">
          <div className="flex flex-col w-1/2">
            <label htmlFor="priority_level" className="mb-2">
              Priority Level <span className="text-red-500">*</span>
            </label>
            <Controller
              name="priority_level"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  className="w-2/3"
                  placeholder="Select priority level"
                >
                  <Select.Option value="high">High</Select.Option>
                  <Select.Option value="medium">Medium</Select.Option>
                  <Select.Option value="low">Low</Select.Option>
                </Select>
              )}
            />
          </div>
          <div className="flex flex-col w-1/2">
            <label htmlFor="test_type " className="mb-2">
              Test Type <span className="text-red-500">*</span>
            </label>
            <Controller
              name="test_type"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  className="w-2/3"
                  placeholder="Select test type"
                >
                  <Select.Option value="blood">Blood Test</Select.Option>
                  <Select.Option value="urine">Urine Test</Select.Option>
                  <Select.Option value="xray">X-Ray</Select.Option>
                </Select>
              )}
            />
          </div>
        </div>
        <label htmlFor="test_name" className="mb-2">
          Test Name <span className="text-red-500">*</span>
        </label>
        <Controller
          name="test_name"
          control={control}
          render={({ field }) => (
            <Input placeholder="Enter test name" {...field} />
          )}
        />
      </div>

      <AddNewEntryButton />
    </form>
  );
};

export default PatentRecordEntryForm;
