import Error from "@/pages/Error";
import Login from "@/pages/Login/Login";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Party from "@/pages/Party/Party";
import Account from "@/pages/Account/Account";
import AppLayout from "@/components/layout/AppLayout";
import Dashboard from "@/pages/Dashboard/Dashboard";
import UserProfiles from "@/pages/Profile/UserProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <AppLayout />
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
      {
        path: "/party",
        element: <Party />,
      },
      {
        path: "/accounts",
        element: <Account />,
      },
      // {
      //   path: "/factory_costs",
      //   element: (
      //     <ManagerRoute>
      //       <FactoryCostUpdated />
      //     </ManagerRoute>
      //   ),
      // },
      // {
      //   path: "/purchases",
      //   element: (
      //     <ManagerRoute>
      //       <PurchasesPage />
      //     </ManagerRoute>
      //   ),
      // },
      // {
      //   path: "/sales",
      //   element: (
      //     <ManagerRoute>
      //       <Sales />
      //     </ManagerRoute>
      //   ),
      // },
      // {
      //   path: "/report/loss_profit",
      //   element: <LossProfit />,
      // },
      // {
      //   path: "/report/purchases",
      //   element: <Purchase />,
      // },
      // {
      //   path: "/report/factory",
      //   element: <FactoryCostUpdated />,
      // },
      // {
      //   path: "/report/bags",
      //   element: <Bags />,
      // },
      // {
      //   path: "/report/sales",
      //   element: <SalesReport />,
      // },
      // {
      //   path: "/report/return",
      //   element: <Return />,
      // },
      // {
      //   path: "/report/balance",
      //   element: <BalanceReport />,
      // },
      // {
      //   path: "/company/balance",
      //   element: <Balance />,
      // },
      // {
      //   path: "/production",
      //   element: (
      //     <ManagerRoute>
      //       <Production />
      //     </ManagerRoute>
      //   ),
      // },
      // {
      //   path: "/inventory",
      //   element: <Inventory />,
      // },
      // {
      //   path: "/categories",
      //   element: <Categories />,
      // },
      // {
      //   path: "/items",
      //   element: <Items />,
      // },
      // {
      //   path: "/authentication",
      //   element: (
      //     <PrivateRoute>
      //       <Authentication />
      //     </PrivateRoute>
      //   ),
      // },
      // {
      //   path: "/profile",
      //   element: <Profile />,
      // },
    ],
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
