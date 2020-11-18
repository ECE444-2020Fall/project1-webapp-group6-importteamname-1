/**
 * FileName: AddItemToTextField.jsx
 *
 * Description: A textfield that can be used to insert items that will be rendered on the page.
.*
 * Author(s): Yanisa Kham
 * Date: November 17, 2020 
 */


import React from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';


const AddItemTextField = ({ newItem, setNewItem, addShoppingListItem, Label }) => {

  return (
    <TextField
      id='shopping'
      onChange={(val) => setNewItem(val.target.value)}
      value={newItem}
      onKeyPress={
        (ev) => {
          if (ev.key === 'Enter') {
            addShoppingListItem();
          }
        }
      }
      label={Label}
      variant='outlined' />
  );
};

AddItemTextField.propTypes = {
  newItem: PropTypes.any,
  setNewItem: PropTypes.func,
  addShoppingListItem: PropTypes.func,
  Label: PropTypes.string
};

export { AddItemTextField };
