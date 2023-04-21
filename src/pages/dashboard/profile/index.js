import Image from 'next/image';
import Link from 'next/link';

import DashboardLayout from '@/components/dashboard/Layout';

function Profile() {
  return (
    <DashboardLayout>
      <section className="w-full flex flex-col bg-white rounded-2xl justify-center py-10 gap-2 shadow-card-md">
        <div className="avatar">
          <div className="w-20 h-20 rounded-xl m-auto">
            <Image src="/img/profile.png" alt="" width={80} height={80} />
          </div>
        </div>
        <div className="flex justify-center items-center text-secondary-context gap-1">
          <svg
            width="11"
            height="11"
            viewBox="0 0 11 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.79199 1.37481C7.91237 1.25443 8.05528 1.15895 8.21256 1.0938C8.36984 1.02865 8.53842 0.995117 8.70866 0.995117C8.8789 0.995117 9.04747 1.02865 9.20475 1.0938C9.36204 1.15895 9.50495 1.25443 9.62533 1.37481C9.7457 1.49519 9.84119 1.6381 9.90634 1.79538C9.97149 1.95267 10.005 2.12124 10.005 2.29148C10.005 2.46172 9.97149 2.63029 9.90634 2.78758C9.84119 2.94486 9.7457 3.08777 9.62533 3.20815L3.43783 9.39565L0.916992 10.0831L1.60449 7.56231L7.79199 1.37481Z"
              stroke="#7A7886"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>{" "}
          Edit
        </div>
        <div className="flex flex-col justify-center text-center gap-2">
          <p className="text-xl font-semibold">Robert Chan</p>
          <p className="">+62 813-9387-7946</p>
        </div>
        <div className="flex flex-col w-96 mx-auto font-medium mt-10 gap-5">
          {[
            ["/dashboard/profile/info", "Personal Information"],
            ["/dashboard/profile/password", "Change Password"],
            ["/dashboard/profile/pin  ", "Change PIN"],
          ].map(([url, title], idx) => (
            <Link href={url} className="block" key={idx}>
              <div className="group flex items-center justify-between bg-[#E5E8ED] w-full p-5 rounded-2xl">
                <p className="">{title}</p>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  class=" h-5 ml-2 transition ease-in group-hover:transform group-hover:translate-x-0.5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.83366 10L18.167 10"
                    stroke="#7E7D84"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.0003 1.83365L18.167 10.0003L10.0003 18.167"
                    stroke="#7E7D84"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </Link>
          ))}
          <Link href={"/dashboard/logout"} className="block" key={"logout-btn"}>
            <div className="group flex items-center justify-between bg-[#E5E8ED] w-full p-5 rounded-2xl">
              <p className="">Logout</p>
              <p></p>
            </div>
          </Link>
        </div>
      </section>
    </DashboardLayout>
  );
}

export default Profile;
