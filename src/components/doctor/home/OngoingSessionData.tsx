/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import NoOngoingSession from "./NoOngoingSession";

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
 
  if (props.data.length === 0) {
    return <NoOngoingSession />;
  }
  else {
    return (
      <>
        <div>
          <p className="text-[#363636] text-left mt-2">

            {props.data[0].doctorName} | {props.data[0].timeSlots.startTime["hour"]}AM -{props.data[0].timeSlots.endTime["hour"]}AM
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
            <p className="mb-1">{props.data[0].medicalcenterMobile}</p>
            <p className="text-[#868686] text-sm">Current Appointment Number</p>
            <p className="mb-1">02 (09.00 AM - 10.00 AM Slot)</p>
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
