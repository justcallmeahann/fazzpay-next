import Image from 'next/image';
import Link from 'next/link';

import DashboardLayout from '@/components/dashboard/Layout';

function Dashboard() {
  return (
    <DashboardLayout title={"Dashboard"}>
      <div className="bg-primary rounded-3xl text-white p-8 flex justify-between">
        <div className="flex flex-col justify-between">
          <p className="text-primary-context">Balance</p>
          <p className="font-semibold text-3xl">Rp120.000</p>
          <p className="text-primary-context">+62 813-9387-7946</p>
        </div>
        <div className="flex flex-col gap-3">
          <button className="btn bg-white bg-opacity-20 border-1 border-white capitalize hover:bg-white hover:bg-opacity-30 hover:border-white flex gap-2">
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
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M1.83331 9.99968L9.99998 1.83301L18.1666 9.99968"
                stroke="#B5B0ED"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Transfer
          </button>
          <button className="btn bg-white bg-opacity-20 border-1 border-white capitalize hover:bg-white hover:bg-opacity-30 hover:border-white flex gap-2">
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
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M1.83331 10H18.1666"
                stroke="#B5B0ED"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Top Up
          </button>
        </div>
      </div>
      <div className="flex gap-5 text-dark">
        <section className="flex-[3_3_0%]  bg-white rounded-3xl shadow-card-md p-6">
          <div className="flex justify-between mt-3 px-3">
            <div className="flex flex-col gap-2">
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
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M18.1667 10.0003L10 18.167L1.83333 10.0003"
                  stroke="#1EC15F"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p className="text-opacity-20 text-sm mt-1">Income</p>
              <p className="font-semibold text-lg">Rp2.120.000</p>
            </div>
            <div className="flex flex-col gap-2">
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
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M1.83334 9.99968L10 1.83301L18.1667 9.99968"
                  stroke="#FF5B37"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p className="text-opacity-20 text-sm mt-1">Expense</p>
              <p className="font-semibold text-lg">Rp1.560.000</p>
            </div>
          </div>
          <div class="flex">
            <div className="flex-1 flex flex-col gap-3">
              <div className="h-52 flex justify-center relative">
                <div className="flex w-4 rounded-3xl h-[20%] bg-primary mt-auto peer relative group">
                  <div className="h-4 w-4 bg-primary rounded-full invisible group-hover:visible outline-white outline-4 outline absolute duration-200 drop-shadow-card-lg"></div>
                  <div className="absolute bg-white -top-12 m-auto invisible group-hover:visible transition-all z-10">
                    <p className="text-income px-3 py-2 text-sm shadow-card-md rounded-xl">
                      +Rp65.000
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-center px-1 text-opacity-70 text-sm">
                Sat
              </div>
            </div>
          </div>
        </section>
        <div className="flex-[2_2_0%] bg-white rounded-3xl shadow-card-md p-6">
          <div className="flex justify-between">
            <p className="text-lg font-medium">Transaction History</p>
            <Link className="text-primary" href={""}>
              See all
            </Link>
          </div>
          <section className="mt-7">
            <div className="flex gap-3">
              <div className="avatar">
                <div className="w-14 h-14 rounded-xl m-auto">
                  <Image src="/img/profile.png" alt="" width={40} height={40} />
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <p className="font-semibold">Foo Bar</p>
                <p className="text-opacity-70 text-sm font-light">Accept</p>
              </div>
              <div className="ml-auto my-auto">
                <p className="text-income">+Rp50.000</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
