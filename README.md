## How to run the code locally

In the root directory of the project...

1. Install node modules `yarn install` or `npm install`.
2. Install Python dependencies `yarn install-requirements` or `npm install-requirements`
2. Start development server `yarn start` or `npm start`.

## Next Steps

### Adding a New Page

1. Create a folder in `/src/components` with your react components.
2. Add a route for your page to `/src/App.jsx`.
3. Add a button to the navigation bar in `/src/components/NavBar/index.jsx`.

### Deployment

If you selected Azure App Service when creating your project, follow these steps:

1. Press `Ctrl + Shift + P` in Windows/Linux or `Shift ⇧ + Command ⌘ + P` in Mac and type/select `Web Template Studio: Deploy App` to start deploying your app.
2. After your project is built, click "Deploy" on the window pop up.
3. Once the deployment is done, click "Browse website" in the notification window on the lower right corner to check out your newly deployed app.

If you did not select Azure App Service and want to create a new Azure App Service web app, follow these steps:

1. Press `Ctrl + Shift + P` in Windows/Linux or `Shift ⇧ + Command ⌘ + P` in Mac and type/select `Azure App Service: Create New Web App...` to create a new web app.
   - Select your subscription
   - Enter your web app name
   - Select Linux as your OS
   - Select Node.js 12 LTS for a Node/Express application, Python 3.7 for a Flask application or .Net Core Latest runtime for ASP .NET application.
2. Once the creation is done, click "Deploy" in the notification window on the lower right corner.
   - Click "Browse" on the top middle section of your screen and select the "server" folder (or "publish" folder if ASP.NET backend is selected) within your project
   - Click "Yes" in the notification window on the lower right corner (build prompt)
   - Click "Deploy" on the window pop up
   - Click "Yes" in the notification window on the lower right corner again
3. Once the deployment is done, click "Browse website" in the notification window on the lower right corner to check out your newly deployed app.

Consider adding authentication and securing back-end API's by following [Azure App Service Security](https://docs.microsoft.com/en-us/azure/app-service/overview-security).

Full documentation for deployment to Azure App Service can be found here: [Deployment Docs](https://github.com/Microsoft/WebTemplateStudio/blob/dev/docs/deployment.md).

### Sample Data

Replace the sample data stored in /server/sample_data.py.
Replace the default images. Sample images are consumed from https://wtsrepository.blob.core.windows.net/sampledata/.

## File Structure

The front-end is based on [create-react-app](https://github.com/facebook/create-react-app). It is served on http://localhost:3000/.

The back-end is based on [Flask](https://github.com/pallets/flask). It is served on http://localhost:3001/.

```
.
├── server/ - Flask server that provides API routes and serves front-end
│ ├── constants.py - Defines the constants for the endpoints and port
│ ├── sample_data.py - Contains all sample text data for generate pages
│ └── server.py - Configures Port and HTTP Server and provides API routes
├── src - React front-end
│ ├── components - React components for each page
│ ├── App.jsx - React routing
│ └── index.jsx - React root component
└── README.md
```

## Additional Documentation

- React - https://reactjs.org/
- React Router - https://reacttraining.com/react-router/
- Bootstrap CSS - https://getbootstrap.com/
- Flask - http://flask.pocoo.org/

  This project was created using [Microsoft Web Template Studio](https://github.com/Microsoft/WebTemplateStudio).
