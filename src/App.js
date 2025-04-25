import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { useDispatch } from "react-redux";
import { fetchData } from "../src/redux/public/operationsChats";

import SharedLayout from "./components/SharedLayout/SharedLayout";
import Loader from "./components/commonComponents/Loader";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

import "./App.css";

// Lazy-loaded pages
const LazyHomePage = React.lazy(() => import("./pages/HomePage/HomePage"));
const LazyChatPage = React.lazy(() => import("./pages/ChatPage/ChatPage"));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <React.Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<LazyHomePage />} />
          <Route path="chat/:chatId" element={<LazyChatPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </React.Suspense>
  );
}

export default App;
