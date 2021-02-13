import React from 'react';

import { useDispatch } from 'react-redux';

import { IFeature } from '../../../../interfaces/feature';
import { deleteFeature } from '../../../../store/project/project.action';

import Feature from './Feature';

type propTypes = {
  features: IFeature[];
  projectUuid: string;
};

function Features({ features, projectUuid }: propTypes) {
  const dispatch = useDispatch();

  const editFeature = (feature: IFeature) => {
    console.log(projectUuid);
    console.log('edit', feature);
  };

  const removeFeature = (feature: IFeature) => {
    dispatch(deleteFeature(projectUuid, feature.uuid));
  };

  return (
    <div className="c-features">
      {features.map((feature) => (
        <Feature
          key={feature.uuid}
          feature={feature}
          buttons={[
            { name: 'Edit feature', handler: editFeature },
            { name: 'Delete feature', handler: removeFeature },
          ]}
        />
      ))}
    </div>
  );
}

export default Features;
