import { useEffect, useState } from "react";

import { parsePhoneNumber } from "awesome-phonenumber";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import DashboardLayout from "@/components/dashboard/Layout";
import { env } from "@/services/env";
import { getProfileById } from "@/services/https/profile";
import { transferAction } from "@/store/slices/transfer";
import toRupiah from "@develoka/angka-rupiah-js";

function Transfer() {
  const [form, setForm] = useState({
    amount: 0,
    note: "",
  });
  const [target, setTarget] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    image: "",
    noTelp: "",
    balance: 0,
  });
  const [edit, setEdit] = useState();
  const router = useRouter();
  const [error, setError] = useState({});
  const profile = useSelector((state) => state.profile);
  const auth = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!router.isReady) return;

    getProfileById(router.query.id, auth.token)
      .then((result) => {
        setTarget(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [router.isReady]);

  const formHandler = (e) => {
    e.preventDefault();

    const now = new Date();
    dispatch(
      transferAction.setTransfer({
        target,
        amount: form.amount,
        balance_left: profile.balance - form.amount,
        time: now.toISOString(),
        notes: form.note,
      })
    );
    router.push("/dashboard/transfer/confirmation");
  };

  return (
    <DashboardLayout title={"Transfer"}>
      <section className="w-full flex flex-col bg-white rounded-2xl justify-center p-7 gap-5 shadow-card-md">
        <h2 className="text-lg font-semibold">Transfer Money</h2>

        <section className="flex flex-col gap-5 w-full my-2">
          <div className="w-full flex bg-white rounded-2xl shadow-card-md p-5 gap-5">
            <div className="avatar">
              <div className="w-16 h-16 rounded-xl m-auto">
                <Image
                  src={
                    target.image
                      ? `${env.serverImage}${target.image}`
                      : "/img/profile.png"
                  }
                  alt=""
                  width={70}
                  height={70}
                />
              </div>
            </div>
            <div className="flex flex-col justify-evenly">
              <p className="text-lg text-dark font-medium">
                {target.firstName} {target.lastName}
              </p>
              {target.noTelp && (
                <p className="text-secondary-context text-sm">
                  {
                    parsePhoneNumber(target.noTelp, { regionCode: "ID" }).number
                      .international
                  }
                </p>
              )}
            </div>
          </div>
        </section>

        <p className="max-w-xs text-secondary-context text-md">
          Type the amount you want to transfer and then press continue to the
          next steps.
        </p>
        <form className="flex flex-col gap-8" onSubmit={formHandler}>
          <div className="group mx-auto max-w-xs flex flex-col gap-10 mt-8">
            <label
              htmlFor="amount"
              className={`max-w-xs outline-none text-5xl text-primary cursor-text mb-3 text-center ${
                edit ? "hidden" : ""
              }`}
              onClick={() => {
                setEdit(true);
              }}
            >
              {toRupiah(form.amount || 0, { floatingPoint: 0 })}
            </label>
            <input
              id="amount"
              name="amount"
              className={`max-w-xs outline-none text-5xl text-center ${
                edit ? "" : "hidden"
              }`}
              value={form.amount}
              onChange={(e) => {
                if (
                  isNaN(e.target.value) ||
                  e.target.value > profile.data.balance ||
                  e.target.value < 0
                ) {
                  return;
                }
                setForm({ ...form, amount: e.target.value });
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  setEdit(false);
                }
              }}
            />

            <p className="text-center text-dark text-sm font-semibold">
              {toRupiah(profile.data.balance || 0, { floatingPoint: 0 })}{" "}
              Available
            </p>

            <label
              htmlFor="note"
              className={`border-b-2 ${
                form.note !== ""
                  ? error.note
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
                  d="M16 2.0003C16.2626 1.73766 16.5744 1.52932 16.9176 1.38718C17.2608 1.24503 17.6286 1.17188 18 1.17188C18.3714 1.17187 18.7392 1.24503 19.0824 1.38718C19.4256 1.52932 19.7374 1.73766 20 2.0003C20.2626 2.26295 20.471 2.57475 20.6131 2.91791C20.7553 3.26107 20.8284 3.62887 20.8284 4.0003C20.8284 4.37174 20.7553 4.73953 20.6131 5.08269C20.471 5.42585 20.2626 5.73766 20 6.0003L6.5 19.5003L1 21.0003L2.5 15.5003L16 2.0003Z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <input
                id="note"
                name="note"
                type="text"
                className="peer focus:outline-none w-full text-center placeholder-shown:text-sm h-6"
                value={form.note}
                onChange={(e) => {
                  setForm({ ...form, note: e.target.value });
                }}
                placeholder="Add some notes (optional)"
              />
            </label>
          </div>
          <div className="ml-auto">
            <button
              type="submit"
              className={`submit mt-5 btn px-9 bg-primary border-2 border-white capitalize hover:bg-primary-focus hover:border-gray-200 ${
                isLoading ? "loading" : ""
              }`}
              disabled={form.amount < 1 || (isLoading && true)}
            >
              Continue
            </button>
          </div>
        </form>
      </section>
    </DashboardLayout>
  );
}

export default Transfer;
