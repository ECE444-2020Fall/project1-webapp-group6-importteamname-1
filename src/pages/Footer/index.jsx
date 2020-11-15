import React from "react";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container-fluid">
        <div className="row justify-content-around">
          <div className="col-10 col-md-5">
            <h5 className={styles.title}>Chef Co-Pilot</h5>
            <p className={styles.description}>
              Your personal cooking assistant.
            </p>
            <p className={styles.description}>
              Yanisa Kham, Tim Fei, Johnathon Martin, Mohamed Abdelhamid 
            </p>
          </div>
          <div className="col-2">
            <ul className="list-unstyled">
              <li>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;