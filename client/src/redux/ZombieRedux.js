// @Vendors
import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  // ZOMBIE GET ALL
  zombieGetAllRequest: ['limit', 'offset'],
  zombieGetAllSuccess: ['response'],
  zombieGetAllFailure: ['response'],
  // ZOMBIE GET SUMMARY
  zombieGetSummaryRequest: null,
  zombieGetSummarySuccess: ['response'],
  zombieGetSummaryFailure: ['response'],
  // ZOMBIE ADD
  zombieAddRequest: ['name', 'location'],
  zombieAddSuccess: ['response'],
  zombieAddFailure: ['response'],
  // ZOMBIE UPDATE
  zombieUpdateRequest: ['id', 'data'],
  zombieUpdateSuccess: ['response'],
  zombieUpdateFailure: ['response'],
  // ZOMBIE REMOVE
  zombieRemoveRequest: ['id'],
  zombieRemoveSuccess: ['response'],
  zombieRemoveFailure: ['response'],
  // ZOMBIE SET SELECTED
  zombieSetSelected: ['newList'],
});

export const ZombieTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  errorMessage: '',
  fetching: false,
  showError: false,
  selectedList: [],
  data: [],
  hospitalAmount: 0,
  warehouseAmount: 0,
  schoolAmount: 0
});

/* ------------- Reducers ------------- */

export const request = (state) =>
  state.merge({
    errorMessage: '',
    fetching: true,
    showError: false
  });

export const success = (state, { response }) =>
  state.merge({
    fetching: false
  });

export const zombieGetAllSuccess = (state, { response }) =>
  state.merge({
    data: response.data,
    fetching: false
  });

export const zombieGetSummarySuccess = (state, { response }) =>
  state.merge({
    ...response
  });

export const failure = (state, { response }) =>
  state.merge({
    errorMessage: response,
    fetching: false,
    showError: true
  });

export const zombieSetSelected = (state, { newList }) =>
  state.merge({
    selectedList: newList
  });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  // ZOMBIE GET ALL
  [Types.ZOMBIE_GET_ALL_REQUEST]: request,
  [Types.ZOMBIE_GET_ALL_SUCCESS]: zombieGetAllSuccess,
  [Types.ZOMBIE_GET_ALL_FAILURE]: failure,
  // ZOMBIE GET SUMMARY
  [Types.ZOMBIE_GET_SUMMARY_REQUEST]: request,
  [Types.ZOMBIE_GET_SUMMARY_SUCCESS]: zombieGetSummarySuccess,
  [Types.ZOMBIE_GET_SUMMARY_FAILURE]: failure,
  // ZOMBIE ADD
  [Types.ZOMBIE_ADD_REQUEST]: request,
  [Types.ZOMBIE_ADD_SUCCESS]: success,
  [Types.ZOMBIE_ADD_FAILURE]: failure,
  // ZOMBIE UPDATE
  [Types.ZOMBIE_UPDATE_REQUEST]: request,
  [Types.ZOMBIE_UPDATE_SUCCESS]: success,
  [Types.ZOMBIE_UPDATE_FAILURE]: failure,
  // ZOMBIE REMOVE
  [Types.ZOMBIE_REMOVE_REQUEST]: request,
  [Types.ZOMBIE_REMOVE_SUCCESS]: success,
  [Types.ZOMBIE_REMOVE_FAILURE]: failure,
  // ZOMBIE SET SELECTED
  [Types.ZOMBIE_SET_SELECTED]: zombieSetSelected,
});
