import axiosInstance from "@/libs/axiosInstance";
import { profileResponse, profileResponseSchema } from "@/models/auth.model";

const user = {
  profile: async (): Promise<profileResponse> => {
    const result = await axiosInstance.get("/users/profile");
    return profileResponseSchema.parse(result.data);
  },
};

export default user;
