import React from "react";
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const DeletableListItem = (item, removeItem) => {
    return (
        <ListItem > 
        <ListItemText primary={item} />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="delete" onClick={()=> {removeItem(item)}}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    )
}

function generateList(items, removeItem) {
  return items.map((item) =>
    DeletableListItem(item, removeItem)
    );
}

const removeItem = (item, endpoint) => {
  return fetch(`${endpoint}/${item}`,{
    method: 'delete'
  }).then((response) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response
  })
}

const addItem = (newItem, endpoint) => {
  return fetch(endpoint, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },   
    method: 'post',
    body: JSON.stringify({
      "item": newItem
    })
  }).then((response) => {
    if (response.status == 500) {
        throw Error(response.statusText);
    }
    return response
  })
}

export {generateList, addItem, removeItem};