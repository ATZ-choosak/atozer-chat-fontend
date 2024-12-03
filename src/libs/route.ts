const route = {
  feed: "/",
  login: "/login",
  register: "/register",
  post: (post_id: string) => `/post/${post_id}`,
};

export default route;
