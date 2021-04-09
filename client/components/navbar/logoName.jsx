import React from 'react';
import { Typography, makeStyles, Box, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
}));

const LogoName = (props) => {
  const classes = useStyles();

  return (
    <div>
      <Typography className={classes.title} variant="h4" noWrap>
        sickBay
      </Typography>
    </div>
  );
};

export default LogoName;
