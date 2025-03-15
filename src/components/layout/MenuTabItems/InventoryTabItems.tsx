import ActionButton from "@/components/ui/button/NavMenuButton";
import NavMenuCard from "@/components/ui/card/NavMenuCard";
import SummaryCard, { Status } from "@/components/ui/card/SummaryCard";
import {
  Plus,
  List,
  Upload,
  AlertCircle,
  Grid,
  Badge,
  BaggageClaim,
  Boxes,
  Shield,
  Layers,
  Barcode,
  Users,
} from "lucide-react";

const InventoryItems = [
  {
    category: "PRODUCT MANAGEMENT",
    buttons: [
      { label: "Add Product", icon: Plus, link: "/products/create" },
      { label: "Product List", icon: List, link: "/products/list" },
      { label: "Import Products", icon: Upload, link: "/comming-soon" },
      { label: "Expired Product List", icon: List, link: "/comming-soon" },
      {
        label: "Alert Quantities",
        icon: AlertCircle,
        link: "/comming-soon",
      },
      { label: "Categories", icon: Grid, link: "/comming-soon" },
      { label: "Brands", icon: Badge, link: "/comming-soon" },
      { label: "Units", icon: BaggageClaim, link: "/comming-soon" },
      { label: "Bulk Variants", icon: Boxes, link: "/comming-soon" },
      { label: "Warranties", icon: Shield, link: "/comming-soon" },
      {
        label: "Selling Price Groups",
        icon: Layers,
        link: "/comming-soon",
      },
      { label: "Generate Barcode", icon: Barcode, link: "/comming-soon" },
    ],
  },
  {
    category: "MANAGE STOCK ISSUES",
    buttons: [
      { label: "Add Stock Issue", icon: Plus, link: "/add-stock-issue" },
      { label: "Stock Issue List", icon: List, link: "/stock-issue-list" },
      {
        label: "Stock Issued Product List",
        icon: List,
        link: "/stock-issued-product-list",
      },
    ],
  },
  {
    category: "PRODUCT REPORTS",
    buttons: [
      { label: "Stock Report", icon: Users, link: "/stock-report" },
      {
        label: "Stock Out Products Report",
        icon: Users,
        link: "/stock-out-products-report",
      },
      { label: "Stock In-Out Report", icon: Layers, link: "/stock-in-out" },
    ],
  },
];

export const stats: Status[] = [
  {
    title: "Total In-Progress Todo",
    count: 0,
    color: "bg-yellow-100 text-yellow-700",
  },
  { title: "Total On-Hold Todo", count: 0, color: "bg-red-100 text-red-700" },
  {
    title: "Total Completed Todo",
    count: 0,
    color: "bg-green-100 text-green-700",
  },
  {
    title: "Total In-Progress Project",
    count: 0,
    color: "bg-yellow-100 text-yellow-700",
  },
];

const InventoryTabItems = () => {
  return (
    <>
      <SummaryCard stats={stats} />

      <div className="grid grid-cols-1 gap-4 p-3">
        {InventoryItems.map((menu) => (
          <NavMenuCard key={menu.category} title={menu.category}>
            {menu.buttons.map(({ label, icon, link }) => (
              <ActionButton
                key={label}
                label={label}
                icon={icon}
                onClick={() => (window.location.href = link)}
              />
            ))}
          </NavMenuCard>
        ))}
      </div>
    </>
  );
};

export default InventoryTabItems;
