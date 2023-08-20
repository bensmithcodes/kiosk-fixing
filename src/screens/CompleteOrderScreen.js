import React, { useContext, useEffect } from 'react';
import { Box, Button, CircularProgress, Typography } from '@material-ui/core';
import { useStyles } from '../styles';
import Logo from '../components/Logo';
import { Store } from '../Store';
import { Alert } from '@material-ui/lab';
import { createOrder } from '../actions';
import { io } from 'socket.io-client'; // Import the WebSocket library

export default function CompleteOrderScreen(props) {
  const styles = useStyles();
  const { state, dispatch } = useContext(Store);
  const { order } = state;
  const { loading, error, newOrder } = state.orderCreate;

  useEffect(() => {
    if (order.orderItems.length > 0) {
      createOrder(dispatch, order);

      // Initialize WebSocket connection
      const socket = io('http://localhost:5000'); // Use your actual WebSocket server URL

      // Emit a 'orderCompleted' event to notify the queue screen
      socket.emit('orderCompleted', newOrder.number); // Adjust the event name and payload

      // Clean up: Disconnect the WebSocket when the component unmounts
      return () => {
        socket.disconnect();
      };
    }
  }, [order, dispatch, newOrder.number]);

  return (
    <Box className={[styles.root, styles.navy]}>
      <Box className={[styles.main, styles.center]}>
        <Box>
          <Logo large></Logo>
          {loading ? (
            <CircularProgress></CircularProgress>
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <>
              <Typography
                gutterBottom
                className={styles.title}
                variant="h3"
                component="h3"
              >
                Your order has been placed
              </Typography>
              <Typography
                gutterBottom
                className={styles.title}
                variant="h1"
                component="h1"
              >
                Thank You!
              </Typography>
              <Typography
                gutterBottom
                className={styles.title}
                variant="h3"
                component="h3"
              >
                Your order number is  # {newOrder.number}
              </Typography>
            </>
          )}
        </Box>
      </Box>
      <Box className={[styles.center, styles.space]}>
        <Button
          onClick={() => props.history.push('/')}
          variant="contained"
          color="primary"
          className={styles.largeButton}
        >
          Order Again
        </Button>
      </Box>
    </Box>
  );
}
