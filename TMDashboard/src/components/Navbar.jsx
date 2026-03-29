import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="bg-white px-6 py-3 shadow flex justify-between items-center">
      <h1 className="font-semibold text-lg">Dashboard</h1>

      <div className="flex items-center gap-4">
        <span className="text-gray-600 text-sm">{user?.name || "User"}</span>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
