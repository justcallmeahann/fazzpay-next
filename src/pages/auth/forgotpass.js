import React, { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import ForgotPassSuccess from '@/components/auth/forgotPassSuccess';
import AuthSidebar from '@/components/authSidebar';
import Layout from '@/components/layout';
import api from '@/services/api';

function ForgotPass() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { success } = router.query;
  const onChangeForm = (e) => {
    setEmail(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (!email || isLoading) return;
    setError("");
    setIsLoading(true);
    api
      .post("/auth/forgot-password", {
        email,
        linkDirect: "https://localhost:3000/resetpasword",
      })
      .then((data) => {
        setIsLoading(false);
        router.push("/auth/forgotpass?success=true");
      })
      .catch((err) => {
        setIsLoading(false);
        if (err.response?.data?.msg === "Email / Account not registed") {
          return setError("Email not registered");
        }
        setError("An error occured");
      });
  };
  return (
    <Layout title={"Forgot Password"}>
      <main className="flex">
        <AuthSidebar className="flex-[5_5_0%] h-screen" />
        {success ? (
          <ForgotPassSuccess />
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
                htmlFor="email"
                className={`border-b-2 ${
                  email !== ""
                    ? error
                      ? "border-error stroke-error"
                      : "border-primary stroke-primary"
                    : "border-gray-400 stroke-gray-500"
                } flex gap-4 px-1 py-2 items-center focus-within:border-primary duration-150 focus-within:stroke-primary placeholder-shown:border-gray-400`}
              >
                <svg
                  width="22"
                  height="16"
                  viewBox="0 0 22 16"
                  fill="none"
                  // stroke="#A9A9A9"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 1H1V15H21V1Z"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 2L11 9L20 2"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="peer focus:outline-none w-full"
                  onChange={onChangeForm}
                  value={email}
                  placeholder="Enter your e-mail"
                  required
                ></input>
              </label>

              <p className="min-h-6 text-center text-error text-sm flex items-center justify-center gap-1">
                {error ? (
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
                {error ?? ""}
              </p>
              <button
                type="submit"
                className={`submit btn btn-block bg-primary border-2 border-white capitalize hover:bg-primary-focus hover:border-gray-200 ${
                  isLoading ? "loading" : ""
                }`}
                disabled={!email || (isLoading && true)}
              >
                Confirm
              </button>
            </form>
            <p className="text-dark text-opacity-80 text-center">
              <Link className="text-primary font-semibold" href={"/auth/login"}>
                Back
              </Link>
            </p>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default ForgotPass;
