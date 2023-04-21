import { combineReducers } from 'redux';

import authSlice from './authInfo';

const reducers = combineReducers({
  auth: authSlice,
});

export default reducers;
