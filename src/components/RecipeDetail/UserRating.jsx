import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import { setFeedback, getItem } from '../../utils/list_utils';
import CONSTANTS from "../../constants";

const UserRating = ({ recipe_id }) => {

  const [ratingValue, setRatingValue] = useState(0);
  const [refresh, setRefresh] = useState(true);

  if (refresh) {
    setRefresh(false);
    getItem(recipe_id, CONSTANTS.ENDPOINT.USER_RATING)
      .then(res => setRatingValue(res.item ? res.item : 0));
  }

  return (
    <div>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <h5>Rating:</h5>
        <Rating
          name={recipe_id}
          value={ratingValue}
          onChange={(event, newValue) => {
            setRatingValue(newValue);
            setFeedback(CONSTANTS.ENDPOINT.USER_RATING, recipe_id, newValue);
          }}
        />
      </Box>
    </div>
  );
};

UserRating.propTypes = {
  recipe_id: PropTypes.string
};

export { UserRating };
