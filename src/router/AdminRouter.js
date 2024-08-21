import { Routes, Route } from "react-router-dom";
import { Auth } from "../pages/admin"; // With the index.js in admin folder, notice that we can access all the pages only importing the folder

export function AdminRouter() {
  return (
    <Routes>
      <Route path="/admin/*" element={<Auth />} />
    </Routes>
  );
}
