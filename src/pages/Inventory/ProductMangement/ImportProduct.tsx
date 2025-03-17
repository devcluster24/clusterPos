import DynamicForm from "@/components/form/DynamicForm";
import FileInputField from "@/components/form/FileInputField";
import SelectField from "@/components/form/SelectField";
import { validationRules } from "@/components/form/Validation";
import ReusableButton from "@/components/ui/button/ReusableButton";
import Card from "@/components/ui/card/Card";
import DefaultCard from "@/components/ui/card/DefaultCard";
import SummaryCard from "@/components/ui/card/SummaryCard";
import { valueType } from "antd/es/statistic/utils";

const ImportProduct = () => {
  const handleSubmit = (values: valueType) => {
    console.log("Form Values: ", values);
  };

  return (
    <>
      <SummaryCard pageTitle="Expired Products" backBtnActive={true} />

      <DefaultCard>
        <Card>
          {/* File Input */}
          <DynamicForm onSubmit={handleSubmit} layout="vertical">
            <div className="flex flex-wrap items-end gap-4">
              <FileInputField
                label="File To Import"
                name="file"
                rules={validationRules.required("File")}
              />

              {/* Select Option */}
              <SelectField
                name="unit"
                label="Same Name and Same Code Product Action"
                options={[
                  { value: "update", label: "Update The Product" },
                  { value: "skip", label: "Skip The Product" },
                ]}
              />
              <button className="bg-blue-600 text-white px-4 py-[5px] rounded hover:bg-blue-700 transition">
                Upload
              </button>
            </div>
          </DynamicForm>

          {/* Upload Button */}

          {/* Download Sample Button */}

          <div className="mt-4">
            <ReusableButton
              className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition"
              label="Download Sample File, Click Here"
              onClick={() => {
                const link = document.createElement("a");
                link.href = "/product_import_template.xlsx";
                link.download = "product_import_template.xlsx";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            />
          </div>
        </Card>
      </DefaultCard>
    </>
  );
};

export default ImportProduct;
