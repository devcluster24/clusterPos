import MainForm from "@/components/form/MainForm";
import SummaryCard from "@/components/ui/card/SummaryCard";
import * as Yup from "yup";

const CreateProduct = () => {
  const fields = [
    {
      name: "name",
      label: "Full Name",
      type: "text",
      placeholder: "Enter your name",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
    },
    {
      name: "role",
      label: "Role",
      type: "select",
      options: [
        { label: "User", value: "user" },
        { label: "Admin", value: "admin" },
      ],
    },
    {
      name: "terms",
      label: "I accept the terms and conditions",
      type: "checkbox",
    },
  ];

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "At least 6 characters")
      .required("Password is required"),
    role: Yup.string().required("Role is required"),
    terms: Yup.boolean().oneOf([true], "You must accept the terms"),
  });

  const initialValues = {
    name: "",
    email: "",
    password: "",
    role: "",
    terms: false,
  };

  const handleSubmit = (values: any) => {
    console.log("Form Values:", values);
  };

  return (
    <>
      <SummaryCard pageTitle="Add Product" backBtnActive={true} />
      <MainForm
        fields={fields}
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        submitLabel="Register"
      />
      ;
    </>
  );
};

export default CreateProduct;
