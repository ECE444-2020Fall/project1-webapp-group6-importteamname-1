import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ListWithDeletableItems } from '../../components/common/ListWithDeletableItems'
import { AddItemTextField } from '../../components/common/AddItemTextField'
import { PageTitle } from '../../components/common/PageTitle'
import PropTypes from 'prop-types';


const useStyles = makeStyles(() => ({
  root: {
    '& > *': {
      width: '25ch',
      margin: 'auto',
      display: 'flex',
    },
  },
}));

const ListContainer = ({
  pageTitle,
  newItem,
  setNewItem,
  shoppingItems,
  addShoppingListItem,
  Label }) => {
  const classes = useStyles();
  return (
    <main id='mainContent'>
      <PageTitle titleName={pageTitle} />
      <div className={classes.root} >
        <AddItemTextField
          newItem={newItem}
          setNewItem={setNewItem}
          addShoppingListItem={addShoppingListItem}
          Label = {Label} />
        <ListWithDeletableItems shoppingItems={shoppingItems} />
      </div>
    </main>
  )
}

ListContainer.propTypes = {
  pageTitle: PropTypes.any,
  newItem: PropTypes.any,
  setNewItem: PropTypes.func,
  shoppingItems: PropTypes.any,
  addShoppingListItem: PropTypes.func,
  Label: PropTypes.string
};

export { ListContainer };
