import { DeveloperState } from '../../types/store-types';

import { ActionTypes } from './developer.action';

const defaultState: DeveloperState = {
  developers: [],
};

const developerReducer = (state = defaultState, action) => {
  let updatedDevelopers;

  switch (action.type) {
    case ActionTypes.RECEIVE_DEVELOPERS:
      return {
        ...state,
        developers: action.payload.developers,
      };
    case ActionTypes.DEVELOPER_DELETED:
      updatedDevelopers = state.developers.filter((developer) => {
        return developer.uuid !== action.payload.developerUuid;
      });

      return {
        ...state,
        developers: updatedDevelopers,
      };
    case ActionTypes.DEVELOPER_CREATED:
      return {
        ...state,
        developers: state.developers.concat(action.payload.developer),
      };
    case ActionTypes.DEVELOPER_UPDATED:
      updatedDevelopers = state.developers.map((currentDev) => {
        return currentDev.uuid === action.payload.developer.uuid
          ? action.payload.developer
          : currentDev;
      });

      return {
        ...state,
        developers: updatedDevelopers,
      };
    default:
      return state;
  }
};

export default developerReducer;
