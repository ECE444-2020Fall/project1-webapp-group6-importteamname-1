import React from 'react';
import { DeletableListItem } from '../components/DeletableListItem'

function generateList(items, removeItem) {
  return items.map(item =>
    <DeletableListItem key={item} item={item} removeItem={removeItem} />
  );
}

const getItem = (item, endpoint) => {
  return fetch(`${endpoint}/${item}`)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.text();
    })
    .then(body => {
      const x = JSON.parse(body);
      return x
    })

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

const setFeedback = (endpoint, item, feedback) => {

  return fetch(`${endpoint}`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'post',
    body: JSON.stringify({
      "recipe_id": item,
      "feedback": feedback
    })
  })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      console.log(response)
      return response.text();
    })
    .then(body => JSON.parse(body))

}


export { setFeedback, generateList, addItem, removeItem, getItem };