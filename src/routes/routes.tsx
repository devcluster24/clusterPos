import Error from "@/pages/Error";
import Login from "@/pages/Login/Login";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "@/pages/Dashboard/Dashboard";
import UserProfiles from "@/pages/Profile/UserProfile";
import CommingSoon from "@/pages/CommingSoon";
import Category from "@/pages/Inventory/ProductMangement/CategoryList";
import SubCategory from "@/pages/Inventory/ProductMangement/SubCategoryList";
import QRCode from "@/pages/Inventory/ProductMangement/QRCode";
import BarCode from "@/pages/Inventory/ProductMangement/BarCode";
import App from "@/App";
import CreateProduct from "@/pages/Inventory/ProductMangement/CreateProduct";
import ProductList from "@/pages/Inventory/ProductMangement/ProductList";
import ExpiredProductList from "@/pages/Inventory/ProductMangement/ExpiredProductList";
import ImportProduct from "@/pages/Inventory/ProductMangement/ImportProduct";
import AlertQuantities from "@/pages/Inventory/ProductMangement/AlertQuantities";
import BrandList from "@/pages/Inventory/ProductMangement/BrandList";
import UnitList from "@/pages/Inventory/ProductMangement/UnitLlist";
import VarientList from "@/pages/Inventory/ProductMangement/VarientList";
import WarrentyList from "@/pages/Inventory/ProductMangement/WarrentyList";
import AddStockIssue from "@/pages/Inventory/ManageStockIssue/AddStockIssue";
import StockIssuedList from "@/pages/Inventory/ManageStockIssue/StockIssuedList";
import StockIssues from "@/pages/Inventory/ManageStockIssue/StockIssues";

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

      /*================ Inventory routes ================= */

      /* product management */
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
        path: "/products/brands",
        element: <BrandList />,
      },
      {
        path: "/products/units",
        element: <UnitList />,
      },
      {
        path: "/products/varients",
        element: <VarientList />,
      },
      {
        path: "/products/warranties",
        element: <WarrentyList />,
      },
      {
        path: "/products/generate-qrcode",
        element: <QRCode />,
      },
      {
        path: "/products/generate-barcode",
        element: <BarCode />,
      },

      /* manage stock issue */
      {
        path: "/products/add-stock-issue",
        element: <AddStockIssue />,
      },
      {
        path: "/products/stock-issues",
        element: <StockIssues />,
      },
      {
        path: "/products/stock-issued-list",
        element: <StockIssuedList />,
      },

      /* product report */
      {
        path: "/products/stock-report",
        element: <CommingSoon />,
      },
      {
        path: "/products/stock-out-report",
        element: <CommingSoon />,
      },
      {
        path: "/products/stock-in-out-report",
        element: <CommingSoon />,
      },

      /*================ Purchase routes ================= */
      /* PURCHASE MANAGEMENT */
      {
        path: "/purchase/create",
        element: <CommingSoon />,
      },
      {
        path: "/purchase/list",
        element: <CommingSoon />,
      },
      {
        path: "/purchase/products",
        element: <CommingSoon />,
      },
      /* PURCHASE RETURN MANAGEMENT */
      {
        path: "/purchase/return/create",
        element: <CommingSoon />,
      },
      {
        path: "/purchase/return/list",
        element: <CommingSoon />,
      },
      /* PURCHASE REPORTS */
      {
        path: "/purchase/reports/purchase-order",
        element: <CommingSoon />,
      },
      {
        path: "/purchase/reports/purchase-return",
        element: <CommingSoon />,
      },
      {
        path: "/purchase/reports/purchase-invoice",
        element: <CommingSoon />,
      },
      /*================ Sales routes ================= */
      /* SALES MANAGEMENT */
      {
        path: "/sales/create",
        element: <CommingSoon />,
      },
      {
        path: "/sales/list",
        element: <CommingSoon />,
      },
      {
        path: "/sales/products",
        element: <CommingSoon />,
      },
      /* SALES RETURN MANAGEMENT */
      {
        path: "/sales/return/create",
        element: <CommingSoon />,
      },
      /*================ Sales routes ================= */
      /*================ Order routes ================= */
      /*================ Transfer routes ================= */
      /*================ Accounting routes ================= */
      /*================ User routes ================= */
      /*================ hrm routes ================= */
      /*================ Task Management routes ================= */
      /*================ Set up routes ================= */

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
