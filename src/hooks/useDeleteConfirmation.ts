/* eslint-disable @typescript-eslint/no-explicit-any */
import Swal from "sweetalert2";

const useDeleteConfirmation = () => {
  const handleDelete = async (
    id: string,
    deleteFunction: (id: string) => Promise<any>,
    title: string = "Item"
  ) => {
    Swal.fire({
      title: `Delete ${title}?`,
      text: `Are you sure you want to delete this ${title.toLowerCase()}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteFunction(id);

          if (response) {
            Swal.fire("Deleted!", `${title} has been deleted.`, "success");
          }
        } catch {
          Swal.fire("Error!", "Something went wrong.", "error");
        }
      }
    });
  };

  return { handleDelete };
};

export default useDeleteConfirmation;
