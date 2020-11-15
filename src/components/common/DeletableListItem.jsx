import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';


const DeletableListItem = ({ item, removeItem }) => {
  return (
    <ListItem >
      <ListItemText primary={item} />
      <ListItemSecondaryAction>
        <IconButton edge='end' aria-label='delete' onClick={() => { removeItem(item) }}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

DeletableListItem.propTypes = {
  item: PropTypes.string,
  removeItem: PropTypes.func
};

export { DeletableListItem };

