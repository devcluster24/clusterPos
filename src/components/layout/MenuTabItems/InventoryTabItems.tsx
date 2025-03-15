import CrossButton from "@/components/ui/button/CrossButton";
import ActionButton from "@/components/ui/button/NavMenuButton";
import NavMenuCard from "@/components/ui/card/NavMenuCard";
import StatusCard from "@/components/ui/card/StatusCard";
import SummaryCard from "@/components/ui/card/SummaryCard";
import { StatusCardProps } from "@/types";
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
      { label: "Add Product", icon: Plus, link: "/add-product" },
      { label: "Product List", icon: List, link: "/product-list" },
      { label: "Import Products", icon: Upload, link: "/import-products" },
      { label: "Expired Product List", icon: List, link: "/expired-products" },
      {
        label: "Alert Quantities",
        icon: AlertCircle,
        link: "/alert-quantities",
      },
      { label: "Categories", icon: Grid, link: "/categories" },
      { label: "Brands", icon: Badge, link: "/brands" },
      { label: "Units", icon: BaggageClaim, link: "/units" },
      { label: "Bulk Variants", icon: Boxes, link: "/bulk-variants" },
      { label: "Warranties", icon: Shield, link: "/warranties" },
      {
        label: "Selling Price Groups",
        icon: Layers,
        link: "/selling-price-groups",
      },
      { label: "Generate Barcode", icon: Barcode, link: "/generate-barcode" },
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

const stats: StatusCardProps[] = [
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
      <SummaryCard>
        <div className="lg:flex hidden">
          {stats.map((stat, index) => (
            <StatusCard key={index} {...stat} />
          ))}
        </div>

        <CrossButton onClose={() => console.log("close")} />
      </SummaryCard>

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
