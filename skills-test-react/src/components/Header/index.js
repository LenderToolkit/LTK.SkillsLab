import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Avatar, 
  Box, 
  IconButton, 
  Menu, 
  MenuItem, 
  Typography, 
  Tooltip
} from '@mui/material';

import { PATH, CONSTANTS } from '../../constants';
import { Button } from '@mui/material';

export default function HeaderComponent({ onClick }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleTodopage = () => {
    navigate(PATH.TODO)
  }
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', my: '20px' }}>
        <Typography sx={{ minWidth: 100 }}>{CONSTANTS.general.contact}</Typography>
        <Typography sx={{ minWidth: 100 }}>{CONSTANTS.general.profile}</Typography>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>{CONSTANTS.general.m}</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={onClick}>
            <Button startIcon={<Avatar />} variant="text" onClick={handleTodopage}> {CONSTANTS.general.openForm}</Button>            
        </MenuItem>
      </Menu>
    </>
  );
}
