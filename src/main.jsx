import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "react-bootstrap";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./components/scrollToTop/scrollToTop.jsx";

createRoot(document.getElementById("root")).render(
  <ThemeProvider dir="rtl">
    <StrictMode>
      <BrowserRouter>
        <ScrollToTop />
        <App />
      </BrowserRouter>
    </StrictMode>
  </ThemeProvider>,
);
