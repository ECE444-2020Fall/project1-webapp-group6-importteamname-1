/**
 * FileName: SimpleListItem.jsx
 *
 * Description: Displays a list of items.
 * 
 * Author(s): Yanisa Kham
 * Date: November 17, 2020 
 */


import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';

const SimpleListItem = ({ item }) => {
  return (
    <ListItem >
      <ListItemText primary={item} />
    </ListItem>
  );
};

SimpleListItem.propTypes = {
  item: PropTypes.string,
};

export { SimpleListItem };

