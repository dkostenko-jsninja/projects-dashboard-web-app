import { DeveloperState } from '../../types/store-types';

import { ActionTypes } from './developer.action';

const defaultState: DeveloperState = {
  isDeveloperRequestInProgress: false,
  developerRequestError: null,
  developers: [],
};

const developerReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.REQUEST:
      return {
        ...state,
        isDeveloperRequestInProgress: true,
      };
    case ActionTypes.REQUEST_ERROR:
      return {
        ...state,
        isDeveloperRequestInProgress: false,
        developerRequestError: action.payload.developerRequestError,
      };
    case ActionTypes.RECEIVE_DEVELOPERS:
      return {
        ...state,
        developers: action.payload.developers,
        isDeveloperRequestInProgress: false,
      };
    case ActionTypes.DEVELOPER_DELETED:
      const updatedDevelopers = state.developers.filter(
        (developer) => developer.uuid !== action.payload.developerUuid
      );
      return {
        ...state,
        developers: updatedDevelopers,
        isDeveloperRequestInProgress: false,
      };
    default:
      return state;
  }
};

export default developerReducer;
