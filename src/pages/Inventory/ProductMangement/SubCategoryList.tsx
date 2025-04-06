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
import { AnyObject } from "antd/es/_util/type";
import useDeleteConfirmation from "@/hooks/useDeleteConfirmation";
import { useDebounced } from "@/redux/hooks";
import TextAreaField from "@/components/form/TextAreaField";
import FileInputField from "@/components/form/FileInputField";
import { UploadChangeParam } from "antd/es/upload";
import {
  useCreateSubcategoryMutation,
  useDeleteSubcategoryMutation,
  useGetAllSubcategoryQuery,
  useUpdateSubcategoryMutation,
} from "@/redux/features/admin/Inventory/subCateogryApi";
import imageUploadCloudinary from "@/utils/imageUploadCloudinary";
import { TCategory, TStatus } from "@/types";
import FilterCard from "@/components/ui/card/FilterCard";
import { useGetAllStatusQuery } from "@/redux/features/admin/Inventory/statusApi";
import { useGetAllCategoryQuery } from "@/redux/features/admin/Inventory/categoryApi";

// filter types
interface FilterState {
  code?: string;
  categoryId?: string;
  statusId?: string;
}

const SubCategoryList: React.FC = () => {
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

  // api call
  const { data: subcategories, isLoading } = useGetAllSubcategoryQuery(query, {
    refetchOnMountOrArgChange: true,
  });
  const [addSubategory, { isLoading: addLoading }] =
    useCreateSubcategoryMutation();
  const [editSubcategory, { isLoading: editLoading }] =
    useUpdateSubcategoryMutation();
  const [deleteSubcategory] = useDeleteSubcategoryMutation();

  const { data: categories } = useGetAllCategoryQuery({});
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
    setIsEdit(false);
    setSelectedData(null);
    setFileList([]);
    setModalActive(true);
  };

  // Edit Modal Open
  const openEditModal = (category: AnyObject) => {
    setIsEdit(true);
    setSelectedData(category);
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

        result = await editSubcategory({
          id: selectedData?.id,
          data: values,
        }).unwrap();

        if (result?.success) {
          Swal.fire({
            title: "Updated!",
            text: result?.data?.message || "SubCategory has been updated.",
            icon: "success",
            timer: 2000,
            showConfirmButton: true,
          });
          handleReset();
        } else {
          Swal.fire({
            title: "Failed!",
            text: result?.data?.message || "Failed to update SubCategory.",
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

        result = await addSubategory(values).unwrap();
        if (result?.success) {
          Swal.fire({
            title: "Added!",
            text: result?.data?.message || "SubCategory has been added.",
            icon: "success",
            timer: 2000,
            showConfirmButton: true,
          });
          handleReset();
        } else {
          Swal.fire({
            title: "Failed!",
            text: result?.data?.message || "Failed to add new SubCategory.",
            icon: "error",
            timer: 2000,
            showConfirmButton: true,
          });
        }
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text:
          (error as any)?.response?.data?.message || "Something went wrong.",
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
      title: "ID",
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
      title: "Subcategory Name",
      dataIndex: "name",
      key: "name",
      minWidth: 100,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      minWidth: 100,
      render: (description) =>
        description ? <p>{description}</p> : <p>---</p>,
    },
    {
      title: "Parent Category",
      dataIndex: "category",
      key: "category",
      minWidth: 100,
      render: (category) => {
        if (category?.name) {
          return <p>{category?.name}</p>;
        } else {
          return <p> --- </p>;
        }
      },
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
              () => deleteSubcategory(record?.id),
              "Subcategory?"
            )
          }
        />
      ),
    },
  ];

  return (
    <>
      <SummaryCard
        pageTitle="Subcategories"
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
                    name="categoryId"
                    label="Category"
                    placeholder="Filter by Category"
                    options={categories?.data?.map((cat: TCategory) => ({
                      value: cat.id,
                      label: cat.name,
                    }))}
                    onChange={(value) => handleFilter("categoryId", value)}
                    showSearch
                  />

                  <SelectField
                    name="statusId"
                    placeholder="Filter by Status"
                    label="Status"
                    options={statues?.data?.map((status: TStatus) => ({
                      value: status.id,
                      label: status.value,
                    }))}
                    onChange={(value) => handleFilter("statusId", value)}
                  />
                </div>
              }
            />
          }
        />

        <ReusableTable
          columns={columns}
          data={subcategories?.data || []}
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
            { value: "categoryId", label: "Category" },
            { value: "statusId", label: "Status" },
          ]}
        />
      </DefaultCard>

      <ReusableModal
        key={isEdit ? selectedData?.id : "add-form"}
        title={isEdit ? "Edit Subcategory" : "Add Subcategory"}
        visible={modalActive}
        onClose={() => setModalActive(false)}
        content={
          <ReusableForm
            form={form}
            onSubmit={handleSubmit}
            layout="vertical"
            initialValues={
              isEdit && selectedData
                ? {
                    ...selectedData,
                    statusId: selectedData.status?.id,
                    categoryId: selectedData.category?.id,
                  }
                : {}
            }
            content={
              <div className="flex flex-col gap-3">
                <InputField
                  name="name"
                  label="Subcategory Name"
                  rules={validationRules.required("Subcategory Name")}
                />
                <SelectField
                  name="categoryId"
                  label="Parent Category"
                  options={categories?.data?.map((cat: TCategory) => ({
                    value: cat.id,
                    label: cat.name,
                  }))}
                  rules={validationRules.required("Status")}
                  showSearch
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

export default SubCategoryList;
