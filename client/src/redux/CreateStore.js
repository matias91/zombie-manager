import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

const CreateStore = (rootReducer, rootSaga) => {
  /* --- CREATE SAGA MIDDLEWARE --- */
  const sagaMiddleware = createSagaMiddleware();

  /* --- CREATE STORE --- */
  const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(sagaMiddleware)
  ));

  /* --- RUN SAGA  --- */
  sagaMiddleware.run(rootSaga);

  return store;
}

export default CreateStore;
