import { Controller } from "react-hook-form";
import { Input, Select } from "antd";
import AddNewEntryButton from "./AddNewEntryButton";
import { useEffect, useState } from "react";

const { TextArea } = Input;

interface MedicationsEntryProps {
  control: any;
  medications: any[];
  onAddMedication: (medications: any[]) => void;
}

const MedicationsEntry = ({
  control,
  medications,
  onAddMedication,
}: MedicationsEntryProps) => {
  const [medicationEntries, setMedicationEntries] = useState(medications);

  const addNewMedication = () => {
    const updatedMedications = [
      ...medicationEntries,
      { name: "", frequency: "", notes: "" },
    ];
    setMedicationEntries(updatedMedications);
    onAddMedication(updatedMedications);
  };

  useEffect(() => {
    onAddMedication(medicationEntries);
  }, [medicationEntries, onAddMedication]);

  return (
    <div>
      <h2 className="font-bold">Medications</h2>
      {medicationEntries.map((entry, index) => (
        <div key={index} className="flex flex-col border p-4 my-2 rounded-md">
          <label htmlFor={`medicationEntries.${index}.name`} className="mb-2">
            Medication Name and Dosage <span className="text-red-500">*</span>
          </label>
          <Controller
            name={`medicationEntries.${index}.name`}
            control={control}
            render={({ field }) => (
              <Input
                placeholder="Enter medication name and dosage"
                {...field}
                value={entry.name}
                onChange={(e) => {
                  const updatedMedications = [...medicationEntries];
                  updatedMedications[index].name = e.target.value;
                  setMedicationEntries(updatedMedications);
                }}
              />
            )}
          />

          <label
            htmlFor={`medicationEntries.${index}.frequency`}
            className="mb-2 mt-4"
          >
            Dosage Frequency and Notes <span className="text-red-500">*</span>
          </label>
          <div className="flex items-start space-x-4">
            {/* Dosage Frequency Dropdown */}
            <Controller
              name={`medicationEntries.${index}.frequency`}
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  className="w-1/3"
                  value={entry.frequency}
                  placeholder="Select dosage frequency"
                  onChange={(value) => {
                    const updatedMedications = [...medicationEntries];
                    updatedMedications[index].frequency = value;
                    setMedicationEntries(updatedMedications);
                  }}
                >
                  <Select.Option value="daily">Daily</Select.Option>
                  <Select.Option value="weekly">Weekly</Select.Option>
                  <Select.Option value="monthly">Monthly</Select.Option>
                </Select>
              )}
            />

            {/* Notes TextArea */}
            <Controller
              name={`medicationEntries.${index}.notes`}
              control={control}
              render={({ field }) => (
                <TextArea
                  {...field}
                  rows={2}
                  placeholder="Add any additional notes"
                  value={entry.notes}
                  onChange={(e) => {
                    const updatedMedications = [...medicationEntries];
                    updatedMedications[index].notes = e.target.value;
                    setMedicationEntries(updatedMedications);
                  }}
                  className="flex-grow"
                />
              )}
            />
          </div>
        </div>
      ))}
      <AddNewEntryButton onClick={addNewMedication} />
    </div>
  );
};

export default MedicationsEntry;
