/* eslint-disable @typescript-eslint/no-explicit-any */
import { Breadcrumb } from "antd";
import PatientConsultationDataEntry from "./PatientConsultationDataEntry";
import SessionList from "./SessionList";
import { useEffect, useState } from "react";
import PatientRecord from "./PatientRecord";
import ReviewRecordMessage from "./ReviewRecordMessage";
import axios, { AxiosRequestConfig } from "axios";
import TokenService from "../../../../services/TokenService";
import Loading from "../../../Loading";

const OngoingSession = () => {
  const [formData, setFormData] = useState(null);
  const [currentRefNo, setCurrentRefNo] = useState("");
  const [appointmentDetails, setAppointmentDetails] = useState([]);
  const [startTimeStamp, setStartTimeStamp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [patientData, setPatientData] = useState({
  });
  const [appointmentData, setAppointmentData] = useState({
  });
  function getCurrentDateTimeInFormat(): string {
    const date = new Date();

    // Format the date components
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const milliseconds = String(date.getMilliseconds()).padStart(2, "0");

    // Get timezone offset in hours and minutes
    const timezoneOffset = -date.getTimezoneOffset();
    const offsetHours = String(Math.floor(timezoneOffset / 60)).padStart(
      2,
      "0"
    );
    const offsetMinutes = String(Math.abs(timezoneOffset % 60)).padStart(
      2,
      "0"
    );
    const timezoneSign = timezoneOffset >= 0 ? "+" : "-";

    // Combine into the desired format
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}${timezoneSign}${offsetHours}:${offsetMinutes}`;
  }

  const access_token: string = TokenService.getToken();
  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  };

  const mapAppointments = (appointments: [], queueOperations) => {
    return appointments.map((appointment, index) => {
      let status = "waiting";

      if (queueOperations.finished.includes(index + 1)) {
        status = "previous";
      } else if (queueOperations.ongoing === index + 1) {
        status = "current";
      } else {
        status = "upnext";
      }

      return {
        refNo: appointment,
        status: status,
        queueNo: index + 1,
      };
    });
  };

  const fetchPatientDetails = async (currentRefNo: string) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:9000/mca/getPatientDetailsForOngoingSessions/${currentRefNo}`,
        config
      );
      const patientDetails = response.data;
      console.log("Fetched Patient Details:", patientDetails);

      // // Update patient and appointment data
      setPatientData({
        name: patientDetails.first_name + " " + patientDetails.last_name,
        age: patientDetails.birthday,
        sex: patientDetails.gender,
        nationality: patientDetails.nationality,
      });
      const startTime = getCurrentDateTimeInFormat();
      setStartTimeStamp(startTime);
    
    } catch (error) {
      console.error("Failed to fetch patient details", error);
    }
    finally {
      setIsLoading(false); // Stop loading after
    }
  };

  const fetchAppointmentDetails = async (currentRefNo: string) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:9000/doctor/getAptDetailsForOngoingSessions/${currentRefNo}`,
        config
      );
      const appointmentDetails = response.data;
      console.log("Fetched Appointment Details:", appointmentDetails);
      setAppointmentData({
        refNumber: appointmentDetails.aptNumber,
        date: "",
        timeSlot: appointmentDetails.timeSlot,
        medicalCenter: appointmentDetails.medicalCenterName,
        doctor: appointmentDetails.doctorName,
        appointCatergory: appointmentDetails.aptCategories,
        queueNo: appointmentDetails.queueNo,
        startTime: getCurrentDateTimeInFormat(),
        paymentStatus: appointmentDetails.payment.isPaid,
      });
    } catch (error) {
      console.error("Failed to fetch appointment details", error);
    }
    finally {
      setIsLoading(false); // Stop loading after completion
    }
  }

  useEffect(() => {
    const fetchQueueData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "http://localhost:9000/mca/getOngoingSessionQueue",
          config
        );
        const data = response.data;
        console.log("Fetched Queue Data:", data);
        const startedTimeSot = data[0].timeSlots.find(
          (timeSlot: any) => timeSlot.status === "STARTED"
        );
        const appointmentsNumbers = startedTimeSot.queue.appointments;
        const queueOprations = startedTimeSot.queue.queueOperations;
        const appoinmentDetailsObj = mapAppointments(
          appointmentsNumbers,
          queueOprations
        );

        console.log("appointmentsNumbers", appoinmentDetailsObj);
        setAppointmentDetails(appoinmentDetailsObj);

        // Get current appointment details
        const currentAppointment = appoinmentDetailsObj.find(
          (appointment: any) => appointment.status === "current"
        );
        if (currentAppointment) {
          setCurrentRefNo(currentAppointment.refNo);
          fetchPatientDetails(currentAppointment.refNo);
          fetchAppointmentDetails(currentAppointment.refNo);
        }
      } catch (error) {
        console.error("Failed to fetch queue data", error);
      }
     finally {
      setIsLoading(false); // Stop loading after completion
      }
    };

    fetchQueueData();


    // const interval = setInterval(fetchQueueData, 60000); // Poll every 60 seconds
    // return () => clearInterval(interval);
    
  }, []);

  const handleFormSubmit = (data: any) => {
    setFormData(data);
    console.log("Form Data", data);
  };

  return (
    <>
      {isLoading && (
        <div className="flex items-center justify-center h-screen w-screen bg-transparent">
        <Loading footer={false} />
      </div>
      )}

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
          <SessionList appointmentDetails={appointmentDetails} />

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
            startTimeStamp={startTimeStamp}
          />
        </>
      )}
    </>
  );
};

export default OngoingSession;
