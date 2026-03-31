import { useDispatch } from "react-redux";
import { addTicket, updateTicket } from "../store/ticketSlice";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const CreateTicketModal = ({ isOpen, onClose, editTicket }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(editTicket?.title || "");
  const [status, setStatus] = useState(editTicket?.status || "Pending");

  useEffect(() => {
    if (editTicket) {
      setTitle(editTicket.title);
      setStatus(editTicket.status);
    }
  }, [editTicket]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    if (editTicket) {
      dispatch(
        updateTicket({
          ...editTicket,
          title,
          status,
        }),
      );
      toast.success("Ticket updated successfully");
    } else {
      dispatch(
        addTicket({
          id: "TKT-" + Math.floor(1000 + Math.random() * 9000),
          title,
          status,
        }),
      );
      toast.success("Ticket created successfully");
    }

    // ✅ reset fields
    setTitle("");
    setStatus("Pending");

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      {/* Modal Box */}
      <div
        className="
        w-96 p-6 rounded-2xl shadow-2xl
        bg-white dark:bg-gray-800
        border border-gray-200 dark:border-gray-700
        text-gray-800 dark:text-gray-200
      "
      >
        <h2 className="text-lg font-semibold mb-4">
          {editTicket ? "Edit Ticket" : "Create Ticket"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Input */}
          <input
            type="text"
            placeholder="Ticket title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="
              border border-gray-300 dark:border-gray-600
              rounded-lg px-3 py-2
              bg-white dark:bg-gray-700
              text-gray-800 dark:text-gray-200
              placeholder-gray-400 dark:placeholder-gray-500
              focus:outline-none focus:ring-2 focus:ring-blue-500
            "
          />

          {/* Select */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="
              border border-gray-300 dark:border-gray-600
              rounded-lg px-3 py-2
              bg-white dark:bg-gray-700
              text-gray-800 dark:text-gray-200
              focus:outline-none focus:ring-2 focus:ring-blue-500
            "
          >
            <option value="Pending">Pending</option>
            <option value="Resolved">Resolved</option>
          </select>

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="
                px-4 py-2 rounded-lg
                border border-gray-300 dark:border-gray-600
                text-gray-800 dark:text-gray-200
                hover:bg-gray-100 dark:hover:bg-gray-700
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              className="
                bg-blue-600 hover:bg-blue-700
                dark:bg-blue-500 dark:hover:bg-blue-600
                text-white px-4 py-2 rounded-lg
                shadow-md hover:shadow-lg
                transition-all duration-200
              "
            >
              {editTicket ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTicketModal;
