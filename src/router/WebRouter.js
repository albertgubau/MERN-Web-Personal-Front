import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/web"; // With the index.js in web folder, notice that we can access all the pages only importing the folder
import { ClientLayout } from "../layouts";

export function WebRouter() {
  const loadLayout = (Layout, Page) => {
    return (
      <Layout>
        <Page />
      </Layout>
    );
  };

  return (
    <Routes>
      <Route path="/" element={loadLayout(ClientLayout, Home)} />
    </Routes>
  );
}
