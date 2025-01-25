import { useMutation } from "@tanstack/react-query";
import { Divider } from "antd";
import axios, { AxiosRequestConfig } from "axios";
import Swal from "sweetalert2";

interface RecordProps {
  formData: any;
  patientData: any;
  appointmentData: any;
  currentRefNo: string;
}

const backendURL = import.meta.env.VITE_BACKEND_URL;
function getCurrentDateTimeInFormat(): string {
  const date = new Date();

  // Format the date components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const milliseconds = String(date.getMilliseconds()).padStart(2, '0');

  // Get timezone offset in hours and minutes
  const timezoneOffset = -date.getTimezoneOffset();
  const offsetHours = String(Math.floor(timezoneOffset / 60)).padStart(2, '0');
  const offsetMinutes = String(Math.abs(timezoneOffset % 60)).padStart(2, '0');
  const timezoneSign = timezoneOffset >= 0 ? '+' : '-';

  // Combine into the desired format
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}${timezoneSign}${offsetHours}:${offsetMinutes}`;
}


interface TokenData {
  access_token: string;
}
const getToken = (): string => {
  const sessionDataString = sessionStorage.getItem(
    "session_data-instance_0-ws3zT_tcti_dAXam7cpJ9eL9rvwa"
  );
  if (!sessionDataString) {
    Swal.fire({
      title: "Error!",
      text: "No session token found. Please log in!",
      icon: "error",
      confirmButtonText: "OK",
    });
    return "";
  }

  try {
    const sessionData: TokenData = JSON.parse(sessionDataString);
    return sessionData.access_token || "";
  } catch {
    Swal.fire({
      title: "Error!",
      text: "Invalid session data. Please log in again.",
      icon: "error",
      confirmButtonText: "OK",
    });
    return "";
  }
};

const PatientRecord = ({
  formData,
  patientData,
  appointmentData,
  currentRefNo,
  startTimeStamp,
}: RecordProps) => {
  const access_token = getToken();

  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  };

  const mutation = useMutation({
    mutationFn: async () => {
      console.log("submit in muration",appointmentData);
      const medicalRecord = {
        aptNumber: currentRefNo,
        startedTimestamp: startTimeStamp,
        endedTimestamp: getCurrentDateTimeInFormat(),
        symptoms: formData.symptoms.length > 0 ? formData.symptoms : undefined,
        diagnosis: formData.diagnosisCategories.length > 0
          ? formData.diagnosisCategories.map((category) => ({
              category,
              description: formData.detailed_diagnosis || "N/A",
            }))
          : undefined,
        treatments: formData.medications.length > 0
          ? formData.medications.map((med) => ({
              medication: med.name,
              description: med.frequency,
              noteToPatient: med.note || undefined,
            }))
          : undefined,
        noteToPatient: formData.special_note || undefined,
        isLabReportRequired: false,
        
      };
    
      console.log("Medical Record Data:", medicalRecord);
      const response = await axios.patch(
        `${backendURL}/doctor/appointments/${currentRefNo}/medicalRecord`,
        medicalRecord,
        config
    );    
      return response.data;
    },
    onSuccess: () => {
      Swal.fire({
        title: "Success!",
        text: "Patient record submitted successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
    },
    onError: (error: any) => {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "An unexpected error occurred.",
        icon: "error",
        confirmButtonText: "OK",
      });
    },
  });

  const handleSubmit = () => {
    console.log("Submitting patient record...",formData);
    mutation.mutate();
  };

  return (
    <>
      <div className="bg-[#FFFFFF] rounded-[16px] py-4 px-8 mx-4">
        <div>
          <h3 className="text-lg mb-3 font-semibold">Appointment Details</h3>
          <div className="grid grid-cols-5 gap-y-2 gap-x-4">
            <div>
              <p className="text-sm text-[#868686]">Reference Number</p>
              <p>{appointmentData.refNumber}</p>
            </div>
            <div>
              <p className="text-sm text-[#868686]">Date</p>
              <p>{appointmentData.date}</p>
            </div>
            <div>
              <p className="text-sm text-[#868686]">Time Slot</p>
              <p>{appointmentData.timeSlot}</p>
            </div>
            <div>
              <p className="text-sm text-[#868686]">Medical Center</p>
              <p>{appointmentData.medicalCenter}</p>
            </div>
            <div>
              <p className="text-sm text-[#868686]">Doctor</p>
              <p>{appointmentData.doctor}</p>
            </div>

            <div>
              <p className="text-sm text-[#868686]">Appointment Category</p>
              <p>{appointmentData.appointCatergory}</p>
            </div>
            <div>
              <p className="text-sm text-[#868686]">Queue Number</p>
              <p>{appointmentData.queueNo}</p>
            </div>
            <div>
              <p className="text-sm text-[#868686]">Session Start</p>
              <p>{appointmentData.startTime}</p>
            </div>
          </div>
        </div>
        <Divider />
        <div>
          <h3 className="text-lg mb-3 font-semibold">Patient Details</h3>
          <div className="grid grid-cols-5 gap-y-2 gap-x-4">
            <div>
              <p className="text-sm text-[#868686]">Patient Name</p>
              <p>{patientData.name}</p>
            </div>
            <div>
              <p className="text-sm text-[#868686]">Age</p>
              <p>{patientData.age}</p>
            </div>
            <div>
              <p className="text-sm text-[#868686]">Sex</p>
              <p>{patientData.sex}</p>
            </div>
            <div>
              <p className="text-sm text-[#868686]">Nationality</p>
              <p>{patientData.nationality}</p>
            </div>
          </div>
        </div>
        <Divider />
        <div>
          <h3 className="text-lg mb-3 font-semibold">Symptoms</h3>
          <ul className="list-disc custom-disc-color ml-6">
            {" "}
            {formData.symptoms.map((symptom: string, index: number) => (
              <li key={index}>{symptom}</li>
            ))}
          </ul>
        </div>
        <Divider />
        <div>
          <h3 className="text-lg mb-3 font-semibold">Diagnosis</h3>
          <p className="text-sm text-[#868686]">Diagnosis Category</p>
          <p className="py-1 px-4 bg-[#DCDCDC] rounded-[8px] max-w-fit">
            {/* {formData.diagnosisCategories.join(", ")} */}
          </p>
          <p className="text-sm text-[#868686] mt-6">Detailed Diagnosis</p>
          <p>{formData.detailed_diagnosis}</p>
        </div>
        <Divider />
        <div>
          <h3 className="text-lg mb-3 font-semibold">Treatments</h3>
          <p className="text-sm text-[#868686]">Medications</p>
          <ul className="list-disc custom-disc-color ml-6">
            {formData.medications.map(
              (med: { name: string; frequency: string }, index: number) => (
                <li key={index}>
                  {med.name}, {med.frequency}
                </li>
              )
            )}
          </ul>
          <p className="text-sm text-[#868686] mt-6">Procedures</p>
          <ul className="list-disc custom-disc-color  ml-6">
            {formData.procedures.map(
              (proc: { procedure: string }, index: number) => (
                <li key={index}>{proc.procedure}</li>
              )
            )}
          </ul>
        </div>
        <Divider />
        <div>
          <h3 className="text-lg mb-3 font-semibold">Special Note</h3>
          <p>{formData.special_note}</p>
        </div>
        <Divider />
        <div>
          <h3 className="text-lg mb-3 font-semibold">Lab Report Details</h3>
          {formData.labReports?.length > 0 ? (
            formData.labReports.map(
              (
                report: {
                  test_type: string | null;
                  test_name: string | null;
                  priority_level: string | null;
                  note: string | null;
                },
                index: number
              ) => (
                <div key={index} className="border p-4 mb-4 rounded-md">
                  <div className="grid grid-cols-3 gap-y-2 gap-x-4">
                    <div>
                      <p className="text-sm text-[#868686]">Test Type</p>
                      <p>{report.test_type ?? "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#868686]">Test Name</p>
                      <p>{report.test_name ?? "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#868686]">Priority Level</p>
                      <p>{report.priority_level ?? "N/A"}</p>
                    </div>
                  </div>
                  {report.note && (
                    <div className="mt-2">
                      <p className="text-sm text-[#868686]">Note</p>
                      <p>{report.note}</p>
                    </div>
                  )}
                </div>
              )
            )
          ) : (
            <p>No lab reports available.</p>
          )}
        </div>
      </div>
      <div className="grid justify-items-end text-[#FFFFFF] m-4">
        <div>
          <button className="bg-[#868686] p-3 w-64 mr-4 rounded-[16px]">
            Discard
          </button>
          <button
            type="submit"
            className="bg-[#FF7300] p-3 w-56 rounded-[16px]"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default PatientRecord;
