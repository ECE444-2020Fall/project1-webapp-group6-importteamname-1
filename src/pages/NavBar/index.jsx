import React from "react";
import { Link } from "react-router-dom";
import styles from "./navbar.module.css";
import CONSTANTS from "../../constants";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SettingsIcon from '@material-ui/icons/Settings';
import Box from '@material-ui/core/Box';

//Drop down menu function
export function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Box m={1}>
        <SettingsIcon onClick={handleClick}>
        </SettingsIcon>
      </Box>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
}



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
          <Link className="nav-item nav-link active" to="/AddRecipes">
            Add Recipes
          </Link>
          <Link className="nav-item nav-link active" to="/recipe-search-results">
            Recipe Search Results
          </Link>
          <Link className="nav-item nav-link active" to="/favourite-recipes">
            Favourite Recipes
          </Link>
          <Link className="nav-item nav-link active" to="/calorie-tracker">
            Nutrition Tracker
          </Link>
          <Link className="nav-item nav-link active" to="/shopping-list">
            Shopping List
          </Link>
          <Link className="nav-item nav-link active" to="/recipe-cart">
            Recipe Cart
          </Link>
          <Link className="nav-item nav-link active" to="Profile">
            Profile
          </Link>
          <SimpleMenu></SimpleMenu>
        </div>
      </nav>
    </React.Fragment>
  );
}
export default NavBar;
