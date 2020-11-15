import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import CONSTANTS from '../../constants'
import { addItem, removeItem } from '../../utils/list_utils';
import PropTypes from 'prop-types';


export default function RecipeConsumedToggle({recipe_id}) {
    const [state, setState] = React.useState({
      ateThis: false,
    });
  
    const handleChange = (event) => {
      setState({ ...state, [event.target.name]: event.target.checked });
      if (state.ateThis == true) {
        addItem (recipe_id, CONSTANTS.ENDPOINT.ADD_CONSUMED_RECIPE)
      }
      else if (state.ateThis == false){
        removeItem (recipe_id, CONSTANTS.ENDPOINT.REMOVE_CONSUMED_RECIPE)
      }
    };

    RecipeConsumedToggle.propTypes = {
      recipe_id: PropTypes.string
    };
  
    return (
      <FormGroup row>
        <FormControlLabel
          control={<Switch checked={state.ateThis} onChange={handleChange} name="ateThis" />}
          label="I Ate This"
        />
      </FormGroup>
    );
  }
