import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

function NoAuthRoute(WrappedComponent) {
  const Auth = (props) => {
    const auth = useSelector((state) => state.auth);
    const router = useRouter();

    if (auth.token) {
      router.push("/dashboard");
      return;
    }

    return <WrappedComponent {...props} />;
  };

  return Auth;
}

export default NoAuthRoute;
