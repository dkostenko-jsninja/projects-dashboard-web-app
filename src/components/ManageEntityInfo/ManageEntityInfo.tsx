import React, { useEffect, useState } from 'react';
import './ManageEntityInfo.scss';

import { Button, Typography } from '@material-ui/core';

import { IDeveloper } from '../../interfaces/developer';
import { IProject } from '../../interfaces/project';
import { IFeature } from '../../interfaces/feature';
import { FormField } from '../../types/common-types';

import InputField from '../InputField';

type propTypes = {
  type: string;
  title: string;
  entity: IDeveloper | IProject | IFeature;
  formFields: FormField[];
  handler: Function;
  close: Function;
};

function ManageEntityInfo({ type, title, entity, formFields, handler, close }: propTypes) {
  const [entityDetails, setEntityDetails] = useState(entity);
  const [errors, setErrors] = useState<string[]>([]);
  const [showErrors, setShowErrors] = useState(false);

  useEffect(() => {
    if (!type) {
      setErrors([]);
      setShowErrors(false);
    }
  }, [type]);

  const handleChange = (field: string, value: string) => {
    setEntityDetails({
      ...entityDetails,
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

    handler(entityDetails);
    close();
  };

  return (
    <div className="c-manage-dialog">
      <Typography variant="h6">{title}</Typography>
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
            value={entityDetails[field.name]}
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

export default ManageEntityInfo;
