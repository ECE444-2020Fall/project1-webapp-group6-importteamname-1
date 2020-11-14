import React from 'react';
import { DeletableListItem } from '../components/DeletableListItem'

function generateList(items, removeItem) {
  return items.map(item =>
    <DeletableListItem key={item} item={item} removeItem={removeItem} />
  );
}

const removeItem = (item, endpoint) => {
  return fetch(`${endpoint}/${item}`, {
    method: 'delete'
  }).then((response) => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return
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
      'item': newItem
    })
  }).then((response) => {
    if (response.status === 500) {
      throw Error(response.statusText);
    }
    return 
  })
}

export { generateList, addItem, removeItem };