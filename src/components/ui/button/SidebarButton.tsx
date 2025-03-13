import { ReactNode } from "react";

interface ReusableButtonProps {
  label?: string;
  type?: "primary" | "danger";
  icon?: ReactNode;
  onClick?: () => void;
}

const SidebarButton: React.FC<ReusableButtonProps> = ({
  label,
  icon,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center md:p-5 p-3 w-full text-left border hover:bg-blue-500 active:bg-blue-500 hover:text-white gap-2 group dark:text-white"
    >
      <span className="text-3xl text-blue-500 group-hover:text-white">
        {icon}
      </span>

      <span className="text-sm text-center font-semibold">{label}</span>
    </button>
  );
};

export default SidebarButton;
