import { RequestStatusState } from '../../types/store-types';
import { ActionTypes } from './request-status.action';

const defaultState: RequestStatusState = {
  isRequestInProgress: false,
  requestError: null,
};

const requestStatusReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.REQUEST:
      return {
        ...state,
        isRequestInProgress: true,
      };
    case ActionTypes.REQUEST_ERROR:
      return {
        ...state,
        isRequestInProgress: false,
        requestError: action.payload.errorMessage,
      };
    default:
      return defaultState;
  }
};

export default requestStatusReducer;
