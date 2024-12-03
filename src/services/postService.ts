import axiosInstance from "@/libs/axiosInstance";
import {
  commentPost,
  likePost,
  likePostResponse,
  likePostResponseSchema,
  postResponse,
  postResponseSchema,
} from "@/models/post.model";

const post = {
  getAll: async (): Promise<postResponse[]> => {
    const result = await axiosInstance.get("/post");
    return postResponseSchema.array().parse(result.data);
  },

  getById: async (id: string): Promise<postResponse> => {
    const result = await axiosInstance.get(`/post/${id}`);
    return postResponseSchema.parse(result.data);
  },

  likePost: async (input: likePost): Promise<likePostResponse> => {
    const result = await axiosInstance.post("/post/like", input);
    return likePostResponseSchema.parse(result.data);
  },

  commentPost: async (input: commentPost): Promise<postResponse> => {
    const result = await axiosInstance.post("/post/comment", input);
    return postResponseSchema.parse(result.data);
  },
};

export default post;
