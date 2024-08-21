import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/web"; // With the index.js in web folder, notice that we can access all the pages only importing the folder

export function WebRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}
