import React from 'react';
import { Box, Card, CardActionArea, Typography } from '@material-ui/core';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import RestIcon from '@material-ui/icons/FastfoodOutlined';

import { useStyles } from '../styles';
import Logo from '../components/Logo';
                    //background is white.

export default function HomeScreen(props) {
  const styles = useStyles();
  return (
    <Card>
    <CardActionArea onClick={() => props.history.push('/choose')}>
      <Box className={[styles.root, styles.main]}>  
        <Box className={[styles.main, styles.center]}>
          <Typography variant="h8" component="h5">
            Daddy's  || Soulfood  &  ||  Grille
          </Typography>
          <Typography
            variant="h1"
            component="h1"
            className={`${styles.bold} ${styles.moveText}`} // Add the "moveText" class here
          >
            Order <br />
            <RestIcon/>
            <br />
            Here!
          </Typography>
          <TouchAppIcon fontSize="large"></TouchAppIcon>
        </Box>
        <Box className={[styles.center, styles.white]}>
          <Typography variant="h4" component="h1" className={styles.footer}>
            Easy Kiosk
          </Typography>
        </Box>
      </Box>
    </CardActionArea>
  </Card>
);
  }