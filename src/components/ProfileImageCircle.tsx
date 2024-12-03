import { Owner } from "@/models/post.model";
import React from "react";

type profileImageCircleProp = {
  profile: Owner;
};

function ProfileImageCircle({
  profile,
}: profileImageCircleProp): React.ReactElement {
  if (profile.image) {
    return (
      <img
        className="w-full h-full rounded-full object-cover"
        src={profile.image}
      />
    );
  }

  return (
    <div className="bg-secondary-500 rounded-full w-full h-full flex items-center justify-center">
      <p className="text-white font-bold text-lg">{profile.name[0]}</p>
    </div>
  );
}

export default ProfileImageCircle;
