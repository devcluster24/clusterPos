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
    path: "/profile",
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
    name: "Units",
    path: "/products",
    icon: <ListIcon />,
  },
  {
    type: "Stock",
    name: "Variants",
    path: "/products",
    icon: <ListIcon />,
  },
  {
    type: "Stock",
    name: "Warranties",
    path: "/products",
    icon: <ListIcon />,
  },

  /* sales */
  {
    type: "Sales",
    name: "Reports",
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
    subItems: [
      { name: "Pending Transactions", path: "/pending-transactions" },
      { name: "Completed Transactions", path: "/completed-transactions" },
    ],
  },

  /* Reports */
  {
    type: "Report",
    name: "User Profiles",
    icon: <UserCircleIcon />,
    path: "/profiles",
  },
];
