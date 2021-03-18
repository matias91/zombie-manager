// @Vendors
import { combineReducers } from 'redux';
import { resettableReducer } from 'reduxsauce';

// @Store
import configureStore from './CreateStore';

// @Sagas
import rootSaga from '../sagas';

const resettable = resettableReducer('RESET');

const redux = () => {
  const rootReducer = combineReducers({
    zombie: resettable(require('./ZombieRedux').reducer)
  });

  return configureStore(rootReducer, rootSaga);
};

export default redux;
