import React, { useEffect } from 'react';
import './Projects.scss';

import { Button, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { getProjects } from '../../store/project/project.action';
import { RootSate } from '../../types/store-types';
import { IProjectDetails } from '../../interfaces/project';

import Project from './Project';

function Projects() {
  const dispatch = useDispatch();

  const { projects } = useSelector((state: RootSate) => state.projectReducer);
  const { isRequestInProgress } = useSelector((state: RootSate) => state.requestStatusReducer);

  useEffect(() => {
    dispatch(getProjects());
  }, []);

  const editProject = (project: IProjectDetails) => {
    console.log('edit', project);
  };

  const deleteProject = (project: IProjectDetails) => {
    console.log('delete', project);
  };

  return (
    <div className="c-projects c-screen">
      <Typography variant="h4">Projects</Typography>
      <Button variant="contained" color="primary" size="large" className="c-add-button">
        Create new project
      </Button>

      {!isRequestInProgress && !projects.length && <p>There are no created projects yet.</p>}

      <div className="c-projects__list">
        {projects.map((project) => (
          <Project
            key={project.uuid}
            project={project}
            buttons={[
              { name: 'Edit project', handler: editProject },
              { name: 'Delete project', handler: deleteProject },
            ]}
          />
        ))}
      </div>
    </div>
  );
}

export default Projects;
