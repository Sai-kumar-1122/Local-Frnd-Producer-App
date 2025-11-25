import { combineReducers } from "redux";
import  authReducer  from "../features/Auth/authReducer";
import  userReducer  from "../features/user/userReducer";

const rootReducer = combineReducers({
  auth:authReducer,
  user: userReducer,
});

export default rootReducer;
