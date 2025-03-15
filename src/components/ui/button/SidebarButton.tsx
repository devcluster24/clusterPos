import { useSidebar } from "@/context/SidebarContext";
import { ReactNode } from "react";

interface SidebarButtonProps {
  id: string;
  label: string;
  icon: ReactNode;
  activeTab: string;
  onClick: () => void;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({
  id,
  label,
  icon,
  activeTab,
  onClick,
}) => {
  const isActive = activeTab === id;
  const { toggleMobileSidebar } = useSidebar();

  return (
    <button
      onClick={() => {
        onClick();
        toggleMobileSidebar();
      }}
      className={`flex flex-col items-center justify-center md:p-5 p-3 w-full text-left border gap-2 group dark:text-white cursor-pointer
        ${
          isActive
            ? "bg-blue-500 text-white"
            : "hover:bg-blue-200 hover:text-blue-900"
        }`}
    >
      <span
        className={`text-3xl ${
          isActive ? "text-white" : "text-blue-500"
        } group-hover:text-blue-900`}
      >
        {icon}
      </span>
      <span className="text-sm text-center font-semibold">{label}</span>
    </button>
  );
};

export default SidebarButton;
