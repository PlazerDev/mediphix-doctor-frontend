/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Footer from "./../../Footer";
import DoctorTimeSlots from "./DoctorTimeSlots";
//import NoOngoingSession from "./NoOngoingSession";
import OngoingSessionData from "./OngoingSessionData";
import { Calendar, theme } from "antd";
import type { CalendarProps } from "antd";
import type { Dayjs } from "dayjs";
import "./SessionCounts.css";
import bgimage from "../../../assets/images/home/sessionCount.png";
import axios, { AxiosRequestConfig } from "axios";
import Swal from 'sweetalert2';
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Loading from "../../Loading";
import { SessionData } from "@asgardeo/auth-react";

const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>["mode"]) => {
  console.log(value.format("YYYY-MM-DD"), mode);
};
interface Session {
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
  sessionStatus: string;
}

// State initialization using an array of Session




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

  console.log("Access token: " + access_token);

  // if (access_token == "") {
  //
  // }

  const config: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`
    }
  };

  console.log("before queryConfig: ", config);


  const {
    data: sessionDataFromQuery,
    isError,
    isPending,
    error
  } = useQuery({
    queryKey: ["patient", { backendURL }, { config }],
    staleTime: 20000,
    queryFn: async () => {
      console.log("Fetching patient data...");

      try {
        // Fetch data using axios, specifying the response type
        const response = await axios.get<Session[]>(`${backendURL}/doctor/getSessionDetails?mobile=0769418929`, config);

        if (response.status === 200) {
          console.log("response.data: ", response.data);

          // Set session data in state
          setSessionData(response.data);

          // Return data from the function
          return response.data;
        }
      } catch (error: any) {
        // Handle different HTTP status errors
        if (error.response) {
          switch (error.response.status) {
            case 401:
              Swal.fire({
                title: 'Error!',
                text: 'Unauthorized, please login again (401).',
                icon: 'error',
                confirmButtonText: 'OK',
              });
              break;
            case 403:
              Swal.fire({
                title: 'Error!',
                text: 'You do not have access to the patient dashboard, please login via the correct portal (403).',
                icon: 'error',
                confirmButtonText: 'OK',
              });
              break;
            case 404:
              Swal.fire({
                title: 'Error!',
                text: 'Patient not found (404).',
                icon: 'error',
                confirmButtonText: 'OK',
              });
              break;
            case 500:
              Swal.fire({
                title: 'Error!',
                text: 'Internal server error (500). Please try again later.',
                icon: 'error',
                confirmButtonText: 'OK',
              });
              break;
            default:
              Swal.fire({
                title: 'Error!',
                text: `Unexpected error occurred (status code: ${error.response.status}).`,
                icon: 'error',
                confirmButtonText: 'OK',
              });
              break;
          }
        } else {
          // General error handler for network or other unexpected errors
          console.error('An unexpected error occurred:', error);
          Swal.fire({
            title: 'Error!',
            text: 'An unexpected error occurred. Please try again later.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      }
    },
  });

  console.log("after queryConfig: ", config);
  console.log("sessionData: ", sessionData);


  const wrapperStyle: React.CSSProperties = {
    width: "100%",
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };
  return (
    <>
      <div className="mt-2 ml-4">
        <p className="font-Roboto font-[700] text-xl text-[#151515]">
          Good Evening , Dr. V. { }
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
              {isPending ? <Loading footer={false} /> :
                <OngoingSessionData
                  data={sessionData.filter(session => {
                    if (session.sessionStatus === "ONGOING") {
                      return true;
                    }
                  })}
                />
              }
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
                  <h1 className="text-center text-[28px] ">23</h1>
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
                  <h1 className="text-center text-[28px] ">23</h1>
                </div>
              </div>
            </div>
            <div className="bg-[#fff] flex flex-col  justify-center rounded-[16px] h-full mr-4">
              <div className="flex flex-col">
                <div className="p-6 text-center">
                  <p>Sessions This Month</p>
                  <h1 className="text-center text-[28px] ">23</h1>
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

export default DoctorHome;
