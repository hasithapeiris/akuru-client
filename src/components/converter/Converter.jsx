import React, { useState } from 'react'
import "./converter.css"
import unicodeToDlManel from './unicodeToDlManel'
import singlishToUnicode from './singlishToUnicode';

function Converter() {

    const [singlishText, setSinglishText] = useState(''); // Singlish text
    const [unicodeText, setUnicodeText] = useState(''); // Unicode text
    const [showUnicodeOutput, setShowUnicodeOutput] = useState(true); // Show unicode output

    // Singlish conversion
    const handleSinglishInputChange = (event) => {
        const newValue = event.target.value;
        const newConvertedText = singlishToUnicode(newValue);

        if (showUnicodeOutput) {
            setUnicodeText(newConvertedText);
        } else {
            setSinglishText(newConvertedText);
        }
    };

    // Unicode conversion
    const handleUnicodeInputChange = (event) => {
        const newValue = event.target.value;
        const newConvertedText = unicodeToDlManel(newValue);
        
        if (showUnicodeOutput) {
            setUnicodeText(newConvertedText);
        } else {
            setSinglishText(newConvertedText);
        }
    };

    const handleSinglishConversion = (event) => {
        const value = event.target.value;
        const newSinhalaText = singlishToUnicode(value);
        const newUnicodeText = unicodeToDlManel(newSinhalaText);

        if (showUnicodeOutput) {
            setUnicodeText(newUnicodeText);
        } else {
            setSinglishText(newSinhalaText);
        }
    };

    const handleToggleClick = () => {
        const newSinhalaText = singlishToUnicode(singlishText);
        const newUnicodeText = unicodeToDlManel(newSinhalaText);
      
        if (showUnicodeOutput) {
          setUnicodeText(newUnicodeText);
          setShowUnicodeOutput(false);
        } else {
          setSinglishText(newSinhalaText);
          setShowUnicodeOutput(true);
        }
    };

  return (
    <div className="converter-container">
        <div className="convert-boxes">
            <div className="input-box">
                <div className="text-area">
                    <textarea
                        id='convert-input'
                        placeholder="Singlish වලින් ලියන්න..."
                        onChange={handleSinglishConversion}
                    />
                </div>
            </div>

            <div className="output-box">
                <div className="text-area">
                    <textarea
                        id='convert-input'
                        placeholder={showUnicodeOutput ? "hqksfldaâ j,ska¡¡¡" : "Singlish වලින්..."}
                        value={showUnicodeOutput ? unicodeText : singlishText}
                        style={showUnicodeOutput ? {fontFamily: 'FM Abhaya'} : {fontFamily: 'Abhaya Libre'}}
                        readOnly
                    />
                </div>
                <div className="toolbar">
                    <select className="select-converter">
                        <option value="en">English</option>
                        <option value="si">සිංහල</option>
                    </select>
                    <button 
                        className="toggle-button" 
                        onClick={() => setShowUnicodeOutput(!showUnicodeOutput)}
                    >
                        Toggle Output
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Converter