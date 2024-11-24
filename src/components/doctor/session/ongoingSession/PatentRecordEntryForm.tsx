import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Switch } from "antd";
import SymptomsEntry from "./SymptomsEntry";
import DiagnosisEntry from "./DiagnosisEntry";
import ProceduresEntry from "./ProceduresEntry";
import LabReportsEntry from "./LabReportsEntry";
import MedicationsEntry from "./MedicationsEntry";

const { TextArea } = Input;

const PatientRecordEntryForm = ({
  onSubmit,
}: {
  onSubmit: (data: any) => void;
}) => {
  const { handleSubmit, control, formState: { errors } } = useForm();
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [diagnosisCategories, setDiagnosisCategories] = useState<string[]>([]);
  const [medications, setMedications] = useState([{ name: "", frequency: "" }]);
  const [procedures, setProcedures] = useState<any[]>([]);
  const [labReports, setLabReports] = useState<any[]>([]);
  const [showLabReports, setShowLabReports] = useState(true);

  const handleMedicationsUpdate = (updatedMedications: any) => {
    setMedications(updatedMedications);
  };

  const handleProceduresUpdate = (updatedProcedures: any) => {
    setProcedures(updatedProcedures);
  };

  const handleLabReportsUpdate = (updatedLabReports: any) => {
    setLabReports(updatedLabReports);
  };

  const handleSymptomsUpdate = (updatedSymptoms: string[]) => {
    setSymptoms(updatedSymptoms);
  };

  const handleDiagnosisUpdate = (updatedDiagnosis: string[]) => {
    setDiagnosisCategories(updatedDiagnosis);
  };

  const submitHandler = (data: any) => {
    onSubmit({
      ...data,
      symptoms,
      diagnosisCategories,
      medications,
      procedures,
      labReports: showLabReports ? labReports : [],
    });
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-8">
      {/* Symptoms Section */}
      <SymptomsEntry
        symptoms={symptoms}
        setSymptoms={setSymptoms}
        onAddSymptom={handleSymptomsUpdate}
      />
      

      {/* Diagnosis Section */}
      <DiagnosisEntry
        diagnosisCategories={diagnosisCategories}
        setDiagnosisCategories={setDiagnosisCategories}
        onAddDiagnosis={handleDiagnosisUpdate}
      />

      {/* Detailed Diagnosis */}
      <label htmlFor="detailed_diagnosis" className="my-2">
        Detailed Diagnosis <span className="text-red-500">*</span>
      </label>
      <Controller
        name="detailed_diagnosis"
        control={control}
        rules={{ required: "Detailed Diagnosis is required" }}
        render={({ field }) => (
          <>
            <TextArea
              rows={4}
              placeholder="Enter detailed diagnosis here"
              {...field}
            />
            {errors.detailed_diagnosis?.message && (
              <span className="text-red-500">{String(errors.detailed_diagnosis.message)}</span>
            )}
          </>
        )}
      />

      {/* Medications */}
      <MedicationsEntry
        control={control}
        medications={medications}
        onAddMedication={handleMedicationsUpdate}
      />

      {/* Procedures */}
      <ProceduresEntry
        control={control}
        procedures={procedures}
        onAddProcedure={handleProceduresUpdate}
      />

      {/* Special Note */}
      <label htmlFor="special_note" className="my-2">
        Special Note <span className="text-red-500">*</span>
      </label>
      <Controller
        name="special_note"
        control={control}
        rules={{ required: "Special Note is required" }}
        render={({ field }) => (
          <>
            <TextArea
              rows={4}
              placeholder="Enter special note for the patient"
              {...field}
            />
            {errors.special_note?.message && (
              <span className="text-red-500">{String(errors.special_note.message)}</span>
            )}
          </>
        )}
      />

      {/* Lab reports */}
      <div className="flex items-center">
        <span className="font-bold">Lab Report(s)</span>
        <Switch
          className="ml-2"
          checked={showLabReports}
          onChange={(checked) => setShowLabReports(checked)}
          defaultChecked
        />
      </div>
      {showLabReports && (
        <LabReportsEntry
          control={control}
          labReports={labReports}
          onAddLabReport={handleLabReportsUpdate}
        />
      )}

      {/* Submit and Discard Buttons */}
      <div className="grid justify-items-end text-[#FFFFFF] m-4">
        <div>
          <button type="button" className="bg-[#868686] p-3 w-64 mr-4 rounded-[16px]">
            Discard
          </button>
          <button
            type="submit"
            className="bg-[#FF7300] p-3 w-56 rounded-[16px]"
          >
            Continue
          </button>
        </div>
      </div>
    </form>
  );
};

export default PatientRecordEntryForm;
