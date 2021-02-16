import React, { useEffect } from 'react';
import './Dashboard.scss';

import { Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { getProjects } from '../../store/project/project.action';

import { RootSate } from '../../types/store-types';

import DetailsChart from './DetailsChart';
import DeadlineRatioChart from './DeadlineRatioChart';

function Dashboard() {
  const dispatch = useDispatch();

  const { projects } = useSelector((state: RootSate) => state.projectReducer);
  const { isRequestInProgress } = useSelector((state: RootSate) => state.requestStatusReducer);

  useEffect(() => {
    dispatch(getProjects());
  }, []);

  return (
    <div className="c-dashboard c-screen">
      <Typography variant="h4">Dashboard</Typography>

      {!isRequestInProgress && !projects.length && <p>There are no created projects yet.</p>}

      {projects.length ? (
        <div className="c-dashboard__charts">
          <DetailsChart projects={projects} />
          <DeadlineRatioChart projects={projects} />
        </div>
      ) : null}
    </div>
  );
}

export default Dashboard;
