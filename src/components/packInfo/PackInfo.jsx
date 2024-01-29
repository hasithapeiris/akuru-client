import React, { useEffect, useState } from "react";
import styles from "./packInfo.module.css";
import { publicRequest } from "../../requestMethods";
import { ClipLoader } from "react-spinners";

function PackInfo({ name }) {
  const [pack, setPack] = useState({});
  const [font, setFont] = useState({});
  const [loading, setLoading] = useState(true);

  // fetch pack from DB
  useEffect(() => {
    const getPack = async () => {
      try {
        const res = await publicRequest.get("/packs/" + name);
        setPack(res.data);
      } catch {
      } finally {
        setLoading(false);
      }
    };
    getPack();
  }, [name]);

  // fetch font from DB
  useEffect(() => {
    const getFont = async () => {
      try {
        const res = await publicRequest.get("/fonts/" + name);
        setFont(res.data);
      } catch {
      } finally {
        setLoading(false);
      }
    };
    getFont();
  }, [name]);

  // Render loading spinner
  if (loading) {
    return (
      <div className={styles.loader}>
        <ClipLoader color="#999" size={24} />
      </div>
    );
  }

  return (
    <div className={styles.packInfo}>
      <div className={styles.packInfoContainer}>
        by: <span className={styles.author}>{pack.author || font.author}</span>
        <div className={styles.description}>
          <p>{pack.description || font.description}</p>
        </div>
        License:{" "}
        <span className={styles.license}>{pack.license || font.license}</span>
      </div>
    </div>
  );
}

export default PackInfo;
