import { useEffect, useRef, useState } from "react";

import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import AuthSidebar from "@/components/authSidebar";
import Layout from "@/components/layout";
import api from "@/services/api";
import { authAction } from "@/store/slices/authInfo";
import { pinAction } from "@/store/slices/setPin";

function SetPin() {
  // local state
  const [form, setForm] = useState({ pin: ["", "", "", "", "", ""] });
  const refs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];
  const [error, setError] = useState({ pin: "", form: "" });
  const [isLoading, setIsLoading] = useState(false);

  // redux state
  const auth = useSelector((state) => state.auth);
  const pin = useSelector((state) => state.pin);

  const router = useRouter();

  useEffect(() => {
    if (pin.id === "" || pin.token === "") {
      router.push("/auth/login");
    }
  }, [pin]);

  const dispatch = useDispatch();

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

  const handleInputKeyDown = (event, index) => {
    if (event.key === "Backspace" && index > 0 && form.pin[index] === "") {
      refs[index - 1].current.focus();
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const inputPin = form.pin.join("");
    if (inputPin.length < 6 || isLoading) return;
    setIsLoading(true);
    api
      .patch(
        `/user/pin/${pin.id_user}`,
        { pin: inputPin },
        { headers: { Authorization: `Bearer ${pin.token}` } }
      )
      .then((data) => {
        setIsLoading(false);
        dispatch(authAction.assignAuth({ id: pin.id, token: pin.token }));
        dispatch(pinAction.clear());
        router.push("/dashboard");
      })
      .catch((err) => {
        setIsLoading(false);
        return setError({ form: "An error occurred" });

        // console.log(error);
      });
  };

  useEffect(() => {
    console.log(pin);
  }, [pin]);

  return (
    <Layout title={"Create Pin"}>
      <main className="flex">
        <AuthSidebar className="flex-[5_5_0%] h-screen" />
        <section className="flex-[4_4_0%] h-screen flex flex-col justify-center global-px pl-10 gap-6">
          <h2 className="font-bold text-2xl text-dark">
            Secure Your Account, Your Wallet, and Your Data With 6 Digits PIN
            That You Created Yourself.
          </h2>
          <p className="text-dark text-opacity-60">
            Create 6 digits pin to secure all your money and your data in
            FazzPay app. Keep it secret and don’t tell anyone about your FazzPay
            account password and the PIN.
          </p>
          <form onSubmit={submitHandler} className="text-dark space-y-4">
            <div
              id="pin"
              className="flex flex-row justify-center text-center px-2 mt-5"
            >
              {form.pin.map((value, index) => (
                <input
                  key={index}
                  className="m-2 border h-10 w-10 text-center form-control rounded"
                  type="text"
                  maxLength="1"
                  value={value}
                  ref={refs[index]}
                  onChange={(event) => onChangeForm(event, index)}
                  onKeyDown={(event) => handleInputKeyDown(event, index)}
                />
              ))}
            </div>
            <p className="min-h-6 text-center text-error text-sm flex items-center justify-center gap-1">
              {error.pin || error.form ? (
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
              {error.pin ?? error.form ?? ""}
            </p>
            <button
              type="submit"
              className={`submit btn btn-block bg-primary border-2 border-white capitalize hover:bg-primary-focus hover:border-gray-200 ${
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
              Confirm
            </button>
          </form>
        </section>
      </main>
    </Layout>
  );
}

export default SetPin;
