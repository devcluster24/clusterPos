import SummaryCard from "@/components/ui/card/SummaryCard";
import CommingSoon from "@/pages/CommingSoon";

const QRCode = () => {
  return (
    <>
      <SummaryCard pageTitle="Generate QR Code" backBtnActive={true} />

      <CommingSoon />
    </>
  );
};

export default QRCode;
