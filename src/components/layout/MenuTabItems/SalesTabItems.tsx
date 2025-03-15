import ActionButton from "@/components/ui/button/NavMenuButton";
import NavMenuCard from "@/components/ui/card/NavMenuCard";
import SummaryCard from "@/components/ui/card/SummaryCard";
import { Plus, List, Terminal, Truck, Percent } from "lucide-react";
import { stats } from "./InventoryTabItems";

const SalesItems = [
  {
    category: "SALES MANAGEMENT",
    buttons: [
      { label: "Add Sale", icon: Plus, link: "/add-sale" },
      { label: "POS", icon: Terminal, link: "/pos" },
      { label: "Manage Sales", icon: List, link: "/manage-sales" },
      { label: "Draft List", icon: List, link: "/draft-list" },
      { label: "Sold Product List", icon: List, link: "/sold-product-list" },
      { label: "Shipment List", icon: Truck, link: "/shipment-list" },
      { label: "Cash Register List", icon: List, link: "/cash-register-list" },
      { label: "Manage Offers", icon: Percent, link: "/manage-offers" },
    ],
  },
  {
    category: "SALES RETURN",
    buttons: [
      { label: "Add Sales Return", icon: Plus, link: "/add-sales-return" },
      { label: "Sales Return List", icon: List, link: "/sales-return-list" },
    ],
  },
  {
    category: "SALE REPORTS",
    buttons: [
      { label: "Sales Report", icon: List, link: "/sales-report" },
      {
        label: "Sold Products Report",
        icon: List,
        link: "/sold-products-report",
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
        label: "Received Against Sales Report",
        icon: List,
        link: "/received-against-sales-report",
      },
      {
        label: "Cash Register Report",
        icon: List,
        link: "/cash-register-report",
      },
    ],
  },
];

const SalesTabItems = () => {
  return (
    <>
      <SummaryCard stats={stats} />

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
    </>
  );
};

export default SalesTabItems;
