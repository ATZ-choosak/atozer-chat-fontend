import auth from "@/services/authService";
import React from "react";
import { useQuery } from "react-query";

function index() {
  const getProfileQuery = useQuery({
    queryKey: ["profile"],
    queryFn: auth.profile,
  });

  if (getProfileQuery.isLoading) {
    return <p>Loading...</p>;
  }

  if (getProfileQuery.isSuccess) {
    return (
      <div>
        {getProfileQuery.data.image ? (
          <img src={getProfileQuery.data.image} alt="profile" />
        ) : (
          <p>No profile image</p>
        )}

        <p>{getProfileQuery.data.name}</p>
      </div>
    );
  }
}

export default index;
