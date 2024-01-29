import React, { useEffect, useRef, useState } from "react";
import unicodeConverter from "./unicodeConverter";
import singlishToUnicode from "./singlishToUnicode";
import styles from "./inputSection.module.css";
import Slider from "@mui/material/Slider";

function InputSection({ onInputChange, initialFontSize, filterType }) {
  const [fontSize, setFontSize] = useState(initialFontSize || 32);
  const [textInput, setText] = useState("");

  // make reference for input
  const textInputRef = useRef(null);

  // input section - handle font size
  const handleFontSizeChange = (event) => {
    const newSize = event.target.value;
    setFontSize(newSize);

    // Notify the parent component about the fontSize change
    if (onInputChange) {
      onInputChange(textInput, newSize);
    }
  };

  // save to local storage
  const saveToLocalStorage = (textInput, input) => {
    localStorage.setItem("textInput", textInput);
    localStorage.setItem("input", input);
  };

  const handleTextChange = (event) => {
    const newText = event.target.value;
    let newConvertedText;

    if (filterType === "unicode") {
      newConvertedText = unicodeConverter(newText);
    } else {
      newConvertedText = singlishToUnicode(newText);
    }

    setText(newConvertedText);

    // Batch the storage calls
    saveToLocalStorage(newConvertedText, newText);

    // Notify the parent component about the textInput change
    if (onInputChange) {
      onInputChange(newConvertedText, fontSize);
    }
  };

  // input section - save state of the input
  useEffect(() => {
    let savedTextInput = localStorage.getItem("textInput");
    let savedInput = localStorage.getItem("input");
    if (savedTextInput) {
      if (textInputRef.current) {
        textInputRef.current.value = savedInput;
      }

      // set input value based on filter type
      if (filterType === "unicode") {
        savedTextInput = unicodeConverter(savedInput);
      } else {
        savedTextInput = singlishToUnicode(savedInput);
      }

      setText(savedTextInput);

      // Notify the parent component about the initial values
      if (onInputChange) {
        onInputChange(savedTextInput, fontSize);
      }
    }
  }, [onInputChange, fontSize, filterType]);

  return (
    <div className={styles.inputSection}>
      <div className={styles.inputBox}>
        <input
          type="text"
          className={styles.textInput}
          id="text-input"
          placeholder="කැමති දෙයක් ලියන්න..."
          ref={textInputRef}
          onChange={handleTextChange}
        />
      </div>

      <div className={styles.fontSizeSection}>
        <span className={styles.fontSizeValue}>{fontSize}px</span>
        <Slider
          defaultValue={fontSize}
          aria-label="Default"
          onChange={handleFontSizeChange}
          valueLabelDisplay="auto"
          min={10}
          max={100}
        />
      </div>
    </div>
  );
}

export default InputSection;
