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
import { UploadFile } from "antd";
import { useState } from "react";
import { UploadChangeParam } from "antd/es/upload";
import { useCreateProductMutation } from "@/redux/features/admin/Inventory/productApi";
import { useGetAllStatusQuery } from "@/redux/features/admin/Inventory/statusApi";
import { useGetAllUnitsQuery } from "@/redux/features/admin/Inventory/unitsApi";
import { useGetAllCategoryQuery } from "@/redux/features/admin/Inventory/categoryApi";
import { useGetAllSubcategoryQuery } from "@/redux/features/admin/Inventory/subCateogryApi";
import { useGetAllBrandQuery } from "@/redux/features/admin/Inventory/brandApi";
import { TBrand, TCategory, TStatus, TSubcategory, TUnit } from "@/types";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const CreateProduct = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [value, setValue] = useState("");

  // Handle file selection
  const handleUpload = (info: UploadChangeParam<UploadFile>) => {
    setFileList(info.fileList);
  };
  // Handle remove file selection
  const handleRemove = (file: UploadFile) => {
    setFileList((prev) => prev.filter((item) => item.uid !== file.uid));
    return true;
  };

  const [addProduct] = useCreateProductMutation();

  const { data: categories } = useGetAllCategoryQuery({});
  const { data: subcategories } = useGetAllSubcategoryQuery({
    categoryId: selectedCategory,
  });
  const { data: brands } = useGetAllBrandQuery({});
  const { data: units } = useGetAllUnitsQuery({});
  const { data: statues } = useGetAllStatusQuery({});

  const handleSubmit = (values: any) => {
    console.log("Form Values: ", values);
    addProduct(values);
  };

  return (
    <>
      <SummaryCard pageTitle="Add Product" backBtnActive={true} />

      <DefaultCard>
        <ReusableForm
          onSubmit={handleSubmit}
          content={
            <>
              {/* Product Details Section */}
              <FormCard>
                <InputField
                  name="name"
                  label="Product Name"
                  rules={validationRules.required("Product Name")}
                />
                <InputField name="productCode" label="Product Code" />
                <SelectField
                  name="unitId"
                  label="Unit"
                  options={[
                    { value: "", label: "Select Unit" },
                    ...(units?.data?.map((item: TUnit) => ({
                      value: item.id,
                      label: item.name,
                    })) || []),
                  ]}
                  showSearch
                  rules={validationRules.required("Unit")}
                />
                <SelectField
                  name="barcodeId"
                  label="Barcode Type"
                  options={[
                    { value: "", label: "Select Barcode Type" },
                    // ...(units?.data?.map((item: TUnit) => ({
                    //   value: item.id,
                    //   label: item.name,
                    // })) || []),
                  ]}
                  showSearch
                  rules={validationRules.required("Unit")}
                />
                <SelectField
                  name="categoryId"
                  label="Category"
                  options={[
                    { value: "", label: "Select Category" },
                    ...(categories?.data?.map((item: TCategory) => ({
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
                          ...(subcategories?.data?.map(
                            (item: TSubcategory) => ({
                              value: item.id,
                              label: item.name,
                            })
                          ) || []),
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
                    ...(brands?.data?.map((item: TBrand) => ({
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
                      label: item.value,
                    })) || []),
                  ]}
                  showSearch
                />

                <SelectField
                  name="warrantyId"
                  label="Warranty"
                  options={[
                    { value: "6_months", label: "6 Months" },
                    { value: "12_months", label: "12 Months" },
                  ]}
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
                <NumberField
                  name="unitCost"
                  label="Unit Cost (Exc. Tax)"
                  rules={validationRules.required("Unit Cost")}
                />
                <NumberField name="profitMargin" label="Profit Margin (%)" />
                <NumberField
                  name="unitPrice"
                  label="Unit Price (Exc. Tax)"
                  rules={validationRules.required("Unit Price")}
                />
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
                <SubmitButton />
              </div>
            </>
          }
        />
      </DefaultCard>
    </>
  );
};

export default CreateProduct;
