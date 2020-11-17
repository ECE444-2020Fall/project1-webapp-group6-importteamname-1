import React from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { setFeedback } from '../../utils/list_utils';
import CONSTANTS from '../../constants';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  button: {
    float: "right",
    width: 55,
    height: 30
  }
}));

const UserNotesButton = ({ userNotes, setEditMode, editMode }) => {
  const classes = useStyles();
  const { recipe_id } = useParams();

  return (
    <Button
      size="small"
      variant="contained"
      color={editMode ? "primary" : "default"}
      onClick={() => {
        if (editMode) {
          setFeedback(CONSTANTS.ENDPOINT.USER_NOTES, recipe_id, userNotes);
        }
        setEditMode(!editMode);
      }}
      className={classes.button}
    > {editMode ? "Save" : "Edit"} </Button>
  );
};

UserNotesButton.propTypes = {
  userNotes: PropTypes.any,
  editMode: PropTypes.any,
  setEditMode: PropTypes.func
};

export { UserNotesButton };
