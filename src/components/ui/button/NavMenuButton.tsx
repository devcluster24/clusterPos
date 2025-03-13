import React from "react";
import { LucideIcon } from "lucide-react";

interface NavMenuButtonProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
}

const NavMenuButton: React.FC<NavMenuButtonProps> = ({
  icon: Icon,
  label,
  onClick,
}) => {
  return (
    <button
      className="flex items-center border border-gray-300  rounded text-gray-700 hover:bg-blue-100 transition group lg:min-w-56 md:min-w-[48%] sm:min-w-[48%]  xs:min-w-full hover:border-blue-300 hover:cursor-pointer"
      onClick={onClick}
    >
      <span className="w-10 h-10 flex justify-center items-center border-r group-hover:bg-blue-500 ">
        <Icon className="text-purple-700 group-hover:text-white" size={20} />
      </span>
      <span className="text-sm font-medium px-4">{label}</span>
    </button>
  );
};

export default NavMenuButton;
