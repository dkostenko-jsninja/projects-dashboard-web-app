import { IDeveloper } from '../interfaces/developer';
import { IProjectDetails } from '../interfaces/project';

export type DeveloperState = {
  developers: IDeveloper[];
};

export type ProjectState = {
  projects: IProjectDetails[];
};

export type RequestStatusState = {
  isRequestInProgress: boolean;
  requestError: string | null;
};

export type RootSate = {
  developerReducer: DeveloperState;
  requestStatusReducer: RequestStatusState;
  projectReducer: ProjectState;
};
