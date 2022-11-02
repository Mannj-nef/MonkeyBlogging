import { deleteDoc } from "firebase/firestore";
import React from "react";
import Swal from "sweetalert2";
import { IconDelete } from "../icons";

const ActionDelete = ({ handle, docRef }) => {
  const handleConfirmedDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        await deleteDoc(docRef);
      }
    });
    handle && handle();
  };
  return (
    <span
      className="flex items-center justify-center w-10 h-10 border border-gray-200 rounded cursor-pointer text-red-500"
      style={{ color: "rgb(239 68 68 / 1)" }}
      onClick={() => handleConfirmedDelete()}
    >
      <IconDelete className="pointer-events-none"></IconDelete>
    </span>
  );
};

export default ActionDelete;
