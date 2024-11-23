import { Breadcrumb } from "antd";
import PatientConsultationDataEntry from "./PatientConsultationDataEntry";
import SessionList from "./SessionList";
import { useState } from "react";
import PatientRecord from "./PatientRecord";
import ReviewRecordMessage from "./ReviewRecordMessage";

const OngoingSession = () => {
  const [formData, setFormData] = useState(null);

  const [patientData, setPatientData] = useState({
    name: "Vishwa Sandaruwan",
    age: 23,
    sex: "Male",
    nationality: "LK",
  });
  const [appointmentData, setAppointmentData] = useState({
    refNumber: "REF_1525",
    date: "2024/12/04",
    timeSlot: "03.00 PM - 04.00 PM",
    medicalCenter: "Nawaloka Hospital",
    doctor: "Dr.V.V.Alwis",
    appointCatergory: "OPD",
    queueNo: "03",
    startTime: "03.27 PM",
    paymentStatus: "Done",
  });

  const handleFormSubmit = (data: any) => {
    setFormData(data);
  };

  return (
    <>
      <div>
        <p className="text-xl font-bold ml-[1%] mt-[1%]">
          Ongoing Session Portal | At Nawaloka Hospital | Time Frame 03.00 PM -
          05.00 PM
        </p>
      </div>
      <div>
        <Breadcrumb
          className="ml-[1%]"
          items={[
            {
              title: "Sessions",
            },
            {
              title: "Ongoing Sessions",
            },
          ]}
        />
      </div>

      {!formData ? (
        <div className="m-4 flex gap-4">
          <SessionList />
          <PatientConsultationDataEntry
            onSubmit={handleFormSubmit}
            patientData={patientData}
            appointmentData={appointmentData}
          />
        </div>
      ) : (
        <>
          <ReviewRecordMessage />
          <PatientRecord
            formData={formData}
            patientData={patientData}
            appointmentData={appointmentData}
          />
        </>
      )}
    </>
  );
};

export default OngoingSession;
