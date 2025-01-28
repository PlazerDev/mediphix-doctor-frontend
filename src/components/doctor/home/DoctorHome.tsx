/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Footer from "./../../Footer";
import DoctorTimeSlots, { Session } from "./DoctorTimeSlots";
//import NoOngoingSession from "./NoOngoingSession";
import OngoingSessionData from "./OngoingSessionData";
import { Calendar, theme } from "antd";
import type { CalendarProps } from "antd";
import type { Dayjs } from "dayjs";
import "./SessionCounts.css";
import bgimage from "../../../assets/images/home/sessionCount.png";
import axios, { AxiosRequestConfig } from "axios";
import Swal from 'sweetalert2';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Loading from "../../Loading";
import { SessionData } from "@asgardeo/auth-react";
import DoctorHomeCalender from "./DoctorHomeCalender";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);
const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>["mode"]) => {

}
// Function to get the week number of the year
function getWeekNumber(date: Date): number {
  // Copying date so the original date won't be modified
  const tempDate = new Date(date.valueOf());

  // ISO week date weeks start on Monday, so correct the day number
  const dayNum = (date.getDay() + 6) % 7;

  // Set the target to the nearest Thursday (current date + 4 - current day number)
  tempDate.setDate(tempDate.getDate() - dayNum + 3);

  // ISO 8601 week number of the year for this date
  const firstThursday = tempDate.valueOf();

  // Set the target to the first day of the year
  // First set the target to January 1st
  tempDate.setMonth(0, 1);

  // If this is not a Thursday, set the target to the next Thursday
  if (tempDate.getDay() !== 4) {
    tempDate.setMonth(0, 1 + ((4 - tempDate.getDay()) + 7) % 7);
  }

  // The weeknumber is the number of weeks between the first Thursday of the year
  // and the Thursday in the target week
  return 1 + Math.ceil((firstThursday - tempDate.valueOf()) / 604800000); // 604800000 = number of milliseconds in a week
}



const backendURL = import.meta.env.VITE_BACKEND_URL;

interface TokenData {
  access_token: string;
}




const DoctorHome = () => {
  const { token } = theme.useToken();
  const [sessionData, setSessionData] = useState<Session[]>([]);
  let access_token: string = "";

  function getToken(): string {
    const sessionDataString: string | null = sessionStorage.getItem('session_data-instance_0-ws3zT_tcti_dAXam7cpJ9eL9rvwa');

    if (!sessionDataString) {
      Swal.fire({
        title: 'Error!',
        text: 'No session token found. Please login!',
        icon: 'error',
        confirmButtonText: 'OK',
      })
      return "";
    }

    try {
      const sessionData: TokenData = JSON.parse(sessionDataString);
      access_token = sessionData.access_token;
      if (access_token == "") {
        throw new Error("Access token not found in session data");
      }
      return access_token;
    } catch (parseError) {
      Swal.fire({
        title: 'Error!',
        text: "Invalid session data please login again.",
        icon: "error",
        confirmButtonText: 'OK'
      })
      return "";
    }
  }

  access_token = getToken();
  // console.log("access_token: ", access_token);



  const config: AxiosRequestConfig = {
    headers: {
      // 'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`
    }
  };

  const wrapperStyle: React.CSSProperties = {
    width: "100%",
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };
    const { data: sessionDetails, isError, isPending, error } = useQuery({
      queryKey: ["sessionDetails", { backendURL }, { config }],
      staleTime: 20000,
      queryFn: async () => {

        const response = await axios.get(`${backendURL}/doctor/getSessionDetailsForDoctorHome`, config);
    
        if (response.status === 200) {
          return response.data; 
        }
        throw new Error('Failed to fetch doctor data');
      }
      
    });

    console.log("sessionDetails: ", sessionDetails);



// Sample Response Data


function getSessionCounts(sessions: any[]) {
  const now = dayjs();
  console.log("now: ", now);

  // Calculate date ranges
  const yesterday = now.subtract(1, "day").startOf("day");
  const startOfWeek = now.startOf("week");
  const endOfWeek = now.endOf("week");
  const startOfMonth = now.startOf("month");

  // // Filter Sessions
  // const sessionsYesterday = sessions.filter((session) =>
  //   dayjs(`${session.startTimestamp.year}-${session.startTimestamp.month}-${session.startTimestamp.day}`).isSame(yesterday, "day")
  // );

  

  // const sessionsThisWeek = sessions.filter((session) =>
  //   dayjs(`${session.startTimestamp.year}-${session.startTimestamp.month}-${session.startTimestamp.day}`).isBetween(startOfWeek, endOfWeek, "day", "[]")
  // );

  // const sessionsThisMonth = sessions.filter((session) =>
  //   dayjs(`${session.startTimestamp.year}-${session.startTimestamp.month}-${session.startTimestamp.day}`).isSame(now, "month")
  // );

  // // Return Counts
  return {
  //   yesterday: sessionsYesterday.length,
  //   thisWeek: sessionsThisWeek.length,
  //   thisMonth: sessionsThisMonth.length,
    thisMonth: 1,
  };
}

// console.log(getSessionCounts(response));


  return (
  
    <>
      <div className="mt-2 ml-4">
        <p className="font-Roboto font-[700] text-xl text-[#151515]">

          {<GetDoctorName config={config} />}

        </p>
        <p className="mb-6">We hope you're having a great day.</p>
      </div>

      <div className="flex">
        <div className="w-2/3 bg-[#E3E3E3] flex-grow mr-4">
          <div className=" h-full  ml-4 p-4 bg-[#ffffff] rounded-[16px]">
            <div className=" flex justify-between">
              <div>
                <h1 className="text-lg font-bold">My Schedule </h1>
              </div>

              <div className="mt-1">
                <p className="text-[#FF7300] text-sm font-semibold">
                  View More
                </p>
              </div>
            </div>
            <div className="m-4">
              <div style={wrapperStyle}>
                <Calendar fullscreen={false} onPanelChange={onPanelChange} />
                {/* <DoctorHomeCalender data={sessionData} /> */}
              </div>
            </div>
            {sessionData.map((session, index) => (
              <DoctorTimeSlots key={session.sessionId} data={session} />

            ))}

          </div>
        </div>
        <div></div>

        <div className="flex flex-col w-1/3">
          <div className=" bg-[#fff] rounded-[16px] p-4 mr-4">
            <div className=" flex justify-between">
              <div>
                <h1 className="text-lg font-bold">Ongoing Session</h1>
              </div>

              <div className="mt-1">
                <p className="text-[#FF7300] text-sm font-semibold">
                  View More
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center bg-contain">
              {/* {sessionDetails ? 
                <OngoingSessionData
                  data={formatSessionData(sessionDetails)}
                /> : null
              } */}
            </div>

          </div>
          <div className=" bg-[#fff] rounded-[16px] p-4 mr-4 mt-4">
            <div className=" flex justify-between">
              <div>
                <h1 className="text-lg font-bold">My Medical Centers</h1>
              </div>

              <div className="mt-1">
                <p className="text-[#FF7300] text-sm font-semibold">
                  View More
                </p>
              </div>
            </div>
            <div className="mt-2">
              <p>
                You have 00 new requests from your medical centers for new time
                frames.
              </p>
            </div>
          </div>
          <div className="flex justify-between mt-4 h-full">
            <div className="bg-[#fff] flex flex-col  justify-center rounded-[16px] h-full">
              <div className="flex flex-col">
                <div className="p-6 text-center">
                  <p>Sessions Yesterday</p>
                  <h1 className="text-center text-[28px] ">

                  {/* {sessionDetails ? getSessionCounts(sessionDetails).yesterday : null} */}

                  </h1>
                </div>
              </div>
            </div>
            <div className="bg-[#fff] flex flex-col  justify-center rounded-[16px] h-full mx-3">
              {/* <div
                className="flex bgimage  bg-contain bg-no-repeat bg-right"
                style={{ backgroundImage: `url(${bgimage})` }}
              > */}
              <div className="flex flex-col">
                <div className="p-6 text-center">
                  <p>Sessions This Week</p>
                  <h1 className="text-center text-[28px] ">

                  {/* {sessionDetails ? getSessionCounts(sessionDetails).thisWeek : null} */}

                  </h1>
                </div>
              </div>
            </div>
            <div className="bg-[#fff] flex flex-col  justify-center rounded-[16px] h-full mr-4">
              <div className="flex flex-col">
                <div className="p-6 text-center">
                  <p>Sessions This Month</p>
                  <h1 className="text-center text-[28px] ">
                  {sessionDetails ? getSessionCounts(sessionDetails).thisMonth : null}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};


function GetDoctorName({ config }: { config: any }) {
  const { data: doctorDetails, isError, isPending, error } = useQuery({
    queryKey: ["doctorName", { backendURL }, { config }],
    staleTime: 20000,
    queryFn: async () => {
 
      const response = await axios.get(`${backendURL}/doctor/getDoctorDetails`, config);
  
      if (response.status === 200) {
        // setSessionData(response.data);
        return response.data; // Return the fetched data (doctor's name)
      }
      throw new Error('Failed to fetch doctor data');
    }
    
  });

  if (isPending) return <Loading footer={false} />;
  if (isError) return <div>An error has occurred: {error?.message}</div>;

  return (
    <div>
      Good Evening, Dr. {doctorDetails.name}
    </div>
  );
}


function formatSessionData(response: any[]) {
  return response.map((session) => ({
    sessionId: session._id,
    doctorName: "Dr. " + session.doctorId, // You may want to fetch the actual doctor data
    doctorMobile: session.doctorId, // Replace with actual doctor mobile if available
    medicalcenterId: session.medicalCenterId,
    medicalcenterName: session.medicalcenterName,
    medicalcenterMobile: session.medicalcenterMobile,
    doctorNote: session.noteFromDoctor,
    medicalCenterNote: session.noteFromCenter,
    timeSlots: session.timeSlots.map((slot: any) => ({
      startTime: slot.startTime,
      endTime: slot.status === 'STARTED' ? slot.startTime : '', // Adjust endTime logic as needed
      patientCount: slot.queue.appointments.length,
    })),
    category: session.aptCategories.join(', '), // Concatenate categories if there are multiple
    location: session.hallNumber,
    payment: session.payment,
    sessionDate: `${session.startTimestamp.year}-${session.startTimestamp.month}-${session.startTimestamp.day}`,
    sessionStatus: session.overallSessionStatus,
  }));
}



export default DoctorHome;


