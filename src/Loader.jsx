
import React from 'react';
import { Stack } from '@mui/material';

export const Loader = () => {
  return (
    <Stack 
      direction="column" 
      justifyContent="center" 
      alignItems="center" 
      style={{ height: '100vh' }}
      spacing={2}
    >
      <div style={{
        border: '8px solid #f3f3f3',
        borderTop: '8px solid #3498db',
        borderRadius: '50%',
        width: '80px',
        height: '80px',
        animation: 'spin 1s linear infinite'
      }} />
      <h2 style={{ color: 'white' }}>جاري التحميل...</h2>
    </Stack>
  );
};