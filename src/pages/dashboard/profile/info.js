import { useState } from 'react';

import { parsePhoneNumber } from 'awesome-phonenumber';
import Link from 'next/link';
import { useSelector } from 'react-redux';

import DashboardLayout from '@/components/dashboard/Layout';
import ChangeName from '@/components/dashboard/profile/ChangeName';

function PersonalInformation() {
  const profile = useSelector((state) => state.profile.data);

  const [modal, setModal] = useState(false);

  const toggleModal = () => setModal(!modal);

  const list = [
    {
      name: "First Name",
      url: "",
      edit: toggleModal,
      value: profile.firstName,
    },
    {
      name: "Last Name",
      url: "",
      value: profile.lastName,
    },
    {
      name: "Verified E-mail",
      url: "",
      value: profile.email,
    },
    {
      name: "Phone Number",
      url: "/dashboard/profile/phone-number",
      value: profile.noTelp
        ? parsePhoneNumber(profile.noTelp, { regionCode: "ID" }).number
            .international
        : "empty",
    },
  ];

  return (
    <DashboardLayout title={"Personal Information"}>
      <section className="w-full flex flex-col bg-white rounded-2xl justify-center p-7 gap-2 shadow-card-md">
        <h2 className="text-lg font-semibold">Personal Information</h2>
        <p className="max-w-sm">
          We got your personal information from the sign up proccess. If you
          want to make changes on your information, contact our support.
        </p>
        <div className="flex flex-col gap-5 my-4 w-full">
          {list.map(({ name, url, value, edit }, idx) => (
            <div
              className="w-full shadow-card-md bg-white p-4 rounded-xl flex items-center justify-between"
              key={idx}
            >
              <div className="flex flex-col gap-2">
                <p className="text-secondary-context text-sm">{name}</p>
                <p
                  className={`text-dark text-xl font-semibold ${
                    idx === 2 ? "text-secondary-context" : ""
                  }`}
                >
                  {value}
                </p>
              </div>
              {url ? (
                <div className="ml-auto text-md text-primary">
                  <Link href={url}>Manage</Link>
                </div>
              ) : edit ? (
                <div className="ml-auto text-md text-primary">
                  <button onClick={edit}>Edit</button>
                </div>
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      </section>
      <ChangeName isOpen={modal} onClose={toggleModal} />
    </DashboardLayout>
  );
}

export default PersonalInformation;
