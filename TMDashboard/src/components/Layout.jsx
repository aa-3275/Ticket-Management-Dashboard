import Navbar from "./Navbar";

const Layout = ({ children, theme, setTheme }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar theme={theme} setTheme={setTheme} />
      {/* 🔥 Global Navbar */}
      <div
        className="p-4 bg-gray-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-900 dark:to-gray-800
  text-gray-800 dark:text-gray-200"
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
