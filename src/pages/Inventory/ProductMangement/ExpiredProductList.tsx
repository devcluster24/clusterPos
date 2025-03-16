import DefaultCard from "@/components/ui/card/DefaultCard";
import SummaryCard from "@/components/ui/card/SummaryCard";
import ReusableTable from "@/components/ui/table/ReusableTable";
import { columns, data } from "./ProductList";

const ExpiredProductList = () => {
  return (
    <>
      <SummaryCard pageTitle="Expired Products" backBtnActive={true} />

      <DefaultCard>
        <ReusableTable columns={columns} data={data} />
      </DefaultCard>
    </>
  );
};

export default ExpiredProductList;
