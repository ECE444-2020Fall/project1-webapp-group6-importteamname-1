/**
 * FileName: UserNotesTextBox.jsx
 *
 * Description: This component is used by the user to edit and submit user notes on a recipe detail page.
 * 
 * Author(s): Yanisa Kham
 * Date: November 17, 2020 
 */


import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(() => ({
  notes_editor: {
    '& > *': {
      width: 500,
    }
  }
}));


const NotesTextBox = ({ userNotes, setUserNotes }) => {
  const classes = useStyles();
  return (
    <TextField
      className={classes.notes_editor}
      multiline
      rows={4}
      rowsMax={10}
      variant="outlined"
      defaultValue={userNotes}
      onChange={(val) => {
        setUserNotes(val.target.value);
      }
      }
      onKeyPress={
        (ev) => {
          if (ev.key === 'Enter') {
            setUserNotes(userNotes + '\n');
          }
        }
      }
    />
  );
};

NotesTextBox.propTypes = {
  userNotes: PropTypes.any,
  setUserNotes: PropTypes.func,
};
