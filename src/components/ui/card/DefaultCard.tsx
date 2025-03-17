import React from "react";

const DefaultCard = ({ children }: { children: React.ReactNode }) => {
  return <div className=" p-3 h-full">{children}</div>;
};

export default DefaultCard;
