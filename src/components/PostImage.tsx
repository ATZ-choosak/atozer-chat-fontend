import config from "@/config";
import ImagePath from "@/libs/imagePath";
import clsx from "clsx";
import React from "react";

type PostImageProp = {
  images: string[];
};

function PostImage({ images }: PostImageProp): React.ReactElement {
  if (images.length > 2) {
    return (
      <div className="grid grid-cols-3 gap-1 mt-4">
        {images.slice(0, 3).map((image, index) => (
          <div className="relative" key={index}>
            <img
              className={clsx(
                index === 2 ? "brightness-50" : "brightness-100",
                "w-full h-52 object-cover rounded-xl"
              )}
              src={ImagePath(image)}
              alt="pst Image"
            />
            <p
              className={clsx(
                index === 2 ? "block" : "hidden",
                "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-bold text-xl"
              )}
            >
              +{images.length - 3}
            </p>
          </div>
        ))}
      </div>
    );
  }

  if (images.length > 1) {
    return (
      <div className="grid grid-cols-2 gap-1 mt-4">
        {images.slice(0, 3).map((image, index) => (
          <div className="relative" key={index}>
            <img
              className={clsx(
                index === 2 ? "brightness-50" : "brightness-100",
                "w-full h-80 object-cover rounded-xl"
              )}
              src={ImagePath(image)}
              alt="pst Image"
            />
            <p
              className={clsx(
                index === 2 ? "block" : "hidden",
                "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-bold text-3xl"
              )}
            >
              +{images.length - 3}
            </p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-1 mt-4">
      {images.slice(0, 3).map((image, index) => (
        <div className="relative" key={index}>
          <img
            className={clsx(
              index === 2 ? "brightness-50" : "brightness-100",
              "w-full h-[35rem] object-cover rounded-xl"
            )}
            src={ImagePath(image)}
            alt="post Image"
          />
          <p
            className={clsx(
              index === 2 ? "block" : "hidden",
              "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-bold text-xl"
            )}
          >
            +{images.length - 3}
          </p>
        </div>
      ))}
    </div>
  );
}

export default PostImage;
