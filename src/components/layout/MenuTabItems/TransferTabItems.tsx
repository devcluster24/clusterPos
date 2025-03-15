import ActionButton from "@/components/ui/button/NavMenuButton";
import NavMenuCard from "@/components/ui/card/NavMenuCard";
import { List, Plus } from "lucide-react";

const StockManagement = [
  {
    category: "TRANSFER STOCK",
    buttons: [
      {
        label: "Add Transfer Stock",
        icon: Plus,
        link: "/add-transfer-stock",
      },
      {
        label: "Transfer Stock List",
        icon: List,
        link: "/transfer-stock-list",
      },
    ],
  },
  {
    category: "RECEIVE TRANSFERRED STOCK",
    buttons: [
      {
        label: "Receive From Warehouse",
        icon: Plus,
        link: "/receive-from-warehouse",
      },
      {
        label: "Receive From Business",
        icon: List,
        link: "/receive-from-business",
      },
    ],
  },
];

const TransferTabItems = () => {
  return (
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
  );
};

export default TransferTabItems;
