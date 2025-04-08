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
import VariantList from "@/pages/Inventory/ProductMangement/VariantList";
import WarrentyList from "@/pages/Inventory/ProductMangement/WarrentyList";
import AddStockIssue from "@/pages/Inventory/ManageStockIssue/AddStockIssue";
import StockIssuedList from "@/pages/Inventory/ManageStockIssue/StockIssuedList";
import StockIssues from "@/pages/Inventory/ManageStockIssue/StockIssues";
import StockReports from "@/pages/Inventory/ProductReports/StockReport";
import StockOutReports from "@/pages/Inventory/ProductReports/StockOutReport";
import StockInOutReports from "@/pages/Inventory/ProductReports/StockInOutReport";
import CreatePurchase from "@/pages/Purchase/PurchaseMangement/CreatePurchase";
import PurchaseList from "@/pages/Purchase/PurchaseMangement/PurchaseList";
import PurchasedProductList from "@/pages/Purchase/PurchaseMangement/PurchasedProductList";

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

      /*================================= Inventory routes ===================================== */

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
        element: <VariantList />,
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
        path: "/products/report/stock",
        element: <StockReports />,
      },
      {
        path: "/products/report/stock-out",
        element: <StockOutReports />,
      },
      {
        path: "/products/report/stock-in-out",
        element: <StockInOutReports />,
      },

      /*=================================== Purchase routes =============================== */
      /* PURCHASE MANAGEMENT */
      {
        path: "/purchase/create",
        element: <CreatePurchase />,
      },
      {
        path: "/purchase/list",
        element: <PurchaseList />,
      },
      {
        path: "/purchase/products",
        element: <PurchasedProductList />,
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
        path: "/purchase/reports/purchases",
        element: <CommingSoon />,
      },
      {
        path: "/purchase/reports/purchased-product",
        element: <CommingSoon />,
      },
      {
        path: "/purchase/reports/purchase-return",
        element: <CommingSoon />,
      },
      {
        path: "/purchase/reports/purchase-return-products",
        element: <CommingSoon />,
      },
      {
        path: "/purchases/reports/payments-against-purchase",
        element: <CommingSoon />,
      },
      {
        path: "/purchases/reports/sales/purchase",
        element: <CommingSoon />,
      },
      /*==================================== Sales routes =================================== */
      /* SALES MANAGEMENT */
      {
        path: "/sales/create",
        element: <CommingSoon />,
      },
      {
        path: "/sales/pos/create",
        element: <CommingSoon />,
      },
      {
        path: "/sales/add-sale",
        element: <CommingSoon />,
      },
      {
        path: "/sales/drafts",
        element: <CommingSoon />,
      },
      {
        path: "/sales/add-sale/products",
        element: <CommingSoon />,
      },
      {
        path: "/sales/shipments",
        element: <CommingSoon />,
      },
      {
        path: "/sales/cash-register",
        element: <CommingSoon />,
      },
      {
        path: "/sales/discounts",
        element: <CommingSoon />,
      },
      /* SALES RETURN MANAGEMENT */
      {
        path: "/sales/returns/create",
        element: <CommingSoon />,
      },
      {
        path: "/sales/returns",
        element: <CommingSoon />,
      },
      /* Sale Reports */
      {
        path: "/sales/reports/sales",
        element: <CommingSoon />,
      },
      {
        path: "/sales/reports/sold-products",
        element: <CommingSoon />,
      },
      {
        path: "/sales/reports/sales-return",
        element: <CommingSoon />,
      },
      {
        path: "/sales/reports/sales-returned-products",
        element: <CommingSoon />,
      },
      {
        path: "/sales/reports/received-against-sales-report",
        element: <CommingSoon />,
      },
      {
        path: "/sales/reports/cash-register-report",
        element: <CommingSoon />,
      },

      /*================================== Order routes ==================================== */
      /* Quotation Management */
      {
        path: "/orders/sales/quotations/create",
        element: <CommingSoon />,
      },
      {
        path: "/orders/sales/quotations/list",
        element: <CommingSoon />,
      },
      /* Sales Order Management */
      {
        path: "/orders/sales/orders/create",
        element: <CommingSoon />,
      },
      {
        path: "/orders/sales/orders/list",
        element: <CommingSoon />,
      },
      {
        path: "/orders/sales/order-to-invoice/create",
        element: <CommingSoon />,
      },
      /* PURCHASE ORDER MANAGEMENT */
      {
        path: "/orders/purchase/order/create",
        element: <CommingSoon />,
      },
      {
        path: "/orders/purchase/order/list",
        element: <CommingSoon />,
      },
      {
        path: "/orders/sales/order-to-invoice/create",
        element: <CommingSoon />,
      },
      /* ORDER REPORTS */
      {
        path: "/orders/reports/sales-orders",
        element: <CommingSoon />,
      },
      {
        path: "/orders/reports/sales-ordered-products",
        element: <CommingSoon />,
      },
      {
        path: "/orders/reports/purchase-orders",
        element: <CommingSoon />,
      },
      {
        path: "/orders/reports/purchase-ordered-products",
        element: <CommingSoon />,
      },

      /*================================= Transfer routes ==================================== */
      /* Transfer Stock */
      {
        path: "/transfer-stocks/create",
        element: <CommingSoon />,
      },
      {
        path: "/transfer-stocks/list",
        element: <CommingSoon />,
      },
      /* Receive Transferred Stock */
      {
        path: "/transfer-stocks/receive-transferred-stocks/from-warehouse",
        element: <CommingSoon />,
      },
      {
        path: "/transfer-stocks/receive-transferred-stocks/from-branch",
        element: <CommingSoon />,
      },

      /*================================ Accounting routes ================================== */
      /* ACCOUNT MANAGEMENT */
      {
        path: "/accounting/banks",
        element: <CommingSoon />,
      },
      {
        path: "/accounting/accounts",
        element: <CommingSoon />,
      },
      {
        path: "/accounting/accounts/capitals",
        element: <CommingSoon />,
      },
      {
        path: "/accounting/accounts/duties-and-taxes",
        element: <CommingSoon />,
      },
      /* ACCOUNTING VOUCHERS */
      {
        path: "/accounting/receipts",
        element: <CommingSoon />,
      },
      {
        path: "/accounting/payments",
        element: <CommingSoon />,
      },
      {
        path: "/accounting/expenses",
        element: <CommingSoon />,
      },
      {
        path: "/accounting/contras",
        element: <CommingSoon />,
      },
      {
        path: "/accounting/journals",
        element: <CommingSoon />,
      },
      /* ACCOUNT REPORTS */
      {
        path: "/accounting/reports/profit-loss",
        element: <CommingSoon />,
      },
      {
        path: "/accounting/reports/financial",
        element: <CommingSoon />,
      },
      {
        path: "/accounting/reports/financial",
        element: <CommingSoon />,
      },
      {
        path: "/accounting/reports/trial-balance",
        element: <CommingSoon />,
      },
      {
        path: "/accounting/reports/vat-tax",
        element: <CommingSoon />,
      },
      {
        path: "/accounting/reports/cash-flow",
        element: <CommingSoon />,
      },
      {
        path: "/reports/day-book",
        element: <CommingSoon />,
      },
      {
        path: "/reports/expenses",
        element: <CommingSoon />,
      },
      /*=================================== User routes ===================================== */
      /* Manage User */
      {
        path: "/users/create",
        element: <CommingSoon />,
      },
      {
        path: "/users/list",
        element: <CommingSoon />,
      },
      /* Manage Role */
      {
        path: "/users/roles/create",
        element: <CommingSoon />,
      },
      {
        path: "/users/roles",
        element: <CommingSoon />,
      },
      /* Log Report */
      {
        path: "/users/reports/user-activities-log",
        element: <CommingSoon />,
      },
      /*=================================== hrm routes ======================================== */
      /* Manage User */
      {
        path: "/hrm/leaves",
        element: <CommingSoon />,
      },
      {
        path: "/hrm/shifts",
        element: <CommingSoon />,
      },
      {
        path: "/hrm/attendances",
        element: <CommingSoon />,
      },
      {
        path: "/hrm/holidays",
        element: <CommingSoon />,
      },
      {
        path: "/hrm/departments",
        element: <CommingSoon />,
      },
      {
        path: "/hrm/designations",
        element: <CommingSoon />,
      },
      {
        path: "/hrm/payrolls",
        element: <CommingSoon />,
      },
      /* HRM REPORTS */
      {
        path: "/hrm/reports/payrolls",
        element: <CommingSoon />,
      },
      {
        path: "/hrm/reports/payroll/payments",
        element: <CommingSoon />,
      },
      {
        path: "/hrm/reports/attendances",
        element: <CommingSoon />,
      },

      /*============================= Task Management routes ================================= */
      /* Task Management */
      {
        path: "/task-management/todo",
        element: <CommingSoon />,
      },
      {
        path: "/task-management/workspaces",
        element: <CommingSoon />,
      },
      {
        path: "/task-management/messages",
        element: <CommingSoon />,
      },
      /*================================== Set up routes =================================== */

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
