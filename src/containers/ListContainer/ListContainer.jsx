import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ListWithDeletableItems } from '../../components/ListWithDeletableItems'
import { AddItemTextField } from '../../components/AddItemTextField'
import { PageTitle } from '../../components/PageTitle'

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
  addShoppingListItem }) => {
  const classes = useStyles();
  return (
    <main id='mainContent'>
      <PageTitle titleName={pageTitle} />
      <div className={classes.root} >
        <AddItemTextField
          newItem={newItem}
          setNewItem={setNewItem}
          addShoppingListItem={addShoppingListItem} />
        <ListWithDeletableItems shoppingItems={shoppingItems} />
      </div>
    </main>
  )
}

export { ListContainer };
