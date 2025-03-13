import React from "react";

interface SummaryProps {
  title: string;
  value: string | number;
  highlightColor?: string;
}

const SummaryCard: React.FC<SummaryProps> = ({
  title,
  value,
  highlightColor = "text-black",
}) => {
  return (
    <div className="bg-green-100 border border-gray-300 p-3 rounded-md text-center">
      <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      <p className={`text-lg font-semibold ${highlightColor}`}>{value}</p>
    </div>
  );
};

export default SummaryCard;
