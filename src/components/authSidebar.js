import Image from 'next/image';
import Link from 'next/link';

function AuthSidebar({ className }) {
  return (
    <aside
      className={`${className} flex flex-col bg-auth text-white global-px pr-2`}
    >
      <header className=" font-semibold text-3xl pt-7">
        <Link href={"/"}>FazzPay</Link>
      </header>
      <section className="flex flex-col justify-center w-full">
        <Image
          src={"/img/app-image-3.png"}
          width={350}
          height={300}
          alt="app-image"
          priority
        ></Image>
        <p className="font-semibold text-2xl mb-4">
          App that Covering Banking Needs.
        </p>
        <p className="max-w-md">
          FazzPay is an application that focussing in banking needs for all
          users in the world. Always updated and always following world trends.
          5000+ users registered in FazzPay everyday with worldwide users
          coverage.
        </p>
      </section>
    </aside>
  );
}

export default AuthSidebar;
