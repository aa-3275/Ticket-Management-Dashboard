import Navbar from "./Navbar";

const Layout = ({ children, theme, setTheme }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar theme={theme} setTheme={setTheme} />
      {/* 🔥 Global Navbar */}
      <div className="p-4">{children}</div>
    </div>
  );
};

export default Layout;
