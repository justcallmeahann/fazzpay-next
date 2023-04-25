import { useCallback, useEffect, useState } from "react";

import { parsePhoneNumber } from "awesome-phonenumber";
import debounce from "lodash/debounce";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import DashboardLayout from "@/components/dashboard/Layout";
import { env } from "@/services/env";
import { listUsersAction } from "@/store/slices/listUsers";

function Transfer() {
  const router = useRouter();
  const { search } = router.query;

  const [form, setForm] = useState({
    searchReceiver: "",
  });
  const [error, setError] = useState({});
  const auth = useSelector((state) => state.auth);
  const listUsers = useSelector((state) => state.listUsers);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      listUsersAction.getListUsersThunk({
        limit: 5,
        search: search,
        token: auth.token,
      })
    );
  }, [search]);

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
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z"
              stroke="#A9A9A9"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
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
          {listUsers.isFulfilled === true
            ? listUsers.data.map(
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
                            parsePhoneNumber(noTelp, { regionCode: "ID" })
                              .number.international
                          }
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                  </Link>
                )
              )
            : ""}
        </section>
      </section>
    </DashboardLayout>
  );
}

export default Transfer;
