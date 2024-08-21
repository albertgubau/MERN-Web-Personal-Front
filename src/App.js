import { BrowserRouter } from "react-router-dom";
import { WebRouter } from "./router/WebRouter";
import { AdminRouter } from "./router/AdminRouter";

export default function App() {
  return (
    <BrowserRouter>
      <WebRouter />
      <AdminRouter />
    </BrowserRouter>
  );
}
