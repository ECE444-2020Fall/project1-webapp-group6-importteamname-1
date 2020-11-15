import React from "react";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container-fluid">
        <div className="row justify-content-around">
          <div className="col-8 col-md-5">
            <h5 className={styles.title}>Chef Co-Pilot</h5>
            <p className={styles.description}>
              Your personal cooking assistant.
            </p>
          </div>
          <div className="col-2">
            <ul className="list-unstyled">
              <li>
                <h5 className={styles.title}>Made by:</h5>
              </li>
              <li>
                <a className={styles.footerlink} href="">
                  Yanisa Khambanonda
                </a>
              </li>
              <li>
                <a className={styles.footerlink} href="">
                  Tim Fei
                </a>
              </li>
              <li>
                <a className={styles.footerlink} href="">
                  Johnathon Martin
                </a>
              </li>
              <li>
                <a className={styles.footerlink} href="">
                  Mohamed Abdelhamid
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;