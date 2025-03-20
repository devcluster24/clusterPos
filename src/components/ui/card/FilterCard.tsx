interface FilterCardProps {
  visible: boolean;
  content: React.ReactNode;
}

const FilterCard = ({ visible, content }: FilterCardProps) => {
  return (
    <div
      className={`${
        visible
          ? "block w-full p-3 border rounded border-gray-300 dark:border-gray-700 mb-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow transition-all duration-500"
          : "hidden"
      }`}
    >
      {content}
    </div>
  );
};

export default FilterCard;
