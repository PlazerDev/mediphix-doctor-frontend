/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import Swal from "sweetalert2";
import ErrorService from "./ErrorService";

interface MedicalCenter {
    _id: string,
    name: string,
    address: string,
    mobile: string,
    email: string,
    district: string,
    verified: boolean,
    appointmentCategories: string,
    mediaStorage: any,
    specialNotes: any,
    doctors: string [],
    appointments: any,
    patients: string,
    medicalCenterStaff: string,
    fee: any
}

export class MedicalCenterService {
    static async getMedicalCenterData(
        backendURL: string,
        config: AxiosRequestConfig
    ): Promise<MedicalCenter[] | undefined> {
        try {
            const response: AxiosResponse<MedicalCenter[]> = await axios.get(
                `${backendURL}/doctor/getAllMedicalCenters`,
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

    static async getMyMedicalCenterData(
        backendURL: string,
        config: AxiosRequestConfig
    ): Promise<MedicalCenter[] | undefined> {
        try {
            const response: AxiosResponse<MedicalCenter[]> = await axios.get(
                `${backendURL}/doctor/getMyMedicalCenters`,
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
}