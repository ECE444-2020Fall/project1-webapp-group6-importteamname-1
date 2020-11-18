import React from "react";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import BatteryChargingFullIcon from '@material-ui/icons/BatteryChargingFull';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  listContainer: {
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexDirection: 'vertical',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  grid: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));


const NutritionFacts = (props) => {
  const classes = useStyles();

  return (
    <div>
      <Grid className={classes.grid} container>
        <Grid className={classes.grid} item xs={12} md={6}>
          <Typography variant="h7" className={classes.title}>
            <h5>Nutrition Facts:</h5>
          </Typography>
          <div className={classes.listContainer}>
            <List dense={true}>
              <ListItem>
                <ListItemIcon>
                  <BatteryChargingFullIcon />
                </ListItemIcon>
                <ListItemText
                  primary={`${props.calories} Cal`}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <BatteryChargingFullIcon />
                </ListItemIcon>
                <ListItemText
                  primary={`${props.carbs}g Carbs`}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <BatteryChargingFullIcon />
                </ListItemIcon>
                <ListItemText
                  primary={`${props.protein}g Protein`}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <BatteryChargingFullIcon />
                </ListItemIcon>
                <ListItemText
                  primary={`${props.fat}g Fat`}
                />
              </ListItem>
            </List>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

NutritionFacts.propTypes = {
  calories: PropTypes.number,
  protein: PropTypes.number,
  carbs: PropTypes.number,
  fat: PropTypes.number,
};

export default NutritionFacts;