import { motion } from "framer-motion";
import Header from "../components/Header";
import { useState, useEffect, useMemo } from "react";
import { useTheme } from "../hooks/themeContext.jsx";
import Footer from "../components/Footer.jsx";

export default function FaQs() {
  const { isWarmthMode } = useTheme();
  const [faqData, setFaqData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openIndices, setOpenIndices] = useState([]);

  useEffect(() => {
    fetch('/api/faqs')
      .then(res => res.json())
      .then(data => {
        setFaqData(data.faqs || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const toggleFaq = (index) => {
    if (openIndices.includes(index)) {
      setOpenIndices(openIndices.filter((i) => i !== index));
    } else {
      setOpenIndices([...openIndices, index]);
    }
  };

  const faqBg = isWarmthMode ? "bg-[#FFF8F0]/90 backdrop-blur-md" : "bg-[#181b22]/90 backdrop-blur-md";
  const faqBorder = isWarmthMode ? "border-[#E94E41]" : "border-cyan-500";
  const questionBg = isWarmthMode ? "hover:bg-[#FFECE5]/80" : "hover:bg-[#222936]/80";
  const questionText = isWarmthMode ? "text-[#8B2D2D]" : "text-cyan-300";
  const answerText = isWarmthMode ? "text-gray-700" : "text-cyan-100";

  const Background = useMemo(() => (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {isWarmthMode ? (
        <>
          <div className="absolute inset-0 bg-gradient-to-tr from-pink-300 via-purple-300 to-blue-300 animate-gradient bg-[length:400%_400%]" />
          {Array.from({ length: 75 }).map((_, i) => (
            <motion.div
              key={`light-${i}`}
              className="absolute rounded-full"
              style={{
                width: `${50 + Math.random() * 100}px`,
                height: `${50 + Math.random() * 100}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`,
                opacity: 0.5 + Math.random() * 0.3,
              }}
              animate={{
                x: [0, Math.random() * 200 - 100, 0],
                y: [0, Math.random() * 100 - 50, 0],
                scale: [1, 0.8 + Math.random() * 0.4, 1],
              }}
              transition={{ duration: 15 + Math.random() * 20, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e27] via-[#1a1f4a] to-[#0a0e27]" />
          {Array.from({ length: 100 }).map((_, i) => (
            <motion.div
              key={`dark-${i}`}
              className="absolute rounded-full bg-cyan-300"
              style={{
                width: `${1 + Math.random() * 3}px`,
                height: `${1 + Math.random() * 3}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: 0.3 + Math.random() * 0.7,
                boxShadow: '0 0 4px rgba(125, 227, 252, 0.8)',
              }}
              animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.3, 1] }}
              transition={{ duration: 2 + Math.random() * 4, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 3 }}
            />
          ))}
        </>
      )}
    </div>
  ), [isWarmthMode]);

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      {Background}
      <Header />
      <div className="w-full p-6 relative z-10">
        <h1 className={`text-4xl font-bold mb-8 text-center ${questionText}`}>
          Frequently Asked Questions (FAQs)
        </h1>

        {loading ? (
          <p className={`text-center ${answerText}`}>Loading...</p>
        ) : faqData.length === 0 ? (
          <p className={`text-center ${answerText} opacity-70`}>No FAQs yet.</p>
        ) : (
          <div className="space-y-4 w-full">
            {faqData.map((faq, index) => (
              <div
                key={faq.id}
                className={`rounded-lg shadow-md overflow-hidden w-full border-2 ${faqBorder} ${faqBg} transition-colors duration-300`}
              >
                <button
                  className={`w-full text-left px-6 py-4 font-semibold ${questionText} ${questionBg} focus:outline-none focus:ring-2 focus:ring-blue-400 flex justify-between items-center transition-colors duration-300`}
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.question}</span>
                  <span className="ml-2 text-xl">{openIndices.includes(index) ? "-" : "+"}</span>
                </button>

                {openIndices.includes(index) && (
                  <div className={`px-6 py-4 border-t-2 ${faqBorder} ${answerText} transition-colors duration-300`}>
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />

      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradientShift 40s ease infinite;
        }
      `}</style>
    </div>
  );
}