/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo, useState } from "react";
import ReusableTable from "@/components/ui/table/ReusableTable";
import SummaryCard from "@/components/ui/card/SummaryCard";
import DefaultCard from "@/components/ui/card/DefaultCard";
import { ColumnsType } from "antd/es/table";
import { Form, Tag } from "antd";
import SelectField from "@/components/form/SelectField";
import { AnyObject } from "antd/es/_util/type";
import { useDebounced } from "@/redux/hooks";
import {
  useDeleteProductMutation,
  useGetAllProductQuery,
} from "@/redux/features/admin/Inventory/productApi";
import { useNavigate } from "react-router-dom";
import FilterCard from "@/components/ui/card/FilterCard";
import ReusableForm from "@/components/form/ReusableForm";
import noImage from "/noimage.png";
import { useGetAllStatusQuery } from "@/redux/features/admin/Inventory/statusApi";
import { TBrand, TCategory, TStatus, TUnit } from "@/types";
import useDeleteConfirmation from "@/hooks/useDeleteConfirmation";
import ActionButtons from "@/components/ui/button/ActionButton";
import { useGetAllCategoryQuery } from "@/redux/features/admin/Inventory/categoryApi";
import { useGetAllBrandQuery } from "@/redux/features/admin/Inventory/brandApi";
import { useGetAllUnitsQuery } from "@/redux/features/admin/Inventory/unitsApi";
import ReusableModal from "@/components/ui/modal/ReusableModal";

// filter types
interface FilterState {
  categoryId?: string;
  code?: string;
  statusId?: string;
}

const ProductList: React.FC = () => {
  const [form] = Form.useForm();
  const [filterActive, setFilterActive] = useState(false);
  const [filters, setFilters] = useState<FilterState>({});
  const [modalActive, setModalActive] = useState(false);
  const [selectedData, setSelectedData] = useState<AnyObject | null>(null);
  const { handleDelete } = useDeleteConfirmation();
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 25,
    sortOrder: "desc",
    sortBy: "createdAt",
  });
  const debouncedTerm = useDebounced({ searchQuery: searchTerm, delay: 600 });
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  // Query
  const query = useMemo(
    () => ({
      page: pagination.page,
      limit: pagination.pageSize,
      sortBy: pagination.sortBy,
      sortOrder: pagination.sortOrder,
      ...(debouncedTerm && { searchTerm: debouncedTerm }),
      ...filters,
    }),
    [pagination, debouncedTerm, filters]
  );

  const navigate = useNavigate();
  // Mutation
  const [deleteProduct] = useDeleteProductMutation();

  const { data: products, isLoading } = useGetAllProductQuery(query, {
    refetchOnMountOrArgChange: true,
  });

  const { data: statues } = useGetAllStatusQuery({});
  const { data: categories } = useGetAllCategoryQuery({});
  const { data: brands } = useGetAllBrandQuery({});
  const { data: units } = useGetAllUnitsQuery({});

  // Handle Submit for add or edit
  // const handleSubmit = async (values: any) => {
  //   try {
  //     let result;
  //     let photo = selectedData?.photo || null;
  //     if (isEdit) {
  //       if (fileList.length > 0) {
  //         const url = await imageUploadCloudinary(fileList[0].originFileObj);
  //         photo = url;
  //       }
  //       delete values.file;
  //       values.photo = photo;

  //       result = await editCategory({
  //         id: selectedData?.id,
  //         data: values,
  //       }).unwrap();
  //       if (result?.success) {
  //         Swal.fire({
  //           title: "Updated!",
  //           text: result?.message || "Category has been updated.",
  //           icon: "success",
  //           timer: 2000,
  //           showConfirmButton: true,
  //         });
  //         handleReset();
  //       } else {
  //         Swal.fire({
  //           title: "Failed!",
  //           text: result?.message || "Failed to update Category.",
  //           icon: "error",
  //           timer: 2000,
  //           showConfirmButton: true,
  //         });
  //       }
  //     } else {
  //       if (fileList.length > 0) {
  //         const url = await imageUploadCloudinary(fileList[0].originFileObj);
  //         photo = url;
  //       }
  //       delete values.file;
  //       values.photo = photo;

  //       result = await addCategory(values).unwrap();
  //       if (result?.success) {
  //         Swal.fire({
  //           title: "Added!",
  //           text: result?.message || "Category has been added.",
  //           icon: "success",
  //           timer: 2000,
  //           showConfirmButton: true,
  //         });
  //         handleReset();
  //       } else {
  //         Swal.fire({
  //           title: "Failed!",
  //           text: result?.message || "Failed to added Category.",
  //           icon: "error",
  //           timer: 2000,
  //           showConfirmButton: true,
  //         });
  //       }
  //     }
  //   } catch (error) {
  //     Swal.fire({
  //       title: "Error!",
  //       text: (error as any)?.message || "Something went wrong.",
  //       icon: "error",
  //       timer: 2000,
  //       showConfirmButton: true,
  //     });
  //     handleReset();
  //   }
  // };

  // Handle filter change
  const handleFilter = (key: keyof FilterState, value: string | undefined) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // handle reset
  const handleReset = () => {
    form.resetFields();
    setFilters({});
    setSearchTerm("");
    setFilterActive(false);
    setModalActive(false);
    setSelectedData(null);
  };

  // Table columns with correct types
  const columns: ColumnsType<AnyObject> = [
    {
      title: "ID",
      dataIndex: "code",
      key: "code",
      width: 70,
    },
    {
      title: "Photo",
      dataIndex: "photo",
      key: "photo",
      width: 60,
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
      title: "Actions",
      key: "actions",
      width: 80,
      align: "center",
      render: (_, record) => (
        <ActionButtons
          onView={() => {
            setSelectedData(record);
            setModalActive(true);
          }}
          onEdit={() => navigate(`/products/edit/${record.id}`)}
          onDelete={() =>
            handleDelete(
              record?.id,
              () => deleteProduct(record?.id),
              "Product?"
            )
          }
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      minWidth: 70,
    },
    {
      title: "Category",
      dataIndex: "categoryId",
      key: "categoryId",
      minWidth: 100,
      render: (categoryId) => {
        const categoryName = categories?.data?.find(
          (item: TCategory) => item.id === categoryId
        )?.name;
        return <span>{categoryName || "---"}</span>;
      },
    },
    {
      title: "Brand",
      dataIndex: "brandId",
      key: "brandId",
      minWidth: 100,
      render: (brandId) => {
        const brandName = brands?.data?.find(
          (item: TBrand) => item.id === brandId
        )?.name;
        return <span>{brandName || "---"}</span>;
      },
    },
    {
      title: "Unit",
      dataIndex: "unitId",
      key: "unitId",
      minWidth: 100,
      render: (unitId) => {
        const unitName = units?.data?.find(
          (item: TUnit) => item.id === unitId
        )?.name;
        return <span>{unitName || "---"}</span>;
      },
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      width: 80,
      render: (quantity) => {
        return <p>{quantity ? quantity : 0}</p>;
      },
    },

    {
      title: "Status",
      dataIndex: "statusId",
      key: "statusId",
      width: 100,
      render: (statusId) => {
        const statusName = statues?.data?.find(
          (item: TStatus) => item.id === statusId
        )?.name;
        if (statusName === "ACTIVE") {
          return <Tag color="#87d068">{statusName}</Tag>;
        } else if (statusName === "INACTIVE") {
          return <Tag color="#f50">{statusName}</Tag>;
        } else {
          return <Tag color="#f50">{statusName}</Tag>;
        }
      },
    },
  ];

  // console.log(selectedRowKeys);
  return (
    <>
      <SummaryCard
        pageTitle="Product"
        backBtnActive={true}
        resetBtnActive={filterActive ? true : false}
        resetBtnClick={() => handleReset()}
        filterBtnActive
        filterBtnClick={() => setFilterActive((prev) => !prev)}
        addBtnActive
        addBtnLabel="Add"
        addBtnClick={() => navigate("/products/create")}
        deleteBtnActive
        deleteBtnLabel="Delete"
      />

      <DefaultCard>
        <FilterCard
          visible={filterActive}
          content={
            <ReusableForm
              form={form}
              layout="vertical"
              content={
                <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 justify-between items-end gap-3 w-full">
                  <SelectField
                    name="categoryId"
                    label="Category"
                    placeholder="Filter by Category"
                    options={[
                      { value: "", label: "ALL" },
                      ...(categories?.data?.map((cat: TCategory) => ({
                        value: cat.id,
                        label: cat.name,
                      })) || []),
                    ]}
                    onChange={(value) => handleFilter("categoryId", value)}
                    showSearch
                  />

                  <SelectField
                    name="statusId"
                    placeholder="Filter by Status"
                    label="Status"
                    options={[
                      { value: "", label: "ALL" },
                      ...(statues?.data?.map((status: TStatus) => ({
                        value: status.id,
                        label: status.name,
                      })) || []),
                    ]}
                    onChange={(value) => handleFilter("statusId", value)}
                  />
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
          sortsBy={[
            { value: "code", label: "ID" },
            { value: "name", label: "Name" },
            { value: "statusId", label: "Status" },
          ]}
          selectedRowKeys={selectedRowKeys}
          setSelectedRowKeys={setSelectedRowKeys}
        />
      </DefaultCard>

      <ReusableModal
        title={`${selectedData?.name}`}
        visible={modalActive}
        onClose={() => handleReset()}
        content={
          <div>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur,
            ratione in saepe accusantium quod optio reiciendis vitae animi autem
            rem. Nam, omnis porro dolor nihil eum tempore tempora neque iusto
            qui optio earum vero consectetur laborum odit inventore magni animi
            quisquam? Enim officiis facilis, sequi neque dolore, minima atque
            laboriosam unde aliquam ratione eveniet voluptatum laborum aliquid
            voluptas! Rem accusamus quisquam pariatur placeat fugit iste
            exercitationem, ad maxime in fuga unde quae tenetur corrupti
            explicabo odit inventore hic, eius non soluta nisi sed iusto nulla
            nostrum officiis. Hic dignissimos nobis molestiae et. Rem,
            explicabo. Nobis voluptates quidem eveniet explicabo amet!
          </div>
        }
      />
    </>
  );
};

export default ProductList;
