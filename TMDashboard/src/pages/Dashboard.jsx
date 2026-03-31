import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTickets } from "../hooks/useTickets";

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

import Loader from "../components/Loader";

const Dashboard = () => {
  const navigate = useNavigate();
  const { tickets, loading, getTickets } = useTickets();

  useEffect(() => {
    if (tickets.length === 0) {
      getTickets(10, 0);
    }
  }, []);

  // Stats
  const total = tickets.length;
  const pending = tickets.filter((t) => t.status === "Pending").length;
  const resolved = tickets.filter((t) => t.status === "Resolved").length;

  const chartData = [
    { name: "Pending", value: pending },
    { name: "Resolved", value: resolved },
  ];

  const COLORS = ["#facc15", "#22c55e"];

  if (loading) return <Loader />;

  return (
    <div
      className="
  min-h-screen 
  bg-gray-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-900 dark:to-gray-800
  text-gray-800 dark:text-gray-200
"
    >
      {/* Heading */}
      <h1 className="text-2xl font-semibold mb-6 text-gray-800"> Dashboard</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {[
          { label: "Total Tickets", value: total, color: "" },
          { label: "Pending", value: pending, color: "text-yellow-400" },
          { label: "Resolved", value: resolved, color: "text-green-400" },
        ].map((item, i) => (
          <div
            key={i}
            onClick={() => navigate("/tickets")}
            className="cursor-pointer 
              bg-white dark:bg-gray-800/70
              backdrop-blur-lg 
              border border-gray-200 dark:border-gray-700 
              rounded-2xl p-5 
              shadow-lg hover:shadow-xl 
              transition-all duration-200"
          >
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {item.label}
            </p>
            <h2 className={`text-3xl font-bold ${item.color}`}>{item.value}</h2>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white/70 dark:bg-gray-800/60 backdrop-blur-lg border border-gray-200 dark:border-gray-700 rounded-2xl p-5 shadow-lg">
          <h2 className="mb-4 font-semibold text-gray-800 dark:text-white">
            Ticket Distribution
          </h2>

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

            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
              }}
            />
          </PieChart>
        </div>

        {/* Bar Chart */}
        <div className="bg-white/70 dark:bg-gray-800/60 backdrop-blur-lg border border-gray-200 dark:border-gray-700 rounded-2xl p-5 shadow-lg">
          <h2 className="mb-4 font-semibold text-gray-800 dark:text-white">
            Overview
          </h2>

          <BarChart width={350} height={300} data={chartData}>
            <CartesianGrid stroke="#374151" strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />

            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
              }}
            />

            <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={() => navigate("/tickets")}
          className="bg-blue-600 hover:bg-blue-700 
          dark:bg-blue-500 dark:hover:bg-blue-600 
          text-white px-6 py-2 rounded-lg 
          shadow-md hover:shadow-lg 
          transition-all duration-200"
        >
          View All Tickets →
        </button>
      </div>

      {/* Empty State */}
      {tickets.length === 0 && !loading && (
        <div className="mt-10 text-center text-gray-500 dark:text-gray-400">
          No tickets found. Go to Tickets to create one.
        </div>
      )}
    </div>
  );
};

export default Dashboard;
