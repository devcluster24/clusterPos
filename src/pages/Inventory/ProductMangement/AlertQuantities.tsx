import React from "react";
import ReusableTable from "@/components/ui/table/ReusableTable";
import SummaryCard from "@/components/ui/card/SummaryCard";
import DefaultCard from "@/components/ui/card/DefaultCard";

export const columns = [
  { title: "Image", dataIndex: "image", key: "image" },
  { title: "Product", dataIndex: "product", key: "product" },
  {
    title: "Business Access",
    dataIndex: "businessAccess",
    key: "businessAccess",
  },
  { title: "Unit Cost (Inc. Tax)", dataIndex: "unitCost", key: "unitCost" },
  {
    title: "Unit Price (Inc. Tax)",
    dataIndex: "unitPrice",
    key: "unitPrice",
  },
  { title: "Curr. Stock", dataIndex: "stock", key: "stock" },
  { title: "Type", dataIndex: "type", key: "type" },
  { title: "Category", dataIndex: "category", key: "category" },
  { title: "Brand", dataIndex: "brand", key: "brand" },
  { title: "Status", dataIndex: "status", key: "status" },
];

export const data = [
  {
    key: "1",
    image: "📷",
    product: "Product 2",
    businessAccess: "Training 01",
    unitCost: "100.00",
    unitPrice: "110.00",
    stock: "0.00/Pieces",
    type: "Single",
    category: "Category A",
    brand: "Korean",
    status: "Active",
  },
  {
    key: "2",
    image: "📷",
    product: "Ink",
    businessAccess: "Training 01",
    unitCost: "50.00",
    unitPrice: "0.00",
    stock: "49.50/Kilogram",
    type: "Single",
    category: "...",
    brand: "...",
    status: "Active",
  },
  {
    key: "3",
    image: "📷",
    product: "Pager",
    businessAccess: "Training 01",
    unitCost: "5.00",
    unitPrice: "0.00",
    stock: "0.00/Pieces",
    type: "Single",
    category: "...",
    brand: "...",
    status: "Active",
  },
];

const AlertQuantities: React.FC = () => {
  return (
    <>
      <SummaryCard pageTitle="Alert Quantities" backBtnActive={true} />

      <DefaultCard>
        <ReusableTable columns={columns} data={data} />
      </DefaultCard>
    </>
  );
};

export default AlertQuantities;
