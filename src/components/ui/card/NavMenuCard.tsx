import React from "react";

const NavMenuCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="p-4 border rounded-md">
      <h2 className="text-sm font-bold mb-3">{title}</h2>
      <div className="md:flex md:flex-wrap grid grid-cols-1 gap-4 w-full">
        {children}
      </div>
    </div>
  );
};

export default NavMenuCard;
