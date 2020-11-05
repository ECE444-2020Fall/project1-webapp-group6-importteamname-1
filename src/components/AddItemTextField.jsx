import React from 'react';
import TextField from '@material-ui/core/TextField';


const AddItemTextField = ({ newItem, setNewItem, addShoppingListItem }) => {
  return (
    <TextField
      id='shopping'
      onChange={(val) => setNewItem(val.target.value)}
      value={newItem}
      onKeyPress={
        (ev) => {
          if (ev.key === 'Enter') {
            addShoppingListItem()
          }
        }
      }
      label='Add Item to Shopping List'
      variant='outlined' />
  )
}

export { AddItemTextField };
