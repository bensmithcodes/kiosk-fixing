import React from 'react';
import { Box, Button, CircularProgress, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useState } from 'react'; // Import useState from react module

import Keypad from '../components/Keypad'; // Import the Keypad component

import { useStyles } from '../styles';
import Logo from '../components/Logo';
export default function CompleteOrderScreen(props) {
  const styles = useStyles();
  const [pin, setPin] = useState(''); // State to store the entered PIN

  const handleNumberClick = (number) => {
    // Append the clicked number to the current PIN state
    setPin((prevPin) => prevPin + number);
  };

  return (
    <Box className={[styles.root, styles.navy]}>
      <Box className={[styles.main, styles.center]}>
        <Box>
          <Link to="/order">
          <Logo large></Logo> </Link>
          <Typography
            gutterBottom
            className={styles.title}
            variant="h3"
            component="h3"
          >
            Please follow the instruction on the PIN pad!
          </Typography>
          <CircularProgress />
         <div className={[styles.center]}>
           {/* Render the Keypad component and pass the handleNumberClick function */} 
           <Keypad onNumberClick={handleNumberClick} />
            {/* Display the entered PIN */}
            <Typography variant="h4" component="h4">
              Entered PIN: {pin}
            </Typography>
            <img src="/images/pinpad.jpg" alt="Your Image" />
          </div>


        </Box>
      </Box>
      <Box className={[styles.center, styles.space]}>
        <Button
          onClick={() => props.history.push('/complete')}
          variant="contained"
          color="primary"
          className={styles.largeButton}
        >
          Complete Order
        </Button>
      </Box>
    </Box>
  );
}
