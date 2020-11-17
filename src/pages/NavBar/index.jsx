import React from "react";
import { Link } from "react-router-dom";
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import SearchIcon from '@material-ui/icons/Search';

const drawerWidth = 320;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginBottom: 55
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    maxHeight: 57
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
    marginLeft: 12
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
  listItemText: {
    color: 'grey'
  },
  findRecipeButton: {
    color: '#ffffff'
  },
  findRecipeContainer: {
    marginRight: 30
  }
}));

const NavBar = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
    <CssBaseline />
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <Toolbar>
          <RestaurantIcon />
          <Typography variant="h6" noWrap className={classes.title}>
            Chef Co-Pilot
          </Typography>

        <div className={classes.findRecipeContainer}>
          <Link to="/pantry">
            <SearchIcon className={classes.findRecipeButton}/>
            <Typography variant="h7" noWrap className={classes.findRecipeButton}>
              Find Recipes
            </Typography>
          </Link>
        </div>

        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="end"
          onClick={handleDrawerOpen}
          className={clsx(open && classes.hide)}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>

    <Drawer
      className={classes.drawer}
      variant="temporary"
      anchor="right"
      onEscapeKeyDown={handleDrawerClose}
      onBackdropClick={handleDrawerClose}
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>
      <Divider />
      <List>
        <Link to="/Profile">
          <ListItem button key={1}>
            <ListItemIcon><AccountCircleIcon /> </ListItemIcon>
            <ListItemText primary="Profile" className={classes.listItemText}/>
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        <Link to="/favourite-recipes">
          <ListItem button key={1}>
            <ListItemIcon><FavoriteIcon /> </ListItemIcon>
            <ListItemText primary="Favourite Recipes" className={classes.listItemText}/>
          </ListItem>
        </Link>         
        <Link to="/recipe-cart">
          <ListItem button key={1}>
            <ListItemIcon><ShoppingCartIcon /> </ListItemIcon>
            <ListItemText primary="Recipe Cart" className={classes.listItemText}/>
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        <Link to="/shopping-list">
          <ListItem button key={1}>
            <ListItemIcon><ShoppingBasketIcon /> </ListItemIcon>
            <ListItemText primary="Ingredient Shopping List" className={classes.listItemText}/>
          </ListItem>
        </Link>
      </List>
      <List>
      </List>
      <Divider />
      <List>
        <Link to='/login' style={{ textDecoration: 'none' }}>  
          <ListItem button key={1}>
            <ListItemIcon><ExitToAppIcon /> </ListItemIcon>
            <ListItemText primary="Log Out" className={classes.listItemText}/>
          </ListItem>
        </Link>
      </List>
    </Drawer>
  </div>
  );
}
export default NavBar;
