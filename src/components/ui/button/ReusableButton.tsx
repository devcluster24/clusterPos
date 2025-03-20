import {
  LucideIcon,
  X,
  ArrowLeft,
  Plus,
  Trash,
  Filter,
  List,
  RotateCcw,
} from "lucide-react";
import clsx from "clsx";

interface ReusableButtonProps {
  label?: string;
  type?: "primary" | "danger";
  icon?: string;
  onClick?: () => void;
  className?: string;
}

const iconMap: Record<string, LucideIcon> = {
  back: ArrowLeft,
  add: Plus,
  delete: Trash,
  filter: Filter,
  close: X,
  reset: RotateCcw,
  undo: ArrowLeft,
  redo: ArrowLeft,
  save: Plus,
  view: List,
};

const ReusableButton: React.FC<ReusableButtonProps> = ({
  label,
  type = "primary",
  icon,
  onClick,
  className,
}) => {
  const IconComponent = icon ? iconMap[icon] : null;

  return (
    <button
      onClick={onClick}
      className={`${
        className
          ? className
          : clsx(
              "flex flex-col justify-center items-center gap-[2px] px-4  h-12 text-white font-semibold text-sm cursor-pointer border border-gray-300",
              type === "primary"
                ? "bg-blue-500 hover:bg-blue-700"
                : "bg-red-500 hover:bg-red-700"
            )
      }`}
    >
      {IconComponent && <IconComponent size={16} />}
      {label}
    </button>
  );
};

export default ReusableButton;
