import RootLayout from "@/components/layouts/RootLayout";
import Error from "@/pages/Error";
import Login from "@/pages/Login/Login";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <RootLayout />
      </PrivateRoute>
    ),
    // children: [
    //   {
    //     path: "/",
    //     element: <Navigate to="/overview" replace />,
    //   },
    //   {
    //     path: "/overview",
    //     element: <OverView />,
    //   },
    //   {
    //     path: "/party_book",
    //     element: <PartyBook />,
    //   },
    //   {
    //     path: "/accounts",
    //     element: <Accounts />,
    //   },
    //   {
    //     path: "/factory_costs",
    //     element: (
    //       <ManagerRoute>
    //         <FactoryCostUpdated />
    //       </ManagerRoute>
    //     ),
    //   },
    //   {
    //     path: "/purchases",
    //     element: (
    //       <ManagerRoute>
    //         <PurchasesPage />
    //       </ManagerRoute>
    //     ),
    //   },
    //   {
    //     path: "/sales",
    //     element: (
    //       <ManagerRoute>
    //         <Sales />
    //       </ManagerRoute>
    //     ),
    //   },
    //   {
    //     path: "/report/loss_profit",
    //     element: <LossProfit />,
    //   },
    //   {
    //     path: "/report/purchases",
    //     element: <Purchase />,
    //   },
    //   {
    //     path: "/report/factory",
    //     element: <FactoryCostUpdated />,
    //   },
    //   {
    //     path: "/report/bags",
    //     element: <Bags />,
    //   },
    //   {
    //     path: "/report/sales",
    //     element: <SalesReport />,
    //   },
    //   {
    //     path: "/report/return",
    //     element: <Return />,
    //   },
    //   {
    //     path: "/report/balance",
    //     element: <BalanceReport />,
    //   },
    //   {
    //     path: "/company/balance",
    //     element: <Balance />,
    //   },
    //   {
    //     path: "/production",
    //     element: (
    //       <ManagerRoute>
    //         <Production />
    //       </ManagerRoute>
    //     ),
    //   },
    //   {
    //     path: "/inventory",
    //     element: <Inventory />,
    //   },
    //   {
    //     path: "/categories",
    //     element: <Categories />,
    //   },
    //   {
    //     path: "/items",
    //     element: <Items />,
    //   },
    //   {
    //     path: "/authentication",
    //     element: (
    //       <PrivateRoute>
    //         <Authentication />
    //       </PrivateRoute>
    //     ),
    //   },
    //   {
    //     path: "/profile",
    //     element: <Profile />,
    //   },
    // ],
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
