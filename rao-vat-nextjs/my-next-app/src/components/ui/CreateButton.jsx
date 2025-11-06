import React, { useState } from "react";

const CreateButton = ({ children, modalContent }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="bg-purple-700 text-white font-semibold px-5 py-2 rounded-full shadow hover:bg-purple-800 transition"
        onClick={() => setOpen(true)}
      >
        {children || "Tạo mới"}
      </button>
      {open && modalContent && modalContent({ open, onClose: () => setOpen(false) })}
    </>
  );
};

export default CreateButton;