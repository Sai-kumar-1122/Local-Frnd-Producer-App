import { all } from "redux-saga/effects";
import authSaga from "../features/Auth/authSaga";
import userSaga from "../features/user/userSaga";
import photoSaga from "../features/photo/photoSaga"

export default function* rootSaga() {
  yield all([
    authSaga(),
    userSaga(),
    photoSaga(),

  ]);
}
