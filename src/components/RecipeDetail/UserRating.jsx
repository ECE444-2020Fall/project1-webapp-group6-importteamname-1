import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import {setFeedback, getItem} from '../../utils/list_utils';
import CONSTANTS from "../../constants";

const UserRating = ({recipe_id}) => {

  const [value, setValue] = useState(false);
  const [refresh, setRefresh] = useState(true) 

  if (refresh) {
    setRefresh(false)
    getItem(recipe_id, CONSTANTS.ENDPOINT.USER_RATING)
    .then(res => setValue(res.feedback? res.feedback : 0 ))
  }

  return (
    <div>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <h5>Rating:</h5>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setFeedback(CONSTANTS.ENDPOINT.USER_RATING, recipe_id, newValue)
            setValue(newValue);
          }}
        />
      </Box>
    </div>
  );
}

UserRating.propTypes = {
  recipe_id: PropTypes.string
};

export { UserRating };
