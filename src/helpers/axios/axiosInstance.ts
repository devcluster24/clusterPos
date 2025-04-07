import { authKey } from "@/constant/authkey";
import { IGenericErrorResponse } from "@/types";
import { getCookie } from "@/utils/cookieHelper";
import axios from "axios";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 60000,
});

// Request Interceptor
instance.interceptors.request.use(
  function (config) {
    const accessToken = getCookie(authKey);

    if (accessToken) {
      config.headers.Authorization = `${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Response Interceptor
instance.interceptors.response.use(
  function (response) {
    response.data = {
      success: response?.data?.success,
      statusCode: response?.data?.statusCode,
      message: response?.data?.message,
      data: response?.data?.data,
      meta: response?.data?.meta,
    };
    return response;
  },
  function (error) {
    // Handle Unauthorized (401) or Forbidden (403)
    if (error?.response?.status === 401 || error?.response?.status === 403) {
      window.location.href = "/login"; // Redirect to login
      return Promise.reject("Unauthorized. Redirecting to login.");
    }

    // General Error Handling
    const responseObject: IGenericErrorResponse = {
      statusCode: error?.response?.data?.statusCode || 500,
      message: error?.response?.data?.message || "Something went wrong!",
      errorMessages: error?.response?.data?.errorMessages || [],
    };
    return Promise.reject(responseObject);
  }
);

export { instance };
