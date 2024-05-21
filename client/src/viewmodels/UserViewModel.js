// UserViewModel.js

// Action Types
const SET_USER_DATA = 'SET_USER_DATA';

// Initial State
const initialState = {
  userData: null,
};

// Action Creators
export const setUserData = (userData) => ({
  type: SET_USER_DATA,
  payload: userData,
});

// Reducer
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
