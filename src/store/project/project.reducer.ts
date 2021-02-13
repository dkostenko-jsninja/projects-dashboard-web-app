import { ProjectState } from '../../types/store-types';
import { ActionTypes } from './project.action';

const defaultState: ProjectState = {
  projects: [],
};

const projectReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.RECEIVE_PROJECTS:
      return {
        ...state,
        projects: action.payload.projects,
      };
    default:
      return state;
  }
};

export default projectReducer;
