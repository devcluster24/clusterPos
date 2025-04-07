/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo, useState } from "react";
import ReusableTable from "@/components/ui/table/ReusableTable";
import SummaryCard from "@/components/ui/card/SummaryCard";
import DefaultCard from "@/components/ui/card/DefaultCard";
import { ColumnsType } from "antd/es/table";
import { Form, Tag, UploadFile } from "antd";
import EditDeleteButtons from "@/components/ui/button/EditDeleteButtons";
import ReusableModal from "@/components/ui/modal/ReusableModal";
import ReusableForm from "@/components/form/ReusableForm";
import InputField from "@/components/form/InputField";
import SelectField from "@/components/form/SelectField";
import { validationRules } from "@/components/form/Validation";
import SubmitButton from "@/components/form/SubmitButton";
import Swal from "sweetalert2";
import noImage from "/noimage.png";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoryQuery,
  useUpdateCategoryMutation,
} from "@/redux/features/admin/Inventory/categoryApi";
import { AnyObject } from "antd/es/_util/type";
import useDeleteConfirmation from "@/hooks/useDeleteConfirmation";
import { useDebounced } from "@/redux/hooks";
import TextAreaField from "@/components/form/TextAreaField";
import FileInputField from "@/components/form/FileInputField";
import { UploadChangeParam } from "antd/es/upload";
import { useGetAllStatusQuery } from "@/redux/features/admin/Inventory/statusApi";
import { TStatus } from "@/types";
import FilterCard from "@/components/ui/card/FilterCard";
import imageUploadCloudinary from "@/utils/imageUploadCloudinary";

// filter types
interface FilterState {
  code?: string;
  statusId?: string;
}

const CategoriesList: React.FC = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);
  const [modalActive, setModalActive] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [filterActive, setFilterActive] = useState(false);
  const [filters, setFilters] = useState<FilterState>({});
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

  // Mutation
  const { data: categories, isLoading } = useGetAllCategoryQuery(query, {
    refetchOnMountOrArgChange: true,
  });
  const [addCategory, { isLoading: addLoading }] = useCreateCategoryMutation();
  const [editCategory, { isLoading: editLoading }] =
    useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const { data: statues } = useGetAllStatusQuery({});

  // Handle file selection
  const handleUpload = (info: UploadChangeParam<UploadFile>) => {
    setFileList(info.fileList);
  };
  // Handle remove file selection
  const handleRemove = (file: UploadFile) => {
    setFileList((prev) => prev.filter((item) => item.uid !== file.uid));
    return true;
  };

  // Add Modal Open
  const openAddModal = () => {
    form.resetFields();
    setIsEdit(false);
    setSelectedData(null);
    setFileList([]);
    setModalActive(true);
  };

  // Edit Modal Open
  const openEditModal = (data: AnyObject) => {
    setIsEdit(true);
    setSelectedData(data);
    form.setFieldsValue({
      ...data,
      statusId: data?.status?.id,
    });
    setFileList([]);
    setModalActive(true);
  };

  // Handle Submit for add or edit
  const handleSubmit = async (values: any) => {
    try {
      let result;
      let photo = selectedData?.photo || null;
      if (isEdit) {
        if (fileList.length > 0) {
          const url = await imageUploadCloudinary(fileList[0].originFileObj);
          photo = url;
        }
        delete values.file;
        values.photo = photo;

        result = await editCategory({
          id: selectedData?.id,
          data: values,
        }).unwrap();
        if (result?.success) {
          Swal.fire({
            title: "Updated!",
            text: result?.message || "Category has been updated.",
            icon: "success",
            timer: 2000,
            showConfirmButton: true,
          });
          handleReset();
        } else {
          Swal.fire({
            title: "Failed!",
            text: result?.message || "Failed to update Category.",
            icon: "error",
            timer: 2000,
            showConfirmButton: true,
          });
        }
      } else {
        if (fileList.length > 0) {
          const url = await imageUploadCloudinary(fileList[0].originFileObj);
          photo = url;
        }
        delete values.file;
        values.photo = photo;

        result = await addCategory(values).unwrap();
        if (result?.success) {
          Swal.fire({
            title: "Added!",
            text: result?.message || "Category has been added.",
            icon: "success",
            timer: 2000,
            showConfirmButton: true,
          });
          handleReset();
        } else {
          Swal.fire({
            title: "Failed!",
            text: result?.message || "Failed to added Category.",
            icon: "error",
            timer: 2000,
            showConfirmButton: true,
          });
        }
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: (error as any)?.message || "Something went wrong.",
        icon: "error",
        timer: 2000,
        showConfirmButton: true,
      });
      handleReset();
    }
  };

  // Handle filter change
  const handleFilter = (key: keyof FilterState, value: string | undefined) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // handle reset
  const handleReset = () => {
    setFilters({});
    form.resetFields();
    setSearchTerm("");
    setFilterActive(false);
    setFileList([]);
    setModalActive(false);
    setSelectedData(null);
    setIsEdit(false);
    setPagination({
      page: 1,
      pageSize: 25,
      sortOrder: "desc",
      sortBy: "createdAt",
    });
  };

  // Table Column
  const columns: ColumnsType<AnyObject> = [
    {
      title: "Category ID",
      dataIndex: "code",
      key: "code",
      width: 100,
    },
    {
      title: "Photo",
      dataIndex: "photo",
      key: "photo",
      width: 60,
      render: (_, record) => (
        <img
          src={record.photo ? record.photo : noImage}
          alt={record?.name || "image"}
          width={40}
          height={20}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (description) =>
        description ? <p>{description}</p> : <p>-----</p>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (status) => {
        if (status?.value === "ACTIVE") {
          return <Tag color="#87d068">{status?.value}</Tag>;
        } else if (status?.value === "INACTIVE") {
          return <Tag color="#f50">{status?.value}</Tag>;
        } else {
          return <Tag color="#f50">{status?.value}</Tag>;
        }
      },
    },
    {
      title: "Actions",
      key: "actions",
      width: 100,
      fixed: "right",
      align: "center",
      render: (_, record) => (
        <EditDeleteButtons
          onEdit={() => openEditModal(record)}
          onDelete={() =>
            handleDelete(
              record?.id,
              () => deleteCategory(record?.id),
              "Category?"
            )
          }
        />
      ),
    },
  ];

  return (
    <>
      <SummaryCard
        pageTitle="Categories"
        backBtnActive={true}
        resetBtnActive={true}
        resetBtnClick={() => handleReset()}
        filterBtnActive
        filterBtnClick={() => setFilterActive((prev) => !prev)}
        addBtnActive
        addBtnLabel="Add"
        addBtnClick={openAddModal}
      />

      <DefaultCard>
        <FilterCard
          visible={filterActive}
          content={
            <ReusableForm
              form={form}
              layout="vertical"
              content={
                <div className="grid md:grid-cols-4 grid-cols-1 justify-between items-end gap-3">
                  <InputField
                    name="code"
                    label="Code"
                    onChange={(e) => handleFilter("code", e.target.value)}
                    placeholder="Filter by ID"
                  />

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
          data={categories?.data || []}
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
        />
      </DefaultCard>

      <ReusableModal
        key={isEdit ? selectedData?.id : "add-form"}
        title={isEdit ? "Edit Category" : "Add Category"}
        visible={modalActive}
        onClose={() => handleReset()}
        content={
          <ReusableForm
            form={form}
            onSubmit={handleSubmit}
            layout="vertical"
            content={
              <div className="flex flex-col gap-3">
                <InputField
                  name="name"
                  label="Category Name"
                  rules={[validationRules.required("Category Name")]}
                />
                <TextAreaField name="description" label="Description" />
                <SelectField
                  name="statusId"
                  label="Status"
                  options={statues?.data?.map((status: TStatus) => ({
                    value: status.id,
                    label: status.value,
                  }))}
                  rules={validationRules.required("Status")}
                  showSearch
                />
                <FileInputField
                  label="Photo"
                  allowedExtensions={["jpg", "png", "pdf"]}
                  fileSize="250px * 250px"
                  name="file"
                  fileList={fileList}
                  handleUpload={handleUpload}
                  handleRemove={handleRemove}
                />
                <div className="flex justify-end">
                  <SubmitButton
                    loading={addLoading || editLoading}
                    selectedRecord={selectedData}
                  />
                </div>
              </div>
            }
          />
        }
      />
    </>
  );
};

export default CategoriesList;
