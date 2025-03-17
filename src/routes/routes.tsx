import Error from "@/pages/Error";
import Login from "@/pages/Login/Login";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "@/pages/Dashboard/Dashboard";
import UserProfiles from "@/pages/Profile/UserProfile";
import CommingSoon from "@/pages/CommingSoon";
import Category from "@/pages/Inventory/ProductMangement/Category";
import Brand from "@/pages/Inventory/Brand";
import SubCategory from "@/pages/Inventory/SubCategory";
import Items from "@/pages/Inventory/Items";
import Units from "@/pages/Inventory/Units";
import Varients from "@/pages/Inventory/Varients";
import Warrenty from "@/pages/Inventory/Warrenty";
import QRCode from "@/pages/Inventory/QRCode";
import BarCode from "@/pages/Inventory/BarCode";
import App from "@/App";
import CreateProduct from "@/pages/Inventory/ProductMangement/CreateProduct";
import ProductList from "@/pages/Inventory/ProductMangement/ProductList";
import ExpiredProductList from "@/pages/Inventory/ProductMangement/ExpiredProductList";
import ImportProduct from "@/pages/Inventory/ProductMangement/ImportProduct";
import AlertQuantities from "@/pages/Inventory/ProductMangement/AlertQuantities";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/my-profile",
        element: <UserProfiles />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },

      /* Inventory routes */
      {
        path: "/products/create",
        element: <CreateProduct />,
      },
      {
        path: "/products/list",
        element: <ProductList />,
      },
      {
        path: "/products/import",
        element: <ImportProduct />,
      },
      {
        path: "/products/expired",
        element: <ExpiredProductList />,
      },
      {
        path: "/products/alert-quantities",
        element: <AlertQuantities />,
      },
      {
        path: "/products/categories",
        element: <Category />,
      },
      {
        path: "/products/sub-categories",
        element: <SubCategory />,
      },
      {
        path: "/brand",
        element: <Brand />,
      },

      {
        path: "/items",
        element: <Items />,
      },
      {
        path: "/units",
        element: <Units />,
      },
      {
        path: "/varients",
        element: <Varients />,
      },
      {
        path: "/warrenty",
        element: <Warrenty />,
      },
      {
        path: "/print-qrcode",
        element: <QRCode />,
      },
      {
        path: "/print-barcode",
        element: <BarCode />,
      },

      /* Stock routes */
      {
        path: "/comming-soon",
        element: <CommingSoon />,
      },
    ],
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
