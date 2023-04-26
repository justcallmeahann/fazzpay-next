import { useRouter } from "next/router";
import { useSelector } from "react-redux";

function AuthRoute(WrappedComponent) {
  const Auth = (props) => {
    const auth = useSelector((state) => state.auth);
    const router = useRouter();

    if (!auth.token) {
      router.push("/auth/login");
      return;
    }

    return <WrappedComponent {...props} />;
  };

  return Auth;
}

export default AuthRoute;
