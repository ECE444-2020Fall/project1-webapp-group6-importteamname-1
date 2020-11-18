/**
 * FileName: ScrollIntoView.jsx
 *
 * Description: This component scrolls the recipe details page to the top after a user navigates from 
 * the recipe search results page to recipe details page.
 * 
 * Author(s): Online sources.
 * Date: November 17, 2020 
 */


import { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from 'prop-types';

/* 
When the user navigates from RecipeSearchResult page to RecipeDetail page, 
we scroll them to the top of the page.
*/
class ScrollIntoView extends PureComponent {
  componentDidMount = () => window.scrollTo(0, 0);

  componentDidUpdate = prevProps => {
    if (this.props.location !== prevProps.location) window.scrollTo(0, 0);
  };

  render = () => this.props.children;
}

ScrollIntoView.propTypes = {
  location: PropTypes.object,
  children: PropTypes.array,
};

export default withRouter(ScrollIntoView);