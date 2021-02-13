import sendRequest from '../../services/request';

import { request, requestError } from '../request-status/request-status.action';

export enum ActionTypes {
  RECEIVE_PROJECTS = 'RECEIVE_PROJECTS',
}

const receiveProjects = (projects) => ({
  type: ActionTypes.RECEIVE_PROJECTS,
  payload: { projects },
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
