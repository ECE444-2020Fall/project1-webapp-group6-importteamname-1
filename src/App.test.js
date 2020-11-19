/**
 * FileName: constants.js
 *
 * Description: This file contains unit test for App.jsx.
 *
 * Author(s): WebTemplateStudio
 * Date: November 17, 2020 
 */

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    div
  );
});
