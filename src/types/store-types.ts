import { IDeveloper } from '../interfaces/developer';

export type DeveloperState = {
  developers: IDeveloper[];
};

export type RequestStatusState = {
  isRequestInProgress: boolean;
  requestError: string | null;
};

export type RootSate = {
  developerReducer: DeveloperState;
  requestStatusReducer: RequestStatusState;
};
