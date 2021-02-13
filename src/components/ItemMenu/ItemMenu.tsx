import React, { MouseEvent, useState } from 'react';

import { IconButton, Menu, MenuItem } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

type propTypes = {
  buttons: { name: string; handler: Function }[];
  handleMenuClick: Function;
};

function ItemMenu({ buttons, handleMenuClick }: propTypes) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpened = Boolean(anchorEl);

  const handleOpenMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleClick = (handler) => {
    handleMenuClick(handler);
    handleCloseMenu();
  };

  return (
    <>
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
          <MenuItem key={button.name} onClick={() => handleClick(button.handler)}>
            {button.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default ItemMenu;
