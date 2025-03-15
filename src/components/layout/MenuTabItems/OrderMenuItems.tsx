import ActionButton from "@/components/ui/button/NavMenuButton";
import NavMenuCard from "@/components/ui/card/NavMenuCard";
import SummaryCard from "@/components/ui/card/SummaryCard";
import { Plus, List } from "lucide-react";
import { stats } from "./InventoryTabItems";

const OrderItems = [
  {
    category: "QUOTATION MANAGEMENT",
    buttons: [
      { label: "Add Quotation", icon: Plus, link: "/add-quotation" },
      { label: "Quotation List", icon: List, link: "/quotation-list" },
    ],
  },
  {
    category: "SALES ORDER MANAGEMENT",
    buttons: [
      { label: "Add Sales Order", icon: Plus, link: "/add-sales-order" },
      { label: "Sales Order List", icon: List, link: "/sales-order-list" },
      {
        label: "Sales Order to Invoice",
        icon: Plus,
        link: "/sales-order-to-invoice",
      },
    ],
  },
  {
    category: "PURCHASE ORDER MANAGEMENT",
    buttons: [
      { label: "Add Purchase Order", icon: Plus, link: "/add-purchase-order" },
      {
        label: "Purchase Order List",
        icon: List,
        link: "/purchase-order-list",
      },
      {
        label: "Purchase Order to Invoice",
        icon: Plus,
        link: "/purchase-order-to-invoice",
      },
    ],
  },
  {
    category: "ORDER REPORTS",
    buttons: [
      { label: "Sales Order Report", icon: List, link: "/sales-order-report" },
      {
        label: "Sales Ordered Products Report",
        icon: List,
        link: "/sales-ordered-products-report",
      },
      {
        label: "Purchase Order Report",
        icon: List,
        link: "/purchase-order-report",
      },
      {
        label: "Purchase Ordered Products Report",
        icon: List,
        link: "/purchase-ordered-products-report",
      },
    ],
  },
];

const OrderMenuItems = () => {
  return (
    <>
      <SummaryCard stats={stats} />

      <div className="grid grid-cols-1 gap-4 p-3">
        {OrderItems.map((menu) => (
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

export default OrderMenuItems;
