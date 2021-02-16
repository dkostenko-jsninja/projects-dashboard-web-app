import React, { useEffect, useState } from 'react';

import { TextField, Select, MenuItem, InputLabel, FormHelperText } from '@material-ui/core';

import emailRegExp from '../../../constants/email-regexp';
import urlRegexp from '../../../constants/url-regexp';
import isoDateRegexp from '../../../constants/iso-date-regexp';

type propTypes = {
  className: string;
  required: boolean;
  type: string;
  inputType: string;
  name: string;
  label: string;
  placeholder: string;
  value: string;
  selectValues: string[];
  showErrors: boolean;
  handleChange: Function;
  countErrors: Function;
};

function InputField({
  className,
  required,
  type,
  inputType,
  name,
  label,
  placeholder,
  value,
  selectValues,
  showErrors,
  handleChange,
  countErrors,
}: propTypes) {
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    if (isValid()) {
      countErrors('remove', name);
    } else {
      countErrors('add', name);
    }
  }, [value]);

  const isValid = () => {
    if (inputType === 'email' && !emailRegExp.test(value)) {
      setErrorText('Please enter a valid email address.');
      return false;
    }

    if (inputType === 'url' && value && !urlRegexp.test(value)) {
      setErrorText('Please enter a valid url.');
      return false;
    }

    if (inputType === 'date' && value && !isoDateRegexp.test(value)) {
      setErrorText('Please enter a valid date in ISO8601 format.');
      return false;
    }

    if (type === 'input' && (!value || value.length < 2) && required) {
      setErrorText('This field should contain at least 2 symbols.');
      return false;
    }

    if (type === 'select' && !value) {
      setErrorText(`Please select ${label}`);
      return false;
    }

    setErrorText('');
    return true;
  };

  return type === 'input' ? (
    <TextField
      className={className}
      id={name}
      label={label}
      placeholder={placeholder}
      value={value || ''}
      onChange={(e) => handleChange(name, e.target.value)}
      error={!!errorText && showErrors}
      helperText={showErrors && errorText}
      fullWidth
    />
  ) : (
    <div className={className}>
      <InputLabel id={label} error={!!errorText && showErrors}>
        {label}
      </InputLabel>
      <Select
        id={name}
        labelId={label}
        value={value}
        fullWidth
        error={!!errorText && showErrors}
        onChange={(e) => handleChange(name, e.target.value)}
      >
        {selectValues.map((selectValue) => (
          <MenuItem key={selectValue} value={selectValue}>
            {selectValue}
          </MenuItem>
        ))}
      </Select>
      {!!errorText && showErrors && <FormHelperText error>{errorText}</FormHelperText>}
    </div>
  );
}

export default InputField;
