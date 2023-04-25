import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import DashboardLayout from "@/components/dashboard/Layout";
import api from "@/services/api";
import { profileAction } from "@/store/slices/profile";

function ChangePhoneNumber() {
  const [form, setForm] = useState({
    noTelp: "",
  });
  const [error, setError] = useState({
    noTelp: "",
    form: "",
  });

  const initialValue = {
    noTelp: "",
    form: "",
  };

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const profile = useSelector((state) => state.profile.data);
  const auth = useSelector((state) => state.auth);

  const list = [{ name: "noTelp", placeholder: "Enter your phone number" }];

  const formHandler = (e) => {
    e.preventDefault();
    setError(initialValue);

    setIsLoading(true);
    api
      .patch(`/user/profile/${profile.id}`, form, {
        headers: { Authorization: `Bearer ${auth.token}` },
      })
      .then((result) => {
        setIsLoading(false);
        setForm({
          ...initialValue,
        });
        dispatch(profileAction.getProfileThunk(auth));
        toast("Success update phone number");
      })
      .catch((err) => {
        setIsLoading(false);
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
        <h2 className="text-lg font-semibold">Edit Phone Number</h2>
        <p className="max-w-sm">
          Add at least one phone number for the transfer ID so you can start
          transfering your money to another user.
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
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.9994 15.9201V18.9201C21.0006 19.1986 20.9435 19.4743 20.832 19.7294C20.7204 19.9846 20.5567 20.2137 20.3515 20.402C20.1463 20.5902 19.904 20.7336 19.6402 20.8228C19.3764 20.912 19.0968 20.9452 18.8194 20.9201C15.7423 20.5857 12.7864 19.5342 10.1894 17.8501C7.77327 16.3148 5.72478 14.2663 4.18945 11.8501C2.49942 9.2413 1.44769 6.27109 1.11944 3.1801C1.09446 2.90356 1.12732 2.62486 1.21595 2.36172C1.30457 2.09859 1.44702 1.85679 1.63421 1.65172C1.82141 1.44665 2.04925 1.28281 2.30324 1.17062C2.55722 1.05843 2.83179 1.00036 3.10945 1.0001H6.10945C6.59475 0.995321 7.06524 1.16718 7.43321 1.48363C7.80118 1.80008 8.04152 2.23954 8.10944 2.7201C8.23607 3.68016 8.47089 4.62282 8.80945 5.5301C8.94399 5.88802 8.97311 6.27701 8.89335 6.65098C8.8136 7.02494 8.62831 7.36821 8.35944 7.6401L7.08945 8.9101C8.513 11.4136 10.5859 13.4865 13.0894 14.9101L14.3594 13.6401C14.6313 13.3712 14.9746 13.1859 15.3486 13.1062C15.7225 13.0264 16.1115 13.0556 16.4694 13.1901C17.3767 13.5286 18.3194 13.7635 19.2794 13.8901C19.7652 13.9586 20.2088 14.2033 20.526 14.5776C20.8431 14.9519 21.0116 15.4297 20.9994 15.9201Z"
                  //   strokeOpacity="0.6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p>+62</p>

              <input
                id={name}
                name={name}
                type="text"
                className="peer focus:outline-none w-full"
                value={form[name]}
                onChange={(e) => {
                  if (isNaN(e.target.value)) {
                    return;
                  }
                  setForm({ ...form, [name]: e.target.value });
                }}
                placeholder={placeholder}
                required
              />
            </label>
          ))}
          <p className="min-h-6 text-center text-error text-sm flex items-center justify-center gap-1">
            {error.noTelp || error.form ? (
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
            {error.noTelp || error.form || ""}
          </p>
          <button
            type="submit"
            className={`submit mt-5 btn btn-block bg-primary border-2 border-white capitalize hover:bg-primary-focus hover:border-gray-200 ${
              isLoading ? "loading" : ""
            }`}
            disabled={!form.noTelp || (isLoading && true)}
          >
            Edit Phone Number
          </button>
        </form>
      </section>
    </DashboardLayout>
  );
}

export default ChangePhoneNumber;
