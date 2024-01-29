import React from "react";
import styles from "./fontsShowcase.module.css";
import unicodeToDlManel from "../inputSection/unicodeToDlManel";

function FontsShowcase({ fonts }) {
  return (
    <div className={styles.ShowcaseContainer}>
      <div className={styles.ShowcaseFonts}>
        {fonts.map((font, index) => (
          <span
            key={index}
            className={styles.showcaseFont}
            style={{ fontFamily: font.family }}
          >
            {font.fontType === "unicode"
              ? unicodeToDlManel(font.phonetic)
              : font.phonetic}
          </span>
        ))}
      </div>
    </div>
  );
}

export default FontsShowcase;
