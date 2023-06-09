import "react-loading-skeleton/dist/skeleton.css";

import { useCallback, useEffect, useState } from "react";

import { parsePhoneNumber } from "awesome-phonenumber";
import debounce from "lodash/debounce";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";

import DashboardLayout from "@/components/dashboard/Layout";
import { env } from "@/services/env";
import { listUsersAction } from "@/store/slices/listUsers";

function Transfer() {
  const router = useRouter();
  const { filter = "", page = 1, search } = router.query;

  const [form, setForm] = useState({
    searchReceiver: "",
  });
  const [error, setError] = useState({});
  const { auth, listUsers } = useSelector((state) => ({
    auth: state.auth,
    listUsers: state.listUsers,
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      listUsersAction.getListUsersThunk({
        limit: 5,
        search: search,
        page,
        token: auth.token,
      })
    );
  }, [search, page]);

  const changeHandler = (e) => {
    router.push({
      query: {
        ...router.query,
        search: e.target.value,
      },
    });
  };

  const debouncedChangeHandler = useCallback(debounce(changeHandler, 700), []);

  return (
    <DashboardLayout title={"Transfer"}>
      <section className="w-full flex flex-col bg-white rounded-2xl justify-center p-7 gap-5 shadow-card-md">
        <h2 className="text-lg font-semibold">Search Receiver</h2>
        <label
          htmlFor="searchReceiver"
          className={`flex gap-4 px-3 rounded-lg py-3 bg-dark bg-opacity-10 items-center focus-within:border-primary duration-150 focus-within:stroke-primary placeholder-shown:border-gray-400`}
        >
          <svg
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 13L18 18"
              stroke="#A9A9A9"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z"
              stroke="#A9A9A9"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <input
            id="searchReceiver"
            name="searchReceiver"
            type="text"
            className="peer focus:outline-none w-full bg-dark bg-opacity-0"
            value={form.password}
            onChange={debouncedChangeHandler}
            placeholder="Search receiver here"
          />
        </label>
        <section className="flex flex-col gap-5 w-full my-2">
          {listUsers.isLoading && !listUsers.isFulfilled ? (
            Array("", "", "", "").map((index, idx) => (
              <section
                className="w-full flex bg-white rounded-2xl shadow-card-md p-5 gap-5"
                key={idx}
              >
                <div className="avatar">
                  <div className="w-16 h-16 rounded-xl m-auto">
                    <Skeleton width="4rem" height="4rem" />
                  </div>
                </div>
                <div className="flex flex-col justify-evenly">
                  <Skeleton width="6rem" height="1rem" />

                  <Skeleton width="4rem" height="1rem" />
                </div>
              </section>
            ))
          ) : listUsers.data?.length > 0 ? (
            listUsers.data?.map(
              ({ id, firstName, lastName, noTelp, image }, idx) => (
                <Link
                  href={`/dashboard/transfer/${id}`}
                  className="w-full flex bg-white rounded-2xl shadow-card-md p-5 gap-5"
                  key={id}
                >
                  <div className="avatar">
                    <div className="w-16 h-16 rounded-xl m-auto">
                      <Image
                        src={
                          image
                            ? `${env.serverImage}${image}`
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
                      {firstName} {lastName}
                    </p>
                    {noTelp ? (
                      <p className="text-secondary-context text-sm">
                        {
                          parsePhoneNumber(noTelp, { regionCode: "ID" }).number
                            .international
                        }
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                </Link>
              )
            )
          ) : (
            <section className="min-h-[12rem] m-aut flex flex-col items-center justify-center gap-5">
              <svg
                fill="#000000"
                width="100px"
                height="100px"
                viewBox="0 0 24 24"
                id="file-error"
                data-name="Flat Color"
                xmlns="http://www.w3.org/2000/svg"
                className="icon flat-color"
              >
                <path
                  id="primary"
                  d="M17.71,6.29l-4-4A1,1,0,0,0,13,2H4A2,2,0,0,0,2,4V20a2,2,0,0,0,2,2H16a2,2,0,0,0,2-2V7A1,1,0,0,0,17.71,6.29Z"
                  className="fill-secondary-context"
                ></path>
                <path
                  id="secondary"
                  d="M22.5,20.5A1.5,1.5,0,1,1,21,19,1.5,1.5,0,0,1,22.5,20.5ZM22,16V13a1,1,0,0,0-2,0v3a1,1,0,0,0,2,0Z"
                  className="fill-primary"
                ></path>
              </svg>
              <p className="text-dark font-medium">404 Not Found</p>
            </section>
          )}
        </section>
        {(listUsers.isLoading && !listUsers.isFulfilled) ||
        listUsers.data.length < 1 ? (
          ""
        ) : (
          <section className="mt-10 flex justify-center relative gap-5">
            {listUsers.pagination.page > 1 ? (
              <button
                className="btn group bg-primary hover:bg-primary-focus border-0"
                onClick={() =>
                  router.push({
                    query: {
                      ...router.query,
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

            {listUsers.pagination.page < listUsers.pagination.totalPage ? (
              <button
                className="btn group bg-primary hover:bg-primary-focus border-0"
                onClick={() =>
                  router.push({
                    query: {
                      ...router.query,
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
              Page {page} / {listUsers.pagination.totalPage}
            </div>
          </section>
        )}
      </section>
    </DashboardLayout>
  );
}

export default Transfer;
