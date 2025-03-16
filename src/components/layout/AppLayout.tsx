import { SidebarProvider, useSidebar } from "@/context/SidebarContext";
import { Outlet } from "react-router";
import Backdrop from "./Backdrop";
import AppHeader from "./AppHeader";
import AppSidebar from "./AppSidebar";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";

// Importing all tab components
import Dashboard from "@/pages/Dashboard/Dashboard";
import InventoryTabItems from "./MenuTabItems/InventoryTabItems";
import SalesTabItems from "./MenuTabItems/SalesTabItems";
import PurchaseTabItems from "./MenuTabItems/PurchaseTabItems";
import OrderMenuItems from "./MenuTabItems/OrderMenuItems";
import TransferTabItems from "./MenuTabItems/TransferTabItems";
import AccountingTabItems from "./MenuTabItems/AccountingTabItems";
import UsersTabItems from "./MenuTabItems/UsersTabItems";
import HrmTabItems from "./MenuTabItems/HrmTabItems";
import TaskManageTabItems from "./MenuTabItems/TaskManageTabItems";
import SetUpTabItems from "./MenuTabItems/SetUpTabItems";

// Mapping tabs to their respective components
const tabComponents: Record<string, React.ElementType> = {
  dashboard: Dashboard,
  inventory: InventoryTabItems,
  purchases: PurchaseTabItems,
  sales: SalesTabItems,
  orders: OrderMenuItems,
  transfer: TransferTabItems,
  accounting: AccountingTabItems,
  users: UsersTabItems,
  hrm: HrmTabItems,
  task: TaskManageTabItems,
  settings: SetUpTabItems,
};

const LayoutContent: React.FC = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const activeTab = useAppSelector(
    (state: RootState) => state.gState.activeTab
  );

  // Get the component based on activeTab
  const ActiveComponent = activeTab ? tabComponents[activeTab] : null;

  return (
    <div className="min-h-screen xl:flex">
      {/* Sidebar & Backdrop */}
      <div>
        <AppSidebar />
        <Backdrop />
      </div>

      {/* Main Content Area */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? "md:ml-[200px]" : "md:ml-[0px]"
        } ${isMobileOpen ? "ml-0" : ""}`}
      >
        <AppHeader />
        <div className="w-full h-full">
          {/* Render the active tab component if available, otherwise render Outlet */}
          {ActiveComponent ? <ActiveComponent /> : <Outlet />}
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
