import React, { useEffect, useState } from 'react';
import './Developers.scss';

import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, Typography } from '@material-ui/core';

import {
  createDeveloper,
  deleteDeveloper,
  editDeveloper,
  getDevelopers,
} from '../../store/developer/developer.action';
import { DeveloperLevels, EmployeeStatus, IDeveloper } from '../../interfaces/developer';
import { RootSate } from '../../types/store-types';
import { FormField } from '../../types/common-types';
import initialDeveloper from '../../constants/initial-developer';

import Developer from './Developer';
import ManageEntityInfo from '../ManageEntityInfo';

const initialDialogData = {
  type: '',
  opened: false,
  entity: initialDeveloper,
  title: '',
};

function Developers() {
  const dispatch = useDispatch();

  const { developers } = useSelector((state: RootSate) => state.developerReducer);
  const { isRequestInProgress } = useSelector((state: RootSate) => state.requestStatusReducer);

  const [dialogData, setDialogData] = useState(initialDialogData);

  const formFields: FormField[] = [
    {
      required: true,
      type: 'input',
      inputType: 'text',
      name: 'firstName',
      label: 'First name',
      placeholder: 'Enter first name',
      selectValues: [],
    },
    {
      required: true,
      type: 'input',
      inputType: 'text',
      name: 'lastName',
      label: 'Last name',
      placeholder: 'Enter last name',
      selectValues: [],
    },
    {
      required: true,
      type: 'input',
      inputType: 'email',
      name: 'email',
      label: 'Email',
      placeholder: 'Enter email',
      selectValues: [],
    },
    {
      required: false,
      type: 'input',
      inputType: 'url',
      name: 'photo',
      label: 'Photo',
      placeholder: 'Paste photo url',
      selectValues: [],
    },
    {
      required: true,
      type: 'select',
      inputType: 'text',
      name: 'level',
      label: 'Level',
      placeholder: 'Select level',
      selectValues: Object.keys(DeveloperLevels).map((key) => DeveloperLevels[key]),
    },
    {
      required: true,
      type: 'select',
      inputType: 'text',
      name: 'employeeStatus',
      label: 'Employee status',
      placeholder: 'Change employee status',
      selectValues: Object.keys(EmployeeStatus).map((key) => EmployeeStatus[key]),
    },
  ];

  useEffect(() => {
    dispatch(getDevelopers());
  }, []);

  const addDeveloper = () => {
    setDialogData({ type: 'add', opened: true, entity: initialDeveloper, title: 'Add developer' });
  };

  const editDeveloperDetails = (developer: IDeveloper) => {
    setDialogData({
      type: 'edit',
      opened: true,
      entity: developer,
      title: 'Edit developer',
    });
  };

  const removeDeveloper = (developer: IDeveloper) => {
    dispatch(deleteDeveloper(developer.uuid));
  };

  const handleEntityChanges = (developerDetails: IDeveloper) => {
    if (dialogData.type === 'add') {
      dispatch(createDeveloper(developerDetails));
    } else {
      dispatch(editDeveloper(developerDetails));
    }
  };

  const handleDialogClose = () => {
    setDialogData(initialDialogData);
  };

  return (
    <div className="c-developers c-screen">
      <Typography variant="h4">Developers</Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        className="c-add-button"
        onClick={addDeveloper}
      >
        Add new developer
      </Button>

      {!isRequestInProgress && !developers.length && <p>There are no added developers yet.</p>}

      <div className="c-developers__list">
        {developers.map((developer) => (
          <Developer
            key={developer.uuid}
            developer={developer}
            buttons={[
              { name: 'Edit', handler: editDeveloperDetails },
              { name: 'Delete', handler: removeDeveloper },
            ]}
          />
        ))}
      </div>

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

export default Developers;
