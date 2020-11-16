import React, { useState, useEffect } from 'react';
import { generateList, addItem, removeItem } from '../../utils/list_utils'
import { ListContainer } from '../../containers/ListContainer/ListContainer'
import CONSTANTS from '../../constants';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { PageTitle } from '../../components/common/PageTitle';
import { connect } from 'react-redux'; 
import { getRecommendedRecipes } from '../../actions/recipeActions';
import { getRecipes } from '../../actions/recipeActions';
import { clearRecipes } from '../../actions/recipeActions';
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

  useEffect(() => {
    props.clearRecipes();
  }, []);
  

  const handleClick = (evt) => {
    props.clearRecipes();
    if (pantryItems.length > 0) {
      props.getRecommendedRecipes(); 
    } else {
      props.getRecipes();
    }
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
      <center>
      <Typography component="body1" variant="body1" paragraph='true'>
          We will recomend recipes based on the ingredients you already have!
          <p></p>
        </Typography>
        <Typography component="body1" variant="caption">
          (E.g. type 'onion', press enter, then click 'RECOMMEND RECIPES' to search for recipes with apples)
        </Typography>
      </center>
      <br></br>
      <ListContainer
        newItem={newItem}
        setNewItem={setNewItem}
        shoppingItems={pantryItems}
        addShoppingListItem={addPantryListItem}
        Label="Add Ingredient to Pantry"
      />
      <center>
        
        <Link to={`/recipe-search-results`}>
          <Button
            onClick={handleClick}
            type="submit"
            variant="contained" 
            color="primary" 
            className= { classes.submit }>
                Recommend Recipes
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

const mapDispatchToProps = (dispatch) => {
  return {
    clearRecipes: () => {
      dispatch({
        type: "CLEAR_RECIPLES",
      })
    }
  }
}

export default connect(mapStateToProps, {getRecommendedRecipes, getRecipes, clearRecipes})(Pantry);
