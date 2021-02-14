import { ProjectState } from '../../types/store-types';
import { ActionTypes } from './project.action';

const defaultState: ProjectState = {
  projects: [],
};

const projectReducer = (state = defaultState, action) => {
  let updatedProjects;
  switch (action.type) {
    case ActionTypes.RECEIVE_PROJECTS:
      return {
        ...state,
        projects: action.payload.projects,
      };
    case ActionTypes.PROJECT_CREATED:
      return {
        ...state,
        projects: state.projects.concat(action.payload.project),
      };
    case ActionTypes.PROJECT_UPDATED:
      updatedProjects = state.projects.map((project) => {
        return project.uuid === action.payload.project.uuid
          ? { ...action.payload.project, team: project.team, features: project.features }
          : project;
      });

      return {
        ...state,
        projects: updatedProjects,
      };
    case ActionTypes.PROJECT_DELETED:
      updatedProjects = state.projects.filter((project) => {
        return project.uuid !== action.payload.projectUuid;
      });

      return {
        ...state,
        projects: updatedProjects,
      };
    case ActionTypes.FEATURE_CREATED:
      updatedProjects = state.projects.map((project) => {
        if (project.uuid === action.payload.projectUuid) {
          project.features = project.features.concat(action.payload.feature);
        }
        return project;
      });

      return {
        ...state,
        projects: updatedProjects,
      };
    case ActionTypes.FEATURE_UPDATED:
      updatedProjects = state.projects.map((project) => {
        if (project.uuid === action.payload.projectUuid) {
          const updatedFeature = action.payload.feature;
          if (!updatedFeature.developerUuid) {
            updatedFeature.expirationDate = null;
          }
          project.features = project.features.map((feat) => {
            return feat.uuid === updatedFeature.uuid ? updatedFeature : feat;
          });
        }
        return project;
      });

      return {
        ...state,
        projects: updatedProjects,
      };
    case ActionTypes.FEATURE_DELETED:
      updatedProjects = state.projects.map((project) => {
        project.features = project.features.filter((feature) => {
          return feature.uuid !== action.payload.featureUuid;
        });
        return project;
      });

      return {
        ...state,
        projects: updatedProjects,
      };
    default:
      return state;
  }
};

export default projectReducer;
