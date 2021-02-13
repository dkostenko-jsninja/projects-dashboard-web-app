import React, { useEffect } from 'react';
import './Developers.scss';

import { useDispatch, useSelector } from 'react-redux';
import { Button, Typography } from '@material-ui/core';

import { deleteDeveloper, getDevelopers } from '../../store/developer/developer.action';
import { RootSate } from '../../types/store-types';
import { IDeveloper } from '../../interfaces/developer';

import Developer from './Developer';

function Developers() {
  const dispatch = useDispatch();

  const { developers, isDeveloperRequestInProgress } = useSelector(
    (state: RootSate) => state.developerReducer
  );

  useEffect(() => {
    dispatch(getDevelopers());
  }, []);

  const editDeveloper = (developer: IDeveloper) => {
    console.log('edit', developer);
  };

  const removeDeveloper = (developer: IDeveloper) => {
    dispatch(deleteDeveloper(developer.uuid));
  };

  return (
    <div className="c-developers">
      <Typography variant="h4">Developers</Typography>
      <Button variant="contained" color="primary" size="large" className="c-add-btn">
        Add new developer
      </Button>

      {!isDeveloperRequestInProgress && !developers.length && (
        <p>There are no added developers yet</p>
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
    </div>
  );
}

export default Developers;
