import { Routes, Route } from "react-router-dom";
import { Home, Courses, Blog, Post } from "../pages/web"; // With the index.js in web folder, notice that we can access all the pages only importing the folder
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
      <Route path="/courses" element={loadLayout(ClientLayout, Courses)} />
      <Route path="/blog" element={loadLayout(ClientLayout, Blog)} />
      {/* :postPath refers to the path of the post (modeled with this kind of property in Back-end) */}
      <Route path="/blog/:postPath" element={loadLayout(ClientLayout, Post)} />
    </Routes>
  );
}
