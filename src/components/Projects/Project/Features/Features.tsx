import React, { useState } from 'react';
import './Features.scss';

import { useDispatch } from 'react-redux';
import { Dialog, IconButton, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import { FormField } from '../../../../types/common-types';
import { IFeature } from '../../../../interfaces/feature';
import {
  createFeature,
  deleteFeature,
  editFeature,
} from '../../../../store/project/project.action';

import initialDialogData from '../../../../constants/initial-dialog-data';
import initialFeature from '../../../../constants/initial-feature';

import ManageEntityInfo from '../../../ManageEntityInfo';
import Feature from './Feature';

type propTypes = {
  features: IFeature[];
  projectUuid: string;
};

function Features({ features, projectUuid }: propTypes) {
  const dispatch = useDispatch();

  const [dialogData, setDialogData] = useState({ ...initialDialogData, entity: initialFeature });

  const formFields: FormField[] = [
    {
      required: true,
      type: 'input',
      inputType: 'text',
      name: 'name',
      label: "Feature's name",
      placeholder: "Enter feature's name",
      selectValues: [],
    },
    {
      required: true,
      type: 'input',
      inputType: 'text',
      name: 'description',
      label: "Feature's description",
      placeholder: "Enter feature's description",
      selectValues: [],
    },
  ];

  const addFeature = () => {
    setDialogData({
      type: 'add',
      title: "Add project's feature",
      opened: true,
      entity: initialFeature,
    });
  };

  const editFeatureDetails = (feature: IFeature) => {
    setDialogData({
      type: 'edit',
      title: "Edit project's feature",
      opened: true,
      entity: feature,
    });
  };

  const removeFeature = (feature: IFeature) => {
    dispatch(deleteFeature(projectUuid, feature.uuid));
  };

  const handleEntityChanges = (feature: IFeature) => {
    if (dialogData.type === 'add') {
      dispatch(createFeature(projectUuid, feature));
    } else {
      dispatch(editFeature(projectUuid, feature));
    }
  };

  const handleDialogClose = () => {
    setDialogData({ ...initialDialogData, entity: initialFeature });
  };

  return (
    <div className="c-features">
      <Typography className="c-features__title" variant="h6">
        Features
      </Typography>
      <IconButton className="c-features__add-btn" onClick={addFeature}>
        <AddIcon />
      </IconButton>

      {!features.length && <p>This project doesn&lsquo;t have features yet.</p>}

      {features.map((feature) => (
        <Feature
          key={feature.uuid}
          feature={feature}
          buttons={[
            { name: 'Edit feature', handler: editFeatureDetails },
            { name: 'Delete feature', handler: removeFeature },
          ]}
        />
      ))}

      <Dialog open={dialogData.opened}>
        <ManageEntityInfo
          type={dialogData.type}
          title={dialogData.title}
          entity={dialogData.entity}
          formFields={formFields}
          handler={handleEntityChanges}
          close={handleDialogClose}
        />
      </Dialog>
    </div>
  );
}

export default Features;
