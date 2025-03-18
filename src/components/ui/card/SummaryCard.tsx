import BackButton from "../button/BackButton";
import CrossButton from "../button/CrossButton";
import ReusableButton from "../button/ReusableButton";
import StatusCard from "./StatusCard";

export interface Status {
  title: string;
  count: number;
  color: string;
}

interface SummaryCardProps {
  stats?: Status[];
  backBtnActive?: boolean;
  addBtnActive?: boolean;
  addBtnLabel?: string;
  addBtnClick?: () => void;
  filterBtnActive?: boolean;
  filterBtnLabel?: string;
  filterBtnClick?: () => void;
  deleteBtnActive?: boolean;
  deleteBtnLabel?: string;
  deleteBtnClick?: () => void;
  pageTitle?: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  stats,
  pageTitle,
  backBtnActive,
  addBtnActive,
  addBtnLabel,
  addBtnClick,
  filterBtnActive,
  filterBtnLabel,
  filterBtnClick,
  deleteBtnActive,
  deleteBtnLabel,
  deleteBtnClick,
}) => {
  return (
    <div
      className={`flex border-b ${
        backBtnActive
          ? "justify-between bg-white dark:bg-gray-900  shadow-md"
          : "lg:justify-between justify-end bg-gray-200"
      }  `}
    >
      {stats && (
        <div className="lg:flex hidden">
          {stats?.map((stat, index) => (
            <StatusCard key={index} {...stat} />
          ))}
        </div>
      )}
      {pageTitle && (
        <h2 className="flex justify-start items-center px-2 text-lg font-semibold text-gray-800 dark:text-white/90">
          {pageTitle}
        </h2>
      )}

      <div className="flex gap-2">
        <div className="flex">
          {filterBtnActive && (
            <ReusableButton
              label={filterBtnLabel || "Filter"}
              type="primary"
              icon="filter"
              onClick={() => (filterBtnClick ? filterBtnClick() : null)}
            />
          )}
          {addBtnActive && (
            <ReusableButton
              label={addBtnLabel || "Add"}
              type="primary"
              icon="add"
              onClick={() => (addBtnClick ? addBtnClick() : null)}
            />
          )}
          {deleteBtnActive && (
            <ReusableButton
              label={deleteBtnLabel || "Delete"}
              type="danger"
              icon="delete"
              onClick={() => (deleteBtnClick ? deleteBtnClick() : null)}
            />
          )}
        </div>
        {backBtnActive ? <BackButton /> : <CrossButton />}
      </div>
    </div>
  );
};

export default SummaryCard;
