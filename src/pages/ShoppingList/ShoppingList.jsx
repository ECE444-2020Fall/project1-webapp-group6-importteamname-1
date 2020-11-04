import React, { useState } from 'react';
import { generateList, addItem, removeItem } from '../../utils/list_utils'
import { ListContainer } from '../../containers/ListContainer/ListContainer'
import CONSTANTS from '../../constants';

const ShoppingList = () => {
  const [newItem, setNewItem] = useState('');
  const [shoppingItems, setShoppingItems] = useState([]);
  const [refreshList, setRefreshList] = useState(true)

  const removeShoppingListItem = (item) => {
    removeItem(item, CONSTANTS.ENDPOINT.REMOVE_SHOPPING_LIST_ITEM)
      .then((res) => setRefreshList(true))
  }

  const addShoppingListItem = () => {
    if (newItem) {
      addItem(newItem, CONSTANTS.ENDPOINT.ADD_SHOPPING_LIST_ITEM)
        .then((res) => {
          setRefreshList(true)
          setNewItem('')
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
    <ListContainer
      pageTitle='Shopping List'
      newItem={newItem}
      setNewItem={setNewItem}
      shoppingItems={shoppingItems}
      addShoppingListItem={addShoppingListItem}
    />
  );
}
export default ShoppingList;
