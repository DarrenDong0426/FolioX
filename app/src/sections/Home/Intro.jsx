import { useTheme } from '../../hooks/themeContext.jsx';
import profilePic from '../../assets/images/darren.jpg';
import linkedinLogo from '../../assets/images/linkedin_logo.png';
import githubLogo from '../../assets/images/github_logo.png';
import { motion } from "framer-motion";

export default function Intro() {
  const { isWarmthMode } = useTheme();

  const linkedinLink = "<" + "a";
  const githubLink = "<" + "a";

  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center text-center max-w-2xl"
      >
        <div
          className={`
            rounded-full p-1 mb-6
            ${isWarmthMode
              ? "bg-gradient-to-br from-[#FFE2ED] to-[#FAF3E3] border-4 border-[#E94E41]"
              : "bg-gradient-to-br from-[#3DAEFF] to-[#223042] border-4 border-cyan-500"}
            shadow-xl
          `}
        >
          <img
            src={profilePic}
            alt="Darren Dong"
            className={`
              w-40 h-40 md:w-44 md:h-44 rounded-full object-cover
              border-2 ${isWarmthMode ? "border-white" : "border-[#151C26]"}
            `}
          />
        </div>

        <h1 className={`
          text-5xl md:text-6xl font-bold mb-3 tracking-tight
          ${isWarmthMode ? "text-[#264653]" : "text-cyan-200"}
        `}>
          Darren Dong
        </h1>

        <p className={`
          text-lg md:text-xl mb-6 max-w-xl
          ${isWarmthMode ? "text-[#39536B]" : "text-cyan-300"}
        `}>
          CS Master's student @ Michigan · Software, AI/ML, and embedded systems.
        </p>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => window.open('https://www.linkedin.com/in/darren-dong-108841210/', '_blank', 'noopener,noreferrer')}
            aria-label="LinkedIn"
            className={`
              rounded-full border-2 p-2 transition-transform hover:scale-110
              ${isWarmthMode
                ? "border-[#E94E41] bg-[#FFE2ED] hover:bg-[#E94E41]/20"
                : "border-cyan-500 bg-[#232b39] hover:bg-cyan-800/20"}
            `}
          >
            <img src={linkedinLogo} alt="LinkedIn" className="w-6 h-6" />
          </button>
          <button
            type="button"
            onClick={() => window.open('https://github.com/DarrenDong0426', '_blank', 'noopener,noreferrer')}
            aria-label="GitHub"
            className={`
              rounded-full border-2 p-2 transition-transform hover:scale-110
              ${isWarmthMode
                ? "border-[#264653] bg-[#e2eafc] hover:bg-[#264653]/20"
                : "border-cyan-500 bg-[#232b39] hover:bg-cyan-800/20"}
            `}
          >
            <img src={githubLogo} alt="GitHub" className="w-6 h-6" />
          </button>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className={`mt-8 flex flex-col items-center gap-1 ${
          isWarmthMode ? "text-[#E94E41]" : "text-cyan-400"
        }`}
      >
        <span className="text-xs uppercase tracking-widest font-medium">Scroll</span>
        <span className="text-2xl">↓</span>
      </motion.div>
    </div>
  );
}