import { useTheme } from "../hooks/themeContext";

export default function Footer() {
  const { isWarmthMode } = useTheme();

  return (
    <footer
      className={`
        mt-auto border-t-4
        ${isWarmthMode 
          ? "border-[#E94E41] bg-[#FAF3E3] text-[#39536B]" 
          : "border-cyan-500 bg-neutral-900 text-cyan-200"}
        transition-colors duration-300
      `}
    >
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <h2 className={`font-semibold ${isWarmthMode ? "text-[#E94E41]" : "text-cyan-400"}`}>
            Contact
          </h2>
          <p className="text-sm">
            ddarren@umich.edu ·{" "}
            <a
              href="https://github.com/DarrenDong0426"
              target="_blank"
              rel="noopener noreferrer"
              className={`${isWarmthMode ? "hover:text-[#E94E41]" : "hover:text-white"} transition-colors`}
            >
              GitHub
            </a>{" "}
            ·{" "}
            <a
              href="https://www.linkedin.com/in/darren-dong-108841210/"
              target="_blank"
              rel="noopener noreferrer"
              className={`${isWarmthMode ? "hover:text-[#E94E41]" : "hover:text-white"} transition-colors`}
            >
              LinkedIn
            </a>
          </p>
        </div>

        <div className="text-center text-sm opacity-80">
          <p>📍 Ann Arbor, Michigan · 🌐 English (US)</p>
        </div>

        <div className="text-center md:text-right text-xs opacity-70">
          <p>
            © {new Date().getFullYear()} Darren Dong — Built with React, Tailwind, and Flask.
          </p>
        </div>
      </div>
    </footer>
  );
}
