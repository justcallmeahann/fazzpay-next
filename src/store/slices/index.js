import { combineReducers } from "redux";

import authSlice from "./authInfo";
import dashboardSlice from "./dashboard";
import historySlice from "./history";
import listUsersSlice from "./listUsers";
import profileSlice from "./profile";
import pinSlice from "./setPin";
import topupSlice from "./topup";
import transferSlice from "./transfer";

const reducers = combineReducers({
  auth: authSlice,
  pin: pinSlice,
  profile: profileSlice,
  topup: topupSlice,
  listUsers: listUsersSlice,
  dashboard: dashboardSlice,
  transfer: transferSlice,
  history: historySlice,
});

export default reducers;
