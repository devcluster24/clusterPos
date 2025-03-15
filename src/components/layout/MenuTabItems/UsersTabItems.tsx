import ActionButton from "@/components/ui/button/NavMenuButton";
import NavMenuCard from "@/components/ui/card/NavMenuCard";
import SummaryCard from "@/components/ui/card/SummaryCard";
import { ChartBar, List, Plus } from "lucide-react";
import { stats } from "./InventoryTabItems";

const UserItems = [
  {
    category: "MANAGE USER",
    buttons: [
      {
        label: "Add User",
        icon: Plus,
        link: "/add-user",
      },
      {
        label: "User List",
        icon: List,
        link: "/user-list",
      },
    ],
  },
  {
    category: "MANAGE ROLE",
    buttons: [
      {
        label: "Add Role",
        icon: Plus,
        link: "/add-role",
      },
      {
        label: "Role List",
        icon: List,
        link: "/role-list",
      },
    ],
  },
  {
    category: "LOG REPORT",
    buttons: [
      {
        label: "User Activities Log",
        icon: ChartBar,
        link: "/user-activity-log",
      },
    ],
  },
];

const UsersTabItems = () => {
  return (
    <>
      <SummaryCard stats={stats} />

      <div className="grid grid-cols-1 gap-4 p-3">
        {UserItems.map((menu) => (
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

export default UsersTabItems;
