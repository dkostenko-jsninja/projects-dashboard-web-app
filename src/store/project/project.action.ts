import sendRequest from '../../services/request';

import { request, requestError } from '../request-status/request-status.action';
import { IProject } from '../../interfaces/project';

export enum ActionTypes {
  RECEIVE_PROJECTS = 'RECEIVE_PROJECTS',
  PROJECT_CREATED = 'PROJECT_CREATED',
  PROJECT_UPDATED = 'PROJECT_UPDATED',
  PROJECT_DELETED = 'PROJECT_DELETED',
  FEATURE_DELETED = 'FEATURE_DELETED',
}

const receiveProjects = (projects) => ({
  type: ActionTypes.RECEIVE_PROJECTS,
  payload: { projects },
});

const projectCreated = (project) => ({
  type: ActionTypes.PROJECT_CREATED,
  payload: { project },
});

const projectUpdated = (project) => ({
  type: ActionTypes.PROJECT_UPDATED,
  payload: { project },
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
      dispatch(requestError(err));
    });
};

export const createProject = (project: IProject) => (dispatch) => {
  dispatch(request());

  const { uuid, ...newProject } = project;
  if (!newProject.expirationDate) {
    newProject.expirationDate = null;
  }

  sendRequest('POST', '/api/project', { project: newProject })
    .then((data) => {
      const createdProject = { ...data.project, team: [], features: [] };
      dispatch(projectCreated(createdProject));
    })
    .catch((err) => {
      dispatch(requestError(err));
    });
};

export const editProject = (project: IProject) => (dispatch) => {
  dispatch(request());

  const { uuid, ...newProject } = project;

  sendRequest('PUT', `/api/project/${uuid}`, { project: newProject })
    .then(() => {
      dispatch(projectUpdated(project));
    })
    .catch((err) => {
      dispatch(requestError(err));
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
