import { combineReducers } from "redux";
import  authReducer  from "../features/Auth/authReducer";
import  userReducer  from "../features/user/userReducer";
import photoReducer from "../features/photo/photoReducer";
import randomuserReduce from "../features/RandomUsers/randomuserReducer";
import callReducer from "../features/calls/callReducer"
const rootReducer = combineReducers({
  auth:authReducer,
  user: userReducer,
  photo:photoReducer,
  randomusers:randomuserReduce,
  calls:callReducer
  
});

export default rootReducer;
