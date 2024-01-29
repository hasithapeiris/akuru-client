import styles from "./fontsPage.module.css";
import FontCard from "../../components/fontCard/FontCard";
import PackCard from "../../components/packCard/PackCard";
import { getFonts } from "../../redux/apiCalls/fontApiCalls";
import { getPacks } from "../../redux/apiCalls/packApiCalls";
import FontsShowcase from "../../components/fontsShowcase/FontsShowcase";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputSection from "../../components/inputSection/InputSection";
import Loader from "../../components/loader/Loader";
import { FontDownload, WbAuto, Search } from "@mui/icons-material";
import Pagination from "@mui/material/Pagination";

function FontsPage() {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [currentView, setCurrentView] = useState("FONTS");
  const [textInput, setTextInput] = useState("");
  const [fontSize, setFontSize] = useState(32);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("unicode");

  // receive data from the input section
  const handleInputChange = (textInput, fontSize) => {
    setTextInput(textInput);
    setFontSize(fontSize);
  };

  // fetch fonts from DB
  const dispatch = useDispatch();
  const fonts = useSelector((state) => state.font.fonts);
  const packs = useSelector((state) => state.pack.packs);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        await getFonts(dispatch);
        await getPacks(dispatch);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);

        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  // search function
  const keys = ["name", "family"];

  const search = (data) => {
    const filteredFonts = (fonts || []).filter((font) =>
      keys.some(
        (key) =>
          font[key]?.toLowerCase().includes(data.toLowerCase()) &&
          (filterType ? font.fontType === filterType : true)
      )
    );

    const filteredPacks = (packs || []).filter((pack) =>
      keys.some(
        (key) =>
          pack[key]?.toLowerCase().includes(data.toLowerCase()) &&
          (filterType ? pack.packType === filterType : true)
      )
    );

    return { fonts: filteredFonts, packs: filteredPacks };
  };

  const handleFilterButtonClick = (type) => {
    setFilterType(type);
    setCurrentPage(1);
  };

  // pagination function
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const searchedItems = search(query);
  const currentItems =
    currentView === "FONTS" ? searchedItems.fonts : searchedItems.packs;
  const paginatedItems = currentItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(currentItems.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Render loading spinner
  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.fontsPage}>
      <div className={styles.fontsShowcase}>
        <FontsShowcase fonts={fonts} />
      </div>

      <div className={styles.fontsPageContainer}>
        <InputSection
          onInputChange={handleInputChange}
          initialFontSize={32}
          filterType={filterType}
        />

        <div className={styles.filters}>
          <div className={styles.buttonGroup}>
            <div className={styles.packButtons}>
              <button
                className={currentView === "FONTS" ? styles.active : ""}
                onClick={() => setCurrentView("FONTS")}
              >
                <FontDownload style={{ marginRight: 8 }} />
                FONTS
              </button>
              <button
                className={currentView === "PACKS" ? styles.active : ""}
                onClick={() => setCurrentView("PACKS")}
              >
                <WbAuto style={{ marginRight: 8 }} />
                PACKS
              </button>
            </div>

            <div className={styles.filterButtons}>
              <button
                className={filterType === "unicode" ? styles.active : ""}
                onClick={() => handleFilterButtonClick("unicode")}
              >
                UNICODE
              </button>
              <button
                className={filterType === "legacy" ? styles.active : ""}
                onClick={() => handleFilterButtonClick("legacy")}
              >
                LEGACY
              </button>
            </div>
          </div>
          <div className={styles.fontsSearch}>
            <Search />
            <input
              type="text"
              className={styles.searchInput}
              id="search-input"
              placeholder="Search Fonts & Packs..."
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        {currentView === "FONTS"
          ? paginatedItems.map((item, index) => (
              <FontCard
                key={index}
                fontName={item.name}
                textInput={textInput}
                fontSize={fontSize}
              />
            ))
          : paginatedItems.map((item, index) => (
              <PackCard
                key={index}
                packName={item.name}
                textInput={textInput}
                fontSize={fontSize}
              />
            ))}

        <div className={styles.pagination}>
          <Pagination
            className={styles.paginationControl}
            count={totalPages}
            page={currentPage}
            onChange={(event, value) => handlePageChange(value)}
            shape="rounded"
            color="primary"
            size="small"
          />
        </div>
      </div>
    </div>
  );
}

export default FontsPage;
