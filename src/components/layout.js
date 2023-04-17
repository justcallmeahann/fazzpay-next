import Head from 'next/head';

function Layout({ title, children }) {
  return (
    <>
      <Head>
        <title>{title ? `${title}  —` : ""} FazzPay</title>
      </Head>
      {children}
    </>
  );
}

export default Layout;
