// userReducer.js
import {
  USER_DATA_FAILED,
  USER_DATA_REQUEST,
  USER_DATA_SUCCESS,
  USER_EDIT_FAILED,
  USER_EDIT_REQUEST,
  USER_EDIT_SUCCESS,
  USER_LOGOUT_REQUEST
} from "./userType";

const initialState = {
  loading: false,
  success: null,
  mode: null,
  data: null,
  error: null,
  userdata: null, // stores only the user object
  result:null,

};

export default function userReducer(state = initialState, action) {
  console.log(action.payload)
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
        result:action.payload.result


      };

    case USER_EDIT_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };

    case USER_DATA_REQUEST:
      return { ...state, loading: true, error: null };

    case USER_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        userdata: action.payload, // 🔥 store only user object
      };

    case USER_DATA_FAILED:
      return { ...state, loading: false, error: action.payload };

    case USER_LOGOUT_REQUEST:
  return { ...initialState };



    default:
      return state;
  }
}
