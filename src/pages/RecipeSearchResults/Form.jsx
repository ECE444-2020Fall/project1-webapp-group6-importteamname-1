import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const Form = (params) =>{
  const [textField, setTextField] = useState("");

  const handleChange = (e) => {
    setTextField(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    params.addItem(textField);
    setTextField("");
  }

  return (
    <form onSubmit={handleSubmit} className="input-group my-3">
      <input
        type="text"
        onChange={handleChange}
        value={textField}
        name="textField"
        className="form-control"
        placeholder="Add text here..."
        aria-label="Add text here..."
      />
      <Box ml={1}>
        <Button variant="contained" color="primary">
            Search
        </Button>
      </Box>
    </form>
  );
}

export default Form;