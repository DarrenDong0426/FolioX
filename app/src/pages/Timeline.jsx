import { motion } from "framer-motion"
import Header from "../components/Header";
import { EventProvider } from "../hooks/eventsContext";
import Events from "../sections/Timeline/Events";
import { useTheme } from '../hooks/themeContext.jsx';
import Footer from "../components/Footer.jsx";

export default function Timeline(){
  const { isWarmthMode } = useTheme();

  const Background = (
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
              transition={{
                duration: 15 + Math.random() * 20,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e27] via-[#1a1f4a] to-[#0a0e27]" />
          {Array.from({ length: 2000 }).map((_, i) => (
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
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 2 + Math.random() * 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 3,
              }}
            />
          ))}
        </>
      )}
    </div>
  );

  return (
    <div className="relative min-h-screen overflow-hidden">
      {Background}
      <div className="flex flex-col min-h-screen relative z-10 transition-colors duration-500">
        <Header/>
        <main className='flex flex-col flex-1 min-h-0'>
          <h1
            style={{ fontFamily: "'Orbitron', 'Arial', sans-serif" }}
            className={`
              text-4xl font-bold mb-3 mt-3 text-center transition-colors tracking-wide uppercase drop-shadow-sm
              ${isWarmthMode ? "text-[#E94E41]" : "text-cyan-300"}
            `}
          >
            Timeline
          </h1>
          <EventProvider>
            <Events/>
          </EventProvider>
          <Footer/>
        </main>
      </div>
    </div>
  );
}