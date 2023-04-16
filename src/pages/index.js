import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import Layout from "@/components/layout";

export default function Home() {
  const [scrollOpacity, setScrollOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollPercent = scrollTop / window.innerHeight;
      setScrollOpacity(scrollPercent.toFixed(2));
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const d = new Date();
  let year = d.getFullYear();

  return (
    <Layout title={"Fazzpay"}>
      <header
        className={`fixed w-full z-10 bg-primary duration-300  ${
          scrollOpacity > 0 ? "bg-opacity-90 backdrop-blur-sm" : "bg-opacity-0"
        }`}
      >
        <div className="w-full flex global-px py-6 items-center justify-between text-white">
          <h1 className="text-3xl font-semibold">
            <Link href={"/"}>FazzPay</Link>
          </h1>
          <div className="flex gap-7">
            <Link
              className="btn bg-primary border-2 border-white capitalize text-lg px-8 hover:bg-primary-focus hover:border-gray-200"
              href={"/auth/login"}
            >
              Login
            </Link>
            <Link
              className="btn bg-white border-0 hover:bg-gray-200 text-lg text-primary capitalize px-8"
              href={"/auth/signup"}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      <section className="h-screen min-h-[635px] bg-first-content text-white flex global-px items-center gap-14 relative select-none">
        <div className="flex-1 flex flex-col gap-y-10">
          <h2 className="font-bold text-6xl leading-snug pr-10">
            Awesome App For Saving Time.
          </h2>
          <p className="text-lg">
            We bring you a mobile app for banking problems that oftenly wasting
            much of your times.
          </p>
          <p>
            <button className="btn bg-white border-0 hover:bg-gray-200 text-lg text-primary capitalize px-8">
              Try It Free
            </button>
          </p>
        </div>
        <div className="flex-1">
          <div className="relative h-screen ">
            <Image
              src="/img/app-mobile-first-content.png"
              alt="mobile-app"
              fill
              style={{
                objectFit: "cover",
                objectPosition: "10% -15%",
              }}
              priority
              className="drop-shadow-sm"
            />
          </div>
        </div>
      </section>

      <section className="bg-primary bg-opacity-10 global-px items-center h-[300px] flex justify-between">
        {/* microsoft */}
        <svg
          width="131"
          height="77"
          viewBox="0 0 131 77"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M131 62.5072V59.3188H127.04V54.3618L126.907 54.4028L123.188 55.5406L123.115 55.5629V59.3188H117.245V57.2267C117.245 56.2524 117.463 55.5068 117.892 55.0096C118.319 54.5183 118.929 54.2686 119.706 54.2686C120.265 54.2686 120.844 54.4004 121.427 54.6601L121.573 54.7253V51.3673L121.504 51.3421C120.961 51.1468 120.221 51.0483 119.305 51.0483C118.15 51.0483 117.101 51.2996 116.186 51.7977C115.27 52.2964 114.55 53.0085 114.045 53.9139C113.542 54.8182 113.287 55.8626 113.287 57.0184V59.3188H110.53V62.5072H113.287V75.9396H117.245V62.5072H123.115V71.0434C123.115 74.5589 124.773 76.3406 128.043 76.3406C128.581 76.3406 129.146 76.2774 129.724 76.154C130.312 76.0275 130.712 75.901 130.948 75.766L131 75.7353V72.5172L130.839 72.6238C130.624 72.7672 130.357 72.884 130.043 72.9708C129.728 73.0594 129.465 73.1039 129.261 73.1039C128.495 73.1039 127.928 72.8974 127.577 72.49C127.221 72.079 127.04 71.3599 127.04 70.3543V62.5072H131ZM101.691 73.1042C100.255 73.1042 99.1222 72.6278 98.324 71.6895C97.521 70.7464 97.1141 69.4019 97.1141 67.6936C97.1141 65.9312 97.521 64.5518 98.3245 63.5921C99.1231 62.6386 100.245 62.1548 101.659 62.1548C103.032 62.1548 104.124 62.6169 104.906 63.5291C105.693 64.446 106.092 65.8144 106.092 67.5974C106.092 69.4023 105.717 70.7887 104.977 71.716C104.242 72.6366 103.137 73.1042 101.691 73.1042ZM101.868 58.9183C99.1268 58.9183 96.9499 59.7214 95.398 61.3053C93.8469 62.8894 93.0603 65.0815 93.0603 67.8214C93.0603 70.4237 93.8281 72.5169 95.3423 74.0418C96.8565 75.5675 98.9173 76.3402 101.467 76.3402C104.124 76.3402 106.257 75.526 107.809 73.9202C109.36 72.3158 110.146 70.1446 110.146 67.4687C110.146 64.8257 109.408 62.7169 107.953 61.202C106.497 59.6865 104.449 58.9183 101.868 58.9183ZM86.6789 58.9182C84.8146 58.9182 83.2725 59.3951 82.0944 60.3353C80.9092 61.2811 80.3081 62.5217 80.3081 64.0228C80.3081 64.803 80.4379 65.4962 80.6933 66.084C80.9502 66.6739 81.3479 67.193 81.876 67.6289C82.4004 68.0612 83.2094 68.5141 84.2819 68.9747C85.1831 69.3456 85.8555 69.6596 86.2825 69.9069C86.7 70.1491 86.9963 70.3929 87.1636 70.6301C87.3261 70.8623 87.4087 71.1799 87.4087 71.5724C87.4087 72.6889 86.5726 73.2321 84.8518 73.2321C84.2137 73.2321 83.4856 73.0991 82.688 72.8362C81.8901 72.5738 81.1445 72.1965 80.4723 71.7127L80.3081 71.5949V75.4054L80.3684 75.4334C80.9285 75.6919 81.6344 75.9098 82.4666 76.0815C83.2973 76.2531 84.0519 76.3406 84.7076 76.3406C86.7306 76.3406 88.3597 75.8614 89.5484 74.9156C90.7447 73.9633 91.3511 72.6935 91.3511 71.1403C91.3511 70.02 91.0247 69.0591 90.3812 68.2844C89.7424 67.5157 88.6335 66.8103 87.0867 66.1866C85.8544 65.692 85.0649 65.2814 84.7394 64.9663C84.4254 64.6618 84.2661 64.2312 84.2661 63.686C84.2661 63.2026 84.4627 62.8155 84.8668 62.5017C85.2739 62.1865 85.8403 62.0262 86.5511 62.0262C87.2105 62.0262 87.8853 62.1304 88.5562 62.3345C89.2268 62.5386 89.8156 62.812 90.3074 63.1465L90.4689 63.257V59.6423L90.4069 59.6156C89.9533 59.4211 89.3552 59.2547 88.6289 59.1197C87.9055 58.986 87.2493 58.9182 86.6789 58.9182ZM69.9899 73.1042C68.5537 73.1042 67.4207 72.6278 66.6227 71.6895C65.8195 70.7464 65.4132 69.4023 65.4132 67.6936C65.4132 65.9312 65.8199 64.5518 66.6236 63.5921C67.4216 62.6386 68.5432 62.1548 69.9581 62.1548C71.33 62.1548 72.4224 62.6169 73.2051 63.5291C73.9917 64.446 74.3907 65.8144 74.3907 67.5974C74.3907 69.4023 74.0151 70.7887 73.275 71.716C72.5402 72.6366 71.4355 73.1042 69.9899 73.1042ZM70.1666 58.9183C67.4251 58.9183 65.2482 59.7214 63.6969 61.3053C62.1458 62.8894 61.3588 65.0815 61.3588 67.8214C61.3588 70.4248 62.127 72.5169 63.6412 74.0418C65.1554 75.5675 67.216 76.3402 69.7656 76.3402C72.4218 76.3402 74.556 75.526 76.1075 73.9202C77.6583 72.3158 78.4447 70.1446 78.4447 67.4687C78.4447 64.8257 77.707 62.7169 76.2515 61.202C74.7952 59.6865 72.7478 58.9183 70.1666 58.9183ZM55.3508 62.197V59.3188H51.441V75.9392H55.3508V67.4373C55.3508 65.9914 55.6785 64.8039 56.3252 63.9068C56.9638 63.0204 57.8149 62.5712 58.8538 62.5712C59.2059 62.5712 59.6012 62.6293 60.0293 62.7442C60.4531 62.8584 60.76 62.9823 60.9411 63.1127L61.1053 63.2318V59.2903L61.0419 59.2631C60.6778 59.1083 60.1628 59.0303 59.5111 59.0303C58.5287 59.0303 57.6494 59.3459 56.8963 59.9675C56.2353 60.5138 55.7574 61.2629 55.3922 62.197H55.3508ZM44.4396 58.9182C42.6461 58.9182 41.0462 59.303 39.6852 60.0611C38.3216 60.8209 37.2671 61.9059 36.5496 63.2855C35.8353 64.6618 35.4727 66.2694 35.4727 68.0621C35.4727 69.6324 35.8243 71.0736 36.5193 72.3436C37.2147 73.6158 38.199 74.6111 39.4449 75.3014C40.689 75.9909 42.127 76.3406 43.719 76.3406C45.577 76.3406 47.1633 75.969 48.4353 75.2365L48.4866 75.207V71.6252L48.3224 71.7451C47.7462 72.1647 47.1024 72.4997 46.4096 72.7411C45.7186 72.9822 45.0885 73.1041 44.5363 73.1041C43.0021 73.1041 41.7707 72.624 40.8767 71.6778C39.9807 70.7301 39.5265 69.3996 39.5265 67.7251C39.5265 66.0401 40.0002 64.6754 40.9339 63.6683C41.8645 62.6642 43.0984 62.1549 44.6007 62.1549C45.8859 62.1549 47.1381 62.5901 48.3228 63.4495L48.4866 63.5685V59.7945L48.4337 59.7647C47.9878 59.5152 47.3799 59.3091 46.6249 59.1528C45.8734 58.9969 45.1383 58.9182 44.4396 58.9182ZM32.78 59.3188H28.8703V75.9392H32.78V59.3188ZM30.865 52.2384C30.2216 52.2384 29.6604 52.4574 29.1993 52.8914C28.7363 53.3268 28.5013 53.8749 28.5013 54.5216C28.5013 55.1583 28.7335 55.6963 29.1919 56.12C29.6474 56.5425 30.2104 56.7567 30.865 56.7567C31.5194 56.7567 32.0846 56.5425 32.5456 56.1207C33.0098 55.6963 33.245 55.1583 33.245 54.5216C33.245 53.8975 33.0161 53.3549 32.5647 52.909C32.114 52.4639 31.542 52.2384 30.865 52.2384ZM21.1102 58.0926V75.9391H25.1002V52.7473H19.578L12.5588 69.9735L5.74709 52.7473H0V75.9391H3.74948V58.0908H3.87839L11.0713 75.9391H13.9009L20.9815 58.0926H21.1102Z"
            fill="#BDC2FA"
          />
          <path
            d="M61.9579 19.1449H43.5659V0.75293H61.9579V19.1449Z"
            fill="#BDC2FA"
          />
          <path
            d="M82.2646 19.1449H63.8728V0.75293H82.2646V19.1449Z"
            fill="#BDC2FA"
          />
          <path
            d="M61.9575 39.4594H43.5659V21.0674H61.9575V39.4594Z"
            fill="#BDC2FA"
          />
          <path
            d="M82.2646 39.4594H63.8728V21.0674H82.2646V39.4594Z"
            fill="#BDC2FA"
          />
        </svg>
        {/* dropbox */}
        <svg
          width="132"
          height="81"
          viewBox="0 0 132 81"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M66.9717 7.56283L55.3385 15.0798L66.9717 22.5967L55.3385 30.1136L43.7053 22.534L55.3385 15.0171L43.7053 7.56283L55.3385 0.0458984L66.9717 7.56283ZM55.2767 32.494L66.9099 24.9771L78.5431 32.494L66.9099 40.0109L55.2767 32.494ZM66.9717 22.534L78.6049 15.0171L66.9717 7.56283L78.5431 0.0458984L90.1763 7.56283L78.5431 15.0798L90.1763 22.5967L78.5431 30.1136L66.9717 22.534Z"
            fill="#BDC2FA"
          />
          <path
            d="M0.975098 51.7307H9.47885C14.9056 51.7307 19.3812 54.8637 19.3812 62.0247V63.5352C19.3812 70.7522 15.1853 73.9971 9.64669 73.9971H0.975098V51.7307ZM5.73049 55.7588V69.9131H9.36696C12.444 69.9131 14.514 67.899 14.514 63.4234V62.2485C14.514 57.7728 12.3321 55.7588 9.19912 55.7588H5.73049ZM21.8988 55.9826H25.7031L26.3185 60.1785C27.0458 57.3253 28.892 55.8147 32.2488 55.8147H33.4236V60.6261H31.4655C27.6053 60.6261 26.6542 61.9688 26.6542 65.7731V74.053H21.9547V55.9826H21.8988ZM34.3747 65.3815V64.8779C34.3747 58.8358 38.235 55.535 43.4939 55.535C48.8646 55.535 52.613 58.8358 52.613 64.8779V65.3815C52.613 71.3117 48.9765 74.5006 43.4939 74.5006C37.6755 74.4447 34.3747 71.3117 34.3747 65.3815ZM47.8017 65.3255V64.8779C47.8017 61.5212 46.1233 59.5071 43.4379 59.5071C40.8085 59.5071 39.0741 61.3534 39.0741 64.8779V65.3255C39.0741 68.5704 40.7525 70.4166 43.4379 70.4166C46.1233 70.3606 47.8017 68.5704 47.8017 65.3255ZM55.0746 55.9826H58.9908L59.4384 59.3953C60.3895 57.1015 62.4035 55.535 65.3686 55.535C69.9562 55.535 72.9773 58.8358 72.9773 64.9339V65.4374C72.9773 71.3676 69.6205 74.5006 65.3686 74.5006C62.5154 74.5006 60.5573 73.2139 59.6062 71.1439V80.263H55.0187L55.0746 55.9826ZM68.2219 65.3255V64.9339C68.2219 61.3534 66.3757 59.5631 63.9141 59.5631C61.2846 59.5631 59.5503 61.5771 59.5503 64.9339V65.2696C59.5503 68.4585 61.2287 70.4725 63.8581 70.4725C66.5435 70.4166 68.2219 68.6823 68.2219 65.3255ZM79.9145 70.6963L79.5229 73.9971H75.4948V49.9404H80.0824V59.1715C81.0894 56.8218 83.1034 55.535 85.9567 55.535C90.2645 55.5909 93.4534 58.5561 93.4534 64.5423V65.1017C93.4534 71.0879 90.4323 74.5006 85.8448 74.5006C82.8237 74.4447 80.8656 73.046 79.9145 70.6963ZM88.6421 65.1017V64.6542C88.6421 61.3534 86.8518 59.5071 84.3342 59.5071C81.7607 59.5071 79.9705 61.5771 79.9705 64.7101V65.1017C79.9705 68.4585 81.7048 70.4166 84.2783 70.4166C87.0196 70.4166 88.6421 68.6823 88.6421 65.1017ZM95.4675 65.3815V64.8779C95.4675 58.8358 99.3277 55.535 104.587 55.535C109.957 55.535 113.706 58.8358 113.706 64.8779V65.3815C113.706 71.3117 110.013 74.5006 104.587 74.5006C98.7682 74.4447 95.4675 71.3117 95.4675 65.3815ZM108.95 65.3255V64.8779C108.95 61.5212 107.272 59.5071 104.587 59.5071C101.957 59.5071 100.223 61.3534 100.223 64.8779V65.3255C100.223 68.5704 101.901 70.4166 104.587 70.4166C107.272 70.3606 108.95 68.5704 108.95 65.3255ZM119.86 64.6542L113.538 55.9826H118.965L122.601 61.4093L126.294 55.9826H131.664L125.231 64.5982L132 73.9971H126.685L122.545 68.0109L118.517 73.9971H112.978L119.86 64.6542Z"
            fill="#BDC2FA"
          />
        </svg>
        {/* h&m */}
        <svg
          width="103"
          height="69"
          viewBox="0 0 103 69"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M72.4847 3.04133C76.2136 1.20992 78.0615 1.45025 78.1031 3.30658C78.1529 5.71804 77.7964 8.92483 77.5394 11.2452C76.1555 23.8566 73.8435 34.1619 73.6695 47.1105C79.7602 31.3427 84.8648 20.3837 91.4444 6.8864C93.5328 2.58558 94.8668 3.38945 96.5821 2.62701C103.261 -0.347839 103.51 1.47517 102.64 5.11308C99.3996 18.5872 91.1045 61.0113 89.8369 67.5438C89.4721 69.4339 87.4172 68.6326 86.8867 67.8935C84.5086 64.6037 81.8237 64.5523 82.1219 62.3646C83.6136 51.4734 88.9832 24.1475 90.3838 17.7087C83.2488 32.3363 75.8489 50.6224 72.0453 60.9907C71.2414 63.1924 69.7747 63.0309 68.8633 61.42C67.5788 59.157 65.0846 58.0017 64.6701 55.3276C63.3692 46.8256 66.1618 30.6202 66.5511 20.3679C62.6649 31.5673 56.1432 53.3106 53.2843 63.1343C52.1077 67.199 48.1797 66.5359 49.2238 62.5743C53.5659 46.0879 62.9217 16.9298 66.9655 6.44716C67.9189 3.97761 70.413 4.06047 72.4847 3.04133Z"
            fill="#BDC2FA"
          />
          <path
            d="M48.8017 1.01952C47.5422 0.712981 43.8878 2.68521 41.642 3.07461C40.9294 3.19891 40.2498 3.95294 40.0095 4.4917C36.413 12.7535 33.1896 20.6291 30.397 27.8036C26.8254 28.4135 22.6491 29.2165 17.9754 30.2663C21.3231 21.6789 24.7042 13.2091 28.0022 5.06335C29.6263 1.05255 25.3505 0.671409 23.6931 4.73189C21.5385 10.0106 17.5029 19.9007 13.0364 31.4282C9.75485 32.2328 6.27454 33.1525 2.63664 34.2034C-0.00690174 34.9666 -0.114492 35.6709 1.02909 37.2562C1.65883 38.1389 2.95985 38.0499 3.55642 38.6789C5.09781 40.309 6.03421 42.2588 8.7935 42.5538C6.33235 49.1375 3.87123 55.9268 1.64216 62.4641C0.241727 66.5676 4.22756 67.407 5.76069 63.0647C8.2301 56.065 10.8321 48.9807 13.5087 41.9173C15.7378 41.3993 21.1323 40.2374 26.1126 39.1569C22.1599 49.9908 19.5577 58.2186 18.5718 62.2236C18.3895 62.9942 18.696 63.4218 18.8618 63.7359C20.1959 65.6774 21.4638 65.757 23.1791 68.1576C23.6433 68.8122 25.2012 69.1652 25.7314 67.5535C29.3941 56.4899 33.1646 46.1093 36.6781 36.8033C38.1364 36.4843 40.7633 35.8504 42.3709 33.4514C45.2297 29.1936 46.0501 30.0572 46.7381 28.7628C47.5999 27.1378 47.028 25.6122 43.9786 25.9891C43.9786 25.9891 42.8268 26.0711 40.6971 26.3139C44.078 17.6089 47.0363 10.2254 49.166 4.5989C49.8955 2.69346 49.9867 1.30129 48.8017 1.01952Z"
            fill="#BDC2FA"
          />
          <path
            d="M43.8133 57.4803C44.6006 59.4699 47.0617 58.8674 46.1253 56.466C45.1722 54.0197 42.8023 46.6553 42.1807 44.2828C41.3355 41.0859 44.9982 41.9602 43.142 44.0502C41.5511 45.8474 40.4902 46.5675 37.5485 49.985C34.7062 53.2839 35.4769 57.5649 38.5181 58.5104C41.9487 59.5776 44.9735 55.7973 46.8462 53.0239C48.6609 50.3382 46.9041 48.7629 45.0728 50.3506C43.896 51.3715 42.537 52.9392 41.1614 53.7845C40.0427 54.4648 39.1643 53.734 40.656 51.6806C42.3879 49.3032 44.3269 47.3112 45.7688 45.0645C48.7106 40.4862 42.8933 37.847 40.3907 40.8209C39.0482 42.4062 39.388 43.9625 39.7527 45.2982C40.3411 47.4378 42.5288 54.2677 43.8133 57.4803Z"
            fill="#BDC2FA"
          />
        </svg>
        {/* airbnb */}
        <svg
          width="150"
          height="46"
          viewBox="0 0 150 46"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M79.0482 11.5283C79.0482 13.1859 77.6697 14.5422 75.985 14.5422C74.3002 14.5422 72.9218 13.1859 72.9218 11.5283C72.9218 9.8706 74.2236 8.51433 75.985 8.51433C77.7463 8.55201 79.0482 9.90827 79.0482 11.5283ZM66.489 17.5561C66.489 17.8198 66.489 18.3096 66.489 18.3096C66.489 18.3096 65.034 16.4636 61.9325 16.4636C56.8399 16.4636 52.8195 20.3063 52.8195 25.5807C52.8195 30.855 56.7633 34.6978 61.9325 34.6978C65.0723 34.6978 66.489 32.8141 66.489 32.8141V33.6052C66.489 33.982 66.757 34.2457 67.14 34.2457H70.9307V16.9156C70.9307 16.9156 67.4463 16.9156 67.14 16.9156C66.757 16.9156 66.489 17.2547 66.489 17.5561ZM66.489 28.6699C65.7998 29.6871 64.3831 30.5536 62.6983 30.5536C59.7117 30.5536 57.4143 28.7076 57.4143 25.5807C57.4143 22.4537 59.7117 20.6077 62.6983 20.6077C64.3448 20.6077 65.8381 21.5119 66.489 22.4914V28.6699ZM73.7641 16.9156H78.2824V34.2457H73.7641V16.9156ZM140.963 16.4636C137.862 16.4636 136.407 18.3096 136.407 18.3096V8.58968H131.889V34.2834C131.889 34.2834 135.373 34.2834 135.679 34.2834C136.062 34.2834 136.33 33.9443 136.33 33.6429V32.8518C136.33 32.8518 137.785 34.7355 140.887 34.7355C145.979 34.7355 150 30.855 150 25.6183C150.038 20.344 146.018 16.4636 140.963 16.4636ZM140.236 30.516C138.513 30.516 137.134 29.6495 136.445 28.6323V22.4537C137.134 21.5496 138.666 20.57 140.236 20.57C143.222 20.57 145.52 22.4161 145.52 25.543C145.52 28.6699 143.222 30.516 140.236 30.516ZM129.591 23.9607V34.2834H125.073V24.4881C125.073 21.6249 124.154 20.457 121.588 20.457C120.21 20.457 118.832 21.1351 117.951 22.1523V34.2457H113.433V16.9156H116.994C117.377 16.9156 117.645 17.2547 117.645 17.5561V18.3096C118.946 16.9533 120.708 16.4636 122.431 16.4636C124.384 16.4636 126.03 17.0287 127.37 18.1212C128.978 19.4021 129.591 21.0598 129.591 23.9607ZM102.52 16.4636C99.4185 16.4636 97.9635 18.3096 97.9635 18.3096V8.58968H93.4453V34.2834C93.4453 34.2834 96.9297 34.2834 97.236 34.2834C97.6189 34.2834 97.8869 33.9443 97.8869 33.6429V32.8518C97.8869 32.8518 99.3419 34.7355 102.443 34.7355C107.536 34.7355 111.556 30.855 111.556 25.6183C111.633 20.344 107.651 16.4636 102.52 16.4636ZM101.792 30.516C100.069 30.516 98.691 29.6495 98.0018 28.6323V22.4537C98.691 21.5496 100.223 20.57 101.792 20.57C104.779 20.57 107.077 22.4161 107.077 25.543C107.077 28.6699 104.779 30.516 101.792 30.516ZM89.578 16.4636C90.9564 16.4636 91.6456 16.6896 91.6456 16.6896V20.7961C91.6456 20.7961 87.8932 19.5528 85.5575 22.19V34.321H81.0393V16.9156C81.0393 16.9156 84.5237 16.9156 84.83 16.9156C85.2129 16.9156 85.4809 17.2547 85.4809 17.5561V18.3096C86.3616 17.3301 88.1995 16.4636 89.578 16.4636ZM42.864 32.7011C42.6343 32.136 42.4045 31.5332 42.1748 31.0434C41.7919 30.2146 41.409 29.4234 41.1027 28.7076L41.0644 28.6699C37.848 21.7379 34.3636 14.7305 30.6878 7.8362L30.5346 7.57248C30.1517 6.89435 29.7688 6.14087 29.4242 5.38739C28.9647 4.55856 28.5052 3.69205 27.7394 2.86323C26.2461 1.0172 24.1019 0 21.8045 0C19.4688 0 17.3628 1.0172 15.7929 2.75021C15.1037 3.57903 14.5676 4.44554 14.1082 5.27436C13.7253 6.02785 13.3424 6.74365 12.9977 7.45946L12.8446 7.72318C9.24532 14.6552 5.72263 21.6626 2.46797 28.5569L2.42968 28.6323C2.08507 29.3857 1.74046 30.1392 1.35756 30.9681C1.12782 31.4578 0.898077 32.0229 0.668336 32.6257C0.0556947 34.321 -0.135756 35.941 0.0939848 37.5987C0.591756 41.0647 2.96574 43.9656 6.18211 45.2465C7.40739 45.7363 8.67097 46 9.97283 46C10.3557 46 10.8152 45.9623 11.1981 45.9246C12.7297 45.7363 14.3379 45.2465 15.8695 44.3423C17.784 43.2875 19.6219 41.7428 21.6896 39.5577C23.7573 41.7805 25.6335 43.2875 27.5097 44.3423C29.0413 45.2088 30.6495 45.7363 32.1811 45.9246C32.564 45.9623 33.0235 46 33.4064 46C34.7082 46 36.0484 45.774 37.1971 45.2465C40.49 43.9656 42.7874 40.9894 43.2852 37.5987C43.6681 36.0164 43.4767 34.3964 42.864 32.7011ZM21.7279 35.0745C19.2007 31.9476 17.5543 28.9713 16.9799 26.4848C16.7502 25.43 16.7119 24.4881 16.8268 23.6593C16.9033 22.9058 17.2097 22.2654 17.5926 21.7379C18.4732 20.4947 19.9665 19.7035 21.7279 19.7035C23.4892 19.7035 25.0208 20.457 25.8632 21.7379C26.2461 22.303 26.5142 22.9435 26.629 23.6593C26.7822 24.4881 26.7056 25.4676 26.4759 26.4848C25.9015 28.9713 24.255 31.9099 21.7279 35.0745ZM40.4135 37.2596C40.0688 39.6708 38.4607 41.7428 36.1633 42.647C35.0528 43.0991 33.8276 43.2498 32.6023 43.0991C31.4153 42.9484 30.2666 42.6093 29.0413 41.8935C27.3565 40.9893 25.6718 39.5577 23.6807 37.4103C26.7822 33.6806 28.6584 30.2523 29.3476 27.2007C29.6922 25.769 29.7305 24.4881 29.5774 23.2826C29.3859 22.1147 28.9647 21.0598 28.3138 20.1556C26.8588 18.0835 24.4082 16.878 21.6896 16.878C18.971 16.878 16.5204 18.1212 15.0654 20.1556C14.4145 21.0598 13.9933 22.1523 13.8018 23.2826C13.6104 24.4881 13.6487 25.8067 14.0316 27.2007C14.7208 30.2523 16.6736 33.7183 19.6985 37.448C17.784 39.5577 16.061 40.9894 14.3379 41.9312C13.1126 42.6093 11.9639 42.9861 10.7769 43.1368C9.51335 43.2875 8.28807 43.0991 7.21594 42.6847C4.91854 41.7805 3.27206 39.6708 2.96574 37.2973C2.81258 36.1294 2.92745 34.9992 3.38693 33.7183C3.54009 33.2662 3.76983 32.8141 3.99958 32.249C4.34419 31.4955 4.6888 30.742 5.0717 29.9509L5.10999 29.8755C8.32636 23.0188 11.8108 15.9738 15.41 9.15479L15.5632 8.89107C15.9461 8.21294 16.329 7.45946 16.6736 6.78133C17.0565 6.02785 17.4777 5.34971 17.9755 4.74693C18.971 3.65438 20.2729 3.0516 21.7279 3.0516C23.1829 3.0516 24.4848 3.65438 25.4803 4.74693C25.9781 5.34971 26.3993 6.02785 26.7822 6.78133C27.1651 7.45946 27.548 8.21294 27.8926 8.89107L28.0458 9.15479C31.6067 16.0115 35.0911 23.0565 38.3075 29.9132V29.9509C38.6904 30.7043 38.9967 31.5332 39.3796 32.249C39.6094 32.8141 39.8391 33.2662 39.9923 33.7183C40.4517 34.8862 40.6049 36.0541 40.4135 37.2596Z"
            fill="#BDC2FA"
          />
        </svg>
      </section>

      <section className="global-px py-28 text-dark flex flex-col text-center gap-8 justify-center">
        <h2 className="font-bold text-6xl">
          <span className="text-primary">About</span> the Application.
        </h2>
        <p className="text-lg max-w-xl m-auto">
          We have some great features from the application and it’s totally free
          to use by all users around the world.
        </p>
        <div className="container flex gap-4">
          {[
            [
              <svg
                width="60"
                height="60"
                viewBox="0 0 60 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                key={"svg-support"}
              >
                <circle
                  cx="30"
                  cy="30"
                  r="30"
                  fill="#6256E1"
                  fillOpacity="0.1"
                />
                <path
                  d="M42.5 36.1501V39.9001C42.5015 40.2482 42.4301 40.5928 42.2907 40.9118C42.1512 41.2308 41.9467 41.5171 41.6901 41.7525C41.4336 41.9878 41.1308 42.167 40.801 42.2785C40.4712 42.39 40.1218 42.4315 39.775 42.4001C35.9286 41.9822 32.2338 40.6678 28.9875 38.5626C25.9673 36.6435 23.4067 34.0828 21.4875 31.0626C19.375 27.8016 18.0603 24.0889 17.65 20.2251C17.6188 19.8795 17.6599 19.5311 17.7707 19.2022C17.8814 18.8732 18.0595 18.571 18.2935 18.3146C18.5275 18.0583 18.8123 17.8535 19.1298 17.7133C19.4473 17.573 19.7905 17.5004 20.1375 17.5001H23.8875C24.4942 17.4942 25.0823 17.709 25.5422 18.1045C26.0022 18.5001 26.3026 19.0494 26.3875 19.6501C26.5458 20.8502 26.8394 22.0285 27.2625 23.1626C27.4307 23.61 27.4671 24.0963 27.3674 24.5637C27.2677 25.0312 27.0361 25.4603 26.7 25.8001L25.1125 27.3876C26.892 30.5171 29.4831 33.1082 32.6125 34.8876L34.2 33.3001C34.5399 32.964 34.969 32.7324 35.4364 32.6327C35.9039 32.533 36.3901 32.5694 36.8375 32.7376C37.9716 33.1608 39.15 33.4543 40.35 33.6126C40.9572 33.6983 41.5118 34.0041 41.9082 34.472C42.3046 34.9399 42.5152 35.5371 42.5 36.1501Z"
                  stroke="#6379F4"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>,
              "24/7 Support",
              `We have 24/7 contact support so you can contact us whenever
              you want and we will respond it.`,
            ],
            [
              <svg
                width="60"
                height="60"
                viewBox="0 0 60 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                key={"svg-privacy"}
              >
                <circle
                  cx="30"
                  cy="30"
                  r="30"
                  fill="#6256E1"
                  fillOpacity="0.1"
                />
                <path
                  d="M38.75 28.75H21.25C19.8693 28.75 18.75 29.8693 18.75 31.25V40C18.75 41.3807 19.8693 42.5 21.25 42.5H38.75C40.1307 42.5 41.25 41.3807 41.25 40V31.25C41.25 29.8693 40.1307 28.75 38.75 28.75Z"
                  stroke="#6379F4"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M23.75 28.75V23.75C23.75 22.0924 24.4085 20.5027 25.5806 19.3306C26.7527 18.1585 28.3424 17.5 30 17.5C31.6576 17.5 33.2473 18.1585 34.4194 19.3306C35.5915 20.5027 36.25 22.0924 36.25 23.75V28.75"
                  stroke="#6379F4"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>,
              "Data Privacy",
              "We make sure your data is safe in our database and we will encrypt any data you submitted to us.",
            ],
            [
              <svg
                width="60"
                height="60"
                viewBox="0 0 60 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                key={"svg-download"}
              >
                <circle
                  cx="30"
                  cy="30"
                  r="30"
                  fill="#6256E1"
                  fillOpacity="0.1"
                />
                <path
                  d="M41.25 33.75V38.75C41.25 39.413 40.9866 40.0489 40.5178 40.5178C40.0489 40.9866 39.413 41.25 38.75 41.25H21.25C20.587 41.25 19.9511 40.9866 19.4822 40.5178C19.0134 40.0489 18.75 39.413 18.75 38.75V33.75"
                  stroke="#6379F4"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M23.75 27.5L30 33.75L36.25 27.5"
                  stroke="#6379F4"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M30 33.75V18.75"
                  stroke="#6379F4"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>,
              "Easy Download",
              "Fazzpay is 100% totally free to use it’s now available on Google Play Store and App Store.",
            ],
          ].map(([svg, title, text], idx) => (
            <div
              className="card flex-1 flex-shrink-0 max-w-sm shadow-2xl bg-base-100"
              key={idx}
            >
              <div className="card-body flex-col w-full justify-center gap-7">
                <div className="m-auto">{svg}</div>
                <h2 className="card-title justify-center">{title}</h2>
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="global-px bg-primary bg-opacity-10 flex min-h-screen gap-12">
        <div className="flex-[2_2_0%] relative">
          <Image
            src={"/img/app-image-2.png"}
            alt="app-image-2"
            fill
            style={{ objectFit: "contain" }}
            priority
          />
        </div>
        <div className="flex-[3_3_0%] flex flex-col items-center py-20 gap-10">
          <h2 className="font-bold text-6xl leading-normal max-w-lg mr-auto">
            All The <span className="text-primary">Great</span> FazzPay
            Features.
          </h2>
          <section className="flex w-full">
            <ol className="list-decimal list-inside marker:text-primary font-bold text-dark text-xl flex flex-col gap-6 w-full">
              {[
                [
                  "Small Fee",
                  `We only charge 5% of every success transaction done in FazzPay
                  app.`,
                ],
                [
                  "Data Secured",
                  "All your data is secured properly in our system and it’s encrypted.",
                ],
                [
                  "User Friendly",
                  "FazzPay come up with modern and sleek design and not complicated.",
                ],
              ].map(([title, desc], idx) => (
                <li
                  className="bg-white shadow-card-md rounded-3xl p-6 space-y-4"
                  key={idx}
                >
                  {title}
                  <br />
                  <p className="font-normal text-lg">{desc}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </section>

      <section className="global-px py-28 text-dark flex flex-col text-center gap-8 justify-center">
        <h2 className="font-bold text-6xl">
          What Users are <span className="text-primary">Saying.</span>
        </h2>
        <p className="text-lg max-w-xl m-auto">
          We have some great features from the application and it’s totally free
          to use by all users around the world.
        </p>
      </section>

      <footer className="text-white global-px py-12 bg-primary">
        <section className="footer py-10 ">
          <div className="flex flex-col gap-7">
            <h1 className="text-3xl font-bold">
              <Link href={"/"}>FazzPay</Link>
            </h1>
            <p className="text-primary-context text-lg w-[300px]">
              Simplify financial needs and saving much time in banking needs
              with one single app.
            </p>
            {/* <span className="footer-title">Services</span> */}
          </div>
        </section>
        <section className="footer py-4 border-t border-base-300 text-primary-context">
          <div className="items-center grid-flow-col">
            <p>{year} FazzPay. All right reserved.</p>
          </div>
          <div className="md:place-self-center md:justify-self-end">
            <div className="grid grid-flow-col gap-10 font-medium">
              <a>+62 5637 8882 9901</a>
              <a>contact@fazzpay.com</a>
            </div>
          </div>
        </section>
      </footer>
    </Layout>
  );
}
