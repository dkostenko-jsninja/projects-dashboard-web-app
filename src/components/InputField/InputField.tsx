import React, { useEffect, useState } from 'react';

import { TextField, Select, MenuItem, InputLabel, FormHelperText } from '@material-ui/core';

import emailRegExp from '../../constants/email-regexp';
import urlRegexp from '../../constants/url-regexp';

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
      key={`${name}-input`}
      className={className}
      id={name}
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={(e) => handleChange(name, e.target.value)}
      error={!!errorText && showErrors}
      helperText={showErrors && errorText}
      fullWidth
    />
  ) : (
    <div className={className}>
      <InputLabel key={`${name}-label`} id={label} error={!!errorText && showErrors}>
        {label}
      </InputLabel>
      <Select
        key={`${name}-input`}
        id={name}
        labelId={label}
        value={value}
        fullWidth
        error={!!errorText && showErrors}
        onChange={(e) => handleChange(name, e.target.value)}
      >
        {selectValues.map((selectValue) => (
          <MenuItem value={selectValue}>{selectValue}</MenuItem>
        ))}
      </Select>
      {!!errorText && showErrors && <FormHelperText error>{errorText}</FormHelperText>}
    </div>
  );
}

export default InputField;
