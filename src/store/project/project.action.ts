import sendRequest from '../../services/request';

import { IProject } from '../../interfaces/project';
import { IFeature } from '../../interfaces/feature';
import { IDeveloper } from '../../interfaces/developer';

import { request, requestError } from '../request-status/request-status.action';

export enum ActionTypes {
  RECEIVE_PROJECTS = 'RECEIVE_PROJECTS',
  PROJECT_CREATED = 'PROJECT_CREATED',
  PROJECT_UPDATED = 'PROJECT_UPDATED',
  PROJECT_DELETED = 'PROJECT_DELETED',
  FEATURE_CREATED = 'FEATURE_CREATED',
  FEATURE_UPDATED = 'FEATURE_UPDATED',
  FEATURE_DELETED = 'FEATURE_DELETED',
  DEVELOPER_ASSIGNED_TO_PROJECT = 'DEVELOPER_ASSIGNED_TO_PROJECT',
  DEVELOPER_UNASSINGED_FROM_PROJECT = 'DEVELOPER_UNASSINGED_FROM_PROJECT',
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

const featureCreated = (projectUuid, feature) => ({
  type: ActionTypes.FEATURE_CREATED,
  payload: { projectUuid, feature },
});

const featureUpdated = (projectUuid, feature) => ({
  type: ActionTypes.FEATURE_UPDATED,
  payload: { projectUuid, feature },
});

const featureDeleted = (featureUuid) => ({
  type: ActionTypes.FEATURE_DELETED,
  payload: { featureUuid },
});

const developerAssignedToProject = (projectUuid, developer) => ({
  type: ActionTypes.DEVELOPER_ASSIGNED_TO_PROJECT,
  payload: { projectUuid, developer },
});

const developerUnassignedFromProject = (projectUuid, developerUuid) => ({
  type: ActionTypes.DEVELOPER_UNASSINGED_FROM_PROJECT,
  payload: { projectUuid, developerUuid },
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

  const newProject = {
    name: project.name,
    description: project.description,
    expirationDate: project.expirationDate || null,
  };

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

export const createFeature = (projectUuid: string, feature: IFeature) => (dispatch) => {
  dispatch(request());

  const newFeature = {
    name: feature.name,
    description: feature.description,
  };

  sendRequest('POST', `/api/project/${projectUuid}/feature`, { feature: newFeature })
    .then((data) => {
      dispatch(featureCreated(projectUuid, data.feature));
    })
    .catch((err) => {
      dispatch(requestError(err));
    });
};

export const editFeature = (projectUuid: string, feature: IFeature) => (dispatch) => {
  dispatch(request());

  const { uuid, expirationDate, ...newFeature } = feature;
  if (!newFeature.developerUuid) {
    newFeature.developerUuid = null;
  }

  sendRequest('PUT', `/api/project/${projectUuid}/feature/${uuid}`, { feature: newFeature })
    .then(() => {
      dispatch(featureUpdated(projectUuid, feature));
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

export const assignDeveloperToProject = (projectUuid: string, developer: IDeveloper) => (
  dispatch
) => {
  dispatch(request());

  sendRequest('POST', `/api/project/${projectUuid}/developers`, { developerUuid: developer.uuid })
    .then(() => {
      dispatch(developerAssignedToProject(projectUuid, developer));
    })
    .catch((err) => {
      dispatch(requestError(err));
    });
};

export const unassignDeveloperFromProject = (projectUuid: string, developerUuid: string) => (
  dispatch
) => {
  dispatch(request());

  sendRequest('DELETE', `/api/project/${projectUuid}/developers/${developerUuid}`)
    .then(() => {
      dispatch(developerUnassignedFromProject(projectUuid, developerUuid));
    })
    .catch((err) => {
      dispatch(requestError(err));
    });
};
