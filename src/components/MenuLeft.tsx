import auth from "@/services/authService";
import { authSelector } from "@/store/slices/authSlice";
import { changeMenu, menuSelector } from "@/store/slices/menuSlice";
import { profileSelector } from "@/store/slices/profileSlice";
import { useAppDispatch } from "@/store/store";
import clsx from "clsx";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Modal from "./Modal";
import { useRouter } from "next/router";
import route from "@/libs/route";

type menuItem = {
  name: string;
  index: number;
  icon: React.ReactElement;
};

function MenuLeft(): React.ReactElement {
  const menus: menuItem[] = [
    {
      index: 0,
      name: "News Feed",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
          <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
        </svg>
      ),
    },
    {
      index: 1,
      name: "Messages",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path
            fillRule="evenodd"
            d="M5.337 21.718a6.707 6.707 0 0 1-.533-.074.75.75 0 0 1-.44-1.223 3.73 3.73 0 0 0 .814-1.686c.023-.115-.022-.317-.254-.543C3.274 16.587 2.25 14.41 2.25 12c0-5.03 4.428-9 9.75-9s9.75 3.97 9.75 9c0 5.03-4.428 9-9.75 9-.833 0-1.643-.097-2.417-.279a6.721 6.721 0 0 1-4.246.997Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      index: 2,
      name: "Friends",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />
        </svg>
      ),
    },
    {
      index: 3,
      name: "Settings",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path
            fillRule="evenodd"
            d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ];

  const authMenus: menuItem[] = [
    {
      index: 0,
      name: "Login with email",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
          <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
        </svg>
      ),
    },
    {
      index: 1,
      name: "Login with google",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="100"
          height="100"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032 s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2 C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"></path>
        </svg>
      ),
    },
    {
      index: 2,
      name: "Sign up",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path d="M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
        </svg>
      ),
    },
  ];

  const menuReducer = useSelector(menuSelector);
  const profileReducer = useSelector(profileSelector);
  const authReducer = useSelector(authSelector);
  const dispatch = useAppDispatch();

  const router = useRouter();

  return (
    <div className="p-14 space-y-2 h-screen w-full shadow-md">
      {authReducer.isAuthenticated ? (
        <div className="flex flex-col items-center justify-center p-10">
          {profileReducer.profile.image ? (
            <img
              src={profileReducer.profile.image!}
              alt="profileImage"
              className="w-32 h-32 object-cover rounded-full"
            />
          ) : (
            <div className="w-32 h-32 rounded-full flex items-center justify-center bg-secondary-500">
              <p className="text-white font-bold text-6xl">
                {profileReducer.profile.name[0]}
              </p>
            </div>
          )}

          <p className="font-bold text-lg mt-4 text-nowrap">
            {profileReducer.profile.name}
          </p>
          <p className="text-sm text-gray-700">
            {profileReducer.profile.email}
          </p>
        </div>
      ) : null}

      {authReducer.isAuthenticated
        ? menus.map((menu) => (
            <div
              onClick={() => {
                dispatch(changeMenu(menu.index));
              }}
              className={clsx(
                menuReducer.menu === menu.index
                  ? "bg-primary-500 text-white"
                  : "bg-white text-black",
                "flex p-4 gap-2 rounded-2xl cursor-pointer"
              )}
              key={menu.index}
            >
              {menu.icon}
              <p className="font-bold">{menu.name}</p>
            </div>
          ))
        : authMenus.map((menu) => (
            <div
              onClick={() => {
                switch (menu.index) {
                  case 0:
                    router.push(route.login);
                    break;
                  case 1:
                    auth.loginWithGoogle();
                    break;

                  case 2:
                    break;

                  default:
                    break;
                }
              }}
              className={clsx(
                "bg-white text-black flex p-4 gap-2 rounded-2xl cursor-pointer hover:bg-primary-500 hover:text-white duration-100 ease-in-out"
              )}
              key={menu.index}
            >
              {menu.icon}
              <p className="font-bold">{menu.name}</p>
            </div>
          ))}
    </div>
  );
}

export default MenuLeft;
