// services/api.ts
import config from "@/config";
import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import route from "./route";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: config.apiUrl, // Replace with your API base URL
  withCredentials: true,
});

// Add a response interceptor (optional)
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status === 401) {
      window.location.href = route.login;
    }

    return response; // Return only the data part of the response
  },
  (error: AxiosError) => {
    // Check if the error response exists
    if (error.response) {
      const { status } = error.response;

      // Handle specific HTTP status codes
      if (status === 401) {
        // Unauthorized, redirect to login
      } else if (status === 403) {
        // Forbidden, show an error message or redirect
      } else if (status === 404) {
        // Not Found, handle accordingly
      } else if (status >= 500) {
        // Server errors, handle accordingly
      }

      // Optionally return custom error messages based on status
      return Promise.reject({
        status: status,
        message: error.message || "An error occurred",
      });
    } else if (error.request) {
      // No response was received from the server (network error)
      alert(
        "Network error: Unable to reach the server. Please check your internet connection."
      );
      return Promise.reject(new Error("Network error"));
    } else {
      // Something went wrong in setting up the request
      console.error("Axios error:", error.message);
      return Promise.reject(new Error("Request setup error: " + error.message));
    }
  }
);

export default axiosInstance;
