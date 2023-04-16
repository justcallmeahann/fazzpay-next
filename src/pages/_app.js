import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

import { Nunito_Sans } from "next/font/google";
import { ToastContainer } from "react-toastify";

const nSans = Nunito_Sans({
  weight: ["200", "300", "400", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  // const prg = useProgressStore((state) => state);
  // const router = useRouter();
  // useEffect(() => {
  //   const handleStart = () => {
  //     prg.setIsAnimating(true);
  //   };
  //   const handleStop = () => {
  //     prg.setIsAnimating(false);
  //   };

  //   router.events.on("routeChangeStart", handleStart);
  //   router.events.on("routeChangeComplete", handleStop);
  //   router.events.on("routeChangeError", handleStop);

  //   return () => {
  //     router.events.off("routeChangeStart", handleStart);
  //     router.events.off("routeChangeComplete", handleStop);
  //     router.events.off("routeChangeError", handleStop);
  //   };
  // }, [router]);
  return (
    <main
    // className={nSans.className}
    >
      {/* <Progress isAnimating={prg.isAnimating} /> */}
      <Component {...pageProps} />
      {/* </Progress> */}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </main>
  );
}
