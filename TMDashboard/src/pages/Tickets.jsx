import { useDispatch } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useTickets } from "../hooks/useTickets";

import CreateTicketModal from "../components/CreateTicketModal";
import Loader from "../components/Loader";
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

  useEffect(() => {
    getTickets(limit, (page - 1) * limit);
  }, [page]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

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

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete?")) {
      removeTicket(id);
      toast.success("Ticket deleted successfully");
    }
  };

  const handleEdit = (ticket) => {
    setEditTicket(ticket);
    setIsModalOpen(true);
  };

  if (loading) return <Loader />;

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Tickets
        </h1>

        <div className="flex gap-2">
          <button
            onClick={() => navigate("/")}
            className="border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-lg 
            hover:bg-gray-100 dark:hover:bg-gray-700 
            text-gray-800 dark:text-gray-200"
          >
            ← Dashboard
          </button>

          {isAdmin && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 
              text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
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
          className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 w-full 
          bg-white dark:bg-gray-800 
          text-gray-800 dark:text-gray-200 
          placeholder-gray-400 dark:placeholder-gray-500
          focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 
          bg-white dark:bg-gray-800 
          text-gray-800 dark:text-gray-200"
        >
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
        <table className="w-full text-left">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm uppercase">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Title</th>
              <th className="p-3">Status</th>
              {isAdmin && <th className="p-3">Actions</th>}
            </tr>
          </thead>

          <tbody className="text-sm text-gray-700 dark:text-gray-300">
            {filteredTickets.map((ticket) => (
              <tr
                key={ticket.id}
                className="border-b border-gray-200 dark:border-gray-700 
                hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
              >
                <td className="p-3">{ticket.id}</td>
                <td className="p-3">{ticket.title}</td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      ticket.status === "Resolved"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                    }`}
                  >
                    {ticket.status}
                  </span>
                </td>

                {isAdmin && (
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => handleEdit(ticket)}
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(ticket.id)}
                      className="text-red-600 dark:text-red-400 hover:underline"
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
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
          disabled:opacity-50 
          text-gray-800 dark:text-gray-200 
          hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Prev
        </button>

        <span className="text-gray-600 dark:text-gray-400">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
          disabled:opacity-50 
          text-gray-800 dark:text-gray-200 
          hover:bg-gray-100 dark:hover:bg-gray-700"
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
