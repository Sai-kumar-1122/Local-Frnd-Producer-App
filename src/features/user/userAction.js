import { USER_EDIT_FAILED, USER_EDIT_REQUEST, USER_EDIT_SUCCESS } from "./userType";
import {USER_DATA_REQUEST,USER_DATA_SUCCESS,USER_DATA_FAILED} from "./userType"

export const userEditRequest = (data) => ({
  type: USER_EDIT_REQUEST,
  payload: data,
});

export const userEditSuccess = (data) => ({
  type: USER_EDIT_SUCCESS,
  payload: data,
});
export const userEditFailed = (error) => ({
  type: USER_EDIT_FAILED,
  payload: error,
});
export const userDatarequest=(data)=>({
  type:USER_DATA_REQUEST,
  payload:data
});
export const userDataSuccess=(data)=>({
  type:USER_DATA_SUCCESS,
  payload:data

});
export const userDataFailed=(error)=>({
  type:USER_DATA_FAILED,
  payload:error
})