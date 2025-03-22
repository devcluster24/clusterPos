import ActionButton from "@/components/ui/button/NavMenuButton";
import NavMenuCard from "@/components/ui/card/NavMenuCard";
import SummaryCard from "@/components/ui/card/SummaryCard";
import { ListTodo, LayoutGrid, Mail } from "lucide-react";
import { stats } from "./InventoryTabItems";

const TaskManageItems = [
  {
    category: "TASK MANAGEMENT",
    buttons: [
      { label: "Todo", icon: ListTodo, link: "/task-management/todo" },
      {
        label: "Project Management",
        icon: LayoutGrid,
        link: "/task-management/workspaces",
      },
      { label: "Message", icon: Mail, link: "/task-management/messages" },
    ],
  },
];

const TaskManageTabItems = () => {
  return (
    <>
      <SummaryCard stats={stats} />

      <div className="grid grid-cols-1 gap-4 p-3">
        {TaskManageItems.map((menu) => (
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

export default TaskManageTabItems;
