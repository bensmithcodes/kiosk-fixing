import React from 'react';
import { Box, Card, CardActionArea, Typography } from '@material-ui/core';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import { makeStyles } from '@material-ui/core/styles'; // Import makeStyles

// Define useStyles outside of the HomeScreen component
const useStyles = makeStyles((theme) => ({
  // Other styles...

  card: {
    maxWidth: '800px', // Adjust this value to make the card wider
    margin: '0 auto', // Center the card horizontally
  },
}));

export default function HomeScreen(props) {
  const styles = useStyles();
  return (
    <Card className={styles.card}>
      <CardActionArea onClick={() => props.history.push('/choose')}>
        <Box className={[styles.root, styles.red]}>
          <Box className={[styles.main, styles.center]}>
            <Typography variant="h6" component="h6">
              Fast & Easy
            </Typography>
            <Typography variant="h1" component="h1" className={styles.bold}>
              Order <br />
              & pay
              <br />
              here!
            </Typography>
            <TouchAppIcon fontSize="large"></TouchAppIcon>
          </Box>
          <Box className={[styles.center, styles.green]}>
            <Typography variant="h5" component="h3" className={styles.footer} >
              Touch to Start!
            </Typography>
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  );
}
