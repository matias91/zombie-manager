// @Vendors
import { all, call, put } from 'redux-saga/effects';

// @Actions
import ZombieActions from '../redux/ZombieRedux';

export function* zombieGetAll(api, action) {
  const response = yield call(api.zombieGetAll, action);

  if (response.ok) {
    yield put(ZombieActions.zombieGetAllSuccess(response.data));
  } else {
    yield put(ZombieActions.zombieGetAllFailure(response));
  }
}

export function* zombieGetSummary(api) {
  const response = yield call(api.zombieGetSummary);

  if (response.ok) {
    yield put(ZombieActions.zombieGetSummarySuccess(response.data));
  } else {
    yield put(ZombieActions.zombieGetSummaryFailure(response));
  }
}

export function* zombieAdd(api, action) {
  const response = yield call(api.zombieAdd, action);

  if (response.ok) {
    yield all([
      put(ZombieActions.zombieAddSuccess(response.data)),
      put(ZombieActions.zombieGetAllRequest()),
      put(ZombieActions.zombieGetSummaryRequest())
    ]);
  } else {
    yield put(ZombieActions.zombieAddFailure(response));
  }
}

export function* zombieUpdate(api, action) {
  const response = yield call(api.zombieUpdate, action);

  if (response.ok) {
    yield all([
      put(ZombieActions.zombieUpdateSuccess(response.data)),
      put(ZombieActions.zombieGetAllRequest()),
      put(ZombieActions.zombieGetSummaryRequest())
    ]);
  } else {
    yield put(ZombieActions.zombieUpdateFailure(response));
  }
}

export function* zombieRemove(api, { id }) {
  const response = yield call(api.zombieRemove, { id });

  if (response.ok) {
    yield all([
      put(ZombieActions.zombieRemoveSuccess(response.data)),
      put(ZombieActions.zombieGetAllRequest()),
      put(ZombieActions.zombieGetSummaryRequest())
    ]);
  } else {
    yield put(ZombieActions.zombieRemoveFailure(response));
  }
}
