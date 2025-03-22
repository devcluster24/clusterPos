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

const CreateProduct = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

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
                  name="productName"
                  label="Product Name"
                  rules={validationRules.required("Product Name")}
                />
                <InputField
                  name="productCode"
                  label="Product Code"
                  rules={validationRules.required("Product Code")}
                />
                <SelectField
                  name="unit"
                  label="Unit"
                  options={[
                    { value: "piece", label: "Piece" },
                    { value: "box", label: "Box" },
                  ]}
                  rules={validationRules.required("Unit")}
                />
                <SelectField
                  name="category"
                  label="Category"
                  options={[
                    { value: "electronics", label: "Electronics" },
                    { value: "clothing", label: "Clothing" },
                  ]}
                />
                <SelectField
                  name="subcategory"
                  label="Subcategory"
                  options={[
                    { value: "mobiles", label: "Mobiles" },
                    { value: "laptops", label: "Laptops" },
                  ]}
                />
                <SelectField
                  name="brand"
                  label="Brand"
                  options={[
                    { value: "apple", label: "Apple" },
                    { value: "samsung", label: "Samsung" },
                  ]}
                />
                <SelectField
                  name="warranty"
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

                <InputField name="businessAccess" label="Business Access" />
                <SelectField
                  name="stockType"
                  label="Stock Type"
                  options={[
                    { value: "manageable", label: "Manageable Stock" },
                    { value: "non_manageable", label: "Non-Manageable Stock" },
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
                <SelectField
                  name="applicableTax"
                  label="Applicable Tax"
                  options={[
                    { value: "none", label: "None" },
                    { value: "exclusive", label: "Exclusive" },
                  ]}
                />
                <SelectField
                  name="taxApplicableFor"
                  label="Tax Applicable For"
                  options={[
                    { value: "selling_price", label: "For Selling Price" },
                    { value: "cost_price", label: "For Cost Price" },
                  ]}
                />
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
              <FormCard>
                <FileInputField
                  label="Photo"
                  allowedExtensions={["jpg", "png"]}
                  fileSize="250px * 250px"
                  name="file"
                  fileList={fileList}
                  handleUpload={handleUpload}
                  handleRemove={handleRemove}
                />
              </FormCard>
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
