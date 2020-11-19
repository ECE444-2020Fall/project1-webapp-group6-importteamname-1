import React from 'react';
import { DeletableListItem } from '../components/common/DeletableListItem';

function generateList(items, removeItem) {
  return items.map(item =>
    <DeletableListItem key={item} item={item} removeItem={removeItem} />
  );
}

const getItem = (item, endpoint) => {
  return fetch(`${endpoint}/${item}/${localStorage.getItem('user_id')}`)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.text();
    })
    .then(body => JSON.parse(body));
};

const removeItem = (item, endpoint) => {
  return fetch(`${endpoint}/${item}/${localStorage.getItem('user_id')}`, {
    method: 'delete',
  }).then((response) => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return;
  });
};

const addItem = (newItem, endpoint) => {
  return fetch(endpoint, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'post',
    body: JSON.stringify({
      'item': newItem,
      'user_id': localStorage.getItem('user_id')
    })
  }).then((response) => {
    if (response.status === 500) {
      throw Error(response.statusText);
    }
    return;
  });
};

const setFeedback = (endpoint, item, feedback) => {

  return fetch(`${endpoint}`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'post',
    body: JSON.stringify({
      "recipe_id": item,
      "feedback": feedback,
      "user_id": localStorage.getItem('user_id')
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.text();
    })
    .then(body => JSON.parse(body));

};


export { setFeedback, generateList, addItem, removeItem, getItem };