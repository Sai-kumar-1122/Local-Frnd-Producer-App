import { combineReducers } from "redux";
import  authReducer  from "../features/Auth/authReducer";
import  userReducer  from "../features/user/userReducer";
import photoReducer from "../features/photo/photoReducer";
import randomuserReduce from "../features/RandomUsers/randomuserReducer";

const rootReducer = combineReducers({
  auth:authReducer,
  user: userReducer,
  photo:photoReducer,
  randomusers:randomuserReduce
  
});

export default rootReducer;
