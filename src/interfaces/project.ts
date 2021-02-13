import { IDeveloper } from './developer';
import { IFeature } from './feature';

export interface IProject {
  uuid: string;
  name: string;
  description: string;
  expirationDate: string;
}

export interface IProjectDetails extends IProject {
  team: IDeveloper[];
  features: IFeature[];
}
