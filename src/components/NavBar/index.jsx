import React from "react";
import { Link } from "react-router-dom";
import styles from "./navbar.module.css";
import CONSTANTS from "../../constants";

//TODO Web Template Studio: Add a new link in the NavBar for your page here.
// A skip link is included as an accessibility best practice. For more information visit https://www.w3.org/WAI/WCAG21/Techniques/general/G1.
const NavBar = () => {
  return (
    <React.Fragment>
      <div className={styles.skipLink}>
        <a href="#mainContent">Skip to Main Content</a>
      </div>
      <nav className="navbar navbar-expand-sm navbar-light border-bottom justify-content-between">
        <Link className="navbar-brand" to="/" role="heading" aria-level="1">
          {CONSTANTS.APP_NAME}
        </Link>
        <div className="navbar-nav">
          <Link className="nav-item nav-link active" to="/">
            Add Recipes
          </Link>
          <Link className="nav-item nav-link active" to="RecipeSearchResults">
            Recipe Search Results
          </Link>
          <Link className="nav-item nav-link active" to="RecipeDetail">
            Recipe Detail
          </Link>
          <Link className="nav-item nav-link active" to="FavouriteRecipes">
            Favourite Recipes
          </Link>
          <Link className="nav-item nav-link active" to="CalorieTracker">
            Calorie Tracker
          </Link>
          <Link className="nav-item nav-link active" to="RecipeCart">
            Recipe Cart
          </Link>
        </div>
      </nav>
    </React.Fragment>
  );
}
export default NavBar;
