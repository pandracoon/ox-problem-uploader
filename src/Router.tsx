import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Home } from "pages";


const Router = () => {
  return (
    <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path='*' element={<NotFound />} /> */}
          </Routes>
    </BrowserRouter>
  );
};
export default Router;