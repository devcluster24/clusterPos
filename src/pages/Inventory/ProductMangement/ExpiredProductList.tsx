/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo, useState } from "react";
import ReusableTable from "@/components/ui/table/ReusableTable";
import SummaryCard from "@/components/ui/card/SummaryCard";
import DefaultCard from "@/components/ui/card/DefaultCard";
import { ColumnsType } from "antd/es/table";
import { Tag } from "antd";
import noImage from "/noimage.png";
import { AnyObject } from "antd/es/_util/type";
import { useDebounced } from "@/redux/hooks";
import { useGetAllProductQuery } from "@/redux/features/admin/productApi";

const ExpiredProductList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({ page: 1, pageSize: 25 });
  const debouncedTerm = useDebounced({ searchQuery: searchTerm, delay: 500 });

  // Query
  const query = useMemo(
    () => ({
      page: pagination.page,
      limit: pagination.pageSize,
      ...(debouncedTerm && { searchTerm: debouncedTerm }),
    }),
    [pagination, debouncedTerm]
  );

  // api call
  const { data: products, isLoading } = useGetAllProductQuery(query, {
    refetchOnMountOrArgChange: true,
  });

  // Table Column
  const columns: ColumnsType<AnyObject> = [
    {
      title: "Product ID",
      dataIndex: "code",
      key: "code",
      width: 100,
    },
    {
      title: "Photo",
      dataIndex: "photo",
      key: "photo",
      width: 100,
      render: (_, record) => (
        <img
          src={record.photo ? record.photo : noImage}
          alt={record?.name}
          width={40}
          height={30}
        />
      ),
    },
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (status) =>
        status === "1" ? (
          <Tag color="#87d068">Active</Tag>
        ) : (
          <Tag color="#f50">Inactive</Tag>
        ),
    },
  ];

  return (
    <>
      <SummaryCard
        pageTitle="Expired Products"
        backBtnActive={true}
        filterBtnActive
        filterBtnLabel="Filter Options"
        // filterBtnClick={openAddModal}
      />

      <DefaultCard>
        <ReusableTable
          columns={columns}
          data={products?.data || []}
          loading={isLoading}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          pagination={pagination}
          setPagination={setPagination}
        />
      </DefaultCard>
    </>
  );
};

export default ExpiredProductList;
