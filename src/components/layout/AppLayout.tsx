import { SidebarProvider, useSidebar } from "@/context/SidebarContext";
import { Outlet } from "react-router";
import Backdrop from "./Backdrop";
import AppHeader from "./AppHeader";
import { useState } from "react";
import InventoryTabItems from "./MenuTabItems/InventoryTabItems";
import AppSidebar from "./AppSidebar";
import SalesTabItems from "./MenuTabItems/SalesTabItems";
import DashboardTabItems from "./MenuTabItems/DashboardTabItems";
import PurchaseTabItems from "./MenuTabItems/PurchaseTabItems";
import OrderMenuItems from "./MenuTabItems/OrderMenuItems";

const LayoutContent: React.FC = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen xl:flex">
      <div>
        <AppSidebar setActiveTab={setActiveTab} />
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
              {activeTab === "dashboard" && <DashboardTabItems />}
              {activeTab === "inventory" && <InventoryTabItems />}
              {activeTab === "purchases" && <PurchaseTabItems />}
              {activeTab === "sales" && <SalesTabItems />}
              {activeTab === "orders" && <OrderMenuItems />}
              {activeTab === "transfer" && <SalesTabItems />}
              {activeTab === "accounting" && <SalesTabItems />}
              {activeTab === "users" && <SalesTabItems />}
              {activeTab === "hrm" && <SalesTabItems />}
              {activeTab === "task" && <SalesTabItems />}
              {activeTab === "settings" && <SalesTabItems />}
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
