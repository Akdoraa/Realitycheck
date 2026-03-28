import { createBrowserRouter } from "react-router";
import ArticlePage from "./pages/ArticlePage";
import ExtensionPopup from "./pages/ExtensionPopup";
import Dashboard from "./pages/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: ArticlePage,
  },
  {
    path: "/extension",
    Component: ExtensionPopup,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
]);
