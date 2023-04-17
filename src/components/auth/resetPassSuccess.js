import React from "react";

import Link from "next/link";

function ResetPassSuccess() {
  return (
    <section className="flex-[4_4_0%] h-screen flex flex-col justify-center global-px pl-10 gap-7">
      <svg
        width="70"
        height="70"
        viewBox="0 0 70 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="35" cy="35" r="35" fill="#1EC15F" />
        <path
          d="M49 24.5L29.75 43.75L21 35"
          stroke="white"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <h2 className="font-semibold text-2xl text-dark">
        Reset Password Success
      </h2>
      <p className="text-dark text-opacity-60">
        Welcome back! You can login now with your new password!
      </p>
      <Link
        className="btn btn-block bg-primary border-2 border-white capitalize hover:bg-primary-focus hover:border-gray-200"
        href={"/auth/login"}
      >
        Go to Login
      </Link>
    </section>
  );
}

export default ResetPassSuccess;
