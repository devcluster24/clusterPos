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
import {
  useCreateUnitsMutation,
  useDeleteUnitsMutation,
  useGetAllUnitsQuery,
  useUpdateUnitsMutation,
} from "@/redux/features/admin/Inventory/unitsApi";
import { useGetAllStatusQuery } from "@/redux/features/admin/Inventory/statusApi";
import { TStatus, TUnit } from "@/types";
import FilterCard from "@/components/ui/card/FilterCard";
import { useGetAllUnitTypeQuery } from "@/redux/features/admin/Inventory/unitTypeApi";
import NumberField from "@/components/form/NumberField";

// filter types
interface FilterState {
  code?: string;
  statusId?: string;
  hasMultiplier?: boolean | string;
}

const UnitList: React.FC = () => {
  const [form] = Form.useForm();
  const [modalActive, setModalActive] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [filterActive, setFilterActive] = useState(false);
  const [filters, setFilters] = useState<FilterState>({});
  const [selectedData, setSelectedData] = useState<AnyObject | null>(null);
  const [isMultiplier, setMultiplier] = useState<boolean>(false);
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
  const { data: unitsList, isLoading } = useGetAllUnitsQuery(query, {
    refetchOnMountOrArgChange: true,
  });
  const [addUnit, { isLoading: addLoading }] = useCreateUnitsMutation();
  const [editUnit, { isLoading: editLoading }] = useUpdateUnitsMutation();
  const [deleteUnit] = useDeleteUnitsMutation();

  const { data: statues } = useGetAllStatusQuery({});
  const { data: unitTypes } = useGetAllUnitTypeQuery({});

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
      statusId: data?.status?.id,
    });
    setModalActive(true);
    setMultiplier(!!data?.multiplier);
  };

  // Handle Submit for add or edit
  const handleSubmit = async (values: any) => {
    try {
      let result;
      values.hasMultiplier = Number(values.hasMultiplier) || 0;
      delete values.code;

      if (isEdit) {
        result = await editUnit({
          id: selectedData?.id,
          data: values,
        }).unwrap();

        if (result?.success) {
          Swal.fire({
            title: "Updated!",
            text: result?.message || "Brand has been updated.",
            icon: "success",
            timer: 2000,
            showConfirmButton: true,
          });
          handleReset();
        } else {
          Swal.fire({
            title: "Failed!",
            text: result?.message || "Failed to update Brand.",
            icon: "error",
            timer: 2000,
            showConfirmButton: true,
          });
        }
      } else {
        result = await addUnit(values).unwrap();

        if (result?.success) {
          Swal.fire({
            title: "Added!",
            text: result?.message || "Brand has been added.",
            icon: "success",
            timer: 2000,
            showConfirmButton: true,
          });
          handleReset();
        } else {
          Swal.fire({
            title: "Failed!",
            text: result?.message || "Failed to added Brand.",
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
    setMultiplier(false);
    setFilterActive(false);
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
      title: "Units ID",
      dataIndex: "code",
      key: "code",
      width: 100,
    },

    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      minWidth: 100,
    },
    {
      title: "Short Name",
      dataIndex: "codeName",
      key: "codeName",
      minWidth: 80,
    },
    {
      title: "Unit Type",
      dataIndex: "unitTypeId",
      key: "unitTypeId",
      minWidth: 100,
      render: (unitTypeId) => {
        const unitType = unitTypes?.data?.find(
          (item: TStatus) => item.id === unitTypeId
        );
        return <p>{unitType?.value || "---"}</p>;
      },
    },
    {
      title: "Base Unit",
      dataIndex: "baseUnitId",
      key: "baseUnitId",
      minWidth: 100,
      render: (baseUnitId) => {
        const unitType = unitsList?.data?.find(
          (item: TUnit) => item.id === baseUnitId
        );
        return (
          <p>{unitType ? `${unitType.name} (${unitType.codeName})` : "---"}</p>
        );
      },
    },
    {
      title: "Multiplier Details",
      dataIndex: "multiplierUnitDetails",
      key: "multiplierUnitDetails",
      render: (multiplierUnitDetails) =>
        multiplierUnitDetails ? <p>{multiplierUnitDetails}</p> : <p>---</p>,
      minWidth: 100,
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
            handleDelete(record?.id, () => deleteUnit(record?.id), "Units?")
          }
        />
      ),
    },
  ];

  return (
    <>
      <SummaryCard
        pageTitle="Units"
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
                    name="unitTypeId"
                    label="Unit Type"
                    placeholder="Filter by Unit Type"
                    options={unitTypes?.data?.map((item: TStatus) => ({
                      value: item.id,
                      label: item.value,
                    }))}
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
          data={unitsList?.data || []}
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
            { value: "unitTypeId", label: "Unit Type" },
          ]}
        />
      </DefaultCard>

      <ReusableModal
        key={isEdit ? selectedData?.id : "add-form"}
        title={isEdit ? "Edit Unit" : "Add Unit"}
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
                  label="Unit Name"
                  rules={validationRules.required("Unit Name")}
                />
                <InputField
                  name="codeName"
                  label="Unit Short Name"
                  rules={validationRules.required("Unit Short Name")}
                />
                <SelectField
                  name="unitTypeId"
                  label="Unit Type"
                  options={unitTypes?.data?.map((item: TStatus) => ({
                    value: item.id,
                    label: item.value,
                  }))}
                  rules={validationRules.required("Unit Type")}
                  showSearch
                />

                <SelectField
                  name="statusId"
                  label="Status"
                  options={statues?.data?.map((item: TStatus) => ({
                    value: item.id,
                    label: item.value,
                  }))}
                  rules={validationRules.required("Status")}
                  showSearch
                />

                <SelectField
                  name="hasMultiplier"
                  label="Has Multiplier?"
                  options={[
                    { label: "No", value: "0" },
                    { label: "Yes", value: "1" },
                  ]}
                  onChange={(value) => {
                    if (value === "0") {
                      setMultiplier(false);
                    } else {
                      setMultiplier(true);
                    }
                  }}
                />

                {isMultiplier && (
                  <Form.Item shouldUpdate>
                    {() => {
                      const nameValue = form.getFieldValue("name");

                      return (
                        <div className="grid grid-cols-3 gap-2 justify-between items-end mt-4 mb-2">
                          <h4 className="text-lg font-semibold mb-1 flex flex-wrap">
                            <span className="px-2">
                              1 {nameValue || "Unit"}
                            </span>
                            <span> =</span>
                          </h4>

                          <NumberField
                            name="multiplier"
                            placeholder="Amount of Base Unit"
                          />

                          <SelectField
                            name="baseUnitId"
                            placeholder="Select Base Unit"
                            options={unitsList?.data?.map((item: TStatus) => ({
                              value: item.id,
                              label: `${item.name} (${item.codeName})`,
                            }))}
                            showSearch
                          />
                        </div>
                      );
                    }}
                  </Form.Item>
                )}

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

export default UnitList;
