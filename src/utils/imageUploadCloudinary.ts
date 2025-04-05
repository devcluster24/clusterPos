import { message } from "antd";

const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${
  import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
}/image/upload`;

// define file name
const generateFileName = (): string => {
  const now = new Date();

  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const date = now.getDate().toString().padStart(2, "0");

  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");

  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12 || 12;

  const randomId = Math.floor(Math.random() * 1000000).toString();

  return `${month}-${date}-${year}-${hours}-${minutes}-${seconds}-${ampm}-${randomId}`;
};

// define image upload
const imageUploadCloudinary = async (file: File): Promise<string> => {
  if (!file) {
    message.error("File not found.");
  }
  //if image exist
  if (file) {
    const fileName = generateFileName();
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      `${import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET}`
    );
    formData.append("public_id", fileName);

    const response = await fetch(CLOUDINARY_URL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      message.error("Failed to upload image to Cloudinary.");
    }

    const data = await response.json();
    return data.secure_url;
  } else {
    //throw new error if not exist
    message.error("File not found.");
    throw new Error("File not found.");
  }
};

export default imageUploadCloudinary;
