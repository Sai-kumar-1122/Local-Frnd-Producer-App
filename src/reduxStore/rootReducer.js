import { combineReducers } from "redux";
import  authReducer  from "../features/Auth/authReducer";
import  userReducer  from "../features/user/userReducer";
import photoReducer from "../features/photo/photoReducer";

const rootReducer = combineReducers({
  auth:authReducer,
  user: userReducer,
  photo:photoReducer,
  
});

export default rootReducer;
