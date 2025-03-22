import ActionButton from "@/components/ui/button/NavMenuButton";
import NavMenuCard from "@/components/ui/card/NavMenuCard";
import SummaryCard from "@/components/ui/card/SummaryCard";
import { Plus, List, Terminal, Truck, Percent } from "lucide-react";
import { stats } from "./InventoryTabItems";

const SalesItems = [
  {
    category: "SALES MANAGEMENT",
    buttons: [
      { label: "Add Sale", icon: Plus, link: "/sales/create" },
      { label: "POS", icon: Terminal, link: "/sales/pos/create" },
      { label: "Manage Sales", icon: List, link: "/sales/add-sale" },
      { label: "Draft List", icon: List, link: "/sales/drafts" },
      {
        label: "Sold Product List",
        icon: List,
        link: "/sales/add-sale/products",
      },
      { label: "Shipment List", icon: Truck, link: "/sales/shipments" },
      { label: "Cash Register List", icon: List, link: "/sales/cash-register" },
      { label: "Manage Offers", icon: Percent, link: "/sales/discounts" },
    ],
  },
  {
    category: "SALES RETURN",
    buttons: [
      { label: "Add Sales Return", icon: Plus, link: "/sales/returns/create" },
      { label: "Sales Return List", icon: List, link: "/sales/returns" },
    ],
  },
  {
    category: "SALE REPORTS",
    buttons: [
      { label: "Sales Report", icon: List, link: "/sales/reports/sales" },
      {
        label: "Sold Products Report",
        icon: List,
        link: "/sales/reports/sold-products",
      },
      {
        label: "Sales Return Report",
        icon: List,
        link: "/sales/reports/sales-return",
      },
      {
        label: "Sales Returned Products Report",
        icon: List,
        link: "/sales/reports/sales-returned-products",
      },
      {
        label: "Received Against Sales Report",
        icon: List,
        link: "/sales/reports/received-against-sales-report",
      },
      {
        label: "Cash Register Report",
        icon: List,
        link: "/sales/reports/cash-register-report",
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
