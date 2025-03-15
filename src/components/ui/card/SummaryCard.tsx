import BackButton from "../button/BackButton";
import CrossButton from "../button/CrossButton";
import StatusCard from "./StatusCard";

export interface Status {
  title: string;
  count: number;
  color: string;
}

interface SummaryCardProps {
  stats?: Status[];
  backBtnActive?: boolean;
  pageTitle?: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  stats,
  backBtnActive,
  pageTitle,
}) => {
  return (
    <div
      className={`flex border-b ${
        backBtnActive
          ? "justify-between bg-white  shadow-md"
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

      <div>{backBtnActive ? <BackButton /> : <CrossButton />}</div>
    </div>
  );
};

export default SummaryCard;
