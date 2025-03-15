import ActionButton from "@/components/ui/button/NavMenuButton";
import NavMenuCard from "@/components/ui/card/NavMenuCard";
import SummaryCard from "@/components/ui/card/SummaryCard";
import {
  Settings,
  Warehouse,
  CreditCard,
  FileText,
  BadgeDollarSign,
  Store,
  PlusCircle,
} from "lucide-react";
import { stats } from "./InventoryTabItems";

const SetupItems = [
  {
    category: "SET-UP",
    buttons: [
      { label: "General Settings", icon: Settings, link: "/general-settings" },
      { label: "Warehouses", icon: Warehouse, link: "/warehouses" },
      { label: "Payment Methods", icon: CreditCard, link: "/payment-methods" },
      { label: "Invoice Layouts", icon: FileText, link: "/invoice-layouts" },
      { label: "Currencies", icon: BadgeDollarSign, link: "/currencies" },
      { label: "Cash Counters", icon: Store, link: "/cash-counters" },
      { label: "Billing", icon: PlusCircle, link: "/billing" },
      {
        label: "Barcode Settings Design Pages",
        icon: PlusCircle,
        link: "/barcode-settings",
      },
      {
        label: "Version Release Notes",
        icon: PlusCircle,
        link: "/version-release-notes",
      },
    ],
  },
];
const SetUpTabItems = () => {
  return (
    <>
      <SummaryCard stats={stats} />

      <div className="grid grid-cols-1 gap-4 p-3">
        {SetupItems.map((menu) => (
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

export default SetUpTabItems;
