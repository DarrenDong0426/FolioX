// Imports
import { motion } from "framer-motion"
import PDFViewer from "../components/PDFViewer"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import getDocuments from "../hooks/getDocuments"
import { useTheme } from "../hooks/themeContext.jsx"
import Footer from "../components/Footer.jsx"

export default function Documents(){
    const { documents, setCurrDoc, currDoc, error, loading } = getDocuments()
    const { isWarmthMode } = useTheme();
    
    const hasDocuments = Array.isArray(documents) && documents.length > 0
    const validDoc = hasDocuments && currDoc >= 0 && currDoc < documents.length

    // Theme-aware text classes
    const headingClass = isWarmthMode ? "text-[#E94E41]" : "text-cyan-300";
    const subTextClass = isWarmthMode ? "text-[#a96871]" : "text-cyan-400";
    const descTextClass = isWarmthMode ? "text-[#6b3030]" : "text-cyan-100";
    const errorTextClass = isWarmthMode ? "text-red-600" : "text-[#F38BA3]";

    // Animated background (shared across all states: loading, error, content)
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

    if (error){
        return (
            <div className="relative min-h-screen flex flex-col overflow-hidden">
                {Background}
                <Header/>
                <p className={`text-center relative z-10 ${errorTextClass}`}>Error: {error.message}</p>
            </div>
        )
    }
        
    return (
        <div className="relative min-h-screen flex flex-col overflow-hidden">
            {Background}
            <Header/>
            <main className='flex flex-1 overflow-y-auto flex-row relative z-10'>
                {!loading && (
                    <div className="flex-[1]">
                        <Sidebar items={documents} currIndex={currDoc} setCurrDoc={setCurrDoc}/>
                    </div>
                )}
                <div className="flex flex-[4] items-start flex-col m-4 rounded-2xl shadow-xl">
                    <h1 className={`p-4 text-3xl font-bold text-center w-full font-mono tracking-tight uppercase ${headingClass}`}>
                        {loading ? "Documents" : (validDoc ? documents[currDoc].title : "Documents")}
                    </h1>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-4 w-full">
                            <div
                                className={`w-12 h-12 rounded-full border-4 border-t-transparent animate-spin
                                ${isWarmthMode ? "border-[#E94E41]" : "border-cyan-400"}
                                `}
                            />
                            <p
                                className={`font-mono tracking-widest uppercase text-sm
                                ${isWarmthMode ? "text-[#8B2D2D]" : "text-cyan-200"}
                                `}
                            >
                                Loading...
                            </p>
                        </div>
                    ) : validDoc ? (
                        <>
                            <p className={`text-center w-full ${subTextClass}`}>
                                Last Updated: {documents[currDoc].month_year}
                            </p>
                            <p className={`p-4 ${descTextClass}`}>
                                {documents[currDoc].desc}
                            </p>
                            <PDFViewer fileUrl={documents[currDoc].file_path}/>
                        </>
                    ) : (
                        <div className="w-full p-12 flex flex-col items-center justify-center">
                            <p className={`text-center ${subTextClass}`}>No documents found.</p>
                        </div>
                    )}
                </div>
             </main>
             <Footer/>
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
    )
}