import ActionButton from "@/components/ui/button/NavMenuButton";
import NavMenuCard from "@/components/ui/card/NavMenuCard";
import SummaryCard from "@/components/ui/card/SummaryCard";
import { Plus, List } from "lucide-react";
import { stats } from "./InventoryTabItems";

const OrderItems = [
  {
    category: "QUOTATION MANAGEMENT",
    buttons: [
      {
        label: "Add Quotation",
        icon: Plus,
        link: "/orders/sales/quotations/create",
      },
      {
        label: "Quotation List",
        icon: List,
        link: "/orders/sales/quotations/list",
      },
    ],
  },
  {
    category: "SALES ORDER MANAGEMENT",
    buttons: [
      {
        label: "Add Sales Order",
        icon: Plus,
        link: "/orders/sales/orders/create",
      },
      {
        label: "Sales Order List",
        icon: List,
        link: "/orders/sales/orders/list",
      },
      {
        label: "Sales Order to Invoice",
        icon: Plus,
        link: "/orders/sales/order-to-invoice/create",
      },
    ],
  },
  {
    category: "PURCHASE ORDER MANAGEMENT",
    buttons: [
      {
        label: "Add Purchase Order",
        icon: Plus,
        link: "/orders/purchase/order/create",
      },
      {
        label: "Purchase Order List",
        icon: List,
        link: "/orders/purchase/order/list",
      },
      {
        label: "Purchase Order to Invoice",
        icon: Plus,
        link: "/orders/sales/order-to-invoice/create",
      },
    ],
  },
  {
    category: "ORDER REPORTS",
    buttons: [
      {
        label: "Sales Order Report",
        icon: List,
        link: "/orders/reports/sales-orders",
      },
      {
        label: "Sales Ordered Products Report",
        icon: List,
        link: "/orders/reports/sales-ordered-products",
      },
      {
        label: "Purchase Order Report",
        icon: List,
        link: "/orders/reports/purchase-orders",
      },
      {
        label: "Purchase Ordered Products Report",
        icon: List,
        link: "/orders/reports/purchase-ordered-products",
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
