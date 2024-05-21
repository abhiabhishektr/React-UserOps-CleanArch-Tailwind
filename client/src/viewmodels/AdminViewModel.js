// AdminViewModel.js

// Action Types
const SET_ADMIN_DATA = 'SET_ADMIN_DATA';

// Initial State
const initialState = {
  adminData: null,
};

// Action Creators
export const setAdminData = (adminData) => ({
  type: SET_ADMIN_DATA,
  payload: adminData,
});

// Reducer
const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ADMIN_DATA:
      return {
        ...state,
        adminData: action.payload,
      };
    default:
      return state;
  }
};

export default adminReducer;
