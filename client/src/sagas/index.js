// @Vendors
import { all, takeLatest, takeEvery } from 'redux-saga/effects';

/* --- Types --- */
import { ZombieTypes } from '../redux/ZombieRedux';

/* --- Sagas --- */
import {
  zombieGetAll,
  zombieGetSummary,
  zombieAdd,
  zombieUpdate,
  zombieRemove,
} from './ZombieSagas';

/* --- API --- */
import API from '../services/Api';

/* --- Connect Types To Sagas --- */

export default function* root() {
  try {
    const api = API.create();

    yield all([
      // ZOMBIE
      takeLatest(ZombieTypes.ZOMBIE_GET_ALL_REQUEST, zombieGetAll, api),
      takeLatest(ZombieTypes.ZOMBIE_GET_SUMMARY_REQUEST, zombieGetSummary, api),
      takeLatest(ZombieTypes.ZOMBIE_ADD_REQUEST, zombieAdd, api),
      takeEvery(ZombieTypes.ZOMBIE_UPDATE_REQUEST, zombieUpdate, api),
      takeEvery(ZombieTypes.ZOMBIE_REMOVE_REQUEST, zombieRemove, api)
    ]);
  } catch (err) {
    console.log(err);
  }
}
