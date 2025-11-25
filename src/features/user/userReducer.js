// userReducer.js
import { USER_EDIT_FAILED, USER_EDIT_REQUEST, USER_EDIT_SUCCESS } from "./userType";

const initialState = {
  loading: false,
  success: null,
  mode: null,
  data: null,
  error: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_EDIT_REQUEST:
      return { ...state, loading: true, error: null };

    case USER_EDIT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.success,
        mode: action.payload.mode,
        data: action.payload,
      };

    case USER_EDIT_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };

    default:
      return state;
  }
}
