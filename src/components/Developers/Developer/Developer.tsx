import React, { useState, MouseEvent } from 'react';
import './Developer.scss';

import { IconButton, Menu, MenuItem } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { IDeveloper } from '../../../interfaces/developer';

import noPhoto from '../../../assets/images/no_photo.png';

import DetailItem from './DetailItem';

type propTypes = {
  developer: IDeveloper;
  buttons: { name: string; handler: Function }[];
};

function Developer({ developer, buttons }: propTypes) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpened = Boolean(anchorEl);

  const developerDetails = [
    {
      name: 'email',
      key: 'email',
    },
    {
      name: 'level',
      key: 'level',
    },
    {
      name: 'status',
      key: 'employeeStatus',
    },
  ];

  const handleOpenMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (handler) => {
    handler(developer);
    handleCloseMenu();
  };

  return (
    <div className="c-developer">
      <div className="c-developer__image-block">
        <img
          className="c-developer__image"
          src={developer.photo ? developer.photo : noPhoto}
          alt={`${developer.firstName} ${developer.lastName}`}
          draggable="false"
        />
      </div>
      <div className="c-developer__info">
        <p className="c-developer__name">{`${developer.firstName} ${developer.lastName}`}</p>

        <div className="c-developer__details">
          {developerDetails.map((detail) => (
            <DetailItem key={detail.key} name={detail.name} value={developer[detail.key]} />
          ))}
        </div>
      </div>
      <div className="c-developer__menu">
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleOpenMenu}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu open={isMenuOpened} anchorEl={anchorEl} keepMounted onClose={handleCloseMenu}>
          {buttons.map((button) => (
            <MenuItem key={button.name} onClick={() => handleMenuClick(button.handler)}>
              {button.name}
            </MenuItem>
          ))}
        </Menu>
      </div>
    </div>
  );
}

export default Developer;
