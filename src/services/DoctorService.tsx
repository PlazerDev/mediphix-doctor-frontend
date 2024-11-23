import Swal from "sweetalert2";
import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import ErrorService from "./ErrorService.tsx";

interface Doctor {
     name: string;
     slmc: string;
     nic: string;
     education: string[];
     mobile: string;
     specialization?: string[];
     email: string;
     password: string;
     confirmPassword: string;
}


export class DoctorService {
    static async getDoctorData(
        backendURL: string,
        config: AxiosRequestConfig
    ): Promise<Doctor | undefined> {
        try {
            const response: AxiosResponse<Doctor> = await axios.get(
                `${backendURL}/doctor/doctordata`,
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