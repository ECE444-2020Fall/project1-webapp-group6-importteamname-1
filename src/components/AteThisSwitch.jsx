import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';


export default function AteThis() {
    const [state, setState] = React.useState({
      ateThis: false,
    });
  
    const handleChange = (event) => {
      setState({ ...state, [event.target.name]: event.target.checked });
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
