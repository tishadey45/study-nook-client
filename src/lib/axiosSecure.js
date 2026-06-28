import axios from "axios";

const axiosSecure = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});


// request interceptor
axiosSecure.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// response interceptor
axiosSecure.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {

    if (error.response?.status === 401) {
      console.log("Unauthorized Access");
    }

    if (error.response?.status === 403) {
      console.log("Forbidden Access");
    }

    return Promise.reject(error);
  }
);

export default axiosSecure;