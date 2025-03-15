import { SidebarProvider, useSidebar } from "@/context/SidebarContext";
import { Outlet } from "react-router";
import Backdrop from "./Backdrop";
import AppHeader from "./AppHeader";
import { useState } from "react";
import InventoryTabItems from "./MenuTabItems/InventoryTabItems";
import AppSidebar from "./AppSidebar";
import SalesTabItems from "./MenuTabItems/SalesTabItems";
import PurchaseTabItems from "./MenuTabItems/PurchaseTabItems";
import OrderMenuItems from "./MenuTabItems/OrderMenuItems";
import Dashboard from "@/pages/Dashboard/Dashboard";
import TransferTabItems from "./MenuTabItems/TransferTabItems";
import AccountingTabItems from "./MenuTabItems/AccountingTabItems";
import UsersTabItems from "./MenuTabItems/UsersTabItems";
import HrmTabItems from "./MenuTabItems/HrmTabItems";
import TaskManageTabItems from "./MenuTabItems/TaskManageTabItems";
import SetUpTabItems from "./MenuTabItems/SetUpTabItems";

const LayoutContent: React.FC = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const [activeTab, setActiveTab] = useState("");

  return (
    <div className="min-h-screen xl:flex">
      <div>
        <AppSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <Backdrop />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? "md:ml-[200px]" : "md:ml-[0px]"
        } ${isMobileOpen ? "ml-0" : ""}`}
      >
        <AppHeader />
        <div className=" mx-auto max-w-(--breakpoint-2xl) no-scrollbar">
          {activeTab ? (
            <>
              {activeTab === "dashboard" && <Dashboard />}
              {activeTab === "inventory" && <InventoryTabItems />}
              {activeTab === "purchases" && <PurchaseTabItems />}
              {activeTab === "sales" && <SalesTabItems />}
              {activeTab === "orders" && <OrderMenuItems />}
              {activeTab === "transfer" && <TransferTabItems />}
              {activeTab === "accounting" && <AccountingTabItems />}
              {activeTab === "users" && <UsersTabItems />}
              {activeTab === "hrm" && <HrmTabItems />}
              {activeTab === "task" && <TaskManageTabItems />}
              {activeTab === "settings" && <SetUpTabItems />}
            </>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </div>
  );
};

const AppLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
};

export default AppLayout;
