import React, { useEffect, useState } from 'react';
import './Projects.scss';

import { Button, Dialog, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import {
  createProject,
  deleteProject,
  editProject,
  getProjects,
} from '../../store/project/project.action';
import { getDevelopers } from '../../store/developer/developer.action';

import { IProject, IProjectDetails } from '../../interfaces/project';

import { RootSate } from '../../types/store-types';
import { FormField } from '../../types/common-types';

import initialDialogData from '../../constants/initial-dialog-data';
import initialProject from '../../constants/initial-project';

import ManageEntityInfo from '../ManageEntityInfo';
import Project from './Project';

function Projects() {
  const dispatch = useDispatch();

  const { projects } = useSelector((state: RootSate) => state.projectReducer);
  const { isRequestInProgress } = useSelector((state: RootSate) => state.requestStatusReducer);

  const [dialogData, setDialogData] = useState({ ...initialDialogData, entity: initialProject });

  const formFields: FormField[] = [
    {
      required: true,
      type: 'input',
      inputType: 'text',
      name: 'name',
      label: "Project's name",
      placeholder: "Enter project's name",
      selectValues: [],
    },
    {
      required: true,
      type: 'input',
      inputType: 'text',
      name: 'description',
      label: "Project's description",
      placeholder: "Enter project's description",
      selectValues: [],
    },
    {
      required: false,
      type: 'input',
      inputType: 'date',
      name: 'expirationDate',
      label: "Project's dead line (Date ISO8601 format)",
      placeholder: "Enter project's deadline date",
      selectValues: [],
    },
  ];

  useEffect(() => {
    dispatch(getProjects());
    dispatch(getDevelopers());
  }, []);

  const addProject = () => {
    setDialogData({
      type: 'add',
      opened: true,
      entity: initialProject,
      title: 'Create new project',
    });
  };

  const editProjectDetails = (projectDetails: IProjectDetails) => {
    const { team, features, ...project } = projectDetails;

    setDialogData({
      type: 'edit',
      opened: true,
      entity: project,
      title: 'Edit project',
    });
  };

  const removeProject = (project: IProjectDetails) => {
    dispatch(deleteProject(project.uuid));
  };

  const handleEntityChanges = (project: IProject) => {
    if (dialogData.type === 'add') {
      dispatch(createProject(project));
    } else {
      dispatch(editProject(project));
    }
  };

  const handleDialogClose = () => {
    setDialogData({ ...initialDialogData, entity: initialProject });
  };

  return (
    <div className="c-projects c-screen">
      <Typography variant="h4">Projects</Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        className="c-add-button"
        onClick={addProject}
      >
        Create new project
      </Button>

      {!isRequestInProgress && !projects.length && <p>There are no created projects yet.</p>}

      {projects.length ? (
        <div className="c-projects__list">
          {projects.map((project) => (
            <Project
              key={project.uuid}
              project={project}
              buttons={[
                { name: 'Edit project', handler: editProjectDetails },
                { name: 'Delete project', handler: removeProject },
              ]}
            />
          ))}
        </div>
      ) : null}

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

export default Projects;
