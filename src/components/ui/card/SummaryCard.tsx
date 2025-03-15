import React from "react";

const SummaryCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex lg:justify-between justify-end bg-gray-200 overflow-hidden box-border border-b">
      {children}
    </div>
  );
};

export default SummaryCard;
