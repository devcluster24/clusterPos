import React from "react";

const DefaultCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-3 h-full">{children}</div>
  );
};

export default DefaultCard;
