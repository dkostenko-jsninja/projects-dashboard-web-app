import { DeveloperState } from '../../types/store-types';

import { ActionTypes } from './developer.action';

const defaultState: DeveloperState = {
  isDeveloperRequestInProgress: false,
  developerRequestError: null,
  developers: [],
};

const developerReducer = (state = defaultState, action) => {
  let updatedDevelopers;
  const updatedState = {
    ...state,
    isDeveloperRequestInProgress: false,
  };

  switch (action.type) {
    case ActionTypes.REQUEST:
      return {
        ...state,
        isDeveloperRequestInProgress: true,
      };
    case ActionTypes.REQUEST_ERROR:
      return {
        ...updatedState,
        developerRequestError: action.payload.developerRequestError,
      };
    case ActionTypes.RECEIVE_DEVELOPERS:
      return {
        ...updatedState,
        developers: action.payload.developers,
      };
    case ActionTypes.DEVELOPER_DELETED:
      updatedDevelopers = updatedState.developers.filter(
        (developer) => developer.uuid !== action.payload.developerUuid
      );
      return {
        ...updatedState,
        developers: updatedDevelopers,
      };
    case ActionTypes.DEVELOPER_CREATED:
      return {
        ...updatedState,
        developers: updatedState.developers.concat(action.payload.developer),
      };
    case ActionTypes.DEVELOPER_UPDATED:
      updatedDevelopers = updatedState.developers.map((currentDev) =>
        currentDev.uuid === action.payload.developer.uuid ? action.payload.developer : currentDev
      );
      return {
        ...updatedState,
        developers: updatedDevelopers,
      };
    default:
      return state;
  }
};

export default developerReducer;
