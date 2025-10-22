// Imports
import Header from "../components/Header";
import Footer from "../components/Footer.jsx";
import { useTheme } from "../hooks/themeContext.jsx";

export default function Changelog() {
  const { isWarmthMode } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col ${isWarmthMode ? "bg-[#FFF5EE]" : "bg-[#191b22]"}`}>
      <Header />
      <div className="flex flex-col items-center p-6">
        <h1 className={`text-3xl font-bold mb-2 ${isWarmthMode ? "text-[#8B2D2D]" : "text-cyan-300"}`}>
          Changelog
        </h1>
        <p className={`text-center text-sm ${isWarmthMode ? "text-gray-600" : "text-gray-400"}`}>
          Last Updated: October 2025
        </p>
        <div className={`mt-4 w-full max-w-3xl p-4 rounded-xl shadow-lg border-2 ${
          isWarmthMode ? "bg-[#FFF8F0] border-[#E94E41]" : "bg-[#23232a] border-cyan-500"
        }`}>
          <p className={`text-sm ${isWarmthMode ? "text-gray-700" : "text-cyan-100"}`}>
            • Version 1.0.0 – Initial release of the portfolio.<br />
          </p>
          <p className={`text-sm ${isWarmthMode ? "text-gray-700" : "text-cyan-100"}`}>
            • Version 1.1.0 – Contact Form on Main Page Implemented.<br />
          </p>
          <p className={`text-sm ${isWarmthMode ? "text-gray-700" : "text-cyan-100"}`}>
            • Version 1.1.1 – Fixed bug with Timeline events not showing correctly on Safari Browser.<br />
          </p>
          
        </div>
      </div>
      <Footer />
    </div>
  );
}
