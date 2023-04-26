import { useRef, useState } from "react";

import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { checkPin } from "@/services/https/profile";
import { topupAction } from "@/store/slices/topup";
import { transferAction } from "@/store/slices/transfer";

function ConfirmationPin({ isOpen, onClose, handler }) {
  const [isLoading, setIsLoading] = useState();
  const [amount, setAmount] = useState(0);
  const [form, setForm] = useState({ pin: ["", "", "", "", "", ""] });
  const refs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const auth = useSelector((state) => state.auth);

  const topup = useSelector((state) => state.topup);
  const dispatch = useDispatch();
  const router = useRouter();

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
    if (isLoading) return;
    setIsLoading(true);
    checkPin(form.pin.join(""), auth.token)
      .then((result) => {
        handler()
          .then(() => {
            setIsLoading(false);
            dispatch(transferAction.setFulfilled());
            dispatch(transferAction.setProcess());

            router.push("/dashboard/transfer/result");
          })
          .catch(() => {
            dispatch(transferAction.setProcess());
            router.push("/dashboard/transfer/result");

            setIsLoading(false);
          });
      })
      .catch((err) => {
        setIsLoading(false);
        toast("Wrong pin");
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
        {topup.amount < 1 ? (
          <form className="flex flex-col gap-5" onSubmit={formHandler}>
            <p className="text-lg font-semibold">Enter PIN to Transfer</p>
            <p className="text-sm text-secondary-context">
              Enter your 6 digits PIN for confirmation to continue transferring
              money.
            </p>
            <div className="flex justify-center">
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
            <div className="ml-auto">
              <button
                type="submit"
                className={`submit mt-5 btn px-8 bg-primary border-2 border-white capitalize hover:bg-primary-focus hover:border-gray-200 ${
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
                Continue
              </button>
            </div>
          </form>
        ) : (
          <section className="flex flex-col gap-5 w-full">
            <p className="text-lg font-semibold">Enter PIN to Transfer</p>
            <p className="text-sm text-secondary-context">
              Enter your 6 digits PIN for confirmation to continue transferring
              money.
            </p>

            <div className="ml-auto">
              <a
                target="_blank"
                type="submit"
                href={topup.redirectUrl}
                className={`submit mt-5 btn px-8 bg-primary border-2 border-white capitalize hover:bg-primary-focus hover:border-gray-200 ${
                  isLoading ? "loading" : ""
                }`}
              >
                Pay
              </a>
              <p
                className="text-center text-primary cursor-pointer text-sm mt-2"
                onClick={() => dispatch(topupAction.clear())}
              >
                Back
              </p>
            </div>
          </section>
        )}
      </section>
    </div>
  );
}

export default ConfirmationPin;
