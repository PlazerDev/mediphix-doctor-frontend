import { Controller } from "react-hook-form";
import { Input } from "antd";
import AddNewEntryButton from "./AddNewEntryButton";
import { useEffect, useState } from "react";

interface ProceduresEntryProps {
  control: any;
  procedures: any[];
  onAddProcedure: (procedures: any[]) => void;
}

const ProceduresEntry = ({
  control,
  procedures,
  onAddProcedure,
}: ProceduresEntryProps) => {
  const [procedureEntries, setProcedureEntries] = useState(
    procedures.length > 0 ? procedures : [{ procedure: "" }]
  );

  const addNewProcedure = () => {
    const updatedProcedures = [...procedureEntries, { procedure: "" }];
    setProcedureEntries(updatedProcedures);
    onAddProcedure(updatedProcedures);
  };

  useEffect(() => {
    onAddProcedure(procedureEntries);
  }, [procedureEntries, onAddProcedure]);

  return (
    <div>
      <h2 className="font-bold">Procedures</h2>
      {procedureEntries.map((entry, index) => (
        <div key={index} className="flex flex-col border p-4 my-2 rounded-md">
          <label
            htmlFor={`procedureEntries.${index}.procedure`}
            className="mb-2"
          >
            Procedure to Follow <span className="text-red-500">*</span>
          </label>
          <Controller
            name={`procedureEntries.${index}.procedure`}
            control={control}
            render={({ field }) => (
              <Input
                placeholder="Enter procedure to follow"
                {...field}
                value={entry.procedure}
                onChange={(e) => {
                  const updatedProcedures = [...procedureEntries];
                  updatedProcedures[index].procedure = e.target.value;
                  setProcedureEntries(updatedProcedures);
                }}
              />
            )}
          />
        </div>
      ))}
      <AddNewEntryButton onClick={addNewProcedure} />
    </div>
  );
};

export default ProceduresEntry;
