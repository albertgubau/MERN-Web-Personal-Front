import { Routes, Route } from "react-router-dom";
import { Auth, Users } from "../pages/admin"; // With the index.js in admin folder, notice that we can access all the pages only importing the folder
import { AdminLayout } from "../layouts";

const user = { username: "admin", password: "admin" };

export function AdminRouter() {
  const loadLayout = (Layout, Page) => {
    return (
      <Layout>
        <Page />
      </Layout>
    );
  };

  return (
    <Routes>
      {!user ? (
        <Route path="/admin/*" element={loadLayout(AdminLayout, Auth)} />
      ) : (
        <>
          <Route path="/admin/users" element={loadLayout(AdminLayout, Users)} />
        </>
      )}
    </Routes>
  );
}
