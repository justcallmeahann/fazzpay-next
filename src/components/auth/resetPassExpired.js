import Link from "next/link";

function ResetPassExpired({ className }) {
  return (
    <section className={className}>
      <svg
        version="1.1"
        id="Capa_1"
        width="70"
        height="70"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 50 50"
        xmlSpace="preserve"
      >
        <circle fill="#D75A4A" cx="25" cy="25" r="25" />
        <polyline
          fill="none"
          stroke="white"
          strokeWidth={2}
          strokeLinecap="round"
          strokeMiterlimit={10}
          points="16,34 25,25 34,16 
	"
        />
        <polyline
          fill="none"
          stroke="white"
          strokeWidth={2}
          strokeLinecap="round"
          strokeMiterlimit={10}
          points="16,16 25,25 34,34 
	"
        />
      </svg>
      <h2 className="font-semibold text-2xl text-dark">
        Link Reset Password Expired
      </h2>
      <p className="text-dark text-opacity-60">
        Your link is expired, please request reset password again.
      </p>
      <Link
        className="btn btn-block bg-primary border-2 border-white capitalize hover:bg-primary-focus hover:border-gray-200"
        href={"/auth/forgotpass"}
      >
        Go to Forgot Password
      </Link>
    </section>
  );
}

export default ResetPassExpired;
