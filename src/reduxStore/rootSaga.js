import { all } from "redux-saga/effects";
import authSaga from "../features/Auth/authSaga";
import userSaga from "../features/user/userSaga";

export default function* rootSaga() {
  yield all([
    authSaga(),
    userSaga()
  ]);
}
