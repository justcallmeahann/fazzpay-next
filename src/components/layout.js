import Head from 'next/head';

function Layout({ title, children }) {
  return (
    <>
      <Head>
        <title>{title || "No Title"}</title>
      </Head>
      {children}
    </>
  );
}

export default Layout;
