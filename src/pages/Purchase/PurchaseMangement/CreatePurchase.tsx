/* eslint-disable @typescript-eslint/no-explicit-any */
import InputField from "@/components/form/InputField";
import SelectField from "@/components/form/SelectField";
import SubmitButton from "@/components/form/SubmitButton";
import { validationRules } from "@/components/form/Validation";
import DefaultCard from "@/components/ui/card/DefaultCard";
import SummaryCard from "@/components/ui/card/SummaryCard";
import ReusableForm from "@/components/form/ReusableForm";
import TextAreaField from "@/components/form/TextAreaField";

const CreatePurchase = () => {
  const handleSubmit = (values: any) => {
    console.log("Form Values: ", values);
  };

  return (
    <>
      <SummaryCard pageTitle="Add Purchase" backBtnActive={true} />

      <DefaultCard>
        <ReusableForm
          onSubmit={handleSubmit}
          layout="vertical"
          content={
            <div className="flex flex-col gap-3">
              <InputField
                name="name"
                label="Product Name"
                rules={validationRules.required("Product Name")}
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

              <div className="flex justify-end">
                <SubmitButton />
              </div>
            </div>
          }
        />
      </DefaultCard>
    </>
  );
};

export default CreatePurchase;
