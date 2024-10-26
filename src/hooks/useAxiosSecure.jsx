import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "https://quick-bite-server-1.onrender.com",
});

const useAxiosSecure = () => {
  const navigate = useNavigate;
  const { logOut } = useAuth;

  // Add a request interceptor
  axiosSecure.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      const token = localStorage.getItem("access-token");
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    async (error) => {
      // Do something with request error
      const status = error.response.status 
    
      if(status === 401 || status === 403){
        await logOut()
        navigate("/login")
      }
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  axiosSecure.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
