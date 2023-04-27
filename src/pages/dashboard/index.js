import 'react-loading-skeleton/dist/skeleton.css';

import {
  Fragment,
  useEffect,
} from 'react';

import { parsePhoneNumber } from 'awesome-phonenumber';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Skeleton from 'react-loading-skeleton';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import DashboardLayout from '@/components/dashboard/Layout';
import { env } from '@/services/env';
import { dashboardAction } from '@/store/slices/dashboard';
import { historyAction } from '@/store/slices/history';
import { topupAction } from '@/store/slices/topup';
import toRupiah from '@develoka/angka-rupiah-js';

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

  const loadingHistory = ["", "", "", "", ""];

  return (
    <DashboardLayout title={"Dashboard"}>
      <div className="bg-primary rounded-3xl text-white p-8 flex flex-wrap gap-y-10 justify-between">
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
      <div className="flex md:flex-row flex-col gap-5 text-dark">
        <section className="flex-[3_3_0%] flex flex-col  bg-white rounded-3xl shadow-card-md p-6">
          {dashboard.isLoading && !dashboard.isFulfilled ? (
            <>
              <div className="flex flex-wrap gap-y-6 justify-between mt-3 px-3 mb-8">
                <div className="flex-1 flex flex-col gap-2">
                  <Skeleton height={30} width={30} />
                  <Skeleton height={20} width={70} />
                  <Skeleton height={20} width={90} />
                </div>

                <div className="w-36 flex flex-col gap-2">
                  <Skeleton height={30} width={30} />
                  <Skeleton height={20} width={70} />
                  <Skeleton height={20} width={90} />
                </div>
              </div>
              <div className="flex mt-auto min-h-[12rem]">
                {Array("", "", "", "", "", "", "").map((value, idx) => (
                  <Fragment key={idx}>
                    <div className="flex-1 flex flex-col gap-3" key={idx}>
                      <div className="h-52 flex justify-center relative">
                        <Skeleton
                          height="13rem"
                          width={20}
                          className="mt-auto"
                        />
                      </div>
                      <div className="text-center px-1 text-opacity-70 text-sm">
                        <Skeleton height={10} width={20} />
                      </div>
                    </div>
                  </Fragment>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-wrap gap-y-6 justify-between mt-3 px-3 mb-8">
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
              <div className="flex mt-auto min-h-[12rem]">
                {dashboard.data.listIncome.map(({ day, total }, idx) => {
                  const subtotal =
                    total + dashboard.data.listExpense[idx].total;
                  let percent = 0;
                  percent =
                    (subtotal /
                      (dashboard.data.totalIncome +
                        dashboard.data.totalExpense)) *
                    100;
                  if (percent < 10 || isNaN(percent)) percent = 10;
                  return (
                    <div className="flex-1 flex flex-col gap-3" key={idx}>
                      <div className="h-52 flex justify-center relative">
                        <div
                          className={`flex w-4 rounded-3xl bg-primary mt-auto peer relative group h-[${percent}%]`}
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
            </>
          )}
        </section>
        <div className="flex-[2_2_0%] bg-white rounded-3xl shadow-card-md p-6">
          <div className="flex justify-between">
            <p className="text-lg font-medium">Transaction History</p>
            <Link className="text-primary" href={"/dashboard/history"}>
              See all
            </Link>
          </div>
          <section className="mt-7 flex flex-col gap-6 h-full">
            {history.isLoading && !history.isFulfilled ? (
              loadingHistory.map((value, idx) => (
                <div className="flex gap-3" key={idx}>
                  <Skeleton
                    width="3.5rem"
                    height="3.5rem"
                    className="my-auto"
                  />
                  <div>
                    <Skeleton
                      height={15}
                      width="5rem"
                      count={2}
                      style={{ display: "flex", justifyItems: "center" }}
                    ></Skeleton>
                  </div>
                  <div className="ml-auto">
                    <Skeleton
                      height={15}
                      width="5rem"
                      count={1}
                      style={{ display: "flex", justifyItems: "center" }}
                    ></Skeleton>
                  </div>
                </div>
              ))
            ) : history.data.length < 1 ? (
              <section className="flex flex-col items-center justify-center m-auto">
                <svg
                  fill="#000000"
                  height="40px"
                  width="40px"
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 492.153 492.153"
                  xmlSpace="preserve"
                >
                  <g>
                    <path
                      d="M426.638,87.91c-42.247-42.247-98.418-65.514-158.166-65.514c-5.799,0-10.5,4.701-10.5,10.5v56.531
               c0,5.799,4.701,10.5,10.5,10.5c80.587,0,146.148,65.561,146.148,146.147c0,80.587-65.561,146.148-146.148,146.148
               c-73.915,0-135.549-54.985-144.913-127.088h36.91c0.008,0,0.013,0.001,0.02,0c5.799,0,10.5-4.701,10.5-10.5
               c0-2.887-1.165-5.502-3.051-7.4l-75.345-84.401c-1.993-2.232-4.842-3.508-7.833-3.508c-0.017,0-0.034,0-0.05,0
               c-3.009,0.015-5.867,1.319-7.85,3.583L2.6,247.719c-2.714,3.101-3.365,7.502-1.663,11.254c1.702,3.753,5.442,6.163,9.563,6.163
               h35.11c4.553,54.02,28.36,104.134,67.69,142.033c41.883,40.359,96.99,62.587,155.171,62.587
               c59.748,0,115.919-23.267,158.166-65.515c42.248-42.248,65.515-98.419,65.515-158.166
               C492.153,186.328,468.886,130.157,426.638,87.91z M268.472,448.756c-109.242,0-198.191-85.45-202.501-194.535
               c-0.223-5.633-4.854-10.085-10.492-10.085H33.65l51.186-58.457l52.185,58.457H112.06c-2.883,0-5.639,1.186-7.621,3.278
               c-1.983,2.092-3.018,4.908-2.863,7.786c4.774,88.611,78.084,158.023,166.897,158.023c92.166,0,167.148-74.982,167.148-167.148
               c0-88.639-69.355-161.384-156.648-166.821V43.665c106.9,5.479,192.181,94.173,192.181,202.41
               C471.153,357.834,380.231,448.756,268.472,448.756z"
                    />
                    <path
                      d="M255.41,255.643v79.405h-25.332c-5.799,0-10.5,4.701-10.5,10.5s4.701,10.5,10.5,10.5h25.332v13.028
               c0,5.799,4.701,10.5,10.5,10.5c5.799,0,10.5-4.701,10.5-10.5v-13.964c28.222-4.984,49.733-29.669,49.733-59.3
               c0-29.63-21.512-54.314-49.733-59.299v-79.407l22.119-0.001c5.799,0,10.5-4.701,10.5-10.5c0-5.799-4.701-10.5-10.5-10.5
               l-22.119,0.001v-13.03c0-5.799-4.701-10.5-10.5-10.5c-5.799,0-10.5,4.701-10.5,10.5v13.965c-28.224,4.985-49.736,29.67-49.736,59.3
               C205.674,225.973,227.186,250.658,255.41,255.643z M305.143,295.813c0,17.998-12.184,33.193-28.733,37.797v-75.593
               C292.959,262.62,305.143,277.816,305.143,295.813z M255.41,158.545v75.595c-16.551-4.604-28.736-19.8-28.736-37.799
               C226.674,178.344,238.859,163.149,255.41,158.545z"
                    />
                  </g>
                </svg>
                <p className="font-semibold mt-3">History is Empty</p>
                <p>Make your first transaction now!</p>
              </section>
            ) : (
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
              })
            )}
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
