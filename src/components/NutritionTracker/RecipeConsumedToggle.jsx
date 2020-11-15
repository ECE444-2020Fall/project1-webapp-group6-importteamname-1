import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';


export default function RecipeConsumedToggle() {
    const [state, setState] = React.useState({
      ateThis: false,
    });
  
    const handleChange = (event) => {
      setState({ ...state, [event.target.name]: event.target.checked });
      //fetch call to addItem function
      //fetch call to removeItem function
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
