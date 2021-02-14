import React, { useEffect, useState } from 'react';
import './Feature.scss';

import { useDispatch } from 'react-redux';

import { editFeature } from '../../../../../store/project/project.action';

import { IDeveloper } from '../../../../../interfaces/developer';
import { IFeature } from '../../../../../interfaces/feature';

import SelectDevelopers from '../../../../SelectDevelopers';
import ItemMenu from '../../../../ItemMenu';
import TeamMember from '../../TeamMember';

type propTypes = {
  feature: IFeature;
  team: IDeveloper[];
  projectUuid: string;
  buttons: { name: string; handler: Function }[];
};

function Feature({ feature, team, projectUuid, buttons }: propTypes) {
  const dispatch = useDispatch();

  const [assignedDeveloper, setAssignedDeveloper] = useState<IDeveloper | undefined>();

  useEffect(() => {
    const dev = team.find((developer) => developer.uuid === feature.developerUuid);
    setAssignedDeveloper(dev);
  }, [feature.developerUuid]);

  const handleMenuClick = (handler) => {
    handler(feature);
  };

  const assignDeveloper = (developer: IDeveloper) => {
    dispatch(editFeature(projectUuid, { ...feature, developerUuid: developer.uuid }));
  };

  const unassignDeveloper = () => {
    dispatch(editFeature(projectUuid, { ...feature, developerUuid: null }));
  };

  return (
    <div className="c-feature">
      <p className="c-feature__name">{feature.name}</p>
      <p className="c-feature__description">{feature.description}</p>
      <p className="c-feature__completion-date">
        Date of completion:
        <span
          className={
            feature.expirationDate ? 'c-feature__date' : 'c-feature__date c-feature__date--warn'
          }
        >
          {feature.expirationDate
            ? new Date(feature.expirationDate).toDateString()
            : 'work has not started yet'}
        </span>
      </p>

      {!assignedDeveloper && team.length ? (
        <SelectDevelopers
          label="Assign developer to this feature"
          developers={team}
          handleChange={assignDeveloper}
        />
      ) : null}

      {assignedDeveloper && (
        <div className="c-feature__developer">
          <p>Assigned developer:</p>
          <TeamMember developer={assignedDeveloper} handler={unassignDeveloper} />
        </div>
      )}

      <div className="c-feature__menu">
        <ItemMenu buttons={buttons} handleMenuClick={handleMenuClick} />
      </div>
    </div>
  );
}

export default Feature;
