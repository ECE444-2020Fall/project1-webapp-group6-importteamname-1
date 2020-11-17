﻿import React, { useState } from 'react';
import { generateList, addItem, removeItem } from '../../utils/list_utils';
import { ListContainer } from '../../containers/ListContainer/ListContainer';
import CONSTANTS from '../../constants';
import { PageTitle } from '../../components/common/PageTitle';
import { SimpleListItem } from '../../components/common/SimpleListItems';

const ShoppingList = () => {
  const [newItem, setNewItem] = useState('');
  const [shoppingItems, setShoppingItems] = useState([]);
  const [smartShoppingItems, setSmartShoppingItems] = useState([]);
  const [refreshList, setRefreshList] = useState(true);

  const removeShoppingListItem = (item) => {
    removeItem(item, CONSTANTS.ENDPOINT.SHOPPING_LIST)
      .then(() => setRefreshList(true));
  };

  const addShoppingListItem = () => {
    if (newItem) {
      addItem(newItem, CONSTANTS.ENDPOINT.SHOPPING_LIST)
        .then(() => {
          setRefreshList(true);
          setNewItem('');
        });
    }
  };

  if (refreshList) {
    setRefreshList(false);
    fetch(CONSTANTS.ENDPOINT.SMART_SHOPPING_LIST, {
      credentials: 'include'
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.text();
      }).then(body => {
        console.log(JSON.parse(body));
        return JSON.parse(body).items;
      })
      .then(res => setSmartShoppingItems(
        res.map(item => <SimpleListItem key={item} item={item} />)));

    fetch(CONSTANTS.ENDPOINT.SHOPPING_LIST, {
      credentials: 'include'
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.text();
      }).then(body => JSON.parse(body).items)
      .then(res => setShoppingItems(generateList(res, removeShoppingListItem)));
  }

  const smartListSeparator = () =>
    smartShoppingItems.length == 0 ? <div></div> : <div> <br /> <i style={{ color: 'orange' }}> &nbsp; --- autogenerated shopping list items ---</i> </div>;

  return (
    <div>
      <br/>
      <PageTitle titleName="Shopping List" />

      <ListContainer
        newItem={newItem}
        setNewItem={setNewItem}
        shoppingItems={shoppingItems.concat(smartListSeparator(), smartShoppingItems)}
        addShoppingListItem={addShoppingListItem}
        Label="Add Item to Shopping List"
      />
    </div>

  );
};
export default ShoppingList;
