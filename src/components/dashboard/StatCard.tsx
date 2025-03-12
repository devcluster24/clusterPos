import React from "react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  bgColor?: string;
  textColor?: string;
  badge?: {
    value: string;
    color: string;
    icon?: LucideIcon;
  };
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  bgColor,
  textColor = "text-white",
  badge,
}) => {
  return (
    <div className={`p-4 rounded-xl ${bgColor} ${textColor} flex gap-4 w-full`}>
      {/* Icon + Title */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 flex items-center justify-center bg-white/40 rounded-lg">
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Value + Badge */}
      <div className="flex flex-col  items-start">
        <span className="text-md font-medium">{title}</span>
        <h2 className="lg:text-xl text-lg font-bold">{value}</h2>
        {badge && (
          <span
            className={`px-3 py-1 text-sm font-medium rounded-lg flex items-center gap-1 mt-2 ${badge.color}`}
          >
            {badge.icon && <badge.icon className="w-4 h-4" />}
            {badge.value}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatCard;
