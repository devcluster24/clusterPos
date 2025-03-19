import SummaryCard from "@/components/ui/card/SummaryCard";
import CommingSoon from "@/pages/CommingSoon";

const AddStockIssue = () => {
  return (
    <>
      <SummaryCard pageTitle="Add Stock Issue" backBtnActive={true} />

      <CommingSoon />
    </>
  );
};

export default AddStockIssue;
