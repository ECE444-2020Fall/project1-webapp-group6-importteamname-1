import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import TouchRipple from '@material-ui/core/ButtonBase/TouchRipple';

const useStyles = makeStyles((theme) => ({
  list: {
    '& > *': {
      margin: theme.spacing(0, -5),
    }
  },
}));


const ListWithDeletableItems = ({ shoppingItems }) => {
  const classes = useStyles();
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <div className={classes.list}>
          <List dense={TouchRipple} style={{ width: 300 }}>
            {shoppingItems}
          </List>
        </div>
      </Grid>
    </Grid>
  );
}

export { ListWithDeletableItems };