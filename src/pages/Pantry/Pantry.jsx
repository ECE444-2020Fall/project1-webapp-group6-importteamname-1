import React, { useState } from 'react';
import { generateList, addItem, removeItem } from '../../utils/list_utils';
import { ListContainer } from '../../containers/ListContainer/ListContainer';
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
import { Redirect } from 'react-router-dom';

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
  const [refreshList, setRefreshList] = useState(true);
  const [fetchRecipes, setFetchRecipes] = useState(false);

  const removePantryListItem = (item) => {
    removeItem(item, CONSTANTS.ENDPOINT.PANTRY_LIST)
      .then(() => setRefreshList(true));
  };

  const addPantryListItem = () => {
    if (newItem) {
      addItem(newItem, CONSTANTS.ENDPOINT.PANTRY_LIST)
        .then(() => {
          setRefreshList(true);
          setNewItem('');
        });
    }
  };

  const handleClick = async () => {
    await props.clearRecipes();
    if (pantryItems.length > 0) {
      await props.getRecommendedRecipes();
      await setFetchRecipes(true);
    } else {
      await props.getRecipes();
      await setFetchRecipes(true);
    }
  };

  if (refreshList) {
    setRefreshList(false);
    fetch(CONSTANTS.ENDPOINT.PANTRY_LIST, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
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

  if (!fetchRecipes) {
    return (
      <div>
        <br />
        <PageTitle titleName="What's in your Pantry?" />
        <center>
          <Typography component="body1" variant="body1" paragraph='true'>
            We will recommend recipes based on the ingredients you already have!
            <br />
            To view all recipes, click &apos;RECOMMEND RECIPES&apos; with no items in your pantry
            <p></p>
          </Typography>
          <Typography component="body1" variant="caption">
            (E.g. type &apos; onion &apos;, press enter, then click &apos;RECOMMEND RECIPES&apos; to search for recipes with onions)
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
          <Button
            onClick={handleClick}
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}>
            Recommend Recipes
            </Button>
        </center>
      </div>
    );
  } else {
    return <Redirect to={'/recipe-search-results'} />;
  }
};

Pantry.propTypes = {
  getRecommendedRecipes: PropTypes.func,
  clearRecipes: PropTypes.func,
  getRecipes: PropTypes.func,
};

const mapStateToProps = (state) => ({ data: state.recipes });

export default connect(mapStateToProps, { getRecommendedRecipes, getRecipes, clearRecipes })(Pantry);
