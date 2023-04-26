import { useEffect } from "react";

import { parsePhoneNumber } from "awesome-phonenumber";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import DashboardLayout from "@/components/dashboard/Layout";
import { env } from "@/services/env";
import { dashboardAction } from "@/store/slices/dashboard";
import { historyAction } from "@/store/slices/history";
import { topupAction } from "@/store/slices/topup";
import toRupiah from "@develoka/angka-rupiah-js";

function Dashboard() {
  const profile = useSelector((state) => state.profile);
  const auth = useSelector((state) => state.auth);
  const dashboard = useSelector((state) => state.dashboard);
  const history = useSelector((state) => state.history);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(dashboardAction.getDashboardThunk(auth));
    dispatch(historyAction.getHistoryThunk({ page: 1, token: auth.token }));
    // dispatch(historyA)
  }, []);

  return (
    <DashboardLayout title={"Dashboard"}>
      <div className="bg-primary rounded-3xl text-white p-8 flex justify-between">
        <div className="flex flex-col justify-between">
          <p className="text-primary-context">Balance</p>
          <p className="font-semibold text-3xl">
            {toRupiah(profile.data.balance || 0, { floatingPoint: 0 })}
          </p>

          <p className="text-primary-context h-6">
            {profile?.data?.noTelp
              ? parsePhoneNumber(profile.data.noTelp, { regionCode: "ID" })
                  .number.international
              : ""}
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <button
            className="btn bg-white bg-opacity-20 border-1 border-white capitalize hover:bg-white hover:bg-opacity-30 hover:border-white flex gap-2"
            onClick={() => router.push("/dashboard/transfer")}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 18.1663V1.83301"
                stroke="#B5B0ED"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1.83331 9.99968L9.99998 1.83301L18.1666 9.99968"
                stroke="#B5B0ED"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Transfer
          </button>
          <button
            className="btn bg-white bg-opacity-20 border-1 border-white capitalize hover:bg-white hover:bg-opacity-30 hover:border-white flex gap-2"
            onClick={() => dispatch(topupAction.toggle())}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 1.83301V18.1663"
                stroke="#B5B0ED"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1.83331 10H18.1666"
                stroke="#B5B0ED"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Top Up
          </button>
        </div>
      </div>
      <div className="flex gap-5 text-dark">
        <section className="flex-[3_3_0%]  bg-white rounded-3xl shadow-card-md p-6">
          <div className="flex justify-between mt-3 px-3">
            <div className="flex-1 flex flex-col gap-2">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 1.83366L10 18.167"
                  stroke="#1EC15F"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18.1667 10.0003L10 18.167L1.83333 10.0003"
                  stroke="#1EC15F"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-opacity-20 text-sm mt-1">Income</p>
              <p className="font-semibold text-lg">
                {toRupiah(dashboard.data.totalIncome || 0, {
                  floatingPoint: 0,
                })}
              </p>
            </div>
            <div className="w-36 flex flex-col gap-2">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 18.1663L10 1.83301"
                  stroke="#FF5B37"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1.83334 9.99968L10 1.83301L18.1667 9.99968"
                  stroke="#FF5B37"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-opacity-20 text-sm mt-1">Expense</p>
              <p className="font-semibold text-lg">
                {toRupiah(dashboard.data.totalExpense || 0, {
                  floatingPoint: 0,
                })}
              </p>
            </div>
          </div>
          <div className="flex mt-10 min-h-[10rem]">
            {dashboard.isFulfilled &&
              dashboard.data.listIncome.map(({ day, total }, idx) => {
                const subtotal = total + dashboard.data.listExpense[idx].total;
                let percent =
                  (subtotal /
                    (dashboard.data.totalIncome +
                      dashboard.data.totalExpense)) *
                  100;
                if (percent < 10) percent = 10;
                return (
                  <div className="flex-1 flex flex-col gap-3" key={idx}>
                    <div className="h-52 flex justify-center relative">
                      <div
                        className={`flex w-4 rounded-3xl bg-primary mt-auto peer relative group`}
                        style={{ height: `${percent}%` }}
                      >
                        <div className="h-4 w-4 bg-primary rounded-full invisible group-hover:visible outline-white outline-4 outline absolute duration-200 drop-shadow-card-lg"></div>
                        <div className="absolute bg-white -top-12 m-auto invisible group-hover:visible transition-all z-10">
                          <p className="text-income px-3 py-2 text-sm shadow-card-md rounded-xl">
                            {toRupiah(subtotal || 0, {
                              floatingPoint: 0,
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="text-center px-1 text-opacity-70 text-sm">
                      {day.substring(0, 3)}
                    </div>
                  </div>
                );
              })}
          </div>
        </section>
        <div className="flex-[2_2_0%] bg-white rounded-3xl shadow-card-md p-6">
          <div className="flex justify-between">
            <p className="text-lg font-medium">Transaction History</p>
            <Link className="text-primary" href={"/dashboard/history"}>
              See all
            </Link>
          </div>
          <section className="mt-7 flex flex-col gap-6">
            {history.data.length > 1 &&
              history.data.map(({ id, fullName, image, amount, type }, idx) => {
                let typeTrans = {
                  name: "",
                  sign: "",
                  color: "",
                };
                switch (type) {
                  case "accept":
                    typeTrans.name = "Accept";
                    typeTrans.sign = "+";
                    typeTrans.color = "text-income";
                    break;

                  case "send":
                    typeTrans.name = "Transfer";
                    typeTrans.sign = "-";
                    typeTrans.color = "text-error";
                    break;

                  default:
                    typeTrans.name = "Topup";
                    typeTrans.sign = "+";
                    typeTrans.color = "text-error";

                    break;
                }
                return (
                  <div className="flex gap-3" key={id}>
                    <div className="avatar">
                      <div className="w-14 h-14 rounded-xl m-auto">
                        <Image
                          src={
                            image
                              ? `${env.serverImage}${image}`
                              : "/img/profile.png"
                          }
                          alt=""
                          width={40}
                          height={40}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="font-semibold">{fullName}</p>
                      <p className="text-opacity-70 text-sm font-light">
                        {typeTrans.name}
                      </p>
                    </div>
                    <div className="ml-auto my-auto">
                      <p className={`${typeTrans.color}`}>
                        {typeTrans.sign}
                        {toRupiah(amount || 0, {
                          floatingPoint: 0,
                        })}
                      </p>
                    </div>
                  </div>
                );
              })}
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
