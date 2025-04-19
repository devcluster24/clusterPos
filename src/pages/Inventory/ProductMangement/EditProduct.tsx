/* eslint-disable @typescript-eslint/no-explicit-any */
import InputField from "@/components/form/InputField";
import NumberField from "@/components/form/NumberField";
import SelectField from "@/components/form/SelectField";
import SubmitButton from "@/components/form/SubmitButton";
import { validationRules } from "@/components/form/Validation";
import DefaultCard from "@/components/ui/card/DefaultCard";
import FormCard from "@/components/ui/card/FormCard";
import SummaryCard from "@/components/ui/card/SummaryCard";
import ReusableForm from "@/components/form/ReusableForm";
import FileInputField from "@/components/form/FileInputField";
import { Form, UploadFile } from "antd";
import { useEffect, useState } from "react";
import { UploadChangeParam } from "antd/es/upload";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "@/redux/features/admin/Inventory/productApi";
import { useGetAllStatusQuery } from "@/redux/features/admin/Inventory/statusApi";
import { useGetAllUnitsQuery } from "@/redux/features/admin/Inventory/unitsApi";
import { useGetAllCategoryQuery } from "@/redux/features/admin/Inventory/categoryApi";
import { useGetAllSubcategoryQuery } from "@/redux/features/admin/Inventory/subCateogryApi";
import { useGetAllBrandQuery } from "@/redux/features/admin/Inventory/brandApi";
import {
  TBrand,
  TCategory,
  TStatus,
  TSubcategory,
  TUnit,
  TWarranty,
} from "@/types";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useGetAllWarrentyQuery } from "@/redux/features/admin/Inventory/warrantyApi";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const { id } = useParams(); // gets the ":id" from the URL

  const numericId = id ? Number(id) : undefined;

  // Only run query when numericId is available
  const {
    data: product,
    isLoading,
    isFetching,
    error,
  } = useGetProductByIdQuery(numericId!, {
    skip: !numericId, // prevent fetching until ID is defined
  });

  const [editProduct, { isLoading: editLoading }] = useUpdateProductMutation();
  const { data: statues } = useGetAllStatusQuery({});
  const { data: categories } = useGetAllCategoryQuery({});
  const { data: subcategories } = useGetAllSubcategoryQuery({
    categoryId: selectedCategory,
  });
  const { data: brands } = useGetAllBrandQuery({});
  const { data: units } = useGetAllUnitsQuery({});
  const { data: warranties } = useGetAllWarrentyQuery({});

  useEffect(() => {
    if (product) {
      form.setFieldsValue({
        ...product.data,
      });
      setValue(product?.data?.description);
    }
  }, [product, form]);

  if (!numericId || isLoading || isFetching) return <p>Loading...</p>;

  if (error) return <p>Error fetching product.</p>;

  const handleSubmit = async (values: any) => {
    console.log("Form Values: ", values);
    values.description = value;
    const result = await editProduct({ id: id, data: values }).unwrap();
    if (result?.success) {
      Swal.fire({
        title: "Updated!",
        text: result?.message || "Product has been updated.",
        icon: "success",
        timer: 2000,
        showConfirmButton: true,
      });
      handleReset();
    } else {
      Swal.fire({
        title: "Failed!",
        text: result?.message || "Failed to update Product.",
        icon: "error",
        timer: 2000,
        showConfirmButton: true,
      });
    }
  };

  // Handle file selection
  const handleUpload = (info: UploadChangeParam<UploadFile>) => {
    setFileList(info.fileList);
  };

  // Handle remove file selection
  const handleRemove = (file: UploadFile) => {
    setFileList((prev) => prev.filter((item) => item.uid !== file.uid));
    return true;
  };

  // handle reset
  const handleReset = () => {
    form.resetFields();
    setFileList([]);
    navigate("/products/list");
  };

  return (
    <>
      <SummaryCard pageTitle="Edit Product" backBtnActive={true} />

      <DefaultCard>
        <ReusableForm
          loading={isLoading}
          form={form}
          onSubmit={handleSubmit}
          onValuesChange={(changedValues, allValues) => {
            const { unitCost, profitMargin, unitPrice } = allValues;

            if (
              changedValues.unitCost !== undefined ||
              changedValues.profitMargin !== undefined
            ) {
              if (unitCost !== undefined && profitMargin !== undefined) {
                const price =
                  parseFloat(unitCost) +
                    (parseFloat(unitCost) * parseFloat(profitMargin)) / 100 ||
                  0;
                form.setFieldsValue({
                  unitPrice: parseFloat(price.toFixed(2)),
                });
              }
            }

            if (
              changedValues.unitPrice !== undefined &&
              unitCost !== undefined &&
              unitPrice !== undefined
            ) {
              const profit =
                ((parseFloat(unitPrice) - parseFloat(unitCost)) /
                  parseFloat(unitCost)) *
                  100 || 0;
              form.setFieldsValue({
                profitMargin: parseFloat(profit.toFixed(2)),
              });
            }
          }}
          content={
            <>
              {/* Product Details Section */}
              <FormCard>
                <InputField
                  name="name"
                  label="Product Name"
                  rules={validationRules.required("Product Name")}
                />
                <InputField name="code" label="Product Code" disabled />
                <SelectField
                  name="unitId"
                  label="Unit"
                  options={[
                    { value: "", label: "Select Unit" },
                    ...(units?.data
                      ?.filter((item: TUnit) => item.Status?.name === "ACTIVE")
                      ?.map((item: TUnit) => ({
                        value: item.id,
                        label: `${item.name} (${item.codeName})`,
                      })) || []),
                  ]}
                  showSearch
                  rules={validationRules.required("Unit")}
                />
                <SelectField
                  name="barcodeId"
                  label="Barcode Type"
                  options={
                    [
                      // { value: null, label: "Select Barcode Type" },
                      // ...(units?.data?.map((item: TUnit) => ({
                      //   value: item.id,
                      //   label: item.name,
                      // })) || []),
                    ]
                  }
                  showSearch
                />
                <SelectField
                  name="categoryId"
                  label="Category"
                  options={[
                    { value: "", label: "Select Category" },
                    ...(categories?.data
                      ?.filter(
                        (item: TCategory) => item.Status?.name === "ACTIVE"
                      )
                      ?.map((item: TCategory) => ({
                        value: item.id,
                        label: item.name,
                      })) || []),
                  ]}
                  onChange={(value) => setSelectedCategory(value)}
                  showSearch
                />
                <SelectField
                  name="subCategoryId"
                  label="Subcategory"
                  placeholder={
                    selectedCategory
                      ? "Select Subcategory"
                      : "Select Category First"
                  }
                  options={
                    selectedCategory
                      ? [
                          { value: "", label: "Select Subcategory" },
                          ...(subcategories?.data
                            ?.filter(
                              (item: TSubcategory) =>
                                item.Status?.name === "ACTIVE"
                            )
                            ?.map((item: TSubcategory) => ({
                              value: item.id,
                              label: item.name,
                            })) || []),
                        ]
                      : [{ value: "", label: "Select Category First" }]
                  }
                  showSearch
                />
                <SelectField
                  name="brandId"
                  label="Brand"
                  options={[
                    { value: "", label: "Select Brand" },
                    ...(brands?.data
                      ?.filter((item: TBrand) => item.Status?.name === "ACTIVE")
                      ?.map((item: TBrand) => ({
                        value: item.id,
                        label: item.name,
                      })) || []),
                  ]}
                  showSearch
                />
                <SelectField
                  name="statusId"
                  label="Status"
                  options={[
                    { value: "", label: "Select Status" },
                    ...(statues?.data?.map((item: TStatus) => ({
                      value: item.id,
                      label: item.name,
                    })) || []),
                  ]}
                  rules={validationRules.required("Status")}
                  showSearch
                />
                <SelectField
                  name="warrantyId"
                  label="Warranty"
                  options={[
                    { value: "", label: "Select Warranty" },
                    ...(warranties?.data
                      ?.filter(
                        (item: TWarranty) => item.Status?.name === "ACTIVE"
                      )
                      ?.map((item: TWarranty) => ({
                        value: item.id,
                        label: item.duration,
                      })) || []),
                  ]}
                  showSearch
                />

                <NumberField
                  name="alertQuantity"
                  label="Alert Quantity"
                  rules={validationRules.required("Alert Quantity")}
                />
                <SelectField
                  name="businessAccessId"
                  label="Business Access"
                  options={[]}
                />
                <SelectField
                  name="productType"
                  label="Product Type"
                  options={[
                    { value: "PHYSICAL", label: "Physical" },
                    { value: "DIGITAL", label: "Digital" },
                    { value: "SERVICE", label: "Service" },
                  ]}
                />
                <SelectField
                  name="condition"
                  label="Condition"
                  options={[
                    { value: "new", label: "New" },
                    { value: "used", label: "Used" },
                  ]}
                />
              </FormCard>
              {/* Pricing Section */}
              <FormCard>
                <NumberField name="unitCost" label="Unit Cost (Exc. Tax)" />
                <NumberField name="profitMargin" label="Profit Margin (%)" />
                <NumberField name="unitPrice" label="Unit Price (Exc. Tax)" />
                <NumberField name="quantity" label="Quantity" />
                <SelectField
                  name="hasMultipleUnit"
                  label="Has Multiple Unit?"
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                />
                <SelectField
                  name="hasVariant"
                  label="Has Variant?"
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                />
              </FormCard>
              {/* Stock and E-commerce Section */}
              <FormCard>
                <SelectField
                  name="type"
                  label="Type"
                  options={[
                    { value: "general", label: "General" },
                    { value: "custom", label: "Custom" },
                  ]}
                />
                <InputField name="weight" label="Weight" />
                <SelectField
                  name="displayedInEcom"
                  label="Displayed in E-com"
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                />
                <SelectField
                  name="isForSale"
                  label="Is For Sale"
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                />
                <SelectField
                  name="enableIMEI"
                  label="Enable IMEI/SL No"
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                />
                <SelectField
                  name="batchNoExpireDate"
                  label="Batch No/Expire Date"
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                />
              </FormCard>
              {/* Thumbnail Upload */}
              <div className="border rounded border-gray-300 dark:border-gray-700 p-4 mb-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow grid grid-cols-1 gap-2 box-border">
                <FileInputField
                  label="Photo"
                  allowedExtensions={["jpg", "png"]}
                  fileSize="250px * 250px"
                  name="file"
                  fileList={fileList}
                  handleUpload={handleUpload}
                  handleRemove={handleRemove}
                />
                <div className="flex md:flex-row flex-col md:justify-end justify-start items-start md:gap-5 gap-2 mt-2  min-h-40">
                  <p className="md:w-[20%] w-full md:text-end text-start font-semibold">
                    Description:{" "}
                  </p>
                  <div className="md:w-[80%] w-full h-full">
                    <ReactQuill
                      theme="snow"
                      value={value}
                      onChange={setValue}
                    />
                  </div>
                </div>
              </div>
              {/* Submit Button */}
              <div className="flex justify-end">
                <SubmitButton
                  selectedRecord={product?.data}
                  loading={editLoading}
                />
              </div>
            </>
          }
        />
      </DefaultCard>
    </>
  );
};

export default EditProduct;
