/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { BiSolidBadgeCheck } from "react-icons/bi";
import centerImage from "../../../assets/images/medical-center/NawalokaHospitals.jpeg";
import bgimage from "../../../assets/images/medical-center/backgroundDesign.png";
import { useQueryClient } from "@tanstack/react-query";
import { theme } from "antd";
import Swal from "sweetalert2";
import axios, { AxiosRequestConfig } from "axios";
import TokenService from "../../../services/TokenService";


interface Props {
  name: string;
  address: string;
  description: string;
  phoneNo: string;
}
interface TokenData {
  access_token: string;
}

const backendURL = import.meta.env.VITE_BACKEND_URL;

const DescriptiveCenterDetails = ({
  name,
  address,
  description,
  phoneNo,
}: Props) => {
  
 

  const access_token = TokenService.getToken();

  const config: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`
    }
  };


  const queryClient = useQueryClient();
  console.log("cash :",queryClient.getQueryData(["medicalcenter", backendURL, config]));
  
  return (
    <>
      <div className="bg-[#ffffff] rounded-[16px] m-4 ">
        <div className="flex bg-[#FF7300] w-full h-24 rounded-t-[16px]">
          <div className="w-1/2"></div>
          <div
            className="w-1/2 bgimage bg-none bg-center bg-cover rounded-tr-[16px]"
            style={{ backgroundImage: `url(${bgimage})` }}
          ></div>
        </div>
        <div className="px-10 pt-10 pb-4">
          <div className="flex gap-x-20 ">
            <div className="min-w-max">
              <div className="z-[500]">
                <img
                  src={centerImage}
                  className="w-36 h-36 rounded-[16px] object-scale-down absolute top-[200px] z-2"
                />
              </div>
              <div className="flex mt-12 text-lg">
                <h6 className=" font-semibold">{name}</h6>
                <BiSolidBadgeCheck className="text-[#FF7300] mt-1 ml-1" />
              </div>
            </div>
            <div className=" ">
              <div className="flex flex-col gap-y-4">
                <div className="w-fit">
                  <h6 className="text-sm text-[#868686]">Location</h6>
                  <p>{address}</p>
                </div>
                <div>
                  <h6 className="text-sm text-[#868686]">
                    Receptionist Contact Number
                  </h6>
                  <p>{phoneNo}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="text-justify mt-4">
            <h6 className="text-sm text-[#868686]">Description</h6>
            <p>{description}</p>
          </div>
        
            <div className="bg-[#FF7300] text-[#FFFFFF] rounded-md p-2 w-fit flex items-center mt-4">
              <p className="text-[#FFFFFF]">Request to join</p>
            </div>
          
        </div>
      </div>
    </>
  );
};

export default DescriptiveCenterDetails;
