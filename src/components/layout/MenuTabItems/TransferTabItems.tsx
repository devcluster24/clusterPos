import ActionButton from "@/components/ui/button/NavMenuButton";
import NavMenuCard from "@/components/ui/card/NavMenuCard";
import SummaryCard from "@/components/ui/card/SummaryCard";
import { List, Plus } from "lucide-react";
import { stats } from "./InventoryTabItems";

const StockManagement = [
  {
    category: "TRANSFER STOCK",
    buttons: [
      {
        label: "Add Transfer Stock",
        icon: Plus,
        link: "/transfer-stocks/create",
      },
      {
        label: "Transfer Stock List",
        icon: List,
        link: "/transfer-stocks/list",
      },
    ],
  },
  {
    category: "RECEIVE TRANSFERRED STOCK",
    buttons: [
      {
        label: "Receive From Warehouse",
        icon: Plus,
        link: "/transfer-stocks/receive-transferred-stocks/from-warehouse",
      },
      {
        label: "Receive From Business",
        icon: List,
        link: "/transfer-stocks/receive-transferred-stocks/from-branch",
      },
    ],
  },
];

const TransferTabItems = () => {
  return (
    <>
      {" "}
      <SummaryCard stats={stats} />
      <div className="grid grid-cols-1 gap-4 p-3">
        {StockManagement.map((menu) => (
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

export default TransferTabItems;
