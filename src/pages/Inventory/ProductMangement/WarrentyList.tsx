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
import { AnyObject } from "antd/es/_util/type";
import useDeleteConfirmation from "@/hooks/useDeleteConfirmation";
import { useDebounced } from "@/redux/hooks";
import TextAreaField from "@/components/form/TextAreaField";
import FileInputField from "@/components/form/FileInputField";
import { UploadChangeParam } from "antd/es/upload";
import {
  useCreateUnitsMutation,
  useDeleteUnitsMutation,
  useGetAllUnitsQuery,
  useUpdateUnitsMutation,
} from "@/redux/features/admin/Inventory/unitsApi";

const WarrentyList: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [modalActive, setModalActive] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedData, setSelectedData] = useState<{ id: number } | null>(null);
  const { handleDelete } = useDeleteConfirmation();
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

  // Handle file selection
  const handleUpload = (info: UploadChangeParam<UploadFile>) => {
    setFileList(info.fileList);
  };
  // Handle remove file selection
  const handleRemove = (file: UploadFile) => {
    setFileList((prev) => prev.filter((item) => item.uid !== file.uid));
    return true;
  };

  // api call
  const { data: warrenties, isLoading } = useGetAllUnitsQuery(query, {
    refetchOnMountOrArgChange: true,
  });
  const [addWarrenty] = useCreateUnitsMutation();
  const [editWarrenty] = useUpdateUnitsMutation();
  const [deleteWarrenty] = useDeleteUnitsMutation();

  // Add Modal Open
  const openAddModal = () => {
    setIsEdit(false);
    setSelectedData(null);
    setModalActive(true);
  };

  // Edit Modal Open
  const openEditModal = (Warrenty: any) => {
    setIsEdit(true);
    setSelectedData(Warrenty);
    setModalActive(true);
  };

  // Handle Submit for add or edit
  const handleSubmit = async (values: any) => {
    try {
      if (isEdit) {
        await editWarrenty({ id: selectedData?.id, ...values });
        Swal.fire("Updated!", "Warrenty has been updated.", "success");
      } else {
        await addWarrenty(values);
        Swal.fire("Added!", "Warrenty has been added.", "success");
      }
      setModalActive(false);
    } catch {
      Swal.fire("Error!", "Something went wrong.", "error");
    }
  };

  // Table Column
  const columns: ColumnsType<AnyObject> = [
    {
      title: "Warrenty ID",
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
      title: "Warrenty Name",
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
              () => deleteWarrenty(record?.id),
              "Warrenty?"
            )
          }
        />
      ),
    },
  ];

  return (
    <>
      <SummaryCard
        pageTitle="Warrenty"
        backBtnActive={true}
        addBtnActive
        addBtnLabel="Add Warrenty"
        addBtnClick={openAddModal}
      />

      <DefaultCard>
        <ReusableTable
          columns={columns}
          data={warrenties?.data || []}
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
        />
      </DefaultCard>

      <ReusableModal
        title={isEdit ? "Edit Warrenty" : "Add Warrenty"}
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
                  label="Warrenty Name"
                  rules={validationRules.required("Warrenty Name")}
                />
                <TextAreaField name="description" label="Description" />
                <SelectField
                  name="status"
                  label="Status"
                  options={[
                    { value: "1", label: "Active" },
                    { value: "0", label: "Inactive" },
                  ]}
                  rules={validationRules.required("Status")}
                />
                <FileInputField
                  label="Photo"
                  allowedExtensions={["jpg", "png", "pdf"]}
                  fileSize="250px * 250px"
                  name="file"
                  fileList={fileList}
                  handleUpload={handleUpload}
                  handleRemove={handleRemove}
                  multiple={true}
                />

                <div className="flex justify-end">
                  <SubmitButton />
                </div>
              </div>
            }
          />
        }
      />
    </>
  );
};

export default WarrentyList;
