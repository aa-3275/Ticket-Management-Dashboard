import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchTicketsAPI } from "../services/ticketService";
import {
  setTickets,
  setTotal,
  setLoading,
  setError,
} from "../store/ticketSlice";
import { useNavigate } from "react-router-dom";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { tickets, loading } = useSelector((state) => state.tickets);
  const navigate = useNavigate();

  useEffect(() => {
    const getTickets = async () => {
      try {
        dispatch(setLoading(true));

        const data = await fetchTicketsAPI(10, 0);

        const transformed = data.todos.map((item) => ({
          id: item.id,
          title: item.todo,
          status: item.completed ? "Resolved" : "Pending",
        }));

        dispatch(setTickets(transformed));
        dispatch(setTotal(data.total));
      } catch (err) {
        dispatch(setError("Failed to fetch"));
      } finally {
        dispatch(setLoading(false));
      }
    };

    if (tickets.length === 0) {
      getTickets();
    }
  }, [dispatch, tickets.length]); // ✅ FIXED

  // 📊 Stats
  const total = tickets.length;
  const pending = tickets.filter((t) => t.status === "Pending").length;
  const resolved = tickets.filter((t) => t.status === "Resolved").length;

  const chartData = [
    { name: "Pending", value: pending },
    { name: "Resolved", value: resolved },
  ];

  const COLORS = ["#facc15", "#22c55e"];

  // ✅ Loading state
  if (loading) {
    return <div className="p-6 text-gray-500">Loading dashboard...</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

      {/* Cards */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        {[
          { label: "Total Tickets", value: total, color: "" },
          { label: "Pending", value: pending, color: "text-yellow-500" },
          { label: "Resolved", value: resolved, color: "text-green-500" },
        ].map((item, i) => (
          <div
            key={i}
            onClick={() => navigate("/tickets")}
            className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition cursor-pointer"
          >
            <p className="text-gray-500 text-sm">{item.label}</p>
            <h2 className={`text-3xl font-bold ${item.color}`}>{item.value}</h2>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="mb-4 font-semibold">Ticket Distribution</h2>

          <PieChart width={300} height={300}>
            <Pie
              data={chartData}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="mb-4 font-semibold">Overview</h2>

          <BarChart width={350} height={300} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#3b82f6" />
          </BarChart>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={() => navigate("/tickets")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow"
        >
          View All Tickets →
        </button>
      </div>

      {/* Empty */}
      {tickets.length === 0 && !loading && (
        <div className="mt-10 text-center text-gray-500">
          No tickets found. Go to Tickets to create one.
        </div>
      )}
    </div>
  );
};

export default Dashboard;
