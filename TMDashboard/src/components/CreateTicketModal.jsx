import { useDispatch } from "react-redux";
import { addTicket, updateTicket } from "../store/ticketSlice";
import { useState, useEffect } from "react";

const CreateTicketModal = ({ isOpen, onClose, editTicket }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(editTicket?.title || "");
  const [status, setStatus] = useState(editTicket?.status || "Pending");
  // Sync when editing changes
  useEffect(() => {
    if (editTicket) {
      setTitle(editTicket.title);
      setStatus(editTicket.status);
    }
  }, [editTicket]);

  if (!isOpen) return null;
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    if (editTicket) {
      dispatch(
        updateTicket({
          ...editTicket,
          title,
          status,
        }),
      );
    } else {
      dispatch(
        addTicket({
          id: "TKT-" + Math.floor(1000 + Math.random() * 9000),
          title,
          status,
        }),
      );
    }

    onClose();
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-lg font-semibold mb-4">
          {editTicket ? "Edit Ticket" : "Create Ticket"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Ticket title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded-lg px-3 py-2"
          />
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
            }}
            className="border rounded-lg px-3 py-2"
          >
            <option value="Pending">Pending</option>
            <option value="Resolved">Resolved</option>
          </select>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CreateTicketModal;
