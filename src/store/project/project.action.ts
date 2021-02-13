import sendRequest from '../../services/request';

import { request, requestError } from '../request-status/request-status.action';

export enum ActionTypes {
  RECEIVE_PROJECTS = 'RECEIVE_PROJECTS',
  PROJECT_DELETED = 'PROJECT_DELETED',
}

const receiveProjects = (projects) => ({
  type: ActionTypes.RECEIVE_PROJECTS,
  payload: { projects },
});

const projectDeleted = (projectUuid) => ({
  type: ActionTypes.PROJECT_DELETED,
  payload: { projectUuid },
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
