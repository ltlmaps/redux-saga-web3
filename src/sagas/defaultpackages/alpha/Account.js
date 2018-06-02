import { put, select, takeEvery, call } from 'redux-saga/effects'
import { types, creators, selectors } from '../constants'

export const getDefaultAccount = function * () {
  const getter = yield select(selectors.getAccounts)
  try {
    const payload = yield call(getter)
    yield put(creators.receiveDefaultAccount(payload[0]))
  } catch (err) {
    yield put(creators.getAccountsFailure(err))
  }
}

export function * defaultAccountSaga () {
  yield takeEvery(types.ACCOUNTS.GET_SUCCESS, getDefaultAccount)
}

export default function * childDefaultAccountSaga () {
  yield takeEvery(types.WEB3.INIT_SUCCESS, getDefaultAccount)
}
