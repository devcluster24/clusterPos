/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo, useState } from "react";
import ReusableTable from "@/components/ui/table/ReusableTable";
import SummaryCard from "@/components/ui/card/SummaryCard";
import DefaultCard from "@/components/ui/card/DefaultCard";
import { ColumnsType } from "antd/es/table";
import { Tag, UploadFile } from "antd";
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
import { IStatus } from "@/types";
import FilterCard from "@/components/ui/card/FilterCard";

// filter types
interface FilterState {
  code?: string;
  statusId?: string;
}

const CategoriesList: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [modalActive, setModalActive] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [filterActive, setFilterActive] = useState(false);
  const [filters, setFilters] = useState<FilterState>({});
  const [selectedData, setSelectedData] = useState<{ id: number } | null>(null);
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
  const { data: statues } = useGetAllStatusQuery({});

  const [addCategory, { isLoading: addLoading }] = useCreateCategoryMutation();
  const [editCategory, { isLoading: editLoading }] =
    useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

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
  const openEditModal = (category: any) => {
    setIsEdit(true);
    setSelectedData(category);
    setFileList(
      category.photo
        ? [{ uid: "-1", url: category.photo, name: "Existing Photo" }]
        : []
    );
    setModalActive(true);
  };

  // Handle Submit for add or edit
  const handleSubmit = async (values: any) => {
    try {
      let result;
      if (isEdit) {
        result = await editCategory({
          id: selectedData?.id,
          ...values,
        }).unwrap();
        Swal.fire(
          "Updated!",
          result?.data?.message || "Category has been updated.",
          "success"
        );
      } else {
        result = await addCategory(values).unwrap();
        Swal.fire(
          "Added!",
          result?.data?.message || "Category has been added.",
          "success"
        );
      }

      if (result?.success) {
        setModalActive(false);
      }
    } catch (error) {
      Swal.fire(
        "Error!",
        (error as any)?.response?.data?.message || "Something went wrong.",
        "error"
      );
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
        if (status === "ACTIVE") {
          return <Tag color="#87d068">{status}</Tag>;
        } else if (status === "INACTIVE") {
          return <Tag color="#f50">{status}</Tag>;
        } else {
          return <Tag color="#f50">{status}</Tag>;
        }
      },
    },
    {
      title: "Actions",
      key: "actions",
      width: 120,
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
              layout="vertical"
              content={
                <div className="grid md:grid-cols-4 grid-cols-1 justify-between items-end gap-3">
                  <InputField
                    name="code"
                    label="Code"
                    onChange={(e) => handleFilter("code", e.target.value)}
                    placeholder="Search by code"
                  />

                  <SelectField
                    name="statusId"
                    placeholder="Select Status"
                    label="Status"
                    options={statues?.data?.map((status: IStatus) => ({
                      value: status.id,
                      label: status.value,
                    }))}
                    onChange={(value) => handleFilter("statusId", value)}
                    showSearch
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
            { value: "statusId", label: "Status" },
            { value: "name", label: "Name" },
          ]}
        />
      </DefaultCard>

      <ReusableModal
        title={isEdit ? "Edit Category" : "Add Category"}
        visible={modalActive}
        onClose={() => setModalActive(false)}
        content={
          <ReusableForm
            onSubmit={handleSubmit}
            layout="vertical"
            initialValues={isEdit && selectedData ? selectedData : {}}
            content={
              <div className="flex flex-col gap-3">
                <InputField
                  name="name"
                  label="Category Name"
                  rules={
                    isEdit
                      ? [{ required: false }]
                      : [validationRules.required("Category Name")]
                  }
                />
                <TextAreaField name="description" label="Description" />
                <SelectField
                  name="statusId"
                  label="Status"
                  options={statues?.data?.map((status: IStatus) => ({
                    value: status.id,
                    label: status.value,
                  }))}
                  rules={
                    isEdit
                      ? [{ required: false }]
                      : validationRules.required("Status")
                  }
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
                  <SubmitButton loading={addLoading || editLoading} />
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
