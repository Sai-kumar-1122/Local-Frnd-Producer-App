import { USER_EDIT_FAILED, USER_EDIT_REQUEST, USER_EDIT_SUCCESS } from "./userType";

export const userEditRequest = (data) => {
  console.log("userEditRequest called with:", data);  // ← LOG HERE
return {
    type: USER_EDIT_REQUEST,
    payload: data,
  };
};
export const userEditSuccess = (data) => ({
  type: USER_EDIT_SUCCESS,
  payload: data,
});
export const userEditFailed = (error) => ({
  type: USER_EDIT_FAILED,
  payload: error,
});