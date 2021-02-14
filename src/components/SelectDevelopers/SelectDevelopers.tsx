import React from 'react';

import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';

import { IDeveloper } from '../../interfaces/developer';

type propTypes = {
  label: string;
  value: string;
  developers: IDeveloper[];
  handleChange: Function;
};

function SelectDevelopers({ label, value, developers, handleChange }: propTypes) {
  const handleSelect = (developerUuid) => {
    const selectedDeveloper = developers.find((developer) => developer.uuid === developerUuid);
    handleChange(selectedDeveloper);
  };

  return (
    <>
      <FormControl variant="outlined" fullWidth>
        <InputLabel id={label}>{label}</InputLabel>
        <Select
          labelId={label}
          onChange={(e) => handleSelect(e.target.value)}
          value={value}
          label={label}
        >
          {developers.map((developer) => (
            <MenuItem key={developer.uuid} value={developer.uuid}>
              {`${developer.firstName} ${developer.lastName}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}

export default SelectDevelopers;
