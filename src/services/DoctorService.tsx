import Swal from "sweetalert2";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import ErrorService from "./ErrorService.tsx";
import { NavigateFunction } from "react-router-dom";
import { AlertService } from "./AlertService.tsx";

export interface Doctor {
  _id?: string;
  name: string;
  slmc: string;
  nic: string;
  education: string[];
  mobile: string;
  specialization?: string[];
  email: string;
  category?: string[];
  availability?: string[];
  verified: boolean;
  patients?: string[];
  medical_centers?: string[];
  sessions?: string[];
  channellings?: string[];
  medical_records?: string[];
  lab_reports?: string[];
  profileImage?: string;
  media_storage?: string;
}

export class DoctorService {
  static async getDoctorData(
    backendURL: string,
    config: AxiosRequestConfig
  ): Promise<Doctor | undefined> {
    try {
      const response: AxiosResponse<Doctor> = await axios.get(
        `${backendURL}/doctor/getDoctorDetails`,
        config
      );

      if (response.status === 200) {
        return response.data;
      } else {
        ErrorService.handleError(response); // Handle non-200 status codes
        return undefined; // Return undefined on failure
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      Swal.fire({
        title: "Error!",
        text: "An unexpected error occurred. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return undefined; // Return undefined on error
    }
  }

  // REQ :: create a session vacacncy
  static async regDoctor(
    data: any,
    navigate: NavigateFunction,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  ): Promise<void> {
    const payload: any = {
      name: data.name,
      slmc: data.slmcNumber,
      nic: data.nic,
      education: [data.education],
      mobile: data.mobileNumber,
      specialization: [data.specialization],
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };
    console.log(payload);

    const url = "http://localhost:9000/registration/doctor/registration";

    try {
      await axios.post(url, payload, {
        headers: {
          // "Content-Type": "application/json",
        },
      });
      setIsLoading(false);
      AlertService.showSuccessTimerAlert("Registration Sucessfull", "");
      navigate("/");
    } catch (error: any) {
      setIsLoading(false);
      console.error("Error creating session vacancy:", error);
      AlertService.showErrorTimerAlert("Action Failed!", error);
    }
  }

  // REQ :: GET
  static async getMedicalRcordData(
    getAccessToken: () => Promise<string>,
    setResult: React.Dispatch<any>,
    stopLoading: () => void
  ) {
    try {
      const token = await getAccessToken();
      const response = await axios.get(
        `http://localhost:9000/doctor/medicalrecords`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setResult(response.data);
      console.log(response.data);
      stopLoading();
    } catch (error: any) {
      console.error("Error:", error);
      setResult(null);
      stopLoading();
    }
  }
}
