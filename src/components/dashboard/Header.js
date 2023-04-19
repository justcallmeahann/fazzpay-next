import Image from 'next/image';
import Link from 'next/link';

function Header() {
  return (
    <header className="fixed w-full top-0 flex bg-white shadow-[0_4px_20px_0_rgba(0,0,0,0.05)] rounded-b-3xl global-px py-6 items-center justify-between z-20">
      <h1 className="text-primary text-3xl font-semibold">
        <Link href={"/"}>FazzPay</Link>
      </h1>
      <aside className="flex gap-4">
        <div className="avatar">
          <div className="w-11 h-11 rounded-xl m-auto">
            <Image src="/img/profile.png" alt="" width={40} height={40} />
          </div>
        </div>
        <div className="text-dark">
          <p className="font-semibold text-lg">Foo Bar</p>
          <p className="text-opacity-90 text-sm">+62 8139 3877 7946</p>
        </div>
        <div className="m-auto pl-4">
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
        </div>
      </aside>
    </header>
  );
}

export default Header;
