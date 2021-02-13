import sendRequest from '../../services/request';

import { request, requestError } from '../request-status/request-status.action';

export enum ActionTypes {
  RECEIVE_PROJECTS = 'RECEIVE_PROJECTS',
  PROJECT_DELETED = 'PROJECT_DELETED',
  FEATURE_DELETED = 'FEATURE_DELETED',
}

const receiveProjects = (projects) => ({
  type: ActionTypes.RECEIVE_PROJECTS,
  payload: { projects },
});

const projectDeleted = (projectUuid) => ({
  type: ActionTypes.PROJECT_DELETED,
  payload: { projectUuid },
});

const featureDeleted = (featureUuid) => ({
  type: ActionTypes.FEATURE_DELETED,
  payload: { featureUuid },
});

export const getProjects = () => (dispatch) => {
  dispatch(request());

  sendRequest('GET', '/api/projects')
    .then((data) => {
      dispatch(receiveProjects(data.projects));
    })
    .catch((err) => {
      dispatch(requestError(err.message));
    });
};

export const deleteProject = (projectUuid: string) => (dispatch) => {
  dispatch(request());

  sendRequest('DELETE', `/api/project/${projectUuid}`)
    .then(() => {
      dispatch(projectDeleted(projectUuid));
    })
    .catch((err) => {
      dispatch(requestError(err));
    });
};

export const deleteFeature = (projectUuid: string, featureUuid: string) => (dispatch) => {
  dispatch(request());

  sendRequest('DELETE', `/api/project/${projectUuid}/feature/${featureUuid}`)
    .then(() => {
      dispatch(featureDeleted(featureUuid));
    })
    .catch((err) => {
      dispatch(requestError(err));
    });
};
