import 'react-loading-skeleton/dist/skeleton.css';

import { useEffect } from 'react';

import Skeleton from 'react-loading-skeleton';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { historyAction } from '@/store/slices/history';
import toRupiah from '@develoka/angka-rupiah-js';

function Notification({ isOpen, className, onClose }) {
  const history = useSelector((state) => state.history);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(historyAction.getHistoryThunk({ token }));
  }, [isOpen]);

  return (
    <div
      className={`${className} max-w-sm flex flex-col gap-3 w-96 p-5 shadow-card-lg bg-white rounded-xl  transition-opacity duration-500 ${
        isOpen ? `visible opacity-100` : "invisible opacity-0"
      }`}
    >
      {history.isLoading && !history.isFulfilled ? (
        Array("", "", "", "", "").map((value, idx) => (
          <div
            className="flex gap-3 bg-white rounded-xl shadow-card-md p-4"
            key={idx}
          >
            <Skeleton width="3.5rem" height="3.5rem" className="my-auto" />
            <div>
              <Skeleton
                height={15}
                width="8rem"
                count={1}
                style={{ display: "flex", justifyItems: "center" }}
              ></Skeleton>
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
        <section className="flex flex-col items-center justify-center m-auto text-center">
          <svg
            width="40px"
            height="44px"
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
          <p className="font-semibold mt-3">Notification is Empty</p>
        </section>
      ) : (
        history.data.map(({ id, fullName, image, amount, type }, idx) => {
          let typeTrans = {
            name: "",
            sign: "",
            color: "",
          };

          const expenseIcon = (
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
                d="M1.83301 9.99968L9.99968 1.83301L18.1663 9.99968"
                stroke="#FF5B37"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          );

          const incomeIcon = (
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
          );

          switch (type) {
            case "accept":
              typeTrans.name = `Accept from ${fullName}`;
              typeTrans.sign = incomeIcon;
              typeTrans.color = "text-income";
              break;

            case "send":
              typeTrans.name = `Transfer to ${fullName}`;
              typeTrans.sign = expenseIcon;
              typeTrans.color = "text-error";
              break;

            default:
              typeTrans.name = "Topup";
              typeTrans.sign = incomeIcon;
              typeTrans.color = "text-income";

              break;
          }
          return (
            <div
              className="flex gap-3 bg-white rounded-xl shadow-card-md p-4"
              key={id}
            >
              <div className="flex items-center justify-center w-14 h-14">
                <div className="flex items-center justify-center rounded-xl m-auto">
                  {typeTrans.sign}
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-opacity-70 text-sm font-light">
                  {typeTrans.name}
                </p>
                <p className="font-semibold">
                  {toRupiah(amount || 0, {
                    floatingPoint: 0,
                  })}
                </p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default Notification;
