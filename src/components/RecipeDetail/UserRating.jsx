import React, {useState} from 'react';
import { useParams } from "react-router-dom";
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {setFeedback, getItem} from '../../utils/list_utils';
import CONSTANTS from "../../constants";

const UserRating = () => {
  const { recipe_id } = useParams();

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
        <Typography component="legend"> Rating </Typography>
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

export { UserRating };
