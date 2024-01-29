import React, { useEffect, useState } from "react";
import { ReactComponent as Sun } from "./Sun.svg";
import { ReactComponent as Moon } from "./Moon.svg";
import styles from "./darkMode.module.css";
import Switch from "@mui/material/Switch";
import Tooltip from "@mui/material/Tooltip";

const DarkMode = () => {
  const savedTheme = localStorage.getItem("selectedTheme") || "dark";
  const [selectedTheme, setSelectedTheme] = useState(savedTheme);

  const setTheme = (theme) => {
    document.querySelector("body").setAttribute("data-theme", theme);
    localStorage.setItem("selectedTheme", theme);
    setSelectedTheme(theme);
  };

  useEffect(() => {
    setTheme(selectedTheme);
  }, [selectedTheme]);

  const toggleTheme = () => {
    const newTheme = selectedTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  return (
    <div className={styles.darkMode}>
      <Tooltip title="Mode" arrow>
        <Switch
          className={styles.switch}
          onChange={toggleTheme}
          checked={selectedTheme === "dark"}
        />
      </Tooltip>
    </div>
  );
};

export default DarkMode;
