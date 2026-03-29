import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar /> {/* 🔥 Global Navbar */}
      <div className="p-4">{children}</div>
    </div>
  );
};

export default Layout;
