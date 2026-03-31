import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // 🔥 Validation
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    // 🔥 Mock auth logic
    if (email === "admin@test.com" && password === "1234") {
      dispatch(
        login({
          user: { name: "Admin User", role: "admin" },
          token: "admin-token",
        }),
      );
      toast.success("Logged in as Admin");
      navigate("/");
    } else if (email === "user@test.com" && password === "1234") {
      dispatch(
        login({
          user: { name: "Normal User", role: "user" },
          token: "user-token",
        }),
      );
      toast.success("Logged in as User");
      navigate("/");
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen w-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 w-screen h-screen">
        <img
          src="https://images.unsplash.com/photo-1557683316-973673baf926"
          alt="bg"
          className="w-full h-full object-cover object-center"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-blue-900/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8 w-full max-w-md text-white">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Welcome Back 👋
          </h1>

          <div className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/20 border border-white/30 rounded-lg px-3 py-2 placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/20 border border-white/30 rounded-lg px-3 py-2 placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
              disabled={!email || !password}
              onClick={handleLogin}
              className={`py-2 rounded-lg font-semibold transition ${
                !email || !password
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              Login
            </button>
          </div>

          {/* 🔥 Extra UX */}
          <p className="text-sm text-center mt-4 opacity-80">
            Demo: admin@test.com / 1234
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
