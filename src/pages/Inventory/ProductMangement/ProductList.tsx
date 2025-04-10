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
import { TStatus } from "@/types";
import useDeleteConfirmation from "@/hooks/useDeleteConfirmation";
import ActionButtons from "@/components/ui/button/ActionButton";

// filter types
interface FilterState {
  categoryId?: string;
  code?: string;
  statusId?: string;
}

const ProductList: React.FC = () => {
  const [form] = Form.useForm();
  // const [fileList, setFileList] = useState<any[]>([]);
  // const [modalActive, setModalActive] = useState(false);
  // const [isEdit, setIsEdit] = useState(false);
  const [filterActive, setFilterActive] = useState(false);
  const [filters, setFilters] = useState<FilterState>({});
  // const [selectedData, setSelectedData] = useState<AnyObject | null>(null);
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

  // Handle file selection
  // const handleUpload = (info: UploadChangeParam<UploadFile>) => {
  //   setFileList(info.fileList);
  // };
  // // Handle remove file selection
  // const handleRemove = (file: UploadFile) => {
  //   setFileList((prev) => prev.filter((item) => item.uid !== file.uid));
  //   return true;
  // };

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
  // const handleReset = () => {
  //   setFilters({});
  //   form.resetFields();
  //   setSearchTerm("");
  //   setFilterActive(false);
  //   setFileList([]);
  //   setModalActive(false);
  //   setSelectedData(null);
  //   setIsEdit(false);
  //   setPagination({
  //     page: 1,
  //     pageSize: 25,
  //     sortOrder: "desc",
  //     sortBy: "createdAt",
  //   });
  // };

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
      render: (Category) => {
        if (Category?.name) {
          return <p>{Category?.name}</p>;
        } else {
          return <p> --- </p>;
        }
      },
    },
    {
      title: "Brand",
      dataIndex: "brandId",
      key: "brandId",
      minWidth: 100,
      render: (Category) => {
        if (Category?.name) {
          return <p>{Category?.name}</p>;
        } else {
          return <p> --- </p>;
        }
      },
    },
    {
      title: "Unit",
      dataIndex: "unitId",
      key: "unitId",
      minWidth: 100,
      render: (Category) => {
        if (Category?.name) {
          return <p>{Category?.name}</p>;
        } else {
          return <p> --- </p>;
        }
      },
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      minWidth: 100,
      render: (Category) => {
        if (Category?.name) {
          return <p>{Category?.name}</p>;
        } else {
          return <p> --- </p>;
        }
      },
    },

    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
      width: 100,
      render: (Status) => {
        if (Status?.name === "ACTIVE") {
          return <Tag color="#87d068">{Status?.name}</Tag>;
        } else if (Status?.name === "INACTIVE") {
          return <Tag color="#f50">{Status?.name}</Tag>;
        } else {
          return <Tag color="#f50">{Status?.name}</Tag>;
        }
      },
    },
  ];

  console.log(selectedRowKeys);
  return (
    <>
      <SummaryCard
        pageTitle="Product"
        backBtnActive={true}
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
                <div className="flex md:flex-row flex-col justify-between items-end gap-3 w-full">
                  <SelectField
                    name="statusId"
                    placeholder="Filter by Status"
                    label="Status"
                    options={[
                      { value: "", label: "ALL" },
                      ...(statues?.data?.map((status: TStatus) => ({
                        value: status.id,
                        label: status.value,
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
    </>
  );
};

export default ProductList;
