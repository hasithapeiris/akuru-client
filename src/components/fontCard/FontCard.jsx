import { useEffect, useState } from "react";
import styles from "./fontCard.module.css";
import DownloadIcon from "@mui/icons-material/Download";
import { Link } from "react-router-dom";
import { publicRequest } from "../../requestMethods";
import { downloadFont } from "../../download";
import { ClipLoader } from "react-spinners";

function FontCard({ fontName, textInput, fontSize }) {
  const [font, setFont] = useState({});
  const [loading, setLoading] = useState(true);

  // fetch font from DB
  useEffect(() => {
    const getFont = async () => {
      try {
        const res = await publicRequest.get("/fonts/" + fontName);
        setFont(res.data);
      } catch {
        // Handle errors if needed
      } finally {
        setLoading(false);
      }
    };
    getFont();
  }, [fontName]);

  // Render loading spinner
  if (loading) {
    return (
      <div style={{ padding: 20 }}>
        <ClipLoader color="#999" size={24} />
      </div>
    );
  }

  return (
    <div className={styles.fontCard}>
      <Link to={"/fonts/" + font.name}>
        <div className={styles.fontCardContainer}>
          <span className={styles.fontName}>{font.family}</span>
          {font.fontType === "unicode" ? (
            <div className={styles.fontPreview}>
              <span
                style={{
                  fontSize: `${fontSize}px`,
                  fontFamily: `${font.family}`,
                }}
              >
                {textInput || "leu;s fohla ,shkak'"}
              </span>
            </div>
          ) : (
            <div className={styles.fontPreview}>
              <span
                style={{
                  fontSize: `${fontSize}px`,
                  fontFamily: `${font.family}`,
                }}
              >
                {textInput || "කැමති දෙයක් ලියන්න."}
              </span>
            </div>
          )}
        </div>
      </Link>
      <div
        className={styles.button}
        onClick={() => downloadFont(font.fontFile, font.family)}
      >
        <DownloadIcon className={styles.buttonIcon} />
      </div>
    </div>
  );
}

export default FontCard;
