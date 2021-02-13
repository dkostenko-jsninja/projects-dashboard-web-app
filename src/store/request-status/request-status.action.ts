export enum ActionTypes {
  REQUEST = 'REQUEST',
  REQUEST_ERROR = 'REQUEST_ERROR',
}

export const request = () => ({
  type: ActionTypes.REQUEST,
});

export const requestError = (errorMessage: string) => ({
  type: ActionTypes.REQUEST_ERROR,
  payload: { errorMessage },
});
