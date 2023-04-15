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
  return (
    <main
    // className={nSans.className}
    >
      <Component {...pageProps} />
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
