import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { authAction } from "@/store/slices/authInfo";
import AuthRoute from "@/utils/wrapper/authRoute";

import Layout from "../layout";
import Footer from "./Footer";
import Header from "./Header";
import Logout from "./Logout";
import Sidebar from "./Sidebar";

function DashboardLayout({ title, className, children }) {
  const auth = useSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();
  if (!auth.token || !auth.id_user) router.push("/auth/login");
  return (
    <Layout title={title} className={className}>
      <Header />
      <Logout
        isOpen={auth.logoutModal}
        onClose={() => dispatch(authAction.closeModal())}
      />
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

export default AuthRoute(DashboardLayout);
