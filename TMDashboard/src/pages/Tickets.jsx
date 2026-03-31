import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useTickets } from "../hooks/useTickets";

import CreateTicketModal from "../components/CreateTicketModal";
import Loader from "../components/Loader";

import { fetchTickets, deleteTicket } from "../store/ticketSlice";
import { useAuth } from "../hooks/useAuth";

const Tickets = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  const { tickets, loading, error, total, getTickets, removeTicket } =
    useTickets();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [debounceSearch, setDebounceSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTicket, setEditTicket] = useState(null);

  const limit = 10;

  // 🔥 Fetch tickets using async thunk
  useEffect(() => {
    getTickets(limit, (page - 1) * limit);
  }, [page]);

  // 🔥 Show error toast
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // 🔥 Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // 🔥 Filter logic
  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      const matchesSearch = ticket.title
        .toLowerCase()
        .includes(debounceSearch.toLowerCase());

      const matchesStatus = statusFilter
        ? ticket.status === statusFilter
        : true;

      return matchesSearch && matchesStatus;
    });
  }, [tickets, debounceSearch, statusFilter]);

  // 🔥 Delete handler
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete?")) {
      removeTicket(id);
      toast.success("Ticket deleted successfully");
    }
  };

  // 🔥 Edit handler
  const handleEdit = (ticket) => {
    setEditTicket(ticket);
    setIsModalOpen(true);
  };

  // 🔥 Loading UI
  if (loading) return <Loader />;

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Tickets</h1>

        <div className="flex gap-2">
          <button
            onClick={() => navigate("/")}
            className="border px-4 py-2 rounded-lg hover:bg-gray-100"
          >
            ← Dashboard
          </button>

          {isAdmin && (
            <button
              disabled={!isAdmin}
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              + Create Ticket
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search tickets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded-lg px-3 py-2"
        >
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-600 text-sm uppercase">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Title</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody className="text-sm text-gray-700">
            {filteredTickets.map((ticket) => (
              <tr
                key={ticket.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-3">{ticket.id}</td>
                <td className="p-3">{ticket.title}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      ticket.status === "Resolved"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {ticket.status}
                  </span>
                </td>
                {isAdmin && (
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => handleEdit(ticket)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(ticket.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-between items-center">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 border rounded-lg disabled:opacity-50"
        >
          Prev
        </button>

        <span className="text-gray-600">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 border rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Modal */}
      <CreateTicketModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditTicket(null);
        }}
        editTicket={editTicket}
      />
    </div>
  );
};

export default Tickets;
