/* eslint-disable @typescript-eslint/no-explicit-any */
export const validationRules = {
  required: (field: string) => [
    { required: true, message: `${field} is required` },
  ],
  email: () => [
    { required: true, message: "Email is required" },
    { type: "email", message: "Please enter a valid email" },
  ],
  minLength: (field: string, min: number) => [
    { required: true, message: `${field} is required` },
    { min, message: `${field} must be at least ${min} characters` },
  ],
  maxLength: (field: string, max: number) => [
    { required: true, message: `${field} is required` },
    { max, message: `${field} cannot be longer than ${max} characters` },
  ],
  pattern: (field: string, regex: RegExp, errorMessage: string) => [
    { required: true, message: `${field} is required` },
    { pattern: regex, message: errorMessage },
  ],
  number: () => [
    { required: true, message: "This field is required" },
    { type: "number", message: "Please enter a valid number" },
  ],
  url: () => [
    { required: true, message: "URL is required" },
    { type: "url", message: "Please enter a valid URL" },
  ],
  confirmPassword: (field: string, passwordField: string) => [
    { required: true, message: `${field} is required` },
    {
      validator: (value: string, callback: any) => {
        if (value && value !== passwordField) {
          callback(`${field} does not match with password`);
        } else {
          callback();
        }
      },
    },
  ],
  date: () => [
    { required: true, message: "Date is required" },
    { type: "date", message: "Please enter a valid date" },
  ],
  phoneNumber: () => [
    { required: true, message: "Phone number is required" },
    {
      pattern: /^[0-9]{10}$/,
      message: "Please enter a valid 10-digit phone number",
    },
  ],
};
