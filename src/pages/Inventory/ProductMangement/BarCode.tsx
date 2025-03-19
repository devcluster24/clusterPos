import SummaryCard from "@/components/ui/card/SummaryCard";
import CommingSoon from "@/pages/CommingSoon";

const BarCode = () => {
  return (
    <>
      <SummaryCard pageTitle="Generate Bar Code" backBtnActive={true} />

      <CommingSoon />
    </>
  );
};

export default BarCode;
