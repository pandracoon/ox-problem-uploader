import React from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import { Home, NotFound, Overview, PNGUpload } from "pages";
import { SideNav } from "sections/sidenav";

const Router = () => {
  return (
    <HashRouter>
        <SideNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/png" element={<PNGUpload />} />
          <Route path="/overview" element={<Overview />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
    </HashRouter>
  );
};
export default Router;