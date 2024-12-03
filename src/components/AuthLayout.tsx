import user from "@/services/userService";
import { login, logout } from "@/store/slices/authSlice";
import { updateProfile } from "@/store/slices/profileSlice";
import { useAppDispatch } from "@/store/store";
import React, { useEffect } from "react";
import { useQuery } from "react-query";

type AuthLayoutProps = {
  children: React.ReactNode;
};

function AuthLayout({ children }: AuthLayoutProps): React.ReactElement {
  const dispatch = useAppDispatch();

  const profileQuery = useQuery({
    queryKey: ["profile"],
    queryFn: user.profile,
  });

  useEffect(() => {
    if (profileQuery.data) {
      dispatch(login());
      dispatch(updateProfile(profileQuery.data));
    } else {
      dispatch(logout());
    }
  }, [profileQuery]);

  return <div>{children}</div>;
}

export default AuthLayout;
