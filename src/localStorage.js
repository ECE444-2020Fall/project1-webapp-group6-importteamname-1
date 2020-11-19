/**
 * FileName: localStorage.js
 *
 * Description: This file contains code that stores Redux state in the browser's local storage, as well
 * as retrieving state from the local storage. The purpose of doing such is to persist the app's state
 * after a user refreshes the page. 
 *
 * Author: Tim Fei
 * Date: November 17, 2020 
 */

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch {
    throw new Error("Can't save changes in local storage");
  }
};