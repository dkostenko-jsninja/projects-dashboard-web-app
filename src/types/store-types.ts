import { IDeveloper } from '../interfaces/developer';

export type DeveloperState = {
  developers: IDeveloper[];
  isDeveloperRequestInProgress: boolean;
  developerRequestError: string | null;
};

export type RootSate = {
  developerReducer: DeveloperState;
};
