import React, { useEffect, useState } from 'react';
import './Feature.scss';

import { useSelector } from 'react-redux';

import { IDeveloper } from '../../../../../interfaces/developer';
import { IFeature } from '../../../../../interfaces/feature';
import { RootSate } from '../../../../../types/store-types';

import ItemMenu from '../../../../ItemMenu';
import TeamMember from '../../TeamMember';

type propTypes = {
  feature: IFeature;
  buttons: { name: string; handler: Function }[];
};

function Feature({ feature, buttons }: propTypes) {
  const { developers } = useSelector((state: RootSate) => state.developerReducer);

  const [assignedDeveloper, setAssignedDeveloper] = useState<IDeveloper | undefined>();

  useEffect(() => {
    if (feature.developerUuid) {
      const dev = developers.find((developer) => developer.uuid === feature.developerUuid);
      setAssignedDeveloper(dev);
    }
  }, []);

  const handleMenuClick = (handler) => {
    handler(feature);
  };

  const unassignDeveloper = (developerUuid: string) => {
    console.log('unassgin', developerUuid);
  };

  return (
    <div className="c-feature">
      <p className="c-feature__name">{feature.name}</p>
      <p className="c-feature__description">{feature.description}</p>
      <p className="c-feature__completion-date">
        Date of completion:
        <span className="c-feature__date">
          {feature.expirationDate
            ? new Date(feature.expirationDate).toDateString()
            : 'work has not started yet'}
        </span>
      </p>

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
