import Layout from '../layout';
import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';

function DashboardLayout({ title, className, children }) {
  return (
    <Layout title={title} className={className}>
      <Header />
      <main className="relative flex global-px bg-dashboard min-h-screen">
        <Sidebar />
        <section className="mt-28 mb-6 ml-72 w-full space-y-5">
          {children}
        </section>
      </main>

      <Footer />
    </Layout>
  );
}

export default DashboardLayout;
