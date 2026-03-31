import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import FoodMenu from "./pages/FoodMenu";
import CurrencyConverter from "./pages/CurrencyConverter";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Kitchen from "./pages/Kitchen";

const RouteLoader = ({ darkMode }: { darkMode: boolean }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center ${darkMode ? "bg-white/10" : "bg-black/70"} backdrop-blur-md`}>
          <div className={`text-center p-6 rounded-2xl border border-orange-300 ${darkMode ? "bg-black/60 dark:border-orange-400" : "bg-white/90"} shadow-2xl max-w-xs`}>
            <div className="mx-auto mb-4 h-14 w-14 rounded-full border-4 border-orange-400 border-t-transparent animate-spin" />
            <h2 className="text-xl font-bold text-orange-500">Loading Global Dine</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Preparing the experience for your chosen mood...</p>
          </div>
        </div>
      )}
    </>
  );
};

function AppRoutes({ darkMode }: { darkMode: boolean }) {
  const location = useLocation();

  return (
    <div className={darkMode ? "bg-black text-white min-h-screen" : "bg-gray-100 text-black min-h-screen"}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/menu" element={<FoodMenu />} />
        <Route path="/currency" element={<CurrencyConverter />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/kitchen" element={<Kitchen />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <RouteLoader key={location.pathname} darkMode={darkMode} />
    </div>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={darkMode ? "dark" : ""}>
      <Router>
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <AppRoutes darkMode={darkMode} />
      </Router>
    </div>
  );
}

export default App;