import { useEffect, useState } from "react";

import { parsePhoneNumber } from "awesome-phonenumber";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import DashboardLayout from "@/components/dashboard/Layout";
import ConfirmationPin from "@/components/dashboard/transfer/ConfirmationPin";
import { env } from "@/services/env";
import { transferBalance } from "@/services/https/transfer";
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
  const [confPin, setConfPin] = useState(false);
  const profile = useSelector((state) => state.profile);
  const auth = useSelector((state) => state.auth);
  const transfer = useSelector((state) => state.transfer);
  const [isLoading, setIsLoading] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    if (transfer.amount < 1 || !transfer.target.id) {
      router.push("/dashboard/transfer");
    }
  }, [router.isReady]);

  const transferHandler = () => {
    return transferBalance(auth.token, {
      receiverId: transfer.target.id,
      amount: transfer.amount,
      notes: transfer.notes,
    });
  };

  return (
    <DashboardLayout title={"Transfer"}>
      <ConfirmationPin
        isOpen={confPin}
        onClose={() => setConfPin(false)}
        handler={transferHandler}
      />
      <section className="w-full flex flex-col bg-white rounded-2xl justify-center p-7 gap-5 shadow-card-md">
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
        <h2 className="text-lg font-semibold">Details</h2>
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
              {toRupiah(profile.data.balance - transfer.amount || 0, {
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
        <div className="ml-auto">
          <button
            onClick={() => setConfPin(true)}
            className={`submit mt-5 btn px-9 bg-primary border-2 border-white capitalize hover:bg-primary-focus hover:border-gray-200 ${
              isLoading ? "loading" : ""
            }`}
            disabled={isLoading && true}
          >
            Continue
          </button>
        </div>
      </section>
    </DashboardLayout>
  );
}

export default Transfer;
