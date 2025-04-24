import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { BrowserRouter } from "react-router-dom";

import "./styles/variables.css";

// Use the correct basename based on the environment
const basename =
  process.env.NODE_ENV === "production" ? "/DigisChatAppReact" : "/";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
      basename={basename} // Dynamically set the basename
    >
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
