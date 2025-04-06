/* eslint-disable @typescript-eslint/no-explicit-any */
import Swal from "sweetalert2";

const useDeleteConfirmation = () => {
  const handleDelete = async (
    ids: string | string[], // Accept single or multiple IDs
    deleteFunction: (id: string | string[]) => Promise<any>,
    title: string = "Item"
  ) => {
    const isMultiple = Array.isArray(ids);
    const titleText = isMultiple ? `${title}s` : title;
    const confirmationText = isMultiple
      ? `Are you sure you want to delete these ${title.toLowerCase()}s?`
      : `Are you sure you want to delete this ${title.toLowerCase()}?`;

    Swal.fire({
      title: `Delete ${titleText}?`,
      text: confirmationText,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteFunction(ids);

          if (response) {
            Swal.fire({
              title: "Deleted!",
              text: `${titleText} has been deleted.`,
              icon: "success",
              timer: 2000,
              showConfirmButton: true,
            });
          }
        } catch {
          Swal.fire({
            title: "Failed!",
            text: `Failed to delete ${titleText}.`,
            icon: "error",
            timer: 2000,
            showConfirmButton: true,
          });
          Swal.fire("Error!", "Something went wrong.", "error");
        }
      }
    });
  };

  return { handleDelete };
};

export default useDeleteConfirmation;
