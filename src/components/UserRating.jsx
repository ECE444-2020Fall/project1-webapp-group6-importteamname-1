import React, {useState} from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {setFeedback, getItem} from '../utils/list_utils';
import CONSTANTS from "../constants";
import PropTypes from 'prop-types';

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
        <Typography component="legend"> My Rating: </Typography>
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
  recipe_id: PropTypes.any,
};

export { UserRating };
