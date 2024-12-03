import auth from "@/services/authService";
import clsx from "clsx";
import { useFormik } from "formik";
import { withZodSchema } from "formik-validator-zod";
import React from "react";
import { z } from "zod";

const loginFormSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormSchemaType = z.infer<typeof loginFormSchema>;

function index() {
  const formik = useFormik<LoginFormSchemaType>({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: (values) => {
      console.log(values);
    },

    validate: withZodSchema(loginFormSchema),
  });

  return (
    <div className="w-full h-screen md:bg-gray-300 bg-white flex items-center justify-center">
      <div className="grid md:grid-cols-2 grid-cols-1 md:shadow-md">
        <div className="bg-white w-96 md:p-16 p-8 rounded-tl-lg rounded-bl-lg">
          <p className="font-bold text-xl">Log in to your Account</p>
          <p className="mt-2 text-sm text-gray-800">Welcome back!</p>
          <button
            onClick={() => {
              auth.loginWithGoogle();
            }}
            className="mt-6 w-full p-2 border-gray-300 rounded-lg border-[1px] flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="100"
              height="100"
              viewBox="0 0 48 48"
              className="w-6 h-6"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              ></path>
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              ></path>
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
            </svg>
            <p className="text-sm font-bold text-gray-900">Google</p>
          </button>
          <div className="mt-5 w-full relative flex items-center justify-center">
            <p className="text-sm z-10 px-3 bg-white text-gray-500">
              or continue with email
            </p>
            <div className="w-full left-0 top-1/2 -translate-y-1/2 absolute h-[1px] bg-gray-300" />
          </div>
          <form onSubmit={formik.handleSubmit} className="flex flex-col mt-4">
            <div className="relative w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="stroke-gray-800 size-5 absolute left-2 top-1/2 -translate-y-1/2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>

              <input
                id="email"
                placeholder="Email"
                type="email"
                {...formik.getFieldProps("email")}
                className={clsx(
                  formik.errors.email &&
                    formik.touched.email &&
                    "border-error-300",
                  "placeholder:text-gray-800 w-full outline-none text-sm p-2 pl-10 bg-gray-200 rounded-lg border-[1px] border-gray-300"
                )}
              />
            </div>
            {formik.errors.email && formik.touched.email && (
              <div className="text-xs mt-1 text-error-500">
                {formik.errors.email}
              </div>
            )}
            <div className="relative w-full mt-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="stroke-gray-800 size-5 absolute left-2 top-1/2 -translate-y-1/2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>

              <input
                id="password"
                placeholder="Password"
                type="password"
                {...formik.getFieldProps("password")}
                className={clsx(
                  formik.errors.password &&
                    formik.touched.password &&
                    "border-error-300",
                  "placeholder:text-gray-800 w-full outline-none text-sm p-2 pl-10 bg-gray-200 rounded-lg border-[1px] border-gray-300"
                )}
              />
            </div>
            {formik.errors.password && formik.touched.password && (
              <div className="text-xs mt-1 text-error-500">
                {formik.errors.password}
              </div>
            )}
            <button
              className="text-white mt-4 bg-primary-500 p-2 rounded-lg"
              type="submit"
            >
              Log in
            </button>
          </form>
        </div>

        <div className=" bg-primary-500 rounded-tr-lg rounded-br-lg"></div>
      </div>
    </div>
  );
}

export default index;
