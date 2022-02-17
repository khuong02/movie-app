import axios from "axios";
import queryString from "query-string";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => {
    return queryString.stringify(params);
  },
});

axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  //   const token = await getToken();
  //   console.log("result: " + token);
  //   if (token) {
  //     config.headers.Authorization = `Bearer ${token}`;
  //   }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    // console.log(response);
    // if (response && response.data) {
    //   return response.data;
    // }
    return response;
  },
  (error) => {
    // Handle errors
    return error.response;
  }
);
export default axiosClient;
