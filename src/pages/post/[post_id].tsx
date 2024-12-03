import PostViewCard from "@/components/PostViewCard";
import ProfileImageCircle from "@/components/ProfileImageCircle";
import ImagePath from "@/libs/imagePath";
import route from "@/libs/route";
import post from "@/services/postService";
import { authSelector } from "@/store/slices/authSlice";
import { profileSelector } from "@/store/slices/profileSlice";
import { clsx } from "clsx";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";

type PostViewProp = {
  postId: string;
};

const PostView: NextPage<PostViewProp> = ({ postId }) => {
  const router = useRouter();

  const profileReducer = useSelector(profileSelector);
  const authReducer = useSelector(authSelector);

  const queryClient = useQueryClient();

  const postQuery = useQuery({
    queryKey: ["post"],
    queryFn: () => post.getById(postId),
    refetchInterval: 3000,
    refetchIntervalInBackground: true,
  });

  const postCommentMutation = useMutation({
    mutationFn: post.commentPost,
    onSuccess: () => {
      queryClient.invalidateQueries(["post"]);
    },
  });

  const [imageIndex, setImageIndex] = useState<number>(0);

  const slideRight = () => {
    if (imageIndex + 1 < postQuery.data?.images.length!) {
      setImageIndex((pre) => pre + 1);
    }
  };

  const slideLeft = () => {
    if (imageIndex - 1 >= 0) {
      setImageIndex((pre) => pre - 1);
    }
  };

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [commentText, setCommentText] = useState<string>("");

  const handleCommentPost = () => {
    postCommentMutation.mutate({
      postId,
      comment: commentText,
    });

    setCommentText("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    // Reset height to auto to get the correct scrollHeight
    target.style.height = "auto";
    // Set the height to scrollHeight to auto-adjust the height
    target.style.height = `${target.scrollHeight}px`;
  };

  if (postQuery.isLoading) {
    return <p>Loading...</p>;
  }

  if (postQuery.isError) {
    return <p>Error</p>;
  }

  if (postQuery.isSuccess) {
    return (
      <div>
        <header>
          <title>{postQuery.data?.title}</title>
        </header>

        <div className="flex justify-center">
          <div className="xl:flex flex-1 bg-black hidden relative items-center justify-center">
            <button
              onClick={() => {
                router.push(route.feed);
              }}
              className="absolute hover:bg-black-95 duration-200 ease-in-out p-2 rounded-full bg-opacity-5 text-white left-4 top-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="w-full overflow-hidden relative">
              <div className="flex p-10 w-full items-center justify-between absolute z-10 top-1/2 -translate-y-1/2">
                <button
                  onClick={() => {
                    slideLeft();
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-10 fill-white"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-4.28 9.22a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72h5.69a.75.75 0 0 0 0-1.5h-5.69l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => {
                    slideRight();
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-10 fill-white"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <div
                style={{
                  transform: `translate(-${imageIndex * 100}%,0)`,
                }}
                className="flex duration-200 ease-in-out"
              >
                {postQuery.data?.images.map((image, index) => (
                  <div className="min-w-full" key={index}>
                    <img src={ImagePath(image)} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative xl:w-fit w-full">
            {/* Comment input */}
            {authReducer.isAuthenticated ? (
              <div className="flex gap-4 items-center absolute bottom-0 left-0 p-4 bg-white w-full h-fit shadow-up-md">
                <div className="min-w-8 max-w-8 h-8">
                  <ProfileImageCircle profile={profileReducer.profile} />
                </div>
                <textarea
                  value={commentText}
                  onChange={(e) => {
                    setCommentText(e.target.value);
                  }}
                  onInput={handleInput}
                  ref={textareaRef}
                  rows={1}
                  className="bg-gray-300 outline-none resize-none p-2 placeholder:text-gray-800 w-full rounded-xl px-4"
                  placeholder={`Comment`}
                />
                <button
                  onClick={handleCommentPost}
                  className={clsx(
                    commentText ? "w-6" : "w-0",
                    "duration-200 ease-in-out"
                  )}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-full"
                  >
                    <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                  </svg>
                </button>
              </div>
            ) : null}

            <div className="xl:max-w-lg bg-gray-200 w-full h-screen overflow-y-auto">
              <PostViewCard data={postQuery.data} />
              <div className="p-4">
                <p className="font-bold">
                  {postQuery.data.comments.length} Comment
                </p>
                <div className="mt-4 mb-16">
                  {postQuery.data.comments
                    .sort(
                      (a, b) =>
                        new Date(b.create_at).getTime() -
                        new Date(a.create_at).getTime()
                    )
                    .map((comment) => (
                      <div className="p-2" key={comment._id}>
                        <div className="flex gap-2">
                          <div className="max-w-8 min-w-8 w-8 h-8">
                            <ProfileImageCircle profile={comment.owner} />
                          </div>
                          <div className="w-fit">
                            <div className="bg-white p-2 shadow-md rounded-xl">
                              <p className="font-bold text-sm">
                                {comment.owner.name}
                              </p>
                              <p className="text-sm">{comment.message}</p>
                            </div>
                            <p className="text-xs mt-2">{comment.create_at}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { post_id } = context.params as { post_id: string };

  return {
    props: {
      postId: post_id,
    },
  };
};

export default PostView;
