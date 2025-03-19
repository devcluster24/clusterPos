import SummaryCard from "@/components/ui/card/SummaryCard";
import CommingSoon from "@/pages/CommingSoon";

const StockIssues = () => {
  return (
    <>
      <SummaryCard pageTitle="Stock Issues" backBtnActive={true} />

      <CommingSoon />
    </>
  );
};

export default StockIssues;
