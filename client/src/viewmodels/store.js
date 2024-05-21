// store.js

import { createStore, combineReducers } from 'redux';
import userReducer from './UserViewModel';
import adminReducer from './AdminViewModel';

// Combine Reducers
const rootReducer = combineReducers({
  user: userReducer,
  admin: adminReducer,
});

// Create Store
const store = createStore(rootReducer);

export default store;
