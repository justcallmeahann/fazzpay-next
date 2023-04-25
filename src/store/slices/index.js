import { combineReducers } from "redux";

import authSlice from "./authInfo";
import dashboardSlice from "./dashboard";
import listUsersSlice from "./listUsers";
import profileSlice from "./profile";
import pinSlice from "./setPin";
import topupSlice from "./topup";

const reducers = combineReducers({
  auth: authSlice,
  pin: pinSlice,
  profile: profileSlice,
  topup: topupSlice,
  listUsers: listUsersSlice,
  dashboard: dashboardSlice,
});

export default reducers;
