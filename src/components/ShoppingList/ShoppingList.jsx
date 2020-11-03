import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import TouchRipple from "@material-ui/core/ButtonBase/TouchRipple";
import {generateList, addItem, removeItem} from "../../utils/list_utils"
import CONSTANTS from "../../constants";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      width: '25ch',
      margin: 'auto',
      display: 'flex',
    },
  },
  list: {
    '& > *': {
      margin: theme.spacing(0,-5),
    }
  },
  title: {
    '& > *': {
      padding: 5,
    }
  },

}));

const ShoppingList = () => {
  const classes = useStyles();
  const [newItem, setNewItem] = useState("");
  const [shoppingItems, setShoppingItems] = useState([]);
  const [refreshList, setRefreshList] = useState(true)

  const removeShoppingListItem = (item) => {
    removeItem(
      item, 
      CONSTANTS.ENDPOINT.REMOVE_SHOPPING_LIST_ITEM
    ).then((res) => {
      setRefreshList(true)
    })
  }

  const addShoppingListItem = () => {
    if (newItem) {
      addItem(
        newItem, 
        CONSTANTS.ENDPOINT.ADD_SHOPPING_LIST_ITEM).then((res)=> {
          setRefreshList(true)
          setNewItem("")
        })
    }
  }
  
  if (refreshList) {
    setRefreshList(false)
    fetch(CONSTANTS.ENDPOINT.GET_SHOPPING_LIST)
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.text()
    }).then(body => JSON.parse(body).items)
    .then(res => setShoppingItems(generateList(res, removeShoppingListItem)));
  }

  return (
  <main id="mainContent">
    <div className={classes.title}>
      <div className="row justify-content-center mt-5 p-10">
        <h3>Shopping List </h3>
      </div>
      <div className={classes.root} >
        <TextField 
          id="shopping" 
          onChange={(val)=> setNewItem(val.target.value)}
          value={newItem}
          onKeyPress={
            (ev) => {
              if (ev.key=='Enter'){
                addShoppingListItem()
              }
            }
          }
          label="Add Item to Shopping List" 
          variant="outlined" />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <div className={classes.list}>
              <List dense={TouchRipple} style={{width:300}}>
                {shoppingItems}
              </List>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  </main>
  );
}
export default ShoppingList;
