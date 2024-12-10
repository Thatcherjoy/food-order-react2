import React from 'react';
import { Button } from '@mui/material';

const Footer = ({ isAdminMode, onToggleMode }) => {
  return (
    <div style={{
      position: 'fixed', 
      bottom: 0, 
      width: '100%', 
      textAlign: 'center', 
      padding: '10px',
      backgroundColor: '#f0f0f0'
    }}>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={onToggleMode}
      >
        Switch to {isAdminMode ? 'User' : 'Admin'} Mode
      </Button>
    </div>
  );
};

export default Footer;