import React from "react";
import styles from "./footer.module.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <Link to="/">
          <div className={styles.logo}>
            <span className={styles.logoName}>අකුරු</span>
          </div>
        </Link>
        <p className={styles.copyright}>
          &copy; 2024 Akuru. All Rights Reserved.
        </p>
        <div className={styles.socialIcons}>
          <a href="#" className={styles.icon}>
            <FacebookIcon />
          </a>
          <a href="#" className={styles.icon}>
            <TwitterIcon />
          </a>
          <a href="#" className={styles.icon}>
            <InstagramIcon />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
