import { useEffect, useState } from "react";

import { parsePhoneNumber } from "awesome-phonenumber";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import DashboardLayout from "@/components/dashboard/Layout";
import { env } from "@/services/env";
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
  const [isLoading, setIsLoading] = useState();

  const [edit, setEdit] = useState();
  const [confPin, setConfPin] = useState(false);

  // redux state
  const profile = useSelector((state) => state.profile);
  const auth = useSelector((state) => state.auth);
  const transfer = useSelector((state) => state.transfer);

  // hooks
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!transfer.process) {
      router.push("/dashboard/transfer");
    }
  }, [router, router.isReady, transfer.process]);

  return (
    <DashboardLayout title={"Transfer"}>
      <section className="w-full flex flex-col bg-white rounded-2xl justify-center p-7 gap-5 shadow-card-md">
        <section className="flex flex-col items-center gap-7 my-7">
          {transfer.isFulfilled ? (
            <>
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
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-dark text-xl font-semibold">
                Transfer Success
              </p>
            </>
          ) : (
            <>
              <svg
                width="70"
                height="70"
                viewBox="0 0 70 70"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="35" cy="35" r="35" fill="#FF5B37" />
                <path
                  d="M45.5 24.5L24.5 45.5"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M24.5 24.5L45.5 45.5"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <p className="text-dark text-xl font-semibold">Transfer Failed</p>
              <p className="text-center max-w-lg text-sm text-secondary-context">
                We can’t transfer your money at the moment, we recommend you to
                check your internet connection and try again.
              </p>
            </>
          )}
        </section>
        <section className="flex flex-col gap-5 w-full my-2">
          <div className="w-full flex flex-col bg-white rounded-2xl shadow-card-md p-5 gap-2">
            <p className="text-sm text-secondary-context">Amount</p>
            <p className="text-dark text-lg font-semibold">
              {" "}
              {toRupiah(transfer.amount || 0, { floatingPoint: 0 })}
            </p>
          </div>
          <div className="w-full flex flex-col bg-white rounded-2xl shadow-card-md p-5 gap-2">
            <p className="text-sm text-secondary-context">Balance Left</p>
            <p className="text-dark text-lg font-semibold">
              {" "}
              {toRupiah(profile.data.balance || 0, {
                floatingPoint: 0,
              })}
            </p>
          </div>
          <div className="w-full flex flex-col bg-white rounded-2xl shadow-card-md p-5 gap-2">
            <p className="text-sm text-secondary-context">Date & Time</p>
            <p className="text-dark text-lg font-semibold">
              {new Date(transfer.time).toLocaleString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </p>
          </div>
          <div className="w-full flex flex-col bg-white rounded-2xl shadow-card-md p-5 gap-2">
            <p className="text-sm text-secondary-context">Notes</p>
            {transfer.notes ? (
              <p className="text-dark text-lg font-semibold">
                {transfer.notes}
              </p>
            ) : (
              <p className="text-secondary-context text-lg italic">empty</p>
            )}
          </div>
        </section>
        <h2 className="text-lg font-semibold">Transfer To</h2>

        <section className="flex flex-col gap-5 w-full my-2">
          <div className="w-full flex bg-white rounded-2xl shadow-card-md p-5 gap-5">
            <div className="avatar">
              <div className="w-16 h-16 rounded-xl m-auto">
                <Image
                  src={
                    transfer.target.image
                      ? `${env.serverImage}${transfer.target.image}`
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
                {transfer.target.firstName} {transfer.target.lastName}
              </p>
              {transfer.target.noTelp && (
                <p className="text-secondary-context text-sm">
                  {
                    parsePhoneNumber(transfer.target.noTelp, {
                      regionCode: "ID",
                    }).number.international
                  }
                </p>
              )}
            </div>
          </div>
        </section>
        <div className="ml-auto">
          <button
            onClick={() => {
              router.push("/dashboard/");
              dispatch(transferAction.clear());
            }}
            className={`submit mt-5 btn px-9 bg-primary border-2 border-white capitalize hover:bg-primary-focus hover:border-gray-200 ${
              isLoading ? "loading" : ""
            }`}
          >
            Back to Home
          </button>
        </div>
      </section>
    </DashboardLayout>
  );
}

export default Transfer;
