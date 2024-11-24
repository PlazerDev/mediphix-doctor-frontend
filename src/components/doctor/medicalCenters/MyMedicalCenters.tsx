/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import CenterSearchPannel from "./CenterSearchPannel";
import { Breadcrumb, theme } from "antd";
import MyCenterdetailCard from "./MyCenterDetailCard";

import axios, { AxiosRequestConfig } from "axios";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { MedicalCenterService } from "../../../services/MedicalCenterService";
import Loading from "../../Loading";

import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";


interface Center {
  name: string;
  address: string;
  appointmentCategory: string[];
  description: string;
  phoneNo: string;
}
const backendURL = import.meta.env.VITE_BACKEND_URL;


interface TokenData {
  access_token: string;
}

const MyMedicalCenters = () => {

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

  const {
    data: myMedicalCenters,
    isError,
    isLoading,
} = useQuery({
    queryKey: ["mymedicalcenters", backendURL, config],
    queryFn: () => MedicalCenterService.getMyMedicalCenterData(backendURL, config),
    staleTime: 200000,
});

if (isLoading) {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-transparent">
      <Loading footer={false} />
    </div>
  );
}
console.log(myMedicalCenters);

 

  return (
    <>
      <div>
        <p className="text-xl font-bold ml-[1%] mt-[1%]">My Medical Centers</p>
      </div>
      <div>
        <Breadcrumb
          className="ml-[1%]"
          items={[
            {
              title: "Medical Center",
            },
            {
              title: <a href="">My Medical Centers</a>,
            },
          ]}
        />
      </div>
      {/* Added a button for the vacancy */}
      <Link
        className="mx-4 mt-4  flex flex-row justify-start"
        to={"/doctor/medicalcenters/mymedicalcenters/vacancies"}
      >
        <p className="flex items-center gap-4 text-mediphix_card_background bg-mediphix_accent px-4 py-2 rounded-lg hover:cursor-pointer hover:bg-[#ff8b2d]">
          Checkout Vacancies
          <FaArrowRightLong />
        </p>
      </Link>
      <CenterSearchPannel />
      <div>
        {myMedicalCenters?.map((list, index) => (
          <div key={index}>
            <MyCenterdetailCard appointmentCategory={[list.appointmentCategories]} 
            description={list.specialNotes} 
            phoneNo={list.mobile} 
            name={list.name}
            address={list.address}/>
          </div>
        ))}
      </div>
    </>
  );
};

export default MyMedicalCenters;
