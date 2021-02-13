import React, { useEffect, useState } from 'react';
import './Developers.scss';

import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, Typography } from '@material-ui/core';

import { deleteDeveloper, getDevelopers } from '../../store/developer/developer.action';
import { RootSate } from '../../types/store-types';
import { IDeveloper } from '../../interfaces/developer';
import initialDeveloper from '../../constants/initial-developer';

import Developer from './Developer';
import ManageDeveloperInfo from './ManageDeveloperInfo';

const initialDialogData = {
  type: '',
  opened: false,
};

function Developers() {
  const dispatch = useDispatch();

  const { developers, isDeveloperRequestInProgress } = useSelector(
    (state: RootSate) => state.developerReducer
  );

  const [dialogData, setDialogData] = useState(initialDialogData);
  const [selectedDeveloper, setSelectedDeveloper] = useState(initialDeveloper);

  useEffect(() => {
    dispatch(getDevelopers());
  }, []);

  const addDeveloper = () => {
    setDialogData({ type: 'add', opened: true });
  };

  const editDeveloper = (developer: IDeveloper) => {
    setDialogData({ type: 'edit', opened: true });
    setSelectedDeveloper(developer);
  };

  const removeDeveloper = (developer: IDeveloper) => {
    dispatch(deleteDeveloper(developer.uuid));
  };

  const handleDialogClose = () => {
    setDialogData(initialDialogData);
    setSelectedDeveloper(initialDeveloper);
  };

  return (
    <div className="c-developers">
      <Typography variant="h4">Developers</Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        className="c-add-btn"
        onClick={addDeveloper}
      >
        Add new developer
      </Button>

      {!isDeveloperRequestInProgress && !developers.length && (
        <p>There are no added developers yet.</p>
      )}

      <div className="c-developers__list">
        {developers.map((developer) => (
          <Developer
            key={developer.uuid}
            developer={developer}
            buttons={[
              { name: 'Edit', handler: editDeveloper },
              { name: 'Delete', handler: removeDeveloper },
            ]}
          />
        ))}
      </div>

      <Dialog open={dialogData.opened}>
        <ManageDeveloperInfo
          developer={selectedDeveloper}
          type={dialogData.type}
          close={handleDialogClose}
        />
      </Dialog>
    </div>
  );
}

export default Developers;
