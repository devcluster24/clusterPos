import { Link } from "react-router";
import { useSidebar } from "@/context/SidebarContext";
import {
  FaBox,
  FaCalendarPlus,
  FaChartBar,
  FaClipboardList,
  FaFileAlt,
  FaRegSun,
  FaShoppingCart,
  FaTasks,
  FaTruck,
  FaUser,
  FaUserCheck,
} from "react-icons/fa";
import SidebarButton from "../ui/button/SidebarButton";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setGState } from "@/redux/features/state/stateSlice";
import { RootState } from "@/redux/store";

const SidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: <FaChartBar /> },
  { id: "inventory", label: "Inventory", icon: <FaBox /> },
  { id: "purchases", label: "Purchases", icon: <FaShoppingCart /> },
  { id: "sales", label: "Sales", icon: <FaFileAlt /> },
  { id: "orders", label: "Orders", icon: <FaClipboardList /> },
  { id: "transfer", label: "Transfer", icon: <FaTruck /> },
  { id: "accounting", label: "Accounting", icon: <FaCalendarPlus /> },
  { id: "users", label: "Users", icon: <FaUser /> },
  { id: "hrm", label: "HRM", icon: <FaUserCheck /> },
  { id: "task", label: "Task Manage", icon: <FaTasks /> },
  { id: "settings", label: "Set-Up", icon: <FaRegSun /> },
];

const AppSidebar = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector(
    (state: RootState) => state.gState.activeTab
  );

  return (
    <aside
      className={`fixed flex flex-col lg:mt-0 top-0 left-0 dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r bg-white border-gray-200
     ${
       isExpanded || isMobileOpen
         ? "w-[200px]"
         : isHovered
         ? "w-[200px]"
         : "lg:w-[200px] md:w-[200px] w-[0px]"
     }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full "}
        md:translate-x-0 no-scrollbar overflow-y-auto`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-5 px-2  flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link to="/">
          <>
            {/* <img
                className="dark:hidden"
                src="/images/logo/logo.svg"
                alt="Logo"
                width={150}
                height={40}
              />
              <img
                className="hidden dark:block"
                src="/images/logo/logo-dark.svg"
                alt="Logo"
                width={150}
                height={40}
              /> */}
            <h2 className="text-xl font-semibold dark:text-white text-black lg:py-1 md:py-0">
              Stock Management
            </h2>
          </>
        </Link>
      </div>
      <div className="">
        <nav className={` grid  grid-cols-1`}>
          {SidebarItems?.slice(0, 1)?.map((item) => (
            <SidebarButton
              key={item.id}
              id={item.id}
              icon={item.icon}
              label={item.label}
              activeTab={activeTab}
              onClick={() =>
                dispatch(setGState({ activeTab: item.id, activePage: false }))
              }
            />
          ))}
        </nav>
        <nav className={` grid grid-cols-2 no-scrollbar overflow-y-auto`}>
          {SidebarItems?.slice(1)?.map((item) => (
            <SidebarButton
              key={item.id}
              id={item.id}
              icon={item.icon}
              label={item.label}
              activeTab={activeTab}
              onClick={() =>
                dispatch(setGState({ activeTab: item.id, activePage: false }))
              }
            />
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
