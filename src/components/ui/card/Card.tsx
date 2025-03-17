import React from "react";

const Card = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`${
        className ? className : "p-3 h-full"
      } border rounded border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white   `}
    >
      {children}
    </div>
  );
};

export default Card;
