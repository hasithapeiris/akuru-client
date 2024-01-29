import styles from "./fontsPage.module.css";
import FontCard from "../../components/fontCard/FontCard";
import PackCard from "../../components/packCard/PackCard";
import { getFonts } from "../../redux/apiCalls/fontApiCalls";
import { getPacks } from "../../redux/apiCalls/packApiCalls";
import FontsShowcase from "../../components/fontsShowcase/FontsShowcase";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputSection from "../../components/inputSection/InputSection";
import { ClipLoader } from "react-spinners";

function FontsPage() {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [currentView, setCurrentView] = useState("FONTS");
  const [textInput, setTextInput] = useState("");
  const [fontSize, setFontSize] = useState(32);
  const [loading, setLoading] = useState(true);

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
      keys.some((key) => font[key]?.toLowerCase().includes(data.toLowerCase()))
    );

    const filteredPacks = (packs || []).filter((pack) =>
      keys.some((key) => pack[key]?.toLowerCase().includes(data.toLowerCase()))
    );

    return { fonts: filteredFonts, packs: filteredPacks };
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
    return (
      <div className={styles.loader}>
        <ClipLoader color="#999" size={34} />
      </div>
    );
  }

  return (
    <div className={styles.fontsPage}>
      <div className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.headerGroup}>
            <div className={styles.logo}>
              <img className={styles.logoImg} src="./logo2.png" alt="akuru" />
            </div>
            <div className={styles.fontsSearch}>
              <input
                type="text"
                className={styles.searchInput}
                id="search-input"
                placeholder="Search Fonts"
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.fontsShowcase}>
        <FontsShowcase />
      </div>

      <div className={styles.fontsPageContainer}>
        <InputSection onInputChange={handleInputChange} initialFontSize={32} />

        <div className={styles.switchButtons}>
          <div className={styles.packButtons}>
            <button
              className={currentView === "FONTS" ? styles.active : ""}
              onClick={() => setCurrentView("FONTS")}
            >
              FONTS
            </button>
            <button
              className={currentView === "PACKS" ? styles.active : ""}
              onClick={() => setCurrentView("PACKS")}
            >
              PACKS
            </button>
          </div>

          <div className={styles.filterButtons}>
            <button>UNICODE</button>
            <button>LEGACY</button>
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

        {/* Pagination Controls */}
        <div className={styles.pagination}>
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? styles.active : ""}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FontsPage;
