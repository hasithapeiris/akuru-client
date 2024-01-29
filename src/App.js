import styles from "./App.module.css";
import ReactGA from "react-ga4";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  About,
  FontsPage,
  Contact,
  FontPreview,
  FontPackPreview,
  Converter,
} from "./pages/index";
import { Header, Footer, SideGraphic } from "./components/index";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { grey, blueGrey } from "@mui/material/colors";
import { useEffect } from "react";

const theme = createTheme({
  palette: {
    primary: grey,
    secondary: blueGrey,
  },
  typography: {
    fontFamily: "poppins",
  },
});

function App() {
  useEffect(() => {
    ReactGA.initialize("G-0BRKR6BTDR");
    ReactGA.send({ hitType: "pageview", page: "/", title: "Home" });
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          <div className="App">
            <div className={styles.content}>
              <Header />
              <Routes>
                <Route path="/" element={<FontsPage />}></Route>
                <Route
                  path="/fonts/:fontName"
                  element={<FontPreview />}
                ></Route>
                <Route
                  path="fonts/packs/:packName"
                  element={<FontPackPreview />}
                ></Route>
                <Route path="/converter" element={<Converter />}></Route>
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
              <SideGraphic />
            </div>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
