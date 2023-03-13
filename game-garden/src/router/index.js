import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Boutique from "../pages/Boutique";
import Profil from "../pages/Profil";
import Wishlist from "../pages/Wishlist";
import Inscription from "../pages/Inscription";

export const router = createBrowserRouter([
  {path: "/", element: <Login/>},
  {path: "/Login", element: <Login/>},
  {path: "/Inscription", element: <Inscription/>},
  {path: "/Boutique", element: <Boutique/>},
  {path: "/Profil", element: <Profil/>},
  {path: "/Wishlist", element: <Wishlist/>}
]);