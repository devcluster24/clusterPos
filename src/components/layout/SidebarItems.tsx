import {
  GridIcon,
  ListIcon,
  PieChartIcon,
  PlugInIcon,
  UserCircleIcon,
} from "@/icons";

export type NavItem = {
  type: string;
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

export const navItems: NavItem[] = [
  {
    type: "Main",
    name: "Dashboard",
    icon: <GridIcon />,
    path: "/",
  },
  {
    type: "Main",
    name: "User Profile",
    icon: <UserCircleIcon />,
    path: "/my-profile",
  },

  /* Inventory */
  {
    type: "Inventory",
    name: "Products",
    path: "/products",
    icon: <ListIcon />,
  },
  {
    type: "Inventory",
    name: "Brand",
    path: "/brand",
    icon: <ListIcon />,
  },
  {
    type: "Inventory",
    name: "Category",
    path: "/categories",
    icon: <ListIcon />,
  },
  {
    type: "Inventory",
    name: "Sub Category",
    path: "/sub-categories",
    icon: <ListIcon />,
  },
  {
    type: "Inventory",
    name: "Items",
    path: "/items",
    icon: <ListIcon />,
  },
  {
    type: "Inventory",
    name: "Units",
    path: "/units",
    icon: <ListIcon />,
  },
  {
    type: "Inventory",
    name: "Variants",
    path: "/varients",
    icon: <ListIcon />,
  },
  {
    type: "Inventory",
    name: "Warranties",
    path: "/warrenty",
    icon: <ListIcon />,
  },
  {
    type: "Inventory",
    name: "Print QR Code",
    icon: <ListIcon />,
    subItems: [
      { name: "Print Barcode", path: "/print-barcode" },
      { name: "Print QR Code", path: "/print-qrcode" },
    ],
  },

  /* stock */
  {
    type: "Stock",
    name: "Manage Stock",
    path: "/comming-soon",
    icon: <ListIcon />,
  },
  {
    type: "Stock",
    name: "Stock Adjustments",
    path: "/comming-soon",
    icon: <ListIcon />,
  },
  {
    type: "Stock",
    name: "Stock Transfer",
    path: "/comming-soon",
    icon: <ListIcon />,
  },

  /* sales */
  {
    type: "Sales",
    name: "Sales",
    icon: <PieChartIcon />,
    subItems: [
      { name: "Monthly Sales", path: "/comming-soon" },
      { name: "Yearly Sales", path: "/comming-soon" },
    ],
  },
  {
    type: "Sales",
    name: "Transactions",
    icon: <PlugInIcon />,
    path: "/comming-soon",
  },
  {
    type: "Sales",
    name: "Sales Return",
    icon: <PlugInIcon />,
    path: "/comming-soon",
  },
  {
    type: "Sales",
    name: "POS",
    icon: <PieChartIcon />,
    path: "/comming-soon",
  },

  /* Purchase */

  {
    type: "Purchase",
    name: "Purchase",
    icon: <PlugInIcon />,
    path: "/comming-soon",
  },

  /* Finance & Accounts */
  {
    type: "Finance & Accounts",
    name: "Expenses",
    icon: <UserCircleIcon />,
    path: "/comming-soon",
  },
  {
    type: "Finance & Accounts",
    name: "Income",
    icon: <UserCircleIcon />,
    path: "/comming-soon",
  },
  {
    type: "Finance & Accounts",
    name: "Bank Account",
    icon: <UserCircleIcon />,
    path: "/comming-soon",
  },
  {
    type: "Finance & Accounts",
    name: "Balance Sheet",
    icon: <UserCircleIcon />,
    path: "/comming-soon",
  },
  {
    type: "Finance & Accounts",
    name: "Trial Balance",
    icon: <UserCircleIcon />,
    path: "/comming-soon",
  },
  {
    type: "Finance & Accounts",
    name: "Account Statement",
    icon: <UserCircleIcon />,
    path: "/comming-soon",
  },

  /* Reports */
  {
    type: "Reports",
    name: "Sales Report",
    icon: <UserCircleIcon />,
    path: "/comming-soon",
  },
  {
    type: "Reports",
    name: "Purchase Report",
    icon: <UserCircleIcon />,
    path: "/comming-soon",
  },
  {
    type: "Reports",
    name: "Return Report",
    icon: <UserCircleIcon />,
    path: "/comming-soon",
  },
  {
    type: "Reports",
    name: "Invoice Report",
    icon: <UserCircleIcon />,
    path: "/comming-soon",
  },
  {
    type: "Reports",
    name: "Supplier Report",
    icon: <UserCircleIcon />,
    subItems: [
      { name: "Supplier Report", path: "/comming-soon" },
      { name: "Supplier Due Report", path: "/comming-soon" },
    ],
  },
  {
    type: "Reports",
    name: "Customer Report",
    icon: <UserCircleIcon />,
    subItems: [
      { name: "Customer Report", path: "/comming-soon" },
      { name: "Customer Due Report", path: "/comming-soon" },
    ],
  },
  {
    type: "Reports",
    name: "Product Report",
    icon: <UserCircleIcon />,
    subItems: [
      { name: "Product Report", path: "/comming-soon" },
      { name: "Product Expiry Report", path: "/comming-soon" },
      { name: "Product Quantity Report", path: "/comming-soon" },
    ],
  },
  {
    type: "Reports",
    name: "Income Report",
    icon: <UserCircleIcon />,
    path: "/comming-soon",
  },
  {
    type: "Reports",
    name: "Expense Report",
    icon: <UserCircleIcon />,
    path: "/comming-soon",
  },
  {
    type: "Reports",
    name: "Tax Report",
    icon: <UserCircleIcon />,
    path: "/comming-soon",
  },
  {
    type: "Reports",
    name: "Profit & Loss",
    icon: <UserCircleIcon />,
    path: "/comming-soon",
  },
  {
    type: "Reports",
    name: "Annual Report",
    icon: <UserCircleIcon />,
    path: "/comming-soon",
  },

  /* User Management */
  {
    type: "User Management",
    name: "Users",
    icon: <UserCircleIcon />,
    path: "/comming-soon",
  },
  {
    type: "User Management",
    name: "Employees",
    icon: <UserCircleIcon />,
    path: "/comming-soon",
  },
  {
    type: "User Management",
    name: "Roll & Permission",
    icon: <UserCircleIcon />,
    path: "/comming-soon",
  },

  /* Settings */
  {
    type: "Settings",
    name: "Settings",
    icon: <UserCircleIcon />,
    path: "/comming-soon",
  },
];
