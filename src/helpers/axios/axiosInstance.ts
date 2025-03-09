/* eslint-disable @typescript-eslint/no-explicit-any */
import { authKey } from "@/constant/authkey";
import { IGenericErrorResponse, ResponseSuccessType } from "@/types";
import { getCookie, setCookie } from "@/utils/cookieHelper";
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 60000,
});

let isRefreshing = false;
let failedQueue: any[] = [];

// Helper to process the queue
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });

  failedQueue = [];
};

// Request Interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const accessToken = getCookie(authKey);

    if (accessToken) {
      config.headers.Authorization = `${accessToken}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    const responseObject: ResponseSuccessType = {
      data: response?.data?.data,
      meta: response?.data?.meta,
    };
    return responseObject;
  },
  async function (error) {
    const originalRequest = error.config;

    // Handle 401 Unauthorized or 403 Forbidden
    if (
      (error?.response?.status === 401 || error?.response?.status === 403) &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `${token}`;
            return instance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      window.location.href = "/login";
    }

    // General Error Handling

    const responseObject: IGenericErrorResponse = {
      statusCode: error?.response?.data?.statusCode || 500,
      message: error?.response?.data?.message || "Something went wrong!!!",
      errorMessages: error?.response?.data?.errorMessages || [],
    };

    return Promise.reject(responseObject);
  }
);

export { instance };
