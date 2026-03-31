import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

const Navbar = ({ theme, setTheme }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div
      className="sticky top-0 z-50 
      backdrop-blur-xl 
      bg-white/60 dark:bg-gray-900/60 
      border-b border-gray-200 dark:border-gray-800 
      px-6 py-3 flex justify-between items-center"
    >
      {/* Logo / Title */}
      <h1
        onClick={() => navigate("/")}
        className="text-xl font-semibold text-gray-800 dark:text-white cursor-pointer hover:text-blue-500 dark:hover:text-blue-400 transition"
      >
        Ticket Dashboard
      </h1>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* User Info */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold">
            {user?.name?.charAt(0) || "U"}
          </div>

          <span className="text-gray-700 dark:text-gray-300 text-sm hidden sm:block">
            {user?.name || "User"}
          </span>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="px-3 py-1 rounded-lg border text-sm bg-gray-100 dark:bg-gray-800 dark:text-white"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="bg-red-500/90 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg text-sm transition shadow-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
