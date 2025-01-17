/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
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

interface DoctorTimeSlotsProps {
  data: Session;
}
export interface Session {
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
const DoctorTimeSlots = (props: DoctorTimeSlotsProps) => {
  const year = props.data.timeSlots.startTime["year"];
  const month = parseInt(props.data.timeSlots.startTime["month"], 10) - 1;
  const day = props.data.timeSlots.startTime["day"];
  const hours = props.data.timeSlots.startTime["hour"];
  const minutes = props.data.timeSlots.startTime["minute"];
  const sessionDate = new Date(year, month, day, hours, minutes, 0, 0);
  const formattedStartTime = sessionDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric', // Add leading zero for single-digit minutes
    hour12: true, // Use 12-hour clock
  });

  const sessionEndDate = new Date(props.data.timeSlots.endTime["year"],
    (parseInt(props.data.timeSlots.endTime["month"], 10) - 1),
    props.data.timeSlots.endTime["day"],
    props.data.timeSlots.endTime["hour"],
    props.data.timeSlots.endTime["minute"], 0, 0);
    const formattedEndTime = sessionEndDate.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric', // Add leading zero for single-digit minutes
      hour12: true, // Use 12-hour clock
    });
  
  


  return (
    <div className="bg-[#DCDCDC] w-full rounded-[16px] my-2">
      <div className="text-[#363636] p-4">
        <p className="text-base font-semibold">
          {sessionDate.getFullYear()}/{sessionDate.toLocaleString('default',
            { month: 'long' })}/{sessionDate.getDay()} | {formattedStartTime} - {formattedEndTime}
        </p>
      </div>

      <div className="grid grid-cols-3 ml-4 mb-4">
        <div>
          <p className="text-sm text-[#868686]">Medical Center Name</p>
          <p className="text-base text-[#FF7300] underline mb-4">{props.data.medicalcenterName}</p>
        </div>
        <div>
          <p className="text-sm text-[#868686]">Medical Center Mobile Number</p>
          <p className="text-base text-[black] mb-4">{formatSriLankanPhoneNumber(props.data.medicalcenterMobile)}</p>
        </div>
        <div>
          <p className="text-sm text-[#868686]">Appointment Category</p>
          <p className="text-base text-[black] mb-4">{props.data.category}</p>
        </div>
      </div>

    </div>
  );
};

export default DoctorTimeSlots;
