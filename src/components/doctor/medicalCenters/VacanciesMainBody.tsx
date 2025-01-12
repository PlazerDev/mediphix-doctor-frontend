/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useNavigate } from "react-router-dom";
import Loading from "../../Loading";
import axios, { AxiosRequestConfig } from "axios";
import TokenService from "../../../services/TokenService";
import { useQuery } from "@tanstack/react-query";


const backendURL = import.meta.env.VITE_BACKEND_URL;

const access_token = TokenService.getToken();  
const config: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${access_token}`
  }
};


function VacanciesMainBody() {
  const { data: vacancyDataList, isLoading, isError } = useQuery({
    queryKey: ["vacancies", backendURL, config],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:9000/doctor/sessionVacancies`,
        config
      );
      console.log("response: ", response.data);
      if (response.status === 200) {
        return response.data;
      }
      throw new Error("Failed to fetch data");
    },
  });

  const navigate = useNavigate(); 

  const handleNavigation = (vacancy: any) => {
    console.log("vacancy: ", vacancy.openSessions);
    navigate(`/doctor/medicalcenters/mymedicalcenters/vacancies/${vacancy._id}`, {
      state: { openSessions: vacancy.openSessions || [] ,
                mobile: vacancy.mobile ,
                vacancyNoteToDoctors : vacancy.vacancyNoteToDoctors ,
                aptCategories : vacancy.aptCategories ,
           },
    });
  };

  if (isLoading) {
    return <Loading footer={false} />;
  }
  if (isError) {
    return <h1>Error</h1>;
  }

  return (
    <div className="flex flex-wrap mx-4 mt-4 gap-4 mb-8">
      {vacancyDataList.map((vacancy: any) => (
        <div
          key={vacancy._id} 
          className="bg-mediphix_card_background p-8 rounded-lg flex justify-start items-center gap-4 w-[350px] hover:cursor-pointer hover:shadow-md"
          onClick={() => handleNavigation(vacancy)} 
        >
          <img src={vacancy.profileImage} alt="center" className="w-16 h-16" />
          <div className="flex flex-col gap-1">
            <div>
              <p className="text-sm text-mediphix_text_c">Name</p>
              <p>{vacancy.centerName}</p>
            </div>
            <div>
              <p className="text-sm text-mediphix_text_c">Appointment Categories</p>
              <p>{vacancy.aptCategories.join(", ")}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default VacanciesMainBody;



