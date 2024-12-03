import post from "@/services/postService";
import { authSelector } from "@/store/slices/authSlice";
import {
  changePostFilter,
  FilterType,
  postFilterSelector,
} from "@/store/slices/postFilterSlice";
import { profileSelector } from "@/store/slices/profileSlice";
import { useAppDispatch } from "@/store/store";
import clsx from "clsx";
import React from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import PostCard from "./PostCard";

type filterMenuType = {
  name: string;
  type: FilterType;
};

type postButtonType = {
  name: string;
  icon: React.ReactElement;
};

function Feed() {
  const postQuery = useQuery({
    queryKey: ["post"],
    queryFn: post.getAll,
  });

  const postFilterReducer = useSelector(postFilterSelector);
  const profileReducer = useSelector(profileSelector);
  const authReducer = useSelector(authSelector);
  const dispatch = useAppDispatch();

  const menuFilters: filterMenuType[] = [
    {
      name: "Recents",
      type: FilterType.Recents,
    },
    {
      name: "Friends",
      type: FilterType.Friends,
    },
    {
      name: "Popular",
      type: FilterType.Popular,
    },
  ];

  const menuPosts: postButtonType[] = [
    {
      name: "File",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path d="M19.5 21a3 3 0 0 0 3-3v-4.5a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3V18a3 3 0 0 0 3 3h15ZM1.5 10.146V6a3 3 0 0 1 3-3h5.379a2.25 2.25 0 0 1 1.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 0 1 3 3v1.146A4.483 4.483 0 0 0 19.5 9h-15a4.483 4.483 0 0 0-3 1.146Z" />
        </svg>
      ),
    },
    {
      name: "Image",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path
            fillRule="evenodd"
            d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="xl:px-32 lg:px-28 sm:px-24 px-4">
      <div className="w-full py-2 flex items-center justify-between">
        {authReducer.isAuthenticated ? (
          <div className="w-full p-2 items-center justify-end flex space-x-5">
            {menuFilters.map((menu, index) => (
              <p
                onClick={() => {
                  dispatch(changePostFilter(menu.type));
                }}
                key={index}
                className={clsx(
                  postFilterReducer.filter === menu.type
                    ? "text-black"
                    : "text-gray-700",
                  "cursor-pointer font-bold"
                )}
              >
                {menu.name}
              </p>
            ))}
          </div>
        ) : null}
      </div>

      {authReducer.isAuthenticated ? (
        <div className="w-full h-fit p-4 bg-white shadow-md rounded-3xl">
          <div className="bg-gray-200 w-full h-14 rounded-full relative flex items-center justify-between px-4 cursor-pointer hover:bg-gray-300 duration-[0.2s] ease-in-out">
            <p className="text-gray-800 ml-12">Share Somthing</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6 fill-gray-800"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 0 0-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634Zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 0 1-.189-.866c0-.298.059-.605.189-.866Zm2.023 6.828a.75.75 0 1 0-1.06-1.06 3.75 3.75 0 0 1-5.304 0 .75.75 0 0 0-1.06 1.06 5.25 5.25 0 0 0 7.424 0Z"
                clipRule="evenodd"
              />
            </svg>

            {profileReducer.profile.image ? (
              <img
                className="h-14 w-14 rounded-full p-2 absolute left-0 top-0"
                src={profileReducer.profile.image!}
                alt="profile"
              />
            ) : (
              <div className="h-14 w-14 overflow-clip p-2 rounded-full absolute left-0 top-0">
                <div className="bg-secondary-500 w-full h-full rounded-full flex items-center justify-center">
                  <p className="text-white font-bold">
                    {profileReducer.profile.name[0]}
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between pt-4">
            <div className="flex space-x-4 items-center ml-4">
              {menuPosts.map((menu, index) => (
                <div className="flex space-x-2 items-center" key={index}>
                  {menu.icon}
                  <p className="font-bold text-sm">{menu.name}</p>
                </div>
              ))}
            </div>
            <button className="font-bold text-sm bg-primary-500 text-white p-2 w-24 rounded-full">
              POST
            </button>
          </div>
        </div>
      ) : null}

      {postQuery.isLoading ? (
        <p>Loading...</p>
      ) : postQuery.isSuccess ? (
        postQuery.data.map((post) => <PostCard key={post._id} data={post} />)
      ) : (
        <p>Error</p>
      )}
    </div>
  );
}

export default Feed;
