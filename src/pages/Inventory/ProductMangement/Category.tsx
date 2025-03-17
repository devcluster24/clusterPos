import React from "react";
import ReusableTable from "@/components/ui/table/ReusableTable";
import SummaryCard from "@/components/ui/card/SummaryCard";
import DefaultCard from "@/components/ui/card/DefaultCard";
import { FaEdit, FaTrash } from "react-icons/fa";

export const columns = [
  { title: "Category ID", dataIndex: "code", id: "code" },
  { title: "Name", dataIndex: "name", id: "name" },
  {
    title: "Photo",
    dataIndex: "photo",
    id: "photo",
  },
  { title: "Description", dataIndex: "description", id: "description" },
  {
    title: "Action",
    id: "action",
    dataIndex: "action",
    render: () => (
      <div className="flex md:gap-3 gap-2 justify-center ">
        <button className="text-blue-400 hover:text-blue-700 bg-white cursor-pointer">
          <FaEdit className="size-5" />
        </button>
        <button className="text-red-400 hover:text-red-700  cursor-pointer">
          <FaTrash className="size-5" />
        </button>
      </div>
    ),
  },
];

export const data = [
  {
    id: "1",
    code: "C-002",
    photo: "/path-to-placeholder.png",
    name: "Category A",
    description: "lorem ipsum dolor sit amet, consectetur adip id in  20  ",
    status: "1",
  },
  {
    id: "2",
    code: "C-003",
    photo: "/path-to-placeholder.png",
    name: "Category b",
    description: "lorem ",
    status: "1",
  },
  {
    id: "3",
    code: "C-001",
    photo: "/path-to-placeholder.png",
    name: "hfg",
    description: "",
    status: "1",
  },
];

const CategoriesList: React.FC = () => {
  return (
    <>
      <SummaryCard pageTitle="Categories" backBtnActive={true} />
      <DefaultCard>
        <ReusableTable columns={columns} data={data} />
      </DefaultCard>
    </>
  );
};

export default CategoriesList;
