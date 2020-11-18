/**
 * FileName: ListContainer.jsx
 *
 * Description: This component contains child components used to display a list of items on the page.
 * 
 * Author(s): Yanisa Kham
 * Date: November 17, 2020 
 */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ListWithDeletableItems } from '../../components/common/ListWithDeletableItems';
import { AddItemTextField } from '../../components/common/AddItemTextField';
import PropTypes from 'prop-types';


const useStyles = makeStyles(() => ({
  root: {
    '& > *': {
      width: '30ch',
      margin: 'auto',
      display: 'flex',
    },
  },
}));

const ListContainer = ({
  newItem,
  setNewItem,
  shoppingItems,
  addShoppingListItem,
  Label
}) => {
  const classes = useStyles();
  return (
    <div className={classes.root} >
      <AddItemTextField
        newItem={newItem}
        setNewItem={setNewItem}
        addShoppingListItem={addShoppingListItem}
        Label={Label} />
      <ListWithDeletableItems shoppingItems={shoppingItems} />
    </div>
  );
};

ListContainer.propTypes = {
  pageTitle: PropTypes.any,
  newItem: PropTypes.any,
  setNewItem: PropTypes.func,
  shoppingItems: PropTypes.any,
  addShoppingListItem: PropTypes.func,
  Label: PropTypes.string
};

export { ListContainer };
