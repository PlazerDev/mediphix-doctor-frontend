/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import CenterSearchPannel from "./CenterSearchPannel";
import { Breadcrumb, theme } from "antd";
import AllCenterDetailCard from "./AllCenterDetailCard";
import axios, { AxiosRequestConfig } from "axios";
import Swal from "sweetalert2";
import Loading from "../../Loading";


interface Center {
  name: string;
  address: string;
  appointmentCategory: string[];
  noOfDoctors: number;
  description: string;
  phoneNo: string;
}

const backendURL = import.meta.env.VITE_BACKEND_URL;
let count:number = 0;

interface TokenData {
  access_token: string;
}

const AllMedicalCenters = () => {
  const [centerList, setCenterList] = useState<Center[]>([
  ]);
  const [loading, setLoading] = useState<boolean>(true);
  const { token } = theme.useToken();
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
  const config: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`
    }
  };

  

  const getAllMedicalCenters = async () => {
 
    try {
      console.log("Getting all medical centers");
      const response = await axios.get(`${backendURL}/doctor/getAllMedicalCenters`,config);
      console.log("Post created:", response);
      response.data.forEach((center: any) => {
        setCenterList((prev) => [...prev, {
          name: center.name,
          address: center.address,
          appointmentCategory: center.appointmentCategories || [],
          noOfDoctors: center.doctors ? center.doctors.length : 0,
          description: center.specialNotes || "No description available",
          phoneNo: center.mobile || "No phone number available"
        }]);
      });
      // return response.data;
    } catch (error) {
      console.error("Error creating post:", error);
    }
    finally{
      setLoading(false);
    }
  }

  
  useEffect(() => {
      getAllMedicalCenters();
      

  
  },[]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-transparent">
        <Loading footer={false} />
      </div>
    );
  }
  
  return (
    <>
    
      <div>
        
        <p className="text-xl font-bold ml-[1%] mt-[1%]">All Medical Centers</p>
      </div>
      <div>
        <Breadcrumb
          className="ml-[1%]"
          items={[
            {
              title: "Medical Center",
            },
            {
              title: <a href="">All Medical Centers</a>,
            },
          ]}
        />
      </div>
      <CenterSearchPannel />
      
      <div>
        {centerList.map((list, index) => (
          <div key={index} >
            <AllCenterDetailCard {...list} />
          </div>
        ))}
      </div>
    </>
  );
};

export default AllMedicalCenters;
