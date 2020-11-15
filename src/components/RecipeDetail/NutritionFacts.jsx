import React from "react";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import BatteryChargingFullIcon from '@material-ui/icons/BatteryChargingFull';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));


const NutritionFacts = (props) => {
  const classes = useStyles();

  return (
    <div>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Typography fontWeight={500} variant="h7" className={classes.title}>
            Nutrition Facts:
          </Typography>
          <div className={classes.demo}>
            <List dense={true}>
                <ListItem>
                  <ListItemIcon>
                    <BatteryChargingFullIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={props.calories}
                    secondary='Calories'
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <BatteryChargingFullIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={props.carbs + ' g'}
                    secondary='Carbs'
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <BatteryChargingFullIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={props.protein + ' g'}
                    secondary='Protein'
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <BatteryChargingFullIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={props.fat + ' g'}
                    secondary='Fat'
                  />
                </ListItem>
            </List>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
  
NutritionFacts.propTypes = {
  calories: PropTypes.number,
  protein: PropTypes.number,
  carbs: PropTypes.number,
  fat: PropTypes.number,
};

export default NutritionFacts;