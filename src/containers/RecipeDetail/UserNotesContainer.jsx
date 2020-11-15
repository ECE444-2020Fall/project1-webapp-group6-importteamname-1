import React, { useState } from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { getItem } from '../../utils/list_utils';
import CONSTANTS from '../../constants';
import {UserNotesContent} from '../../components/RecipeDetail/UserNotesContent'
import {UserNotesButton} from '../../components/RecipeDetail/UserNotesButton'

const useStyles = makeStyles(() => ({
  notes_editor: {
    '& > *': {
      width: 500,
    }
  }
}));

const UserNotesContainer = () => {
  const [editMode, setEditMode] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const [userNotes, setUserNotes] = useState("");
  const { recipe_id } = useParams();
  if (refresh) {
    setRefresh(false);
    getItem(recipe_id, CONSTANTS.ENDPOINT.USER_NOTES)
      .then(res => {
        if (res.feedback) {
          setUserNotes(res.feedback);
        }
      });
  }
  return (
    <div >
      <Card >
        <CardContent>
          <UserNotesButton editMode={editMode}  setEditMode={setEditMode} userNotes={userNotes} />
          <h5>User notes</h5>
          {editMode ?
            <NotesTextBox userNotes={userNotes} setUserNotes={setUserNotes} /> :
            <UserNotesContent userNotes={userNotes} />}
        </CardContent>
      </Card>

    </div>
  );
};

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


export { UserNotesContainer };