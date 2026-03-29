import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    dispatch(
      login({
        user: { name: "Alok" },
        token: "abc123",
      }),
    );
    navigate("/");
  };

  return (
    <div className="h-screen w-full relative">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1557683316-973673baf926"
          alt="bg"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Login Card */}
      <div className="relative flex items-center justify-center h-full">
        <div className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-xl rounded-2xl p-8 w-96 text-white">
          <h1 className="text-3xl font-bold mb-6 text-center">Welcome Back</h1>

          <div className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              className="bg-white/20 border border-white/30 rounded-lg px-3 py-2 placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="password"
              placeholder="Password"
              className="bg-white/20 border border-white/30 rounded-lg px-3 py-2 placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
              onClick={handleLogin}
              className="bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded-lg font-semibold"
            >
              Login
            </button>
          </div>

          <p className="text-sm text-center mt-4 opacity-80">
            Demo credentials (no backend)
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
