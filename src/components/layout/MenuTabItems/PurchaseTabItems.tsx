import ActionButton from "@/components/ui/button/NavMenuButton";
import NavMenuCard from "@/components/ui/card/NavMenuCard";
import { Plus, List } from "lucide-react";
import SummaryCard from "@/components/ui/card/SummaryCard";
import { stats } from "./InventoryTabItems";

const InventoryItems = [
  {
    category: "PURCHASE MANAGEMENT",
    buttons: [
      { label: "Add Purchase", icon: Plus, link: "/purchase/create" },
      { label: "Purchase List", icon: List, link: "/purchase/list" },
      {
        label: "Purchased Product List",
        icon: List,
        link: "/purchase/products",
      },
    ],
  },
  {
    category: "PURCHASE RETURN MANAGEMENT",
    buttons: [
      {
        label: "Add Purchase Return",
        icon: Plus,
        link: "/purchase/return/create",
      },
      {
        label: "Purchase Return List",
        icon: List,
        link: "/purchase/return/list",
      },
    ],
  },
  {
    category: "PURCHASE REPORTS",
    buttons: [
      {
        label: "Purchase Report",
        icon: List,
        link: "/purchase/reports/purchases",
      },
      {
        label: "Purchased Products Report",
        icon: List,
        link: "/purchase/reports/purchased-product",
      },
      {
        label: "Purchase Return Report",
        icon: List,
        link: "/purchase/reports/purchase-return",
      },
      {
        label: "Purchase Returned Products Report",
        icon: List,
        link: "/purchase/reports/purchase-return-products",
      },
      {
        label: "Payments Against Purchase Report",
        icon: List,
        link: "/purchases/reports/payments-against-purchase",
      },
      {
        label: "Sales Vs Purchase",
        icon: List,
        link: "/purchases/reports/sales/purchase",
      },
    ],
  },
];

const PurchaseTabItems = () => {
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

export default PurchaseTabItems;
