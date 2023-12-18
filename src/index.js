import React from "react";
import { createRoot } from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import Localization from "./Localization";
import "./index.css";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Localization />
    </ErrorBoundary>
  </React.StrictMode>
);
reportWebVitals();
/* app structure
index.js
  Localization.jsx
    MainApp.jsx
      all components
*/
