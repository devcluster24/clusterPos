import React from "react";

interface StatusCardProps {
  title: string;
  count: number;
  color: string;
}

const StatusCard: React.FC<StatusCardProps> = ({ title, count, color }) => {
  return (
    <div
      className={`px-3 text-start flex flex-col justify-center border-r ${color}`}
    >
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="text-sm font-bold">{count}</p>
    </div>
  );
};

export default StatusCard;
