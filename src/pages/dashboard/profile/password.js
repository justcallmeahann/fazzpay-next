import { useState } from "react";

import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import DashboardLayout from "@/components/dashboard/Layout";
import api from "@/services/api";

function ChangePassword() {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    form: "",
  });
  const [shown, setShown] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const initialValue = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    form: "",
  };

  const [isLoading, setIsLoading] = useState(false);
  const profile = useSelector((state) => state.profile.data);
  const auth = useSelector((state) => state.auth);

  const list = [
    { name: "oldPassword", placeholder: "Current password" },
    { name: "newPassword", placeholder: "New password" },
    { name: "confirmPassword", placeholder: "Repeat new password" },
  ];

  const formHandler = (e) => {
    e.preventDefault();
    setError(initialValue);
    if (form.newPassword !== form.confirmPassword) {
      return setError({
        ...initialValue,
        confirmPassword: "Passwords mismatched.",
      });
    }

    setIsLoading(true);
    api
      .patch(`/user/password/${profile.id}`, form, {
        headers: { Authorization: `Bearer ${auth.token}` },
      })
      .then((result) => {
        setIsLoading(false);
        setForm({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        toast("Success update password");
        console.log(result);
      })
      .catch((err) => {
        setIsLoading(false);
        if (err.response?.data?.msg === "Wrong password !") {
          return setError({
            ...initialValue,
            oldPassword: "Wrong old password",
          });
        }
        return setError({
          ...initialValue,
          form: "An error occurred!",
        });
        // console.log(err.response?.data);
      });
  };

  return (
    <DashboardLayout>
      <section className="w-full flex flex-col bg-white rounded-2xl justify-center p-7 gap-2 shadow-card-md">
        <h2 className="text-lg font-semibold">Change Password</h2>
        <p className="max-w-sm">
          You must enter your current password and then type your new password
          twice.
        </p>
        <form
          className="flex flex-col gap-7 my-16 max-w-md m-auto"
          onSubmit={formHandler}
        >
          {list.map(({ name, placeholder }, idx) => (
            <label
              key={name}
              htmlFor={name}
              className={`border-b-2 ${
                form[name] !== ""
                  ? error[name]
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
                id={name}
                name={name}
                type={shown[name] ? "text" : "password"}
                className="peer focus:outline-none w-full"
                value={form[name]}
                onChange={(e) => setForm({ ...form, [name]: e.target.value })}
                placeholder={placeholder}
                required
              />
              <button
                type="button"
                onClick={() => setShown({ ...shown, [name]: !shown[name] })}
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
                  {shown[name] ? (
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
          ))}
          <p className="min-h-6 text-center text-error text-sm flex items-center justify-center gap-1">
            {error.newPassword || error.oldPassword || error.confirmPassword ? (
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
            {error.confirmPassword ||
              error.oldPassword ||
              error.newPassword ||
              error.form ||
              ""}
          </p>
          <button
            type="submit"
            className={`submit mt-5 btn btn-block bg-primary border-2 border-white capitalize hover:bg-primary-focus hover:border-gray-200 ${
              isLoading ? "loading" : ""
            }`}
            disabled={
              !form.oldPassword ||
              !form.newPassword ||
              !form.confirmPassword ||
              (isLoading && true)
            }
          >
            Change Password
          </button>
        </form>
      </section>
    </DashboardLayout>
  );
}

export default ChangePassword;
