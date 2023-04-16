import { useState } from "react";

import Link from "next/link";
import { toast } from "react-toastify";

import AuthSidebar from "@/components/authSidebar";
import Layout from "@/components/layout";
import api from "@/services/api";

function Login() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState({ email: "", password: "" });

  const togglePass = (e) => {
    e.preventDefault();
    setPasswordShown(!passwordShown);
  };

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
    if (!form.email || !form.password) return;
    e.target[5].disabled = true;

    toast.promise(api.post("/auth/register", form), {
      pending: "Please wait",
      error: {
        render({ data }) {
          console.log();
          e.target[5].disabled = false;
          console.log(data.response.data.msg);
          return "Wrong email or password";
        },
      },
      success: {
        render({ data }) {
          e.target[5].disabled = false;
          console.log(data);
          return "Success register";
        },
      },
    });
  };

  return (
    <Layout title={"Login - Fazzpay"}>
      <main className="flex">
        <AuthSidebar className="flex-[5_5_0%] h-screen" />
        <section className="flex-[4_4_0%] h-screen flex flex-col justify-center global-px pl-10 gap-5">
          <h2 className="font-bold text-2xl text-dark max-w-sm">
            Start Accessing Banking Needs With All Devices and All Platforms
            With 30.000+ Users
          </h2>
          <p className="text-dark text-opacity-60 max-w-md">
            Transfering money is eassier than ever, you can access FazzPay
            wherever you are. Desktop, laptop, mobile phone? we cover all of
            that for you!
          </p>
          <form onSubmit={submitHandler} className="text-dark space-y-4">
            <label
              htmlFor="firstName"
              className={`border-b-2 ${
                form.firstName !== ""
                  ? "border-primary stroke-primary"
                  : "border-gray-400 stroke-gray-500"
              } flex gap-4 px-1 py-2 items-center focus-within:border-primary duration-150 focus-within:stroke-primary placeholder-shown:border-gray-400`}
            >
              <svg
                width="22"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 17C1 14 5 14 7 12C8 11 5 11 5 6C5 2.667 6.333 1 9 1C11.667 1 13 2.667 13 6C13 11 10 11 11 12C13 14 17 14 17 17"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <input
                id="firstName"
                name="firstName"
                type="text"
                className="peer focus:outline-none w-full font-medium placeholder:font-normal capitalize"
                onChange={onChangeForm}
                value={form.firstName}
                placeholder="Enter your firstname"
                required
              ></input>
            </label>
            <label
              htmlFor="lastName"
              className={`border-b-2 ${
                form.lastName !== ""
                  ? "border-primary stroke-primary"
                  : "border-gray-400 stroke-gray-500"
              } flex gap-4 px-1 py-2 items-center focus-within:border-primary duration-150 focus-within:stroke-primary placeholder-shown:border-gray-400`}
            >
              <svg
                width="22"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 17C1 14 5 14 7 12C8 11 5 11 5 6C5 2.667 6.333 1 9 1C11.667 1 13 2.667 13 6C13 11 10 11 11 12C13 14 17 14 17 17"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <input
                id="lastName"
                name="lastName"
                type="text"
                className="peer focus:outline-none w-full font-medium placeholder:font-normal capitalize"
                onChange={onChangeForm}
                value={form.lastName}
                placeholder="Enter your lastname"
                required
              ></input>
            </label>
            <label
              htmlFor="email"
              className={`border-b-2 ${
                form.email !== ""
                  ? "border-primary stroke-primary"
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
                className="peer focus:outline-none w-full font-medium placeholder:font-normal"
                onChange={onChangeForm}
                value={form.email}
                placeholder="Enter your e-mail"
                required
              ></input>
            </label>
            <label
              htmlFor="password"
              className={`border-b-2 ${
                form.password !== ""
                  ? "border-primary stroke-primary"
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
                id="password"
                name="password"
                type={passwordShown ? "text" : "password"}
                className="peer focus:outline-none w-full font-medium placeholder:font-normal"
                value={form.password}
                onChange={onChangeForm}
                placeholder="Enter your password"
                required
              />
              <button type="button" onClick={togglePass}>
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
                  {passwordShown ? (
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
            <p></p>
            <button
              type="submit"
              className="submit btn btn-block bg-primary border-2 border-white capitalize hover:bg-primary-focus hover:border-gray-200"
              disabled={
                !form.email ||
                !form.firstName ||
                !form.lastName ||
                (!form.password && true)
              }
            >
              Sign Up
            </button>
          </form>
          <p className="text-dark text-opacity-80 text-center">
            Already have an account? Let’s{" "}
            <Link className="text-primary font-semibold" href={"/auth/login"}>
              Login
            </Link>
          </p>
        </section>
      </main>
    </Layout>
  );
}

export default Login;
