import { postResponse } from "@/models/post.model";
import React, { useEffect, useState } from "react";
import ProfileImageCircle from "./ProfileImageCircle";
import PostImage from "./PostImage";
import { useSelector } from "react-redux";
import { profileSelector } from "@/store/slices/profileSlice";
import clsx from "clsx";
import post from "@/services/postService";
import { useRouter } from "next/router";
import route from "@/libs/route";

type PostCardProp = {
  data: postResponse;
};

function PostCard({ data }: PostCardProp): React.ReactElement {
  const profileReducer = useSelector(profileSelector);
  const [IsLike, setIsLike] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(data.likes.length);

  const router = useRouter();

  const checkIsLike = () => {
    const found = data.likes.find(
      (like) => like._id.toString() === profileReducer.profile._id.toString()
    );

    if (found) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  };

  useEffect(() => {
    checkIsLike();

    setLikeCount(data.likes.length)

  }, [data, profileReducer]);

  const handleLike = async () => {
    try {
      const result = await post.likePost({
        postId: data._id,
      });

      setIsLike(result.like);
      setLikeCount((pre) => (result.like ? pre + 1 : pre - 1));
    } catch (error) {
      router.push(route.login);
    }
  };

  return (
    <div className="py-4">
      <div className="bg-white p-4 rounded-xl shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12">
              <ProfileImageCircle profile={data.owner} />
            </div>
            <div>
              <p className="font-bold">{data.owner.name}</p>
              <p className="text-sm">{data.update_at}</p>
            </div>
          </div>
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        {/* Content */}
        <div className="pt-4">
          <p>{data.description}</p>
        </div>

        {/* Image */}
        <div className="cursor-pointer" onClick={() => {}}>
          <PostImage images={data.images} />
        </div>

        {/* Action */}
        <div className="mt-5 flex gap-10">
          <button onClick={handleLike} className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={clsx(
                IsLike ? "fill-error-500 stroke-error-500" : "fill-none",
                "size-6"
              )}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
            <p className="font-bold">{likeCount}</p>
          </button>
          <button
            onClick={() => {
              router.push(route.post(data._id));
            }}
            className="flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
              />
            </svg>

            <p className="font-bold">{data.comments.length}</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
