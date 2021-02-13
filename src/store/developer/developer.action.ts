import sendRequest from '../../services/request';

export enum ActionTypes {
  REQUEST = 'REQUEST',
  REQUEST_ERROR = 'REQUEST_ERROR',
  RECEIVE_DEVELOPERS = 'RECEIVE_DEVELOPERS',
  DEVELOPER_DELETED = 'DEVELOPER_DELETED',
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
