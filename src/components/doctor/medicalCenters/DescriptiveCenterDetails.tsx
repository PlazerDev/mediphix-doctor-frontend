/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { BiSolidBadgeCheck } from "react-icons/bi";
import centerImage from "../../../assets/images/medical-center/NawalokaHospitals.jpeg";
import bgimage from "../../../assets/images/medical-center/backgroundDesign.png";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { theme } from "antd";
import Swal from "sweetalert2";
import axios, { AxiosRequestConfig } from "axios";
import TokenService from "../../../services/TokenService";
import { useParams } from "react-router-dom";
import { useDataFetchService } from "../../../services/DataFletchService";
import { DoctorService } from "../../../services/DoctorService";
import Loading from "../../Loading";
import ReactDOM from "react-dom";
import withReactContent from "sweetalert2-react-content";
import { createRoot } from "react-dom/client";
import { CheckCircleOutlined, CheckOutlined } from "@ant-design/icons";




interface Props {
  name: string;
  address: string;
  description: string;
  phoneNo: string;
  registered: boolean;
  profileImage: string;
}
interface TokenData {
  access_token: string;
}

interface Doctor {
  _id: string;
  name: string;
  slmc: string;
  nic: string;
  education: string[];
  mobile: string;
  specialization: string[];
  email: string;
  category?: string[];
  availability: string[];
  verified: boolean;
  patients: string[];
  medical_centers: string[];
  sessions: string[];
  channellings: string[];
  medical_records: string[];
  lab_reports: string[];
  profileImage: string;
  media_storage: string;
}



const backendURL = import.meta.env.VITE_BACKEND_URL;

const DescriptiveCenterDetails =  ({
  name,
  address,
  description,
  phoneNo,
  registered,
  profileImage
}: Props) => {
  
  interface DoctorDetails {
    doctorId :string;
    medicalCenterId : string;
    doctorName :string;
  }
  
 
  const MySwal = withReactContent(Swal);
  const {id} = useParams();
  const access_token = TokenService.getToken();  
  const config: AxiosRequestConfig = {
    headers: {
      // 'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`
    }
  };
  
  const handleRequest = async () => {
    try {
      // Show the loading Swal
      MySwal.fire({
        title: "",
        html: '<div id="swal-loading"></div>', // Placeholder for React component
        showConfirmButton: false,
        allowOutsideClick: false,
        background: "transparent", // Transparent modal background
        customClass: {
          popup: "swal-no-border",
          container: "swal-transparent-bg",
        },
        didOpen: () => {
          const swalContainer = document.getElementById("swal-loading");
          if (swalContainer) {
            const root = createRoot(swalContainer); // Use createRoot for rendering
            root.render(<Loading footer={false} />);
          }
        },
      });
    
      const response = await axios.post(
      
        `${backendURL}/doctor/setDoctorJoinRequest`, // Backend endpoint
        {
          id: id,
        }, // Request body
        config
      );
  
      // Close loading notification
      Swal.close();
  
      // Show success notification
      Swal.fire({
        icon: "success",
        title: "Request Sent",
        text: response.data.message || "Your request to join has been sent successfully!",
      });
    } catch (error: any) {
      // Close loading notification
      Swal.close();
  
      // Show error notification
      Swal.fire({
        icon: "error",
        title: "Request Failed",
        text: error.response?.data?.message || "Failed to send the request.",
      });
    }
  };

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
                  src={profileImage}
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
              
            {registered && <><CheckOutlined /></> }

            {!registered && <button
              className="text-[#FFFFFF]"
              onClick={handleRequest} // Pass the function as a callback
            >
              Request to join
            </button>}
            </div>
          
        </div>
      </div>
    </>
  );
};

export default DescriptiveCenterDetails;


