import React, { useEffect, useState } from 'react';
import './ManageDeveloperInfo.scss';

import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { createDeveloper, editDeveloper } from '../../../store/developer/developer.action';
import { DeveloperLevels, EmployeeStatus, IDeveloper } from '../../../interfaces/developer';
import initialDeveloper from '../../../constants/initial-developer';
import { FormField } from '../../../types/common-types';

import InputField from '../../InputField';

type propTypes = {
  developer: IDeveloper;
  type: string;
  close: Function;
};

function ManageDeveloperInfo({ developer, type, close }: propTypes) {
  const dispatch = useDispatch();

  const [developerDetails, setDeveloperDetails] = useState(initialDeveloper);
  const [errors, setErrors] = useState<string[]>([]);
  const [showErrors, setShowErrors] = useState(false);

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
    setDeveloperDetails(developer);
  }, [developer]);

  useEffect(() => {
    if (!type) {
      setErrors([]);
      setShowErrors(false);
    }
  }, [type]);

  const handleChange = (field: string, value: string) => {
    setDeveloperDetails({
      ...developerDetails,
      [field]: value,
    });
  };

  const countErrors = (action: string, field: string) => {
    if (action === 'add' && !errors.includes(field)) {
      setErrors([...errors, field]);
    }
    if (action === 'remove' && errors.includes(field)) {
      setErrors(errors.filter((error) => error !== field));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (errors.length) {
      setShowErrors(true);
      return;
    }

    if (type === 'add') {
      dispatch(createDeveloper(developerDetails));
    } else {
      dispatch(editDeveloper(developerDetails));
    }

    close();
  };

  return (
    <div className="c-manage-dialog">
      <form className="c-manage-dialog__form" onSubmit={handleSubmit}>
        {formFields.map((field) => (
          <InputField
            key={field.name}
            className="c-manage-dialog__form__input"
            required={field.required}
            type={field.type}
            inputType={field.inputType}
            label={field.label}
            placeholder={field.placeholder}
            name={field.name}
            selectValues={field.selectValues}
            value={developerDetails[field.name]}
            showErrors={showErrors}
            handleChange={handleChange}
            countErrors={countErrors}
          />
        ))}

        <div className="c-manage-dialog__form__buttons">
          <Button
            className="c-manage-dialog__form__button c-manage-dialog__form__button--submit"
            type="submit"
            variant="contained"
            color="primary"
            size="large"
          >
            {type === 'edit' ? 'Edit' : 'Create'}
          </Button>
          <Button
            className="c-manage-dialog__form__button c-manage-dialog__form__button--close"
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => close()}
          >
            Close
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ManageDeveloperInfo;
