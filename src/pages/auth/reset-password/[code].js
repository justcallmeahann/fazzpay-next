import React, { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import ResetPassExpired from "@/components/auth/resetPassExpired";
import ResetPassSuccess from "@/components/auth/resetPassSuccess";
import AuthSidebar from "@/components/authSidebar";
import Layout from "@/components/layout";
import api from "@/services/api";
import NoAuthRoute from "@/utils/wrapper/noAuthRoute";

function ResetPass({ isValid, code }) {
  const [error, setError] = useState({
    newPassword: "",
    confirmPassword: "",
    api: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    keysChangePassword: code,
    newPassword: "",
    confirmPassword: "",
  });
  const [shown, setShown] = useState({
    newPassword: false,
    confirmPassword: false,
  });

  const router = useRouter();
  const { success } = router.query;
  const onChangeForm = (e) => {
    return setForm((form) => {
      return {
        ...form,
        [e.target.name]: e.target.value,
      };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!form.newPassword || !form.confirmPassword || isLoading) return;
    setError({ newPassword: "", confirmPassword: "" });
    if (form.newPassword !== form.confirmPassword) {
      setError({
        confirmPassword: "Password and confirmation password are not the same!",
      });
      return;
    }
    setIsLoading(true);
    api
      .patch("/auth/reset-password", form)
      .then((data) => {
        setIsLoading(false);
        router.push(`/auth/reset-password/${code}?success=true`);
      })
      .catch((err) => {
        setIsLoading(false);
        setError({ api: "Link expired" });
      });
  };
  return (
    <Layout title={"Reset Password"}>
      <main className="flex flex-col md:flex-row">
        <AuthSidebar className="md:flex-[5_5_0%] md:h-screen" />
        {success ? (
          <ResetPassSuccess />
        ) : !isValid ? (
          <ResetPassExpired
            className={
              "flex-[4_4_0%] h-screen flex flex-col justify-center global-px pl-10 gap-7 items-center md:items-start"
            }
          />
        ) : (
          <section className="flex-[4_4_0%] h-screen flex flex-col justify-center global-px pl-10 gap-6">
            <h2 className="font-bold text-2xl text-dark">
              Did You Forgot Your Password?
              <br />
              Don’t Worry, You Can Reset Your Password In a Minutes.
            </h2>
            <p className="text-dark text-opacity-60">
              To reset your password, you must type your e-mail and we will send
              a link to your email and you will be directed to the reset
              password screens.
            </p>
            <form onSubmit={submitHandler} className="text-dark space-y-4">
              <label
                htmlFor="newPassword"
                className={`border-b-2 ${
                  form.newPassword !== ""
                    ? error.newPassword
                      ? "border-error stroke-error"
                      : "border-primary stroke-primary"
                    : "border-gray-400 stroke-gray-500"
                } flex gap-4 px-1 py-2 items-center focus-within:border-primary duration-150 focus-within:stroke-primary placeholder-shown:border-gray-400`}
              >
                <svg
                  width="24"
                  height="16"
                  viewBox="0 0 14 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 9H1V19H15V9Z"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13 7V6C13 3.23858 10.7614 1 8 1C5.23858 1 3 3.23858 3 6V7"
                    strokeWidth="2"
                    strokeLinecap="square"
                    strokeLinejoin="round"
                  />
                </svg>
                <input
                  id="newPassword"
                  name="newPassword"
                  type={shown.newPassword ? "text" : "password"}
                  className="peer focus:outline-none w-full"
                  onChange={onChangeForm}
                  value={form.newPassword}
                  placeholder="Create new password"
                  required
                ></input>
                <button
                  type="button"
                  onClick={() =>
                    setShown({ ...shown, newPassword: !shown.newPassword })
                  }
                >
                  <svg
                    width="22"
                    height="19"
                    viewBox="0 0 22 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-gray-400"
                  >
                    <path
                      d="M21 9C21 9 18 15 11 15C4 15 1 9 1 9C1 9 4 3 11 3C18 3 21 9 21 9Z"
                      strokeOpacity="0.6"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11 12C12.6569 12 14 10.6569 14 9C14 7.34315 12.6569 6 11 6C9.34315 6 8 7.34315 8 9C8 10.6569 9.34315 12 11 12Z"
                      strokeOpacity="0.6"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {shown.newPassword ? (
                      <path
                        d="M2 18L19 1"
                        strokeOpacity="0.6"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    ) : (
                      ""
                    )}
                  </svg>
                </button>
              </label>
              <label
                htmlFor="confirmPassword"
                className={`border-b-2 ${
                  form.confirmPassword !== ""
                    ? error.confirmPassword
                      ? "border-error stroke-error"
                      : "border-primary stroke-primary"
                    : "border-gray-400 stroke-gray-500"
                } flex gap-4 px-1 py-2 items-center focus-within:border-primary duration-150 focus-within:stroke-primary placeholder-shown:border-gray-400`}
              >
                <svg
                  width="24"
                  height="16"
                  viewBox="0 0 14 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 9H1V19H15V9Z"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13 7V6C13 3.23858 10.7614 1 8 1C5.23858 1 3 3.23858 3 6V7"
                    strokeWidth="2"
                    strokeLinecap="square"
                    strokeLinejoin="round"
                  />
                </svg>
                <input
                  id="confimPassword"
                  name="confirmPassword"
                  type={shown.confirmPassword ? "text" : "password"}
                  className="peer focus:outline-none w-full"
                  onChange={onChangeForm}
                  value={form.confirmPassword}
                  placeholder="Confirm new password"
                  required
                ></input>
                <button
                  type="button"
                  onClick={() =>
                    setShown({
                      ...shown,
                      confirmPassword: !shown.confirmPassword,
                    })
                  }
                >
                  <svg
                    width="22"
                    height="19"
                    viewBox="0 0 22 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-gray-400"
                  >
                    <path
                      d="M21 9C21 9 18 15 11 15C4 15 1 9 1 9C1 9 4 3 11 3C18 3 21 9 21 9Z"
                      strokeOpacity="0.6"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11 12C12.6569 12 14 10.6569 14 9C14 7.34315 12.6569 6 11 6C9.34315 6 8 7.34315 8 9C8 10.6569 9.34315 12 11 12Z"
                      strokeOpacity="0.6"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {shown.confirmPassword ? (
                      <path
                        d="M2 18L19 1"
                        strokeOpacity="0.6"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    ) : (
                      ""
                    )}
                  </svg>
                </button>
              </label>

              <p className="min-h-6 text-center text-error text-sm flex items-center justify-center gap-1">
                {error.newPassword || error.confirmPassword || error.api ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block w-4 h-4 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                ) : (
                  ""
                )}
                {error.newPassword ?? error.confirmPassword ?? error.api ?? ""}
              </p>
              <button
                type="submit"
                className={`submit btn btn-block bg-primary border-2 border-white capitalize hover:bg-primary-focus hover:border-gray-200 ${
                  isLoading ? "loading" : ""
                }`}
                disabled={
                  !form.newPassword ||
                  !form.confirmPassword ||
                  (isLoading && true)
                }
              >
                Reset Password
              </button>
            </form>
            <p className="text-dark text-opacity-80 text-center">
              <Link className="text-primary font-semibold" href={"/auth/login"}>
                Back to Login
              </Link>
            </p>
          </section>
        )}
      </main>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  let props = {
    isValid: false,
    code: "",
  };
  try {
    const body = {
      keysChangePassword: query.code,
    };
    props.code = query.code;

    await api.patch(`/auth/reset-password/`, body);
    console.log("sampesini");
    props.isValid = true;
  } catch (error) {
    console.log(error.response);
    if (
      error.response?.data?.msg ===
      "Bad Request (data and salt arguments required)"
    ) {
      props.isValid = true;
      return {
        props,
      };
    }
    props.isValid = false;
  }
  console.log(props);
  return {
    props,
  };
}

export default NoAuthRoute(ResetPass);
