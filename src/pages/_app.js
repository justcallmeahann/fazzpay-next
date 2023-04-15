import "@/styles/globals.css";

import { Nunito_Sans } from "next/font/google";

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
    </main>
  );
}
