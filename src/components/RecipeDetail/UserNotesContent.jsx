/**
 * FileName: UserNotesContent.jsx
 *
 * Description: This is used to display user notes on the recipe details page.
 * 
 * Author(s): Yanisa Kham
 * Date: November 17, 2020 
 */


import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  left_align: {
    textAlign: "left"
  }
}));

const UserNotesContent = ({ userNotes }) => {
  const classes = useStyles();
  return (
    <Typography
      className={classes.left_align}
      variant="body2" color="textSecondary" component="p">
      { userNotes.split('\n').map(str => <p key={str}>{str}</p>)}
    </Typography>
  );
};

UserNotesContent.propTypes = {
  userNotes: PropTypes.any,
};

export { UserNotesContent };
