import React from "react";
import { ClipLoader } from "react-spinners";
import styles from "./loader.module.css";

function Loader() {
  return (
    <div className={styles.loader}>
      <ClipLoader color="#999" size={34} />
    </div>
  );
}

export default Loader;
