import React, { useState } from "react";
import styles from "./header.module.css";
import { Menu, Close, Assignment } from "@mui/icons-material";
import DarkMode from "../darkMode/DarkMode";
import { Link, NavLink } from "react-router-dom";
import ReactGA from "react-ga4";

function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const clickHandler = () => {
    ReactGA.event({
      category: "Button",
      action: "Go to converter",
    });
  };
  return (
    <header className={styles.mainHeader}>
      <div className={styles.headerContainer}>
        <Link to="/">
          <div className={styles.logo}>
            <span className={styles.logoName}>අකුරු</span>
          </div>
        </Link>
        <nav
          className={`${styles["nav-links"]} ${isMenuOpen ? styles.open : ""}`}
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.links
            }
          >
            HOME
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.links
            }
          >
            ABOUT
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.links
            }
          >
            CONTACT
          </NavLink>
          <DarkMode />
          <Link to="/converter">
            <button onClick={clickHandler} className={styles.navButton}>
              <Assignment style={{ marginRight: 5 }} />
              CONVERTER
            </button>
          </Link>
        </nav>
        <button className={styles.menuButton} onClick={toggleMenu}>
          {isMenuOpen ? <Close /> : <Menu />}
        </button>
      </div>
    </header>
  );
}

export default Header;
