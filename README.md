# Chef Co-Pilot 

This web application asks a user to enter ingredients, and then recommend recipes based on the ingredients. The user can
add recipes to favourites list, rate recipes, add personal notes on recipes, and add recipes to a cart to generate a ingredients shopping list. The ingredients shopping list contains a list of additional ingredients that the user needs to purchase in order to prepare the carted recipes.

## Developers
- Yanisa Kham
- Tim Fei
- Johnathon Martin
- Mohamed Abdelhamid

## How to run the code locally

In the root directory of the project

1. Install node modules `npm install`.
2. Install Python dependencies `pip install -r requirements.txt`.
3. Start front-end `npm start`.
4. Start back-end `python server/server.py`.

## File Structure

The front-end is based on [create-react-app](https://github.com/facebook/create-react-app). It is served on http://localhost:3000/.

The back-end is based on [Flask](https://github.com/pallets/flask). It is served on http://localhost:3001/.

```
.
├── server - Flask back-end
│ ├── app - Defines the constants for the endpoints and port
│ │  ├── model_schemas - database models for the app
│ │  └── routes - routes and controller classes for the app
│ ├── migrations - MySQL database migrations
│ ├── scripts - Contains code used for scraping recipes and ingredients from Spoonaular API
│ ├── tests - Unit tests
│ ├── util - Helper functions
│ └── constants.py - Defines the constants for the endpoints and port
├── src - React front-end
| ├── actions - Redux action dispatchers
│ ├── components - React sub components for containers
| ├── containers - React components with sub-components for each page 
| ├── pages - App web pages
| ├── reducers - Redux reducers
| ├── utils - Helper functions 
│ ├── App.jsx - React routes
│ ├── index.jsx - React root component
| ├── store.js - React components with sub-components for each page 
| ├── localStorage.js - React components with sub-components for each page 
│ └── index.jsx - React root component
└── README.md
```

## Additional Documentation

- React - https://reactjs.org/
- Redux - https://redux.js.org/
- Material UI - https://material-ui.com/
- React Router - https://reacttraining.com/react-router/
- Bootstrap CSS - https://getbootstrap.com/
- Flask - http://flask.pocoo.org/

This project was created using [Microsoft Web Template Studio](https://github.com/Microsoft/WebTemplateStudio).
