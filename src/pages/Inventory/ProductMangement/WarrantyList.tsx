/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo, useState } from "react";
import ReusableTable from "@/components/ui/table/ReusableTable";
import SummaryCard from "@/components/ui/card/SummaryCard";
import DefaultCard from "@/components/ui/card/DefaultCard";
import { ColumnsType } from "antd/es/table";
import { Form, Tag } from "antd";
import EditDeleteButtons from "@/components/ui/button/EditDeleteButtons";
import ReusableModal from "@/components/ui/modal/ReusableModal";
import ReusableForm from "@/components/form/ReusableForm";
import InputField from "@/components/form/InputField";
import SelectField from "@/components/form/SelectField";
import { validationRules } from "@/components/form/Validation";
import SubmitButton from "@/components/form/SubmitButton";
import Swal from "sweetalert2";
import { AnyObject } from "antd/es/_util/type";
import useDeleteConfirmation from "@/hooks/useDeleteConfirmation";
import { useDebounced } from "@/redux/hooks";
import TextAreaField from "@/components/form/TextAreaField";
import {
  useCreateWarrentyMutation,
  useDeleteWarrentyMutation,
  useGetAllWarrentyQuery,
  useUpdateWarrentyMutation,
} from "@/redux/features/admin/Inventory/warrantyApi";
import { useGetAllStatusQuery } from "@/redux/features/admin/Inventory/statusApi";
import { TStatus } from "@/types";
import FilterCard from "@/components/ui/card/FilterCard";

// filter types
interface FilterState {
  code?: string;
  statusId?: string;
}
const WarrantyList: React.FC = () => {
  const [form] = Form.useForm();
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
    sortOrder: "",
    sortBy: "",
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
  const { data: warranties, isLoading } = useGetAllWarrentyQuery(query, {
    refetchOnMountOrArgChange: true,
  });
  const [addWarranty, { isLoading: addLoading }] = useCreateWarrentyMutation();
  const [editWarranty, { isLoading: editLoading }] =
    useUpdateWarrentyMutation();
  const [deleteWarranty] = useDeleteWarrentyMutation();

  const { data: statues } = useGetAllStatusQuery({});

  // Add Modal Open
  const openAddModal = () => {
    form.resetFields();
    setIsEdit(false);
    setSelectedData(null);
    setModalActive(true);
  };

  // Edit Modal Open
  const openEditModal = (data: AnyObject) => {
    setIsEdit(true);
    setSelectedData(data);
    form.setFieldsValue({
      ...data,
      statusId: data?.Status?.id,
    });
    setModalActive(true);
  };

  // Handle Submit for add or edit
  const handleSubmit = async (values: any) => {
    try {
      let result;
      if (isEdit) {
        result = await editWarranty({
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
        result = await addWarranty(values).unwrap();
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
    setModalActive(false);
    setSelectedData(null);
    setIsEdit(false);
    setPagination({
      page: 1,
      pageSize: 25,
      sortOrder: "",
      sortBy: "",
    });
  };

  // Table Column
  const columns: ColumnsType<AnyObject> = [
    {
      title: "Warranty Name",
      dataIndex: "name",
      key: "name",
      minWidth: 100,
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      minWidth: 100,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      minWidth: 100,
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
              () => deleteWarranty(record?.id),
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
        pageTitle="Warranty"
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
          data={warranties?.data || []}
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
            { value: "name", label: "Name" },
            { value: "statusId", label: "Status" },
          ]}
        />
      </DefaultCard>

      <ReusableModal
        key={isEdit ? selectedData?.id : "add-form"}
        title={isEdit ? "Edit Warranty" : "Add Warranty"}
        visible={modalActive}
        onClose={() => setModalActive(false)}
        content={
          <ReusableForm
            form={form}
            onSubmit={handleSubmit}
            layout="vertical"
            initialValues={isEdit && selectedData ? selectedData : {}}
            content={
              <div className="flex flex-col gap-3">
                <InputField
                  name="name"
                  label="Warranty Name"
                  rules={validationRules.required("Warranty Name")}
                />
                <InputField
                  name="duration"
                  label="Duration"
                  rules={validationRules.required("Duration")}
                />
                <TextAreaField name="description" label="Description" />
                <SelectField
                  name="statusId"
                  label="Status"
                  options={statues?.data?.map((status: TStatus) => ({
                    value: status.id,
                    label: status.name,
                  }))}
                  rules={validationRules.required("Status")}
                  showSearch
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

export default WarrantyList;
