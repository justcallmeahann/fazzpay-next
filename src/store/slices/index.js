import { combineReducers } from "redux";

import authSlice from "./authInfo";
import profileSlice from "./profile";
import pinSlice from "./setPin";

const reducers = combineReducers({
  auth: authSlice,
  pin: pinSlice,
  profile: profileSlice,
});

export default reducers;
