import React from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import { Home, NotFound, PNGUpload } from "pages";


const Router = () => {
  return (
    <HashRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/png" element={<PNGUpload />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
    </HashRouter>
  );
};
export default Router;