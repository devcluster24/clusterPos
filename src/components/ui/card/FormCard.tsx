import React from "react";

const FormCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="border rounded border-gray-300 p-4 mb-3 bg-white dark:bg-gray-900 shadow grid md:grid-cols-2 grid-cols-1 gap-2">
      {children}
    </div>
  );
};

export default FormCard;
