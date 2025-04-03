import { createHashRouter } from "react-router-dom";
import HomePage from "../pages/front/HomePage";
import FrontLayout from "../layouts/FrontLayout";
import ProductsPage from "../pages/front/ProductsPage";
import ProductDetailPage from "../pages/front/ProductDetailPage";
import CartPage from "../pages/front/CartPage";
import CheckoutFormPage from "../pages/front/CheckoutFormPage";
import CheckoutSuccessPage from "../pages/front/CheckoutSuccessPage";
import CheckoutFailPage from "../pages/front/CheckoutFailPage";
import AdminLogin from "../pages/admin/AdminLogin";
import AdminLayout from "../layouts/AdminLayout";
import AdminProductPage from "../pages/admin/AdminProductPage";
import NotFound from "../components/NotFound";
import AboutPage from "../pages/front/AboutPage";
import AdminOrdersPage from "../pages/admin/AdminOrdersPage";
import AdminCouponPage from "../pages/admin/AdminCouponPage";

const routes = [
  {
    path: "",
    element: <FrontLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/products",
        element: <ProductsPage />,
      },
      {
        path: "/products/:id",
        element: <ProductDetailPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/checkout",
        element: <CheckoutFormPage />,
      },
      {
        path: "/checkout-success",
        element: <CheckoutSuccessPage />,
      },
      {
        path: "/checkout-fail",
        element: <CheckoutFailPage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/admin-login",
    element: <AdminLogin />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "",
        element: <AdminProductPage />,
      },
      {
        path: "products",
        element: <AdminProductPage />,
      },
      {
        path: "orders",
        element: <AdminOrdersPage />,
      },
      {
        path: "coupons",
        element: <AdminCouponPage />,
      },
    ],
  },
];

const router = createHashRouter(routes);

export default router;
