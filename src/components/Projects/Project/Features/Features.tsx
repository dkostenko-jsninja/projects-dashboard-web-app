import React from 'react';

import { IFeature } from '../../../../interfaces/feature';

import Feature from './Feature';

type propTypes = {
  features: IFeature[];
  projectUuid: string;
};

function Features({ features, projectUuid }: propTypes) {
  const editFeature = (feature: IFeature) => {
    console.log(projectUuid);
    console.log('edit', feature);
  };

  const deleteFeature = (feature: IFeature) => {
    console.log('delete', feature);
  };

  return (
    <div className="c-features">
      {features.map((feature) => (
        <Feature
          key={feature.uuid}
          feature={feature}
          buttons={[
            { name: 'Edit feature', handler: editFeature },
            { name: 'Delete feature', handler: deleteFeature },
          ]}
        />
      ))}
    </div>
  );
}

export default Features;
