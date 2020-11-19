/**
 * FileName: RouteToLogin.jsx
 *
 * Description: This code re-directs the user to the Login page.
 * 
 * Author(s): Johnathon Martin
 * Date: November 17, 2020 
 */

import React from "react";
import {Redirect} from 'react-router-dom';

const RouteToLogin = () => {
      return <Redirect to='/Login'/>
}
export default RouteToLogin;



