import 'react-modern-drawer/dist/index.css';

import { useState } from 'react';

import { useRouter } from 'next/router';
import Drawer from 'react-modern-drawer';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { authAction } from '@/store/slices/authInfo';
import AuthRoute from '@/utils/wrapper/authRoute';

import Layout from '../layout';
import DrawerChild from './DrawerChild';
import Footer from './Footer';
import Header from './Header';
import Logout from './Logout';
import Sidebar from './Sidebar';

function DashboardLayout({ title, className, children }) {
  const auth = useSelector((state) => state.auth);
  const [drawer, setDrawer] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const toggleDrawer = () => {
    setDrawer(!drawer);
  };
  return (
    <Layout title={title} className={className}>
      <Drawer
        open={drawer}
        direction="right"
        onClose={() => setDrawer(false)}
        className={`md:invisible`}
        size="24rem"
      >
        <DrawerChild toggleDrawer={toggleDrawer} />
      </Drawer>
      <Header toggleDrawer={toggleDrawer} />
      <Logout
        isOpen={auth.logoutModal}
        onClose={() => dispatch(authAction.closeModal())}
      />
      <main className="relative flex global-px bg-dashboard min-h-screen">
        <Sidebar className={`hidden md:block`} />
        <section className="mt-28 mb-6 md:ml-[7rem] lg:ml-72 w-full space-y-5">
          {children}
        </section>
      </main>

      <Footer />
    </Layout>
  );
}

export default AuthRoute(DashboardLayout);
