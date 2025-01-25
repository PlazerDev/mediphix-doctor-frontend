/* eslint-disable @typescript-eslint/no-explicit-any */
import { Breadcrumb } from "antd";
import PatientConsultationDataEntry from "./PatientConsultationDataEntry";
import SessionList from "./SessionList";
import { useEffect, useState } from "react";
import PatientRecord from "./PatientRecord";
import ReviewRecordMessage from "./ReviewRecordMessage";


const OngoingSession = () => {
  const [formData, setFormData] = useState(null);
  const [currentRefNo, setCurrentRefNo] = useState();
  const [appointmentDetails, setAppointmentDetails] = useState([ ]);
  const [startTimeStamp , setStartTimeStamp] = useState("");
  const [patientData, setPatientData] = useState({
    name: "Vishwa Sandaruwan",
    age: 23,
    sex: "Male",
    nationality: "LK",
  });
  const [appointmentData, setAppointmentData] = useState({
    refNumber: currentRefNo ,
    date: "2024/12/04",
    timeSlot: "03.00 PM - 04.00 PM",
    medicalCenter: "Nawaloka Hospital",
    doctor: "Dr.V.V.Alwis",
    appointCatergory: "OPD",
    queueNo: "03",
    startTime: "03.27 PM",
    paymentStatus: "Done",
  });
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



  const mapAppointments = (appointments:[], queueOperations) => {
    return appointments.map((appointment, index) => {
      let status = "waiting"; 
      
      if (queueOperations.finished.includes(index)) {
        status = "previous";
      } else if (queueOperations.ongoing === index) {
        status = "current";
      } else  {
        status = "upnext";
      }
  
      return {
        refNo: appointment, 
        status: status,
        queueNo: index, 
      };
    });
  };

  const fetchPatientDetails = async (currentRefNo: string) => {
    try {
      const response = await fetch(
        `http://localhost:9000/mca/getPatientDetailsForOngoingSessions/${currentRefNo}`
      );
      const patientDetails = await response.json();
      console.log("Fetched Patient Details:", patientDetails);

      // // Update patient and appointment data
      setPatientData({
        name: patientDetails.first_name + " " + patientDetails.last_name,
        age: patientDetails.birthday,
        sex: patientDetails.gender,
        nationality: patientDetails.nationality ,
      });
      const startTime = getCurrentDateTimeInFormat();
      setStartTimeStamp(startTime);
      // setAppointmentData({
      //   refNumber: currentRefNo,
      //   date: patientDetails.date,
      //   timeSlot: patientDetails.timeSlot,
      //   medicalCenter: patientDetails.medicalCenter,
      //   doctor: patientDetails.doctor,
      //   appointCatergory: patientDetails.category,
      //   queueNo: patientDetails.queueNo,
      //   startTime: patientDetails.startTime,
      //   paymentStatus: patientDetails.paymentStatus,
      // });
    } catch (error) {
      console.error("Failed to fetch patient details", error);
    }
  };
  
  useEffect(() => {
    const fetchQueueData = async () => {
      try {
        const response = await fetch('http://localhost:9000/mca/getOngoingSessionQueue');
        const data = await response.json();
        console.log("Fetched Queue Data:", data);
        const startedTimeSot = data[0].timeSlots.find( (timeSlot: any) => timeSlot.status === "STARTED");
        const appointmentsNumbers  = startedTimeSot.queue.appointments;
        const queueOprations = startedTimeSot.queue.queueOperations;
        const appoinmentDetailsObj = mapAppointments(appointmentsNumbers, queueOprations);
 
        console.log("appointmentsNumbers", appoinmentDetailsObj);
        setAppointmentDetails(appoinmentDetailsObj); 
        
        // Get current appointment details
        const currentAppointment = appoinmentDetailsObj.find(
          (appointment: any) => appointment.status === "current"
        );
        if (currentAppointment) {
          setCurrentRefNo(currentAppointment.refNo);
          fetchPatientDetails(currentAppointment.refNo);
        }
      } catch (error) {
        console.error("Failed to fetch queue data", error);
      }
    };
  
    fetchQueueData();
  
    const interval = setInterval(fetchQueueData, 60000); // Poll every 60 seconds
    return () => clearInterval(interval);
  }, []);

  

  const handleFormSubmit = (data: any) => {
    setFormData(data);
    console.log("Form Data", data);
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
          <SessionList 
          appointmentDetails = {appointmentDetails}/>
          
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
            currentRefNo={currentRefNo}
            startTimeStamp = {startTimeStamp}
          />
        </>
      )}
    </>
  );
};

export default OngoingSession;
