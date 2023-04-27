import "react-loading-skeleton/dist/skeleton.css";

import { useEffect, useState } from "react";

import Image from "next/image";
import { useRouter } from "next/router";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";

import DashboardLayout from "@/components/dashboard/Layout";
import { env } from "@/services/env";
import { historyAction } from "@/store/slices/history";
import toRupiah from "@develoka/angka-rupiah-js";

function History() {
  const router = useRouter();
  const { filter = "", page = 1 } = router.query;

  const [form, setForm] = useState({
    searchReceiver: "",
  });
  const [error, setError] = useState({});
  const auth = useSelector((state) => state.auth);
  const history = useSelector((state) => state.history);
  const listUsers = useSelector((state) => state.listUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      historyAction.getHistoryThunk({
        page,
        filter,
        limit: 10,
        token: auth.token,
      })
    );
  }, [page, filter, dispatch, auth.token]);

  if (history.isFulfilled && page > history.pagination.totalPage)
    router.push({ query: { page: 1 } });

  if (history.isFulfilled && page < 1) router.push({ query: { page: 1 } });

  const changeHandler = (e) => {
    router.push({
      query: {
        ...router.query,
        search: e.target.value,
      },
    });
  };

  const list = ["", "", "", "", "", "", "", "", ""];

  return (
    <DashboardLayout title={"Transaction History"}>
      <section className="w-full flex flex-col bg-white rounded-2xl justify-center p-7 gap-5 shadow-card-md">
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold">Transaction History</h2>
          <select
            className=" w-full py-3 text-sm rounded-2xl max-w-[12rem] bg-dark bg-opacity-10 appearance-none text-center"
            value={filter}
            onChange={(e) => {
              router.push({
                query: {
                  filter: e.target.value,
                },
              });
            }}
          >
            <option value={""} disabled>
              -- Select Filter --
            </option>
            <option value={"YEAR"}>By Year</option>
            <option value={"MONTH"}>By Month</option>
            <option value={"WEEK"}>By Week</option>
          </select>
        </div>
        <section className="flex flex-col gap-5 w-full my-2">
          <section className="mt-7 flex flex-col gap-10">
            {history.isLoading && !history.isFulfilled
              ? list.map((value, idx) => (
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
                        count={2}
                        style={{ display: "flex", justifyItems: "center" }}
                      ></Skeleton>
                    </div>
                  </div>
                ))
              : history.data.length > 1 &&
                history.data.map(
                  ({ id, fullName, image, amount, type, notes }, idx) => {
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
                        <div className="flex flex-col justify-center gap-1">
                          <p className="font-semibold">{fullName}</p>
                          <p className="text-opacity-70 text-sm font-light">
                            {typeTrans.name}
                          </p>
                        </div>
                        <div className="flex flex-col justify-center gap-1 ml-auto text-right">
                          <p className={`${typeTrans.color} font-medium`}>
                            {typeTrans.sign}
                            {toRupiah(amount || 0, {
                              floatingPoint: 0,
                            })}
                          </p>
                          {notes && <p className="text-sm">{notes}</p>}
                        </div>
                      </div>
                    );
                  }
                )}
          </section>
        </section>
        {history.isLoading && !history.isFulfilled ? (
          ""
        ) : (
          <section className="mt-10 flex justify-center relative gap-5">
            {history.pagination.page > 1 ? (
              <button
                className="btn group bg-primary hover:bg-primary-focus border-0"
                onClick={() =>
                  router.push({
                    query: {
                      page: Number(page) - 1,
                    },
                  })
                }
              >
                ← Prev Page
              </button>
            ) : (
              ""
            )}

            {history.pagination.page < history.pagination.totalPage ? (
              <button
                className="btn group bg-primary hover:bg-primary-focus border-0"
                onClick={() =>
                  router.push({
                    query: {
                      page: Number(page) + 1,
                    },
                  })
                }
              >
                Next Page
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  className=" h-5 ml-2 transition ease-in group-hover:transform group-hover:translate-x-0.5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.83366 10L18.167 10"
                    stroke="#FFF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.0003 1.83365L18.167 10.0003L10.0003 18.167"
                    stroke="#FFF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            ) : (
              ""
            )}

            <div className="absolute right-0 bottom-0 text-sm">
              Page {page} / {history.pagination.totalPage}
            </div>
          </section>
        )}
      </section>
    </DashboardLayout>
  );
}

export default History;
