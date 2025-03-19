import SummaryCard from "@/components/ui/card/SummaryCard";
import CommingSoon from "@/pages/CommingSoon";

const StockIssuedList = () => {
  return (
    <>
      <SummaryCard pageTitle="Stock Issued List" backBtnActive={true} />

      <CommingSoon />
    </>
  );
};

export default StockIssuedList;
