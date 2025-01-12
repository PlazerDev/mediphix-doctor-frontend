/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQueryClient, useQuery } from "@tanstack/react-query";
import axios, { AxiosRequestConfig } from "axios";
import TokenService from "./TokenService";

export const useDataFetchService = (key: string ,endpoint : string) => {
 
  const access_token = TokenService.getToken();

  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  };

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  // Try to get data from the cache

    const queryClient = useQueryClient();
    const data = queryClient.getQueryData([key, backendURL, config]);
    if (data){
      return data;
    }
    else{
      useQuery({
        queryKey: [key,  backendURL , config ],
        queryFn: async () => {
          const response = await axios.get(`${backendURL}${endpoint}`, config);
          console.log("response: ", response.data);
          if (response.status === 200) {
            return response.data 
          }
          throw new Error('Failed to fetch  data');
        }
      });
    }
  
};
