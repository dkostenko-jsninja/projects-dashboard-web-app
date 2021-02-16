import React from 'react';
import './Team.scss';

import { Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import {
  assignDeveloperToProject,
  unassignDeveloperFromProject,
} from '../../../../store/project/project.action';

import { IDeveloper } from '../../../../interfaces/developer';

import { RootSate } from '../../../../types/store-types';

import SelectDevelopers from '../SelectDevelopers';
import TeamMember from '../TeamMember';

type propTypes = {
  team: IDeveloper[];
  projectUuid: string;
};

function Team({ team, projectUuid }: propTypes) {
  const dispatch = useDispatch();

  const { developers } = useSelector((state: RootSate) => state.developerReducer);

  const removeDeveloper = (developerUuid: string) => {
    dispatch(unassignDeveloperFromProject(projectUuid, developerUuid));
  };

  const addDeveloper = (developer: IDeveloper) => {
    dispatch(assignDeveloperToProject(projectUuid, developer));
  };

  return (
    <div className="c-team c-project__section">
      <Typography className="c-project__section__title" variant="h6">
        Team
      </Typography>

      <SelectDevelopers
        label="Add developer to the team"
        developers={developers.filter((developer) => developer.employeeStatus === 'active')}
        handleChange={addDeveloper}
      />

      <div className="c-team__members">
        {!team.length && <p>This project doesn&lsquo;t have a team yet.</p>}

        {team.map((developer) => (
          <TeamMember key={developer.uuid} developer={developer} handler={removeDeveloper} />
        ))}
      </div>
    </div>
  );
}

export default Team;
