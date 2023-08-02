import React from 'react';
import { Button } from '@material-ui/core';

const Keypad = ({ onNumberClick }) => {
  // Array of numbers to display on the keypad
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9,0];
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
        {numbers.map((number) => (
          <Button key={number} onClick={() => onNumberClick(number)} variant="contained" color="primary">
            {number}
          </Button>
          
        ))}
        
      </div>
    </div>
  );
  
};

export default Keypad;
