import React from "react";
import ActionButton from "@/components/ui/button/NavMenuButton";
import NavMenuCard from "@/components/ui/card/NavMenuCard";
import { Plus, List } from "lucide-react";

const InventoryItems = [
  {
    category: "PURCHASE MANAGEMENT",
    buttons: [
      { label: "Add Purchase", icon: Plus, link: "/add-purchase" },
      { label: "Purchase List", icon: List, link: "/purchase-list" },
      {
        label: "Purchased Product List",
        icon: List,
        link: "/purchased-product-list",
      },
    ],
  },
  {
    category: "PURCHASE RETURN MANAGEMENT",
    buttons: [
      {
        label: "Add Purchase Return",
        icon: Plus,
        link: "/add-purchase-return",
      },
      {
        label: "Purchase Return List",
        icon: List,
        link: "/purchase-return-list",
      },
    ],
  },
  {
    category: "PURCHASE REPORTS",
    buttons: [
      { label: "Purchase Report", icon: List, link: "/purchase-report" },
      {
        label: "Purchased Products Report",
        icon: List,
        link: "/purchased-products-report",
      },
      {
        label: "Purchase Return Report",
        icon: List,
        link: "/purchase-return-report",
      },
      {
        label: "Purchase Returned Products Report",
        icon: List,
        link: "/purchase-returned-products-report",
      },
      {
        label: "Payments Against Purchase Report",
        icon: List,
        link: "/payments-against-purchase-report",
      },
      { label: "Sales Vs Purchase", icon: List, link: "/sales-vs-purchase" },
    ],
  },
];

const OrderMenuItems = () => {
  return (
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
  );
};

export default OrderMenuItems;
