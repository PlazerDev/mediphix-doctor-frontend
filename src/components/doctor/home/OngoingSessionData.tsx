/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useQuery } from "@tanstack/react-query";
import NoOngoingSession from "./NoOngoingSession";
import Aos from "aos";
import axios from "axios";

function formatSriLankanPhoneNumber(mobile: string): string {
  // Remove non-numeric characters except the leading '+'
  const cleaned = mobile.replace(/[^\d+]/g, '');

  // Check if the number starts with the country code +94 (Sri Lanka)
  if (cleaned.startsWith('+94')) {
    // Remove the country code and format the number to 071-2345678
    const localNumber = cleaned.replace('+94', '0'); // Replace +94 with 0
    return localNumber.replace(/(\d{3})(\d{7})/, '$1-$2'); // Format to 071-2345678
  }

  // If the number does not match expected format, return the original
  return mobile;
}

interface OngoingSessionsessionDataProps {
  sessionData: any[];
  backendURL: string;
  config: any;
}
interface OngoingSessionsessionDataPropssessionData {
  sessionId: string;
  doctorName: string;
  doctorMobile: string;
  medicalcenterId: string;
  medicalcenterName: string;
  medicalcenterMobile: string;
  doctorNote: string;
  medicalCenterNote: string;
  timeSlots: {
    endTime: any;
    patientCount: number;
    startTime: any;
  };
  category: string;
  location: string;
  payment: any;
  sessionDate: string;
  sessionStatus?: string;
}


const OngoingSessionsessionData = (props:OngoingSessionsessionDataProps) => {
  let backendURL = props.backendURL;
  let config = props.config;

  const {
    data: doctorDetails,
    isError,
    isPending,
    error,
  } = useQuery({
    queryKey: ["doctorName", { backendURL }, { config }],
    staleTime: 20000,
    queryFn: async () => {
      const response = await axios.get(
        `${props.backendURL}/doctor/getDoctorDetails`,
        props.config
      );

      if (response.status === 200) {
        // setSessionData(response.data);
        return response.data; // Return the fetched data (doctor's name)
      }
      throw new Error("Failed to fetch doctor data");
    },
  });


  console.log("props here", props);
  const sessionEndDate = new Date(props.sessionData[0].endTimestamp["year"],
    (parseInt(props.sessionData[0].endTimestamp["month"], 10) - 1),
    props.sessionData[0].endTimestamp["day"],
    props.sessionData[0].endTimestamp["hour"],
    props.sessionData[0].endTimestamp["minute"], 0, 0);
    const formattedEndTime = sessionEndDate.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric', // Add leading zero for single-digit minutes
      hour12: true, // Use 12-hour clock
    });
   const sessionStartDate =new Date(props.sessionData[0].startTimestamp["year"],
    (parseInt(props.sessionData[0].startTimestamp["month"], 10) - 1),
    props.sessionData[0].startTimestamp["day"],
    props.sessionData[0].startTimestamp["hour"],
    props.sessionData[0].startTimestamp["minute"], 0, 0);
  const formattedStartTime = sessionStartDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric', // Add leading zero for single-digit minutes
    hour12: true, // Use 12-hour clock
  });
  if (props.sessionData.length === 0) {
    return <NoOngoingSession />;
  }
  else {
    return (
      <>
        <div>
          <p className="text-[#363636] text-left mt-2">

            {props.sessionData[0].doctorName} | {formattedStartTime} - {formattedEndTime}
          </p>
        </div>
        <div className="flex justify-between mt-4">
          <div className="mr-4">
            <p className="text-[#868686] text-sm">Medical Center Name</p>
            <p className="mb-1 text-[#FF7300] underline">{props.sessionData[0].medicalcenterName} </p>
            <p className="text-[#868686] text-sm">Appointment Category</p>
            <p className="mb-1">{props.sessionData[0].category} </p>
          </div>

          <div className="mr-4">
            <p className="text-[#868686] text-sm">Medical Center Mobile Number</p>
            <p className="mb-1">{}</p>
            <p className="text-[#868686] text-sm">Current Appointment Number</p>
            <p className="mb-1">02 ({formattedStartTime} - {formattedEndTime})</p>
          </div>
        </div>
        <div className="flex justify-center items-center mt-4 mr-4">
          <div className="bg-[#FF7300] text-[#FFFFFF] rounded-md p-2 w-fit flex items-center">
            <p className="mx-2">Go to Session Portal </p>
          </div>
        </div>
      </>
    );
  }
};

export default OngoingSessionsessionData;
