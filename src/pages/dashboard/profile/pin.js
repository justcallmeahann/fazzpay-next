import {
  useRef,
  useState,
} from 'react';

import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import DashboardLayout from '@/components/dashboard/Layout';
import api from '@/services/api';

function ChangePin() {
  const [error, setError] = useState({
    form: "",
  });

  const [isValid, setIsValid] = useState(false);

  const [form, setForm] = useState({ pin: ["", "", "", "", "", ""] });
  const refs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const [isLoading, setIsLoading] = useState(false);
  const profile = useSelector((state) => state.profile.data);
  const auth = useSelector((state) => state.auth);

  const handleInputKeyDown = (event, index) => {
    if (event.key === "Backspace" && index > 0 && form.pin[index] === "") {
      refs[index - 1].current.focus();
    }
  };

  const onChangeForm = (event, index) => {
    const { value } = event.target;

    if (!Number.isNaN(Number(value)) && value !== " ") {
      const newPin = [...form.pin];
      newPin[index] = value;
      setForm({ pin: newPin });

      if (index < form.pin.length - 1 && value !== "") {
        refs[index + 1].current.focus();
      }
    }
  };

  const formHandler = (e) => {
    e.preventDefault();
    setError({ form: "" });
    setIsLoading(true);

    if (!isValid) {
      api
        .get(`/user/pin/${form.pin.join("")}`, {
          headers: { Authorization: `Bearer ${auth.token}` },
        })
        .then((result) => {
          setIsLoading(false);
          // code goes here
          setIsValid(true);
          setForm({ pin: ["", "", "", "", "", ""] });
          console.log(result);
        })
        .catch((err) => {
          setIsLoading(false);
          setError({
            form: "Wrong pin",
          });
          // console.log(err.response?.data);
        });
      return;
    }

    api
      .patch(
        `/user/pin/${profile.id}`,
        { pin: form.pin.join("") },
        { headers: { Authorization: `Bearer ${auth.token}` } }
      )
      .then((result) => {
        setIsLoading(false);

        setIsValid(false);
        setForm({ pin: ["", "", "", "", "", ""] });
        toast.success("Successfully change pin");
      })
      .catch((err) => {
        setIsLoading(false);
        setError({
          form: "An error occured",
        });
      });
  };

  return (
    <DashboardLayout title={"Change Pin"}>
      <section className="w-full flex flex-col bg-white rounded-2xl justify-center p-7 gap-2 shadow-card-md">
        <h2 className="text-lg font-semibold">Change PIN</h2>
        <p className="max-w-sm">
          {isValid
            ? "Type your new 6 digits security PIN to use in Fazzpay."
            : `Enter your current 6 digits Fazzpay PIN below to continue to the next
          steps.`}
        </p>
        <form
          className="flex flex-col gap-7 my-16 max-w-md m-auto"
          onSubmit={formHandler}
        >
          <div
            id="pin"
            className="flex flex-row justify-center text-center px-2 mt-5"
          >
            {form.pin.map((value, index) => (
              <input
                key={index}
                className="m-2 border h-10 w-10 text-center form-control rounded"
                type="password"
                maxLength="1"
                value={value}
                ref={refs[index]}
                onChange={(event) => onChangeForm(event, index)}
                onKeyDown={(event) => handleInputKeyDown(event, index)}
              />
            ))}
          </div>
          <p className="min-h-6 text-center text-error text-sm flex items-center justify-center gap-1">
            {error.form ? (
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
            {error.form || ""}
          </p>
          <button
            type="submit"
            className={`submit mt-5 btn btn-block bg-primary border-2 border-white capitalize hover:bg-primary-focus hover:border-gray-200 ${
              isLoading ? "loading" : ""
            }`}
            disabled={
              !form.pin[0] ||
              !form.pin[1] ||
              !form.pin[2] ||
              !form.pin[3] ||
              !form.pin[4] ||
              !form.pin[5] ||
              (isLoading && true)
            }
          >
            {isValid ? "Change Pin" : "Continue"}
          </button>
        </form>
      </section>
    </DashboardLayout>
  );
}

export default ChangePin;
