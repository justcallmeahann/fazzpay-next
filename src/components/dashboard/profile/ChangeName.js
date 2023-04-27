import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { updateProfileName } from "@/services/https/profile";
import { profileAction } from "@/store/slices/profile";

function ChangeName({ isOpen, onClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const profile = useSelector((state) => state.profile);
  const [preview, setPreview] = useState();
  const [form, setForm] = useState({
    firstName: profile.data?.firstName,
    lastName: profile.data?.lastName,
    form: "",
  });
  const [error, setError] = useState({
    firstName: "",
    lastName: "",
    form: "",
  });
  const { id_user, token } = useSelector((state) => state.auth);
  //   cons;

  const dispatch = useDispatch();
  const updateHandler = (e) => {
    e.preventDefault();

    setIsLoading(true);
    updateProfileName(
      { firstName: form.firstName, lastName: form.lastName, userId: id_user },
      token
    )
      .then(() => {
        setIsLoading(false);

        dispatch(profileAction.getProfileThunk({ id_user, token }));
        toast("Success update profile name");

        onClose();
      })
      .catch(() => {
        setIsLoading(false);
        toast("An error ocurred");
      });
  };

  const onChangeForm = (e) => {
    if (error.email || error.password) {
      setError({});
    }
    return setForm((form) => {
      return {
        ...form,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <div
      className={`fixed inset-0 z-30 bg-black/80 flex justify-center items-center select-none ${
        isOpen ? "block" : "hidden"
      }`}
      onClick={onClose}
    >
      <section
        className="bg-white opacity-100 text-dark p-7 rounded-2xl w-[28rem] relative"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button className="absolute right-7" onClick={onClose}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 1L1 15"
              stroke="#3A3D42"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1 1L15 15"
              stroke="#3A3D42"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <p className="text-lg font-semibold">Change Name</p>
        <p className="text-sm text-secondary-context">
          You can update your name
        </p>
        <form className="flex flex-col items-center gap-5 my-5">
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
          <div className="ml-auto">
            <button
              className={`submit mt-5 btn px-8 bg-primary border-2 border-white capitalize hover:bg-primary-focus hover:border-gray-200 ${
                isLoading ? "loading" : ""
              }`}
              disabled={!form.firstName || !form.lastName || isLoading}
              onClick={updateHandler}
            >
              Update
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default ChangeName;
