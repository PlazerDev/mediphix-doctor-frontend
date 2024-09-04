/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import NoOngoingSession from "./NoOngoingSession";

function formatSriLankanPhoneNumber(phoneNumber: string): string {
  // Remove non-numeric characters except the leading '+'
  const cleaned = phoneNumber.replace(/[^\d+]/g, '');

  // Check if the number starts with the country code +94 (Sri Lanka)
  if (cleaned.startsWith('+94')) {
    // Remove the country code and format the number to 071-2345678
    const localNumber = cleaned.replace('+94', '0'); // Replace +94 with 0
    return localNumber.replace(/(\d{3})(\d{7})/, '$1-$2'); // Format to 071-2345678
  }

  // If the number does not match expected format, return the original
  return phoneNumber;
}

interface OngoingSessionDataProps {
  data: OngoingSessionDataPropsData[];
}
interface OngoingSessionDataPropsData {
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


const OngoingSessionData = (props:OngoingSessionDataProps) => {
  console.log("props here", props);
  const sessionEndDate = new Date(props.data[0].timeSlots.endTime["year"],
    (parseInt(props.data[0].timeSlots.endTime["month"], 10) - 1),
    props.data[0].timeSlots.endTime["day"],
    props.data[0].timeSlots.endTime["hour"],
    props.data[0].timeSlots.endTime["minute"], 0, 0);
    const formattedEndTime = sessionEndDate.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric', // Add leading zero for single-digit minutes
      hour12: true, // Use 12-hour clock
    });
   const sessionStartDate =new Date(props.data[0].timeSlots.startTime["year"],
    (parseInt(props.data[0].timeSlots.startTime["month"], 10) - 1),
    props.data[0].timeSlots.startTime["day"],
    props.data[0].timeSlots.startTime["hour"],
    props.data[0].timeSlots.startTime["minute"], 0, 0);
  const formattedStartTime = sessionStartDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric', // Add leading zero for single-digit minutes
    hour12: true, // Use 12-hour clock
  });
  if (props.data.length === 0) {
    return <NoOngoingSession />;
  }
  else {
    return (
      <>
        <div>
          <p className="text-[#363636] text-left mt-2">

            {props.data[0].doctorName} | {formattedStartTime} - {formattedEndTime}
          </p>
        </div>
        <div className="flex justify-between mt-4">
          <div className="mr-4">
            <p className="text-[#868686] text-sm">Medical Center Name</p>
            <p className="mb-1 text-[#FF7300] underline">{props.data[0].medicalcenterName} </p>
            <p className="text-[#868686] text-sm">Appointment Category</p>
            <p className="mb-1">{props.data[0].category} </p>
          </div>

          <div className="mr-4">
            <p className="text-[#868686] text-sm">Medical Center Mobile Number</p>
            <p className="mb-1">{formatSriLankanPhoneNumber(props.data[0].medicalcenterMobile)}</p>
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

export default OngoingSessionData;
