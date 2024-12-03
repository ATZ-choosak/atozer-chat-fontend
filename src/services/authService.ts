import config from "@/config";
import axiosInstance from "@/libs/axiosInstance";
import {
  inputLogin,
  loginResponse,
  loginResponseSchema,
  profileResponse,
  profileResponseSchema,
} from "@/models/auth.model";

const auth = {
  login: async (input: inputLogin): Promise<loginResponse> => {
    const result = await axiosInstance.post("/auth/login", input);
    return loginResponseSchema.parse(result.data);
  },

  profile: async (): Promise<profileResponse> => {
    const result = await axiosInstance.get("/users/profile");
    return profileResponseSchema.parse(result.data);
  },

  loginWithGoogle: () => {
    window.location.href = `${config.apiUrl}/auth/google`;
  },
};

export default auth;
