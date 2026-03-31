import { useState } from "react";
import { Link } from "react-router-dom";

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar = ({ darkMode, toggleDarkMode }: NavbarProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <nav className={`p-4 flex items-center justify-between ${darkMode ? "bg-black text-white" : "bg-white text-black"} shadow-md z-50 relative`}>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden text-xl p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Open navigation"
          >
            ☰
          </button>
          <span className="text-orange-500 text-2xl font-bold">Global Dine 🌍</span>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-orange-500">Home</Link>
          <Link to="/menu" className="hover:text-orange-500">Menu</Link>
          <Link to="/currency" className="hover:text-orange-500">Currency</Link>
          <Link to="/kitchen" className="hover:text-orange-500">Kitchen</Link>
          <Link to="/about" className="hover:text-orange-500">About</Link>
          <Link to="/contact" className="hover:text-orange-500">Contact</Link>

          <button
            onClick={toggleDarkMode}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg"
          >
            {darkMode ? "Light" : "Dark"}
          </button>
        </div>
      </nav>

      <aside
        className={`fixed inset-y-0 left-0 w-64 transform bg-white dark:bg-gray-900 border-r dark:border-gray-700 p-5 transition-transform duration-300 z-40 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <button
          onClick={() => setSidebarOpen(false)}
          className="mb-5 text-xl hover:text-orange-500"
          aria-label="Close sidebar"
        >
          ✕
        </button>

        <nav className="flex flex-col gap-4 text-lg">
          <Link onClick={() => setSidebarOpen(false)} to="/">Home</Link>
          <Link onClick={() => setSidebarOpen(false)} to="/menu">Menu</Link>
          <Link onClick={() => setSidebarOpen(false)} to="/currency">Currency</Link>
          <Link onClick={() => setSidebarOpen(false)} to="/kitchen">Kitchen</Link>
          <Link onClick={() => setSidebarOpen(false)} to="/about">About</Link>
          <Link onClick={() => setSidebarOpen(false)} to="/contact">Contact</Link>
          <button onClick={() => {
            toggleDarkMode();
            setSidebarOpen(false);
          }} className="mt-4 px-4 py-2 rounded-lg bg-orange-500 text-white">
            {darkMode ? "Light" : "Dark"}
          </button>
        </nav>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Navbar;