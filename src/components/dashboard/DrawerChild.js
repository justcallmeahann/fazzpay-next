import { parsePhoneNumber } from "awesome-phonenumber";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { authAction } from "@/store/slices/authInfo";
import { topupAction } from "@/store/slices/topup";

function DrawerChild({ toggleDrawer }) {
  const profile = useSelector((state) => state.profile);

  const router = useRouter();
  const dispatch = useDispatch();
  const currentRoute = router.pathname;
  const style = {
    active: "border-primary stroke-primary text-primary  font-semibold",
    inactive: "border-white stroke-dark",
  };
  const pn = parsePhoneNumber(profile.data?.noTelp, { regionCode: "ID" });

  return (
    <div className="flex flex-col p-5">
      <section className="gap-4 flex">
        <div className="avatar">
          <div className="w-11 h-11 rounded-xl m-auto">
            <Image
              src={
                profile.data?.image
                  ? `${env.serverImage}${profile.data?.image}`
                  : "/img/profile.png"
              }
              alt=""
              width={40}
              height={40}
            />
          </div>
        </div>
        <div className="text-dark h-18 flex flex-col justify-between">
          <p className="font-semibold text-lg">{`${profile.data?.firstName} ${profile.data?.lastName}`}</p>
          {profile.data?.noTelp ? (
            <p className="text-opacity-90 text-sm">{pn.number.international}</p>
          ) : (
            ""
          )}
        </div>
        <div className="ml-auto my-auto mr-3">
          <button onClick={() => toggleDrawer()}>
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Menu / Close_MD">
                <path
                  id="Vector"
                  d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
          </button>
        </div>
      </section>
      <div className="py-6 mt-5 w-full h-full bg-white rounded-3xl shadow-card-md  text-dark">
        <ul className="flex flex-col h-full">
          <li>
            <Link
              href={"/dashboard/"}
              onClick={() => {
                toggleDrawer();
              }}
              className={`${
                currentRoute === "/dashboard" ||
                currentRoute === "/dashboard/history"
                  ? style.active
                  : style.inactive
              }  border-l-4 px-6 my-5 flex items-center gap-4 transition-colors hover:text-primary-focus   hover:stroke-primary-focus relative group`}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.6667 3.5H3.5V11.6667H11.6667V3.5Z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M24.5 3.5H16.3333V11.6667H24.5V3.5Z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M24.5 16.333H16.3333V24.4997H24.5V16.333Z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.6667 16.333H3.5V24.4997H11.6667V16.333Z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="">Dashboard</div>
            </Link>
          </li>

          <li>
            <Link
              href={"/dashboard/transfer"}
              onClick={() => {
                toggleDrawer();
              }}
              className={`${
                /\/dashboard\/transfer/.test(currentRoute)
                  ? style.active
                  : style.inactive
              }  border-l-4 px-6 my-5 flex items-center gap-4 transition-colors hover:text-primary-focus   hover:stroke-primary-focus relative group`}
            >
              <svg
                width="28"
                height="28"
                viewBox="-5 1 28 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 18.1663V1.83301"
                  strokeOpacity="0.8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1.83333 9.99968L10 1.83301L18.1667 9.99968"
                  strokeOpacity="0.8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <div>Transfer</div>
            </Link>
          </li>

          <li>
            <button
              onClick={() => {
                toggleDrawer();
                dispatch(topupAction.toggle());
              }}
              className={`${
                currentRoute === "/dashboard/topup"
                  ? style.active
                  : style.inactive
              }  border-l-4 px-6 my-5 flex items-center gap-4 transition-colors hover:text-primary-focus   hover:stroke-primary-focus relative group`}
            >
              <svg
                width="28"
                height="28"
                viewBox="-7 0 28 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 1.83301V18.1663"
                  strokeOpacity="0.8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1.83301 10H18.1663"
                  strokeOpacity="0.8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <div>Topup</div>
            </button>
          </li>

          <li>
            <Link
              href={"/dashboard/profile"}
              onClick={() => {
                toggleDrawer();
              }}
              className={`${
                currentRoute === "/dashboard/profile"
                  ? style.active
                  : style.inactive
              }  border-l-4 px-6 my-5 flex items-center gap-4 transition-colors hover:text-primary-focus   hover:stroke-primary-focus relative group`}
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
                  strokeOpacity="0.8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11 10.8333C13.5773 10.8333 15.6667 8.744 15.6667 6.16667C15.6667 3.58934 13.5773 1.5 11 1.5C8.42267 1.5 6.33333 3.58934 6.33333 6.16667C6.33333 8.744 8.42267 10.8333 11 10.8333Z"
                  strokeOpacity="0.8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <div>Profile</div>
            </Link>
          </li>

          <li>
            <button
              className="border-white border-l-4 px-6 mt-5 mb-3 flex items-center gap-4 relative group"
              onClick={() => {
                toggleDrawer();
                dispatch(authAction.toggleModal());
              }}
            >
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
                  strokeOpacity="0.8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16.6667 17.8337L22.5 12.0003L16.6667 6.16699"
                  stroke="#3A3D42"
                  strokeOpacity="0.8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22.5 12H8.5"
                  stroke="#3A3D42"
                  strokeOpacity="0.8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <div>Logout</div>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default DrawerChild;
