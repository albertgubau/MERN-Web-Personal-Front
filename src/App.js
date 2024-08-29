import { AuthProvider } from "../src/context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { WebRouter } from "./router/WebRouter";
import { AdminRouter } from "./router/AdminRouter";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <WebRouter />
        <AdminRouter />
      </BrowserRouter>
    </AuthProvider>
  );
}
