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
    path: "/products",
    icon: <ListIcon />,
  },
  {
    type: "Inventory",
    name: "Category",
    path: "/products",
    icon: <ListIcon />,
  },
  {
    type: "Inventory",
    name: "Sub Category",
    path: "/products",
    icon: <ListIcon />,
  },
  {
    type: "Inventory",
    name: "Items",
    path: "/products",
    icon: <ListIcon />,
  },
  {
    type: "Inventory",
    name: "Units",
    path: "/products",
    icon: <ListIcon />,
  },
  {
    type: "Inventory",
    name: "Variants",
    path: "/products",
    icon: <ListIcon />,
  },
  {
    type: "Inventory",
    name: "Warranties",
    path: "/products",
    icon: <ListIcon />,
  },
  {
    type: "Inventory",
    name: "Print QR Code",
    icon: <ListIcon />,
    subItems: [
      { name: "Print Barcode", path: "/barcode" },
      { name: "Print QR Code", path: "/qrcode" },
    ],
  },

  /* stock */
  {
    type: "Stock",
    name: "Manage Stock",
    path: "/products",
    icon: <ListIcon />,
  },
  {
    type: "Stock",
    name: "Stock Adjustments",
    path: "/products",
    icon: <ListIcon />,
  },
  {
    type: "Stock",
    name: "Stock Transfer",
    path: "/products",
    icon: <ListIcon />,
  },

  /* sales */
  {
    type: "Sales",
    name: "Sales",
    icon: <PieChartIcon />,
    subItems: [
      { name: "Monthly Sales", path: "/monthly-sales" },
      { name: "Yearly Sales", path: "/yearly-sales" },
    ],
  },
  {
    type: "Sales",
    name: "Transactions",
    icon: <PlugInIcon />,
    path: "/pending-transactions",
  },
  {
    type: "Sales",
    name: "Sales Return",
    icon: <PlugInIcon />,
    path: "/pending-transactions",
  },
  {
    type: "Sales",
    name: "POS",
    icon: <PieChartIcon />,
    path: "/pos",
  },

  /* Purchase */

  {
    type: "Purchase",
    name: "Purchase",
    icon: <PlugInIcon />,
    path: "/pending-transactions",
  },

  /* Finance & Accounts */
  {
    type: "Finance & Accounts",
    name: "Expenses",
    icon: <UserCircleIcon />,
    path: "/profiles",
  },
  {
    type: "Finance & Accounts",
    name: "Income",
    icon: <UserCircleIcon />,
    path: "/profiles",
  },
  {
    type: "Finance & Accounts",
    name: "Bank Account",
    icon: <UserCircleIcon />,
    path: "/profiles",
  },
  {
    type: "Finance & Accounts",
    name: "Balance Sheet",
    icon: <UserCircleIcon />,
    path: "/profiles",
  },
  {
    type: "Finance & Accounts",
    name: "Trial Balance",
    icon: <UserCircleIcon />,
    path: "/profiles",
  },
  {
    type: "Finance & Accounts",
    name: "Account Statement",
    icon: <UserCircleIcon />,
    path: "/profiles",
  },

  /* Reports */
  {
    type: "Reports",
    name: "Sales Report",
    icon: <UserCircleIcon />,
    path: "/profiles",
  },
  {
    type: "Reports",
    name: "Purchase Report",
    icon: <UserCircleIcon />,
    path: "/profiles",
  },
  {
    type: "Reports",
    name: "Return Report",
    icon: <UserCircleIcon />,
    path: "/profiles",
  },
  {
    type: "Reports",
    name: "Invoice Report",
    icon: <UserCircleIcon />,
    path: "/profiles",
  },
  {
    type: "Reports",
    name: "Supplier Report",
    icon: <UserCircleIcon />,
    subItems: [
      { name: "Supplier Report", path: "/monthly-sales" },
      { name: "Supplier Due Report", path: "/yearly-sales" },
    ],
  },
  {
    type: "Reports",
    name: "Customer Report",
    icon: <UserCircleIcon />,
    subItems: [
      { name: "Customer Report", path: "/monthly-sales" },
      { name: "Customer Due Report", path: "/yearly-sales" },
    ],
  },
  {
    type: "Reports",
    name: "Product Report",
    icon: <UserCircleIcon />,
    subItems: [
      { name: "Product Report", path: "/monthly-sales" },
      { name: "Product Expiry Report", path: "/yearly-sales" },
      { name: "Product Quantity Report", path: "/yearly-sales" },
    ],
  },
  {
    type: "Reports",
    name: "Income Report",
    icon: <UserCircleIcon />,
    path: "/profiles",
  },
  {
    type: "Reports",
    name: "Expense Report",
    icon: <UserCircleIcon />,
    path: "/profiles",
  },
  {
    type: "Reports",
    name: "Tax Report",
    icon: <UserCircleIcon />,
    path: "/profiles",
  },
  {
    type: "Reports",
    name: "Profit & Loss",
    icon: <UserCircleIcon />,
    path: "/profiles",
  },
  {
    type: "Reports",
    name: "Annual Report",
    icon: <UserCircleIcon />,
    path: "/profiles",
  },

  /* User Management */
  {
    type: "User Management",
    name: "Users",
    icon: <UserCircleIcon />,
    path: "/profiles",
  },
  {
    type: "User Management",
    name: "Employees",
    icon: <UserCircleIcon />,
    path: "/profiles",
  },
  {
    type: "User Management",
    name: "Roll & Permission",
    icon: <UserCircleIcon />,
    path: "/profiles",
  },

  /* Settings */
  {
    type: "Settings",
    name: "Settings",
    icon: <UserCircleIcon />,
    path: "/profiles",
  },
];
