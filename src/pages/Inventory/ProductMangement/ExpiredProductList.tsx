import React, { useMemo, useState } from "react";
import ReusableTable from "@/components/ui/table/ReusableTable";
import SummaryCard from "@/components/ui/card/SummaryCard";
import DefaultCard from "@/components/ui/card/DefaultCard";
import { ColumnsType } from "antd/es/table";
import { Tag } from "antd";
import noImage from "/noimage.png";
import { AnyObject } from "antd/es/_util/type";
import { useDebounced } from "@/redux/hooks";
import { useGetAllProductQuery } from "@/redux/features/admin/Inventory/productApi";
import FilterCard from "@/components/ui/card/FilterCard";
import ReusableForm from "@/components/form/ReusableForm";
import SelectField from "@/components/form/SelectField";

// filter types
interface FilterState {
  category?: string;
  brand?: string;
  units?: string;
  status?: string;
}

const ExpiredProductList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({ page: 1, pageSize: 25 });
  const debouncedTerm = useDebounced({ searchQuery: searchTerm, delay: 500 });
  const [filterActive, setFilterActive] = useState(false);
  const [filters, setFilters] = useState<FilterState>({});
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  // Handle filter change
  const handleFilter = (key: keyof FilterState, value: string | undefined) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Query parameters
  const query = useMemo(
    () => ({
      page: pagination.page,
      limit: pagination.pageSize,
      ...(debouncedTerm && { searchTerm: debouncedTerm }),
      ...filters,
    }),
    [pagination, debouncedTerm, filters]
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
        filterBtnClick={() => setFilterActive((prev) => !prev)}
      />

      <DefaultCard>
        <FilterCard
          visible={filterActive}
          content={
            <ReusableForm
              layout="vertical"
              content={
                <div className="flex md:flex-row flex-col justify-between items-end gap-3 w-full">
                  <SelectField
                    name="category"
                    label="Category"
                    options={[
                      { value: "All", label: "All" },
                      { value: "a", label: "A" },
                      { value: "b", label: "B" },
                    ]}
                    value={filters.category || undefined}
                    onChange={(value) => handleFilter("category", value)}
                  />
                  <SelectField
                    name="brand"
                    label="Brand"
                    options={[
                      { value: "All", label: "All" },
                      { value: "c", label: "C" },
                      { value: "d", label: "D" },
                    ]}
                    value={filters.brand || undefined}
                    onChange={(value) => handleFilter("brand", value)}
                  />
                  <SelectField
                    name="units"
                    label="Unit"
                    options={[
                      { value: "All", label: "All" },
                      { value: "kg", label: "Kilogram" },
                      { value: "pc", label: "Piece" },
                    ]}
                    value={filters.units || undefined}
                    onChange={(value) => handleFilter("units", value)}
                  />
                  <SelectField
                    name="status"
                    label="Status"
                    options={[
                      { value: "All", label: "All" },
                      { value: "1", label: "Active" },
                      { value: "0", label: "Inactive" },
                    ]}
                    value={filters.status || undefined}
                    onChange={(value) => handleFilter("status", value)}
                  />
                  {/* <ReusableButton
                    icon="reset"
                    label="Reset"
                    onClick={() => {
                      setFilters({}); 
                    }}
                  /> */}
                </div>
              }
            />
          }
        />
        <ReusableTable
          columns={columns}
          data={products?.data || []}
          loading={isLoading}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          pagination={pagination}
          setPagination={(pagination) =>
            setPagination((prev) => ({
              ...prev,
              ...pagination,
            }))
          }
          selectedRowKeys={selectedRowKeys}
          setSelectedRowKeys={setSelectedRowKeys}
        />
      </DefaultCard>
    </>
  );
};

export default ExpiredProductList;
