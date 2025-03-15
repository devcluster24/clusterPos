import ActionButton from "@/components/ui/button/NavMenuButton";
import NavMenuCard from "@/components/ui/card/NavMenuCard";
import { ListTodo, LayoutGrid, Mail } from "lucide-react";

const TaskManageItems = [
  {
    category: "TASK MANAGEMENT",
    buttons: [
      { label: "Todo", icon: ListTodo, link: "/todo" },
      {
        label: "Project Management",
        icon: LayoutGrid,
        link: "/project-management",
      },
      { label: "Message", icon: Mail, link: "/message" },
    ],
  },
];

const TaskManageTabItems = () => {
  return (
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
  );
};

export default TaskManageTabItems;
