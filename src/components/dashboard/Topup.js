import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import api from "@/services/api";
import { topupAction } from "@/store/slices/topup";

function Topup({ isOpen, onClose }) {
  const [isLoading, setIsLoading] = useState();
  const [amount, setAmount] = useState(0);

  const auth = useSelector((state) => state.auth);

  const topup = useSelector((state) => state.topup);
  const dispatch = useDispatch();

  const formHandler = (e) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    api
      .post(
        `/transaction/top-up`,
        { amount },
        { headers: { Authorization: `Bearer ${auth.token}` } }
      )
      .then((result) => {
        setIsLoading(false);
        dispatch(topupAction.setTopup({ ...result.data.data, amount }));
      })
      .catch((err) => {
        setIsLoading(false);
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
            <p className="text-lg font-semibold">Topup</p>
            <p className="text-sm text-secondary-context">
              Enter the amount of money, and click submit
            </p>
            <div className="bg-white border-2 border-gray-200 p-3 rounded-xl">
              <input
                className="outline-none text-lg font-semibold w-full"
                value={amount}
                onChange={(e) => {
                  if (isNaN(e.target.value)) return;
                  setAmount(e.target.value);
                }}
              />
            </div>
            <div className="ml-auto">
              <button
                type="submit"
                className={`submit mt-5 btn px-8 bg-primary border-2 border-white capitalize hover:bg-primary-focus hover:border-gray-200 ${
                  isLoading ? "loading" : ""
                }`}
                disabled={amount < 1 || (isLoading && true)}
              >
                Submit
              </button>
            </div>
          </form>
        ) : (
          <section className="flex flex-col gap-5 w-full">
            <p className="text-lg font-semibold">Topup</p>
            <p className="text-sm text-secondary-context">
              Please pay topup within click the button
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

export default Topup;
