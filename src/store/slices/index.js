import { combineReducers } from "redux";

import authSlice from "./authInfo";
import pinSlice from "./setPin";

const reducers = combineReducers({
  auth: authSlice,
  pin: pinSlice,
});

export default reducers;
