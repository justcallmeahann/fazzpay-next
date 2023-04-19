import Image from 'next/image';
import Link from 'next/link';

import Layout from '@/components/layout';

function Dashboard() {
  return (
    <Layout title={"Dashboard"}>
      <main className="relative">
        <header className="fixed w-full top-0 flex bg-white shadow-[0_4px_20px_0_rgba(0,0,0,0.05)] rounded-b-3xl global-px py-6 items-center justify-between z-20">
          <h1 className="text-primary text-3xl font-semibold">
            <Link href={"/"}>FazzPay</Link>
          </h1>
          <aside className="flex gap-4">
            <div className="avatar">
              <div className="w-11 h-11 rounded-xl m-auto">
                <Image src="/img/profile.png" alt="" width={40} height={40} />
              </div>
            </div>
            <div className="text-dark">
              <p className="font-semibold text-lg">Foo Bar</p>
              <p className="text-opacity-90 text-sm">+62 8139 3877 7946</p>
            </div>
            <div className="m-auto pl-4">
              <svg
                width="20"
                height="22"
                viewBox="0 0 20 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 7C16 5.4087 15.3679 3.88258 14.2426 2.75736C13.1174 1.63214 11.5913 1 10 1C8.4087 1 6.88258 1.63214 5.75736 2.75736C4.63214 3.88258 4 5.4087 4 7C4 14 1 16 1 16H19C19 16 16 14 16 7Z"
                  stroke="#4D4B57"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.73 20C11.5542 20.3031 11.3019 20.5547 10.9982 20.7295C10.6946 20.9044 10.3504 20.9965 10 20.9965C9.64964 20.9965 9.30541 20.9044 9.00179 20.7295C8.69818 20.5547 8.44583 20.3031 8.27002 20"
                  stroke="#4D4B57"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </aside>
        </header>
        <main className="relative flex global-px bg-dashboard">
          <aside className="relative">
            <div className="py-6 fixed mt-28 w-[16rem] bg-white rounded-3xl shadow-card-md h-[70vh] text-dark">
              <ul className="flex flex-col h-full">
                <li className="border-primary border-l-4 px-6 my-5 flex items-center gap-4 text-primary font-semibold">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.6667 3.5H3.5V11.6667H11.6667V3.5Z"
                      stroke="#6379F4"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M24.5 3.5H16.3333V11.6667H24.5V3.5Z"
                      stroke="#6379F4"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M24.5 16.333H16.3333V24.4997H24.5V16.333Z"
                      stroke="#6379F4"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M11.6667 16.333H3.5V24.4997H11.6667V16.333Z"
                      stroke="#6379F4"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  Dashboard
                </li>
                <li className="border-white border-l-4 px-6 my-5 flex items-center gap-4">
                  <svg
                    width="28"
                    height="28"
                    viewBox="-5 1 28 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 18.1663V1.83301"
                      stroke="#3A3D42"
                      stroke-opacity="0.8"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M1.83333 9.99968L10 1.83301L18.1667 9.99968"
                      stroke="#3A3D42"
                      stroke-opacity="0.8"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  Transfer
                </li>
                <li>
                  <Link
                    href={"/dashboard/profile"}
                    className="border-white border-l-4 px-6 my-5 flex items-center gap-4"
                  >
                    <svg
                      width="28"
                      height="28"
                      viewBox="-5 0 28 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20.3333 22.5V20.1667C20.3333 18.929 19.8417 17.742 18.9665 16.8668C18.0913 15.9917 16.9043 15.5 15.6667 15.5H6.33334C5.09566 15.5 3.90868 15.9917 3.03351 16.8668C2.15834 17.742 1.66667 18.929 1.66667 20.1667V22.5"
                        stroke="#3A3D42"
                        stroke-opacity="0.8"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M11 10.8333C13.5773 10.8333 15.6667 8.744 15.6667 6.16667C15.6667 3.58934 13.5773 1.5 11 1.5C8.42267 1.5 6.33333 3.58934 6.33333 6.16667C6.33333 8.744 8.42267 10.8333 11 10.8333Z"
                        stroke="#3A3D42"
                        stroke-opacity="0.8"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    Profile
                  </Link>
                </li>
                <li className="border-white border-l-4 px-6 mt-auto mb-3 flex items-center gap-4">
                  <svg
                    width="28"
                    height="28"
                    viewBox="-5 0 30 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.5 22.5H3.83333C3.21449 22.5 2.621 22.2542 2.18342 21.8166C1.74583 21.379 1.5 20.7855 1.5 20.1667V3.83333C1.5 3.21449 1.74583 2.621 2.18342 2.18342C2.621 1.74583 3.21449 1.5 3.83333 1.5H8.5"
                      stroke="#3A3D42"
                      stroke-opacity="0.8"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M16.6667 17.8337L22.5 12.0003L16.6667 6.16699"
                      stroke="#3A3D42"
                      stroke-opacity="0.8"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M22.5 12H8.5"
                      stroke="#3A3D42"
                      stroke-opacity="0.8"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  Logout
                </li>
              </ul>
            </div>
          </aside>
          <section className="mt-28 mb-[5.5rem] ml-72 w-full space-y-5">
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
              <section className="flex-[3_3_0%] h-screen bg-white rounded-3xl shadow-card-md p-6">
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
                        <Image
                          src="/img/profile.png"
                          alt=""
                          width={40}
                          height={40}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="font-semibold">Foo Bar</p>
                      <p className="text-opacity-70 text-sm font-light">
                        Accept
                      </p>
                    </div>
                    <div className="ml-auto my-auto">
                      <p className="text-income">+Rp50.000</p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </section>
        </main>
      </main>
      <footer className="bg-primary global-px text-primary-context bottom-0 w-full">
        <div className="flex justify-between  items-center w-full">
          <p className="text-opacity-90">2020 FazzPay. All right reserved.</p>
          <div className="flex gap-8 font-medium py-5">
            <p>+62 5637 8882 9901</p>
            <p>contact@fazzpay.com</p>
          </div>
        </div>
      </footer>
    </Layout>
  );
}

export default Dashboard;
