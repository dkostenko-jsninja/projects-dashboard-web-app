import sendRequest from '../../services/request';
import { IDeveloper } from '../../interfaces/developer';

export enum ActionTypes {
  REQUEST = 'REQUEST',
  REQUEST_ERROR = 'REQUEST_ERROR',
  RECEIVE_DEVELOPERS = 'RECEIVE_DEVELOPERS',
  DEVELOPER_DELETED = 'DEVELOPER_DELETED',
  DEVELOPER_CREATED = 'DEVELOPER_CREATED',
  DEVELOPER_UPDATED = 'DEVELOPER_UPDATED',
}

const request = () => ({
  type: ActionTypes.REQUEST,
});

const requestError = (err) => ({
  type: ActionTypes.REQUEST_ERROR,
  payload: {
    developerRequestError: err.message,
  },
});

const receiveDevelopers = (developers) => ({
  type: ActionTypes.RECEIVE_DEVELOPERS,
  payload: { developers },
});

const developerDeleted = (developerUuid) => ({
  type: ActionTypes.DEVELOPER_DELETED,
  payload: { developerUuid },
});

const developerCreated = (developer) => ({
  type: ActionTypes.DEVELOPER_CREATED,
  payload: { developer },
});

const developerUpdated = (developer) => ({
  type: ActionTypes.DEVELOPER_UPDATED,
  payload: { developer },
});

export const getDevelopers = () => (dispatch) => {
  dispatch(request());

  sendRequest('GET', '/api/developers')
    .then((data) => {
      console.log(data.developers);
      dispatch(receiveDevelopers(data.developers));
    })
    .catch((err) => {
      dispatch(requestError(err));
    });
};

export const deleteDeveloper = (developerUuid: string) => (dispatch) => {
  dispatch(request());

  sendRequest('DELETE', `/api/developer/${developerUuid}`)
    .then(() => {
      dispatch(developerDeleted(developerUuid));
    })
    .catch((err) => {
      dispatch(requestError(err));
    });
};

export const createDeveloper = (developer: IDeveloper) => (dispatch) => {
  dispatch(request());

  const { uuid, ...newDeveloper } = developer;
  if (!newDeveloper.photo) {
    newDeveloper.photo = null;
  }

  sendRequest('POST', '/api/developer', { developer: newDeveloper })
    .then((data) => {
      dispatch(developerCreated(data.developer));
    })
    .catch((err) => {
      dispatch(requestError(err));
    });
};

export const editDeveloper = (developer: IDeveloper) => (dispatch) => {
  dispatch(request());

  const { uuid, ...newDeveloper } = developer;
  if (!newDeveloper.photo) {
    newDeveloper.photo = null;
  }

  sendRequest('PUT', `/api/developer/${uuid}`, { developer: newDeveloper })
    .then(() => {
      dispatch(developerUpdated(developer));
    })
    .catch((err) => {
      dispatch(requestError(err));
    });
};
