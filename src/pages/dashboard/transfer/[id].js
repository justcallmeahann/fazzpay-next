import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import DashboardLayout from "@/components/dashboard/Layout";
import { listUsersAction } from "@/store/slices/listUsers";
import toRupiah from "@develoka/angka-rupiah-js";

function Transfer() {
  const [form, setForm] = useState({
    amount: 0,
    note: "",
  });
  const [error, setError] = useState({});
  const profile = useSelector((state) => state.profile);
  const auth = useSelector((state) => state.auth);
  const listUsers = useSelector((state) => state.listUsers);
  const [isLoading, setIsLoading] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      listUsersAction.getListUsersThunk({
        limit: 5,
        token: auth.token,
      })
    );
    console.log(listUsers.data);
  }, []);
  return (
    <DashboardLayout title={"Transfer"}>
      <section className="w-full flex flex-col bg-white rounded-2xl justify-center p-7 gap-5 shadow-card-md">
        <h2 className="text-lg font-semibold">Transfer Money</h2>

        <section className="flex flex-col gap-5 w-full my-2">
          {/* {listUsers.isFulfilled === true
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
                      <p className="text-secondary-context text-sm">
                        {
                          parsePhoneNumber(noTelp, { regionCode: "ID" }).number
                            .international
                        }
                      </p>
                    </div>
                  </Link>
                )
              )
            : ""} */}
        </section>

        <p className="max-w-xs text-secondary-context text-md">
          Type the amount you want to transfer and then press continue to the
          next steps.
        </p>

        <div className="group mx-auto max-w-xs flex flex-col gap-7">
          <input
            className="max-w-xs outline-none text-5xl"
            value={form.amount}
            onChange={(e) => {
              if (
                isNaN(e.target.value) ||
                e.target.value > profile.data.balance
              ) {
                return;
              }
              setForm({ ...form, amount: e.target.value });
            }}
          />

          <p className="text-center text-dark text-sm font-semibold">
            {toRupiah(profile.data.balance || 0, { floatingPoint: 0 })}{" "}
            Available
          </p>

          <label
            htmlFor="note"
            className={`border-b-2 ${
              form.note !== ""
                ? error.note
                  ? "border-error stroke-error"
                  : "border-primary stroke-primary"
                : "border-gray-400 stroke-gray-500"
            } flex gap-4 px-1 py-2 items-center focus-within:border-primary duration-150 focus-within:stroke-primary placeholder-shown:border-gray-400`}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 2.0003C16.2626 1.73766 16.5744 1.52932 16.9176 1.38718C17.2608 1.24503 17.6286 1.17188 18 1.17188C18.3714 1.17187 18.7392 1.24503 19.0824 1.38718C19.4256 1.52932 19.7374 1.73766 20 2.0003C20.2626 2.26295 20.471 2.57475 20.6131 2.91791C20.7553 3.26107 20.8284 3.62887 20.8284 4.0003C20.8284 4.37174 20.7553 4.73953 20.6131 5.08269C20.471 5.42585 20.2626 5.73766 20 6.0003L6.5 19.5003L1 21.0003L2.5 15.5003L16 2.0003Z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <input
              id="note"
              name="note"
              type="text"
              className="peer focus:outline-none w-full"
              value={form.note}
              onChange={(e) => {
                setForm({ ...form, note: e.target.value });
              }}
              placeholder="Add some notes"
              required
            />
          </label>
          <button
            type="submit"
            className={`submit mt-5 btn btn-block bg-primary border-2 border-white capitalize hover:bg-primary-focus hover:border-gray-200 ${
              isLoading ? "loading" : ""
            }`}
            disabled={form.amount < 1 || (isLoading && true)}
          >
            Change Password
          </button>
        </div>
      </section>
    </DashboardLayout>
  );
}

export default Transfer;
