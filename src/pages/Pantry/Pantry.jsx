import React, { useState } from 'react';
import { generateList, addItem, removeItem } from '../../utils/list_utils'
import { ListContainer } from '../../containers/ListContainer/ListContainer'
import CONSTANTS from '../../constants';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { PageTitle } from '../../components/common/PageTitle';
import { connect } from 'react-redux'; 
import { getRecommendedRecipes } from '../../actions/recipeActions';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
  },
  form: {
    width: '25%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1, 0, 8),
  }
}));

const Pantry = (props) => {
  const [newItem, setNewItem] = useState('');
  const [pantryItems, setPantryItems] = useState([]);
  const [refreshList, setRefreshList] = useState(true)

  const removePantryListItem = (item) => {
    removeItem(item, CONSTANTS.ENDPOINT.PANTRY_LIST)
      .then(() => setRefreshList(true))
  }

  const addPantryListItem = () => {
    if (newItem) {
      addItem(newItem, CONSTANTS.ENDPOINT.PANTRY_LIST)
        .then(() => {
          setRefreshList(true)
          setNewItem('')
        })
    }
  }

  const handleClick = (evt) => {
    console.log(evt)
    props.getRecommendedRecipes() 
  }

  if (refreshList) {
    setRefreshList(false)
    fetch(CONSTANTS.ENDPOINT.PANTRY_LIST, {
      credentials: 'include'
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.text();
      }).then(body => JSON.parse(body).items)
      .then(res => setPantryItems(generateList(res, removePantryListItem)));
  }

  const classes = useStyles();

  return (
    <div>        
      <PageTitle titleName="What's in your Pantry?" />
      <p></p>
      <center>
        <p>Enter ingredients below and press enter.</p>
      </center>
      <ListContainer
        newItem={newItem}
        setNewItem={setNewItem}
        shoppingItems={pantryItems}
        addShoppingListItem={addPantryListItem}
        Label="Add Ingredient to Pantry"
      />
      <center>
        
        <Typography component="body1" variant="body1" paragraph='true'>
          Help us help you by telling us which ingredients you currently have in your pantry.
          <p></p>
          We will use these ingredients to recomend recipes that make use of the ingredients you already have!
          <p></p>
        </Typography>
        <Link to={`/recipe-search-results`}>
          <Button
            onClick={handleClick}
            type="submit"
            variant="contained" 
            color="primary" 
            className= { classes.submit }>
                Recomend Recipes
          </Button>
        </Link>
      </center>
    </div>
  );
}

Pantry.propTypes = {
  getRecommendedRecipes: PropTypes.func
};

const mapStateToProps = (state) => ({data: state.recipes})

export default connect(mapStateToProps, {getRecommendedRecipes})(Pantry);
