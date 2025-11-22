import axios from "axios";
import { userEditFailed, userEditSuccess } from "./userAction";
import { USER_EDIT_REQUEST } from "./userType";
import {user_Edit} from "../../api/userApi"
import { call, takeLatest } from "redux-saga/effects";

function* handleUserEdit(action) {
  try {
    console.log("🚀 Saga received data:", action.payload);
    console.log("🌐  API URL:", user_Register);
    const response = yield call(() =>
      axios.post(user_Edit, action.payload)
    );
    console.log("📥 API Response:", response.data);
    yield put(userEditSuccess(response.data));

  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message;
    console.log("❌ API Error:", errorMsg);

    yield put(userEditFailed(errorMsg));   // ✔️ FIXED
  }
}
export default function* userSaga() {
  yield takeLatest(USER_EDIT_REQUEST,handleUserEdit);
  

}