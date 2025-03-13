import React from "react";
import ActionButton from "@/components/ui/button/NavMenuButton";
import NavMenuCard from "@/components/ui/card/NavMenuCard";
import { Plus, List } from "lucide-react";

const SalesItems = [
  {
    category: "SALES MANAGEMENT",
    buttons: [
      { label: "Add Sale", icon: Plus, link: "/add-sale" },
      { label: "Sales List", icon: List, link: "/sales-list" },
      {
        label: "Sales Product List",
        icon: List,
        link: "/salesd-product-list",
      },
    ],
  },
  {
    category: "SALES RETURN",
    buttons: [
      {
        label: "Add Sales Return",
        icon: Plus,
        link: "/add-sales-return",
      },
      {
        label: "Sales Return List",
        icon: List,
        link: "/Sales-return-list",
      },
    ],
  },
  {
    category: "SALES REPORTS",
    buttons: [
      { label: "Sales Report", icon: List, link: "/sales-report" },
      {
        label: "Sales Products Report",
        icon: List,
        link: "/salesd-products-report",
      },
      {
        label: "Sales Return Report",
        icon: List,
        link: "/sales-return-report",
      },
      {
        label: "Sales Returned Products Report",
        icon: List,
        link: "/sales-returned-products-report",
      },
      {
        label: "Payments Against sales Report",
        icon: List,
        link: "/payments-against-sales-report",
      },
      { label: "Sales Vs sales", icon: List, link: "/sales-vs-sales" },
    ],
  },
];

const SalesTabItems = () => {
  return (
    <div className="grid grid-cols-1 gap-4 p-3">
      {SalesItems.map((menu) => (
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

export default SalesTabItems;
