/**
 * FileName: background.jsx
 *
 * Description: This code is used to generate random background images for the log-in/sign-up page and the profile
 * page.
 * 
 * Author(s): Johnathon Martin
 * Date: November 17, 2020 
 */

import background1 from './background1.png';
import background2 from './background2.png';
import background3 from './background3.png';
import background4 from './background4.png';
import background5 from './background5.png';
import background6 from './background6.png';
import background7 from './background7.png';
import background8 from './background8.png';
import background9 from './background9.png';

export function Background() {
  var rand = Math.floor(Math.random() * Math.floor(9));
  if (rand == 0) {
    return background1;
  }
  else if (rand == 1) {
    return background2;
  }
  else if (rand == 2) {
    return background3;
  }
  else if (rand == 3) {
    return background4;
  }
  else if (rand == 4) {
    return background5;
  }
  else if (rand == 5) {
    return background6;
  }
  else if (rand == 6) {
    return background7;
  }
  else if (rand == 7) {
    return background8;
  }
  else {
    return background9;
  }
}

