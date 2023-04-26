import NoAuthRoute from "@/utils/wrapper/noAuthRoute";

import ForgotPass from "../forgotpass";

function ResetPassword() {
  return <ForgotPass />;
}

export default NoAuthRoute(ResetPassword);
