import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { userEditSuccess, userEditFailed } from "./userAction";
import { USER_EDIT_REQUEST } from "./userType";
import { user_Edit } from "../../api/userApi";

function* handleUserEdit(action) {
  try {
    console.log("Saga Received:", action.payload);

    const token = yield call([AsyncStorage, "getItem"], "twittoke");
    const user_id = yield call([AsyncStorage, "getItem"], "user_id");

    const response = yield call(() =>
      axios.put(`${user_Edit}/${user_id}`, action.payload, {
        headers: { Authorization: `Bearer ${token}` }
      })
    );

    yield put(userEditSuccess(response.data));

  } catch (error) {
    const msg = error.response?.data?.message || error.message;
    yield put(userEditFailed(msg));
  }
}

export default function* userSaga() {
  yield takeLatest(USER_EDIT_REQUEST, handleUserEdit);
}
