import {
  useEffect,
  useState,
} from 'react';

import { parsePhoneNumber } from 'awesome-phonenumber';
import _ from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { env } from '@/services/env';
import { profileAction } from '@/store/slices/profile';
import { useOutsideClick } from '@/utils/wrapper/outsideClick';

import Notification from './Notification';

function Header({ toggleDrawer }) {
  const profile = useSelector((state) => state.profile);
  const auth = useSelector((state) => state.auth);
  const [notif, setNotif] = useState(false);

  // const controller = useMemo(() => new AbortController(), []);
  const dispatch = useDispatch();
  const handleClickOutside = () => {
    if (notif) {
      setNotif(false);
    }
  };

  const ref = useOutsideClick(handleClickOutside);
  useEffect(() => {
    // getUsers(
    //   controller,
    //   (res) => {
    //     console.log(res.data);
    //   },
    //   (err) => {
    //     console.log(err.message);
    //   }
    // );
    dispatch(profileAction.getProfileThunk(auth));
  }, []);

  const pn = parsePhoneNumber(profile.data?.noTelp, { regionCode: "ID" });

  return (
    <header className="fixed w-full top-0 flex bg-white shadow-[0_4px_20px_0_rgba(0,0,0,0.05)] rounded-b-3xl global-px py-6 items-center justify-between z-20">
      <h1 className="text-primary text-3xl font-semibold">
        <Link href={"/dashboard"}>FazzPay</Link>
      </h1>
      <aside className="gap-4 hidden md:flex">
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
          <p className="font-semibold text-lg">{_.truncate(`${profile.data?.firstName} ${profile.data?.lastName}`, {length: 20, omission: "..."})}</p>
          {profile.data?.noTelp ? (
            <p className="text-opacity-90 text-sm">{pn.number.international}</p>
          ) : (
            ""
          )}
        </div>
        <div className="flex pl-4 relative" ref={ref}>
          <button className="m-auto" onClick={() => setNotif(!notif)}>
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
          </button>
          <Notification
            className={`absolute right-0 top-16`}
            isOpen={notif}
            onClose={() => {
              setNotif(false);
            }}
          />
        </div>
      </aside>
      <div className="md:hidden">
        <button onClick={() => toggleDrawer()}>
          <svg
            width="25px"
            height="25px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4 5C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H4ZM7 12C7 11.4477 7.44772 11 8 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H8C7.44772 13 7 12.5523 7 12ZM13 18C13 17.4477 13.4477 17 14 17H20C20.5523 17 21 17.4477 21 18C21 18.5523 20.5523 19 20 19H14C13.4477 19 13 18.5523 13 18Z"
              fill="#000000"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}

export default Header;
