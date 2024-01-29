import React, { useEffect, useState } from "react";
import styles from "./fontPackPreview.module.css";
import FontCard from "../../components/fontCard/FontCard";
import { publicRequest } from "../../requestMethods";
import { useLocation } from "react-router-dom";
import { getFonts } from "../../redux/apiCalls/fontApiCalls";
import { useDispatch, useSelector } from "react-redux";
import PackInfo from "../../components/packInfo/PackInfo";
import InputSection from "../../components/inputSection/InputSection";
import Loader from "../../components/loader/Loader";
import JSZip from "jszip";
import { downloadFontPack } from "../../download";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

function FontPackPreview() {
  const [pack, setPack] = useState({});
  const [fontSize, setFontSize] = useState(24);
  const [textInput, setText] = useState("");
  const [loading, setLoading] = useState(true);

  // receive data from the input section
  const handleInputChange = (textInput, fontSize) => {
    setText(textInput);
    setFontSize(fontSize);
  };

  // fetch fonts from DB
  const dispatch = useDispatch();
  const fonts = useSelector((state) => state.font.fonts);

  // get pack name from URL
  const location = useLocation();
  const packName = location.pathname.split("/")[3];

  useEffect(() => {
    getFonts(dispatch);
  }, [dispatch]);

  // fetch pack from DB
  useEffect(() => {
    const getPack = async () => {
      try {
        const res = await publicRequest.get("/packs/" + packName);
        setPack(res.data);
      } catch {
      } finally {
        setLoading(false);
      }
    };
    getPack();
  }, [packName]);

  // Font pack download function
  const handleDownload = async () => {
    try {
      const zip = new JSZip();

      for (const fontName of pack.fonts) {
        const font = fonts.find((f) => f.name === fontName);

        if (font && font.fontFile) {
          const fontFileName = `${fontName.replace(/\s+/g, "-")}.ttf`;

          // Fetch font content as array buffer
          const fontContent = await fetch(font.fontFile).then((response) =>
            response.arrayBuffer()
          );

          // Add font to the zip archive
          zip.file(fontFileName, fontContent, { binary: true });
        }
      }

      const content = await zip.generateAsync({ type: "blob" });
      setLoading(true);

      downloadFontPack(
        content,
        `${pack.packName.replace(/\s+/g, "-")}.zip`,
        () => {
          setLoading(false);
        }
      );
    } catch (error) {
      console.error("Error creating font pack:", error);
    }
  };

  // Render loading spinner
  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.fontPreview}>
      <div className={styles.fontPreviewContainer}>
        <div className={styles.nameSection}>
          <span className={styles.fontName}>{pack.packName}</span>

          <button className={styles.downloadButton} onClick={handleDownload}>
            <CloudDownloadIcon style={{ marginRight: 10 }} />
            DOWNLOAD PACK
          </button>
        </div>

        <InputSection
          onInputChange={handleInputChange}
          initialFontSize={24}
          filterType={pack.packType}
        />

        <dev className={styles.bodyContent}>
          <dev className={styles.fonts}>
            {pack.fonts &&
              pack.fonts.map((fontName) => {
                const font = fonts.find((f) => f.name === fontName);
                return (
                  <FontCard
                    fontName={font.name}
                    textInput={textInput}
                    fontSize={fontSize}
                  />
                );
              })}
          </dev>

          <dev className={styles.info}>
            <PackInfo name={pack.name} />
          </dev>
        </dev>
      </div>
    </div>
  );
}

export default FontPackPreview;
