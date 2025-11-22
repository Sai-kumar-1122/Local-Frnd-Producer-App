import { USER_EDIT_FAILED, USER_EDIT_REQUEST, USER_EDIT_SUCCESS } from "./userType";

const initialState = {
  loading: false,
  mobile_number1: null,
  mobile_number2:null,
  Otp:null,
  error: null,
  success:null,
  mode:null

};

export default function userReducer(state = initialState, action) {
  console.log(action.payload)
  switch (action.type) {
    case USER_EDIT_REQUEST:
      return { ...state, loading: true, error: null };     
    case USER_EDIT_SUCCESS:
      return { ...state, loading: false,success:action.payload.success,mode:action.payload.mode ,mobile_number1: action.payload };
    case USER_EDIT_FAILED:
      return { ...state, loading: false, error: action.payload };


   



  
    default:
      return state;
  }
  
}

