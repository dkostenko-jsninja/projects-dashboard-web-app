import React from 'react';
import './Project.scss';

import { Typography } from '@material-ui/core';

import { IProjectDetails } from '../../../interfaces/project';

import ItemMenu from '../../ItemMenu';
import Features from './Features';
import Team from './Team';

type propTypes = {
  project: IProjectDetails;
  buttons: { name: string; handler: Function }[];
};

function Project({ project, buttons }: propTypes) {
  const handleMenuClick = (handler) => {
    handler(project);
  };

  return (
    <div className="c-project">
      <Typography variant="h6">{project.name}</Typography>

      <p className="c-project__description">{project.description}</p>

      <p className="c-project__deadline">
        Dead line date:
        <span className="c-project__deadline__date">
          {new Date(project.expirationDate).toDateString()}
        </span>
      </p>

      <div className="c-project__team">
        <Team team={project.team} projectUuid={project.uuid} />
      </div>

      <div className="c-project__features">
        <Features features={project.features} team={project.team} projectUuid={project.uuid} />
      </div>

      <div className="c-project__menu">
        <ItemMenu buttons={buttons} handleMenuClick={handleMenuClick} />
      </div>
    </div>
  );
}

export default Project;
