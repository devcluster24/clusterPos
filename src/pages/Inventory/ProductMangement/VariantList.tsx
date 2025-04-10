/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo, useState } from "react";
import ReusableTable from "@/components/ui/table/ReusableTable";
import SummaryCard from "@/components/ui/card/SummaryCard";
import DefaultCard from "@/components/ui/card/DefaultCard";
import { ColumnsType } from "antd/es/table";
import { Form, Input } from "antd";
import EditDeleteButtons from "@/components/ui/button/EditDeleteButtons";
import ReusableModal from "@/components/ui/modal/ReusableModal";
import ReusableForm from "@/components/form/ReusableForm";
import InputField from "@/components/form/InputField";
import { validationRules } from "@/components/form/Validation";
import SubmitButton from "@/components/form/SubmitButton";
import Swal from "sweetalert2";
import { AnyObject } from "antd/es/_util/type";
import useDeleteConfirmation from "@/hooks/useDeleteConfirmation";
import { useDebounced } from "@/redux/hooks";
// import FilterCard from "@/components/ui/card/FilterCard";
import {
  useCreateVarientTypeMutation,
  useDeleteVarientTypeMutation,
  useGetAllVarientTypeQuery,
  useUpdateVarientTypeMutation,
} from "@/redux/features/admin/Inventory/variantTypeApi";

// filter types
interface FilterState {
  code?: string;
  statusId?: string;
}

const VariantList: React.FC = () => {
  const [form] = Form.useForm();
  const [variantNames, setVariantNames] = useState<string[]>([""]);
  const [modalActive, setModalActive] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  // const [filterActive, setFilterActive] = useState(false);
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

  // api call
  const { data: varients, isLoading } = useGetAllVarientTypeQuery(query, {
    refetchOnMountOrArgChange: true,
  });
  const [addVarient, { isLoading: addLoading }] =
    useCreateVarientTypeMutation();
  const [editVarient, { isLoading: editLoading }] =
    useUpdateVarientTypeMutation();
  const [deleteVarient] = useDeleteVarientTypeMutation();

  // Add Modal Open
  const openAddModal = () => {
    form.resetFields();
    setIsEdit(false);
    setSelectedData(null);
    setVariantNames([""]);
    setModalActive(true);
  };

  // Edit Modal Open
  const openEditModal = (data: any) => {
    setIsEdit(true);
    setSelectedData(data);

    const variantNames = data?.Variants?.map((variant: any) => variant.name);

    form.setFieldsValue({
      ...data,
      name: variantNames,
    });

    setVariantNames(data?.Variants);
    setModalActive(true);
  };

  // Handle Submit for add or edit
  const handleSubmit = async (values: any) => {
    delete values.code;
    try {
      let result;
      interface VariantPayload {
        value: string;
        child: { name: string }[];
      }

      const payload: VariantPayload = {
        value: values.value,
        child: values.name.filter(
          (name: { name: string }) => name?.name?.trim() !== ""
        ),
      };
      if (isEdit) {
        result = await editVarient({
          id: selectedData?.id,
          data: payload,
        }).unwrap();
        if (result?.success) {
          Swal.fire({
            title: "Updated!",
            text: result?.message || "Variant has been updated.",
            icon: "success",
            timer: 2000,
            showConfirmButton: true,
          });
          handleReset();
        } else {
          Swal.fire({
            title: "Failed!",
            text: result?.message || "Failed to update Variant.",
            icon: "error",
            timer: 2000,
            showConfirmButton: true,
          });
        }
      } else {
        result = await addVarient(payload).unwrap();
        if (result?.success) {
          Swal.fire({
            title: "Added!",
            text: result?.message || "Variant has been added.",
            icon: "success",
            timer: 2000,
            showConfirmButton: true,
          });
          handleReset();
        } else {
          Swal.fire({
            title: "Failed!",
            text: result?.message || "Failed to added Variant.",
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
  // const handleFilter = (key: keyof FilterState, value: string | undefined) => {
  //   setFilters((prev) => ({
  //     ...prev,
  //     [key]: value,
  //   }));
  // };

  // handle reset
  const handleReset = () => {
    setFilters({});
    form.resetFields();
    setSearchTerm("");
    setVariantNames([]);
    // setFilterActive(false);
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
      title: "Variant Name",
      dataIndex: "value",
      key: "value",
      minWidth: 100,
    },
    {
      title: "Variant Child",
      dataIndex: "Variants",
      key: "Variants",
      minWidth: 100,
      render: (variants) => {
        return (
          <p>
            {variants.length > 0
              ? variants?.map((item: { id: number; name: string }) => (
                  <span key={item?.id}>{item?.name}, </span>
                ))
              : "---"}
          </p>
        );
      },
    },

    {
      title: "Actions",
      key: "actions",
      width: 150,
      fixed: "right",
      align: "center",
      render: (_, record) => (
        <EditDeleteButtons
          onEdit={() => openEditModal(record)}
          onDelete={() =>
            handleDelete(
              record?.id,
              () => deleteVarient(record?.id),
              "Variant?"
            )
          }
        />
      ),
    },
  ];

  return (
    <>
      <SummaryCard
        pageTitle="Varitants"
        backBtnActive={true}
        resetBtnActive={true}
        resetBtnClick={() => handleReset()}
        // filterBtnActive
        // filterBtnClick={() => setFilterActive((prev) => !prev)}
        addBtnActive
        addBtnLabel="Add"
        addBtnClick={openAddModal}
      />

      <DefaultCard>
        {/* <FilterCard
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
        /> */}

        <ReusableTable
          columns={columns}
          data={varients?.data || []}
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
          sortsBy={[{ value: "value", label: "Name" }]}
        />
      </DefaultCard>

      <ReusableModal
        key={isEdit ? selectedData?.id : "add-form"}
        title={isEdit ? "Edit Variant" : "Add Variant"}
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
                  name="value"
                  label="Variant Type (e.g., Size, Color)"
                  rules={validationRules.required("Variant Type")}
                />

                <Form.List
                  name="name"
                  initialValue={variantNames}
                  rules={[
                    {
                      validator: async (_, names) => {
                        if (!names || names.length < 1) {
                          return Promise.reject(
                            new Error("At least one variant is required")
                          );
                        }
                      },
                    },
                  ]}
                >
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, fieldKey, ...restField }) => (
                        <div key={key} className="flex items-end gap-2">
                          <Form.Item
                            style={{ margin: 0, padding: 0, width: "100%" }}
                            {...restField}
                            label={key === 0 ? "Variant Name" : ""}
                            name={[key]}
                            fieldKey={[fieldKey ?? 0, "name"]}
                            rules={[
                              {
                                required: true,
                                message: "Variant Name is required",
                              },
                            ]}
                          >
                            <Input placeholder="Variant Name" />
                          </Form.Item>

                          <button
                            type="button"
                            onClick={() => remove(name)}
                            className={`${
                              key === 0
                                ? "hidden"
                                : "flex text-red-500 p-1 hover:scale-110 hover:bg-blue-500 hover:text-white rounded cursor-pointer"
                            }`}
                          >
                            ❌
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => add()}
                        className="text-blue-500 hover:text-white border rounded-sm  px-5 py-1 cursor-pointer hover:bg-blue-500 mt-2"
                      >
                        ➕ Add Variant
                      </button>
                    </>
                  )}
                </Form.List>

                <div className="flex justify-end mt-4">
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

export default VariantList;
