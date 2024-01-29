import React, { useEffect, useRef, useState } from "react";
import styles from "./converter.module.css";
import unicodeConverter from "./unicodeConverter";
import singlishToUnicode from "./singlishToUnicode";
import dlManelToUnicode from "./dlManelToUnicode";
import { ContentCopy, Done, Clear } from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";
import wijesekaraConverter from "./wijesekaraConverter";

function Converter() {
  const [singlishText, setSinglishText] = useState("");
  const [unicodeText, setUnicodeText] = useState("");
  const [showUnicodeOutput, setShowUnicodeOutput] = useState(true);
  const [showSinglishInput, setShowSinglishInput] = useState(true);
  const [copyIcon, setCopyIcon] = useState("default");

  // make reference for input
  const textInputRef = useRef(null);

  const textareaRef = useRef();

  useEffect(() => {
    adjustTextareaHeight();
    scrollToBottom();
  }, [showUnicodeOutput, unicodeText, singlishText]);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;

    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const scrollToBottom = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };

  // save to local storage
  const saveToLocalStorage = (
    value,
    singlishText,
    unicodeText,
    wijesekaraText,
    convertedWijeText
  ) => {
    localStorage.setItem("value", value);
    localStorage.setItem("singlishText", singlishText);
    localStorage.setItem("unicodeText", unicodeText);
    localStorage.setItem("wijesekaraText", wijesekaraText);
    localStorage.setItem("convertedWijeText", convertedWijeText);
  };

  const handleSinglishConversion = (event) => {
    const value = event.target.value;
    const newSinhalaText = singlishToUnicode(value);
    const newUnicodeText = unicodeConverter(value);
    const newWijesekaraText = dlManelToUnicode(value);
    const newConvertedWijeText = wijesekaraConverter(newWijesekaraText);

    if (showSinglishInput) {
      if (showUnicodeOutput) {
        setUnicodeText(newUnicodeText);
      } else {
        setSinglishText(newSinhalaText);
      }
    } else {
      if (showUnicodeOutput) {
        setUnicodeText(newConvertedWijeText);
      } else {
        setSinglishText(newWijesekaraText);
      }
    }

    // Batch the storage calls
    saveToLocalStorage(
      value,
      newSinhalaText,
      newUnicodeText,
      newWijesekaraText,
      newConvertedWijeText
    );
  };

  useEffect(() => {
    let savedValue = localStorage.getItem("value");
    let savedSinglishText = localStorage.getItem("singlishText");
    let savedUnicodeText = localStorage.getItem("unicodeText");
    let savedWijesekaraText = localStorage.getItem("wijesekaraText");
    let savedConvertedWijeText = localStorage.getItem("convertedWijeText");
    if (savedSinglishText || savedUnicodeText) {
      if (textInputRef.current) {
        textInputRef.current.value = savedValue;
      }

      if (showSinglishInput) {
        if (showUnicodeOutput) {
          setUnicodeText(savedUnicodeText);
        } else {
          setSinglishText(savedSinglishText);
        }
      } else {
        if (showUnicodeOutput) {
          setUnicodeText(savedConvertedWijeText);
        } else {
          setSinglishText(savedWijesekaraText);
        }
      }
    }
  }, [showUnicodeOutput, showSinglishInput]);

  const handleSwitchChange = (outputType) => {
    setShowUnicodeOutput(outputType === "UNICODE");
  };

  const handleInputSwitchChange = (inputType) => {
    setShowSinglishInput(inputType === "SINGLISH");
  };

  const handleCopyToClipboard = () => {
    const textToCopy = showUnicodeOutput ? unicodeText : singlishText;

    if (!textToCopy) {
      return;
    }

    const textarea = document.createElement("textarea");
    textarea.value = textToCopy;

    document.body.appendChild(textarea);

    textarea.select();
    document.execCommand("copy");

    document.body.removeChild(textarea);

    setCopyIcon("copied");

    setTimeout(() => {
      setCopyIcon("default");
    }, 2000);
  };

  const handleClearText = () => {
    setSinglishText("");
    setUnicodeText("");
    if (textInputRef.current) {
      textInputRef.current.value = "";
    }

    saveToLocalStorage("", "", "");
  };

  return (
    <div className={styles.converterContainer}>
      <div className={styles.convertBoxes}>
        <div className={styles.stickyBox}>
          <div className={styles.toolbar} style={{ marginBottom: 10 }}>
            <div className={styles.switchButtons}>
              <button
                className={
                  showSinglishInput ? styles.activeButton : styles.button
                }
                onClick={() => handleInputSwitchChange("SINGLISH")}
              >
                SIN
              </button>
              <button
                className={
                  !showSinglishInput ? styles.activeButton : styles.button
                }
                onClick={() => handleInputSwitchChange("WIJESEKARA")}
              >
                WIJE
              </button>
            </div>
          </div>
          <div className={styles.inputBox}>
            <div className={styles.textArea}>
              <textarea
                id="convert-input"
                placeholder="Singlish වලින් ලියන්න..."
                ref={textInputRef}
                onChange={handleSinglishConversion}
              />
            </div>
          </div>
        </div>
        <div className={styles.outputBox}>
          <div className={styles.textArea}>
            <textarea
              id="convert-input"
              placeholder={
                showUnicodeOutput ? "hqksfldaâ j,ska¡¡¡" : "ලෙගසි වලින්..."
              }
              value={showUnicodeOutput ? unicodeText : singlishText}
              style={
                showUnicodeOutput
                  ? { fontFamily: "FM Abhaya" }
                  : { fontFamily: "Abhaya Libre" }
              }
              readOnly
              ref={textareaRef}
              onChange={() => {
                adjustTextareaHeight();
                scrollToBottom();
              }}
            />
          </div>
        </div>

        <div className={styles.toolbar} style={{ marginTop: 10 }}>
          <div className={styles.switchButtons}>
            <button
              className={
                showUnicodeOutput ? styles.activeButton : styles.button
              }
              onClick={() => handleSwitchChange("UNICODE")}
            >
              UNICODE
            </button>
            <button
              className={
                !showUnicodeOutput ? styles.activeButton : styles.button
              }
              onClick={() => handleSwitchChange("LEGACY")}
            >
              LEGACY
            </button>
            <Tooltip title="Copy to Clipboard" arrow>
              <button className={styles.button} onClick={handleCopyToClipboard}>
                {copyIcon === "default" ? <ContentCopy /> : <Done />}
              </button>
            </Tooltip>
            <Tooltip title="Clear all text" arrow>
              <button className={styles.button} onClick={handleClearText}>
                <Clear />
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Converter;
