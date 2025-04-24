import React from "react";
import { Route, Routes } from "react-router-dom";

import SharedLayout from "./components/SharedLayout/SharedLayout";

import Loader from "./components/commonComponents/Loader";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

import "./App.css";

// Lazy-loaded pages
const LazyHomePage = React.lazy(() => import("./pages/HomePage/HomePage"));

function App() {
  return (
    <React.Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          {/* Public Routes */}
          <Route index element={<LazyHomePage />} />

          {/* Catch-All */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </React.Suspense>
  );
}

export default App;
