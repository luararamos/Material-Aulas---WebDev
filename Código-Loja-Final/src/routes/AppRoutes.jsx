import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import ProductDetails from "../pages/ProductDetails";
import Profile from "../pages/Profile";
import Cart from "../pages/Cart";
import Categorias from "../pages/Categorias";
import SearchPageWelcome from "../pages/SearchPageWelcome";
import SearchPage from "../pages/SearchPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "profile", element: <Profile /> },
      { path: "cart", element: <Cart/> },
      { path: "categories", element: <Categorias /> },
      {path: 'search', element: <SearchPageWelcome />},
      {path: 'search/:search', element: <SearchPage />},
      { path: "product/:id", element: <ProductDetails /> },
    ],
  },
]);

