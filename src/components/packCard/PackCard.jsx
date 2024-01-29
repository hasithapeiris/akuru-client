import React, { useEffect, useState } from "react";
import styles from "./packCard.module.css";
import DownloadIcon from "@mui/icons-material/Download";
import { publicRequest } from "../../requestMethods";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";

function PackCard({ packName, textInput, fontSize }) {
  const [pack, setPack] = useState({});
  const [fontFamily, setFontFamily] = useState("inherit");
  const [loading, setLoading] = useState(true);

  // fetch font from DB
  useEffect(() => {
    const getPack = async () => {
      try {
        const res = await publicRequest.get("/packs/" + packName);
        setPack(res.data);

        // Extract the first font from the fonts array
        if (res.data.fonts && res.data.fonts.length > 0) {
          if (res.data.name === "apex-fonts") {
            const firstFont = res.data.fonts[0];
            setFontFamily(firstFont);
          } else {
            const firstFont = res.data.fonts[0].replace(/-/g, " ");
            setFontFamily(firstFont);
          }
        }
      } catch (error) {
        console.error("Error fetching pack:", error);
      } finally {
        setLoading(false);
      }
    };
    getPack();
  }, [packName]);

  // Render loading spinner
  if (loading) {
    return (
      <div style={{ padding: 20 }}>
        <ClipLoader color="#999" size={24} />
      </div>
    );
  }

  return (
    <div className={styles.packCard}>
      <Link to={"/fonts/packs/" + pack.name}>
        <div className={styles.packCardContainer}>
          <span className={styles.packName}>{pack.packName}</span>
          {pack.packType === "unicode" ? (
            <div className={styles.packPreview}>
              <span
                style={{
                  fontSize: `${fontSize}px`,
                  fontFamily: fontFamily,
                }}
              >
                {textInput || "leu;s fohla ,shkak'"}
              </span>
            </div>
          ) : (
            <div className={styles.packPreview}>
              <span
                style={{
                  fontSize: `${fontSize}px`,
                  fontFamily: fontFamily,
                }}
              >
                {textInput || "කැමති දෙයක් ලියන්න."}
              </span>
            </div>
          )}
        </div>
      </Link>
      <div className={styles.button}>
        <DownloadIcon className={styles.buttonIcon} />
      </div>
    </div>
  );
}

export default PackCard;
