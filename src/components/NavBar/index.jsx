import React from "react";
import { Link } from "react-router-dom";
import styles from "./navbar.module.css";

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
          chefCoPilot
        </Link>
        <div className="navbar-nav">
          <Link className="nav-item nav-link active" to="/">
            Add_Recipes
          </Link>
          <Link className="nav-item nav-link active" to="Recipe_Search_Results">
            Recipe_Search_Results
          </Link>
          <Link className="nav-item nav-link active" to="Recipe_Detail">
            Recipe_Detail
          </Link>
          <Link className="nav-item nav-link active" to="Favourite_Recipes">
            Favourite_Recipes
          </Link>
          <Link className="nav-item nav-link active" to="Track_Calories">
            Track_Calories
          </Link>
          <Link className="nav-item nav-link active" to="Recipe_Cart">
            Recipe_Cart
          </Link>
        </div>
      </nav>
    </React.Fragment>
  );
}
export default NavBar;
