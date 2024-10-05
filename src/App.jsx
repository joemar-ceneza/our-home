import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
// pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Search from "./pages/Search";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Category from "./components/Category";
// components
import Header from "./components/Header";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import Success from "./components/Success";
import Cancel from "./components/Cancel";

// layout
const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/products/:id", element: <Products /> },
      { path: "/product/:id", element: <ProductDetails /> },
      { path: "/search", element: <Search /> },
      { path: "/category", element: <Category /> },
      { path: "/login", element: <Login /> },
      { path: "/cart", element: <Cart /> },
      { path: "/success", element: <Success /> },
      { path: "/cancel", element: <Cancel /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return (
    <main className="font-montserrat text-gray-500">
      <RouterProvider router={router} />
    </main>
  );
}
