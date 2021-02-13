import React from 'react';
import './Project.scss';

import { Typography } from '@material-ui/core';

import { IProjectDetails } from '../../../interfaces/project';

import ItemMenu from '../../ItemMenu';
import Features from './Features';
import TeamMember from './TeamMember';

type propTypes = {
  project: IProjectDetails;
  buttons: { name: string; handler: Function }[];
};

function Project({ project, buttons }: propTypes) {
  const handleMenuClick = (handler) => {
    handler(project);
  };

  const unassignDeveloper = (developerUuid: string) => {
    console.log(developerUuid);
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
        <Typography variant="h6">Team</Typography>

        <div className="c-project__team__members">
          {project.team.length ? (
            project.team.map((developer) => (
              <TeamMember key={developer.uuid} developer={developer} handler={unassignDeveloper} />
            ))
          ) : (
            <p>This project doesn&lsquo;t have a team yet.</p>
          )}
        </div>
      </div>

      <div className="c-project__features">
        <Typography variant="h6">Features</Typography>

        {project.features.length ? (
          <Features features={project.features} projectUuid={project.uuid} />
        ) : (
          <p>This project doesn&lsquo;t have features yet.</p>
        )}
      </div>

      <div className="c-project__menu">
        <ItemMenu buttons={buttons} handleMenuClick={handleMenuClick} />
      </div>
    </div>
  );
}

export default Project;
