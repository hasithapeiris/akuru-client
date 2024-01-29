import React from "react";
import styles from "./sideGraphic.module.css";
import sideG1 from "./side-graphic-01.svg";
import sideG2 from "./side-graphic-02.svg";

function SideGraphic() {
  return (
    <div className={styles.sideGraphic}>
      <div className={styles.graphicWrap}>
        <img className={styles.graphicImage1} src={sideG1} alt="Graphic" />
        {/* <img className={styles.graphicImage2} src={sideG2} alt="Graphic" /> */}
      </div>
    </div>
  );
}

export default SideGraphic;
