import RootLayout from "@/components/layouts/RootLayout";
import Error from "@/pages/Error";
import Login from "@/pages/Login/Login";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import MyProfile from "@/pages/Profile/MyProfile";
import Party from "@/pages/Party/Party";
import Account from "@/pages/Account/Account";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute roles={["SUPER_ADMIN", "OWNER", "MANAGER"]}>
        <RootLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/profile",
        element: (
          <PrivateRoute roles={["USER"]}>
            <MyProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/party",
        element: (
          <PrivateRoute roles={["MANAGER", "OWNER"]}>
            <Party />
          </PrivateRoute>
        ),
      },
      {
        path: "/accounts",
        element: (
          <PrivateRoute roles={["SUPER_ADMIN"]}>
            <Account />
          </PrivateRoute>
        ),
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
