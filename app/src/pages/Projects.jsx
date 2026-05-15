// Imports
import { motion } from "framer-motion"
import Header from "../components/Header";                          // Imports the Header component from the path ../components/Header.jsx
import ProjectsList from '../sections/Projects/ProjectsList';       // Import Projects component from the path ../sections/Projects/Projects.jsx
import { ProjectListProvider } from '../hooks/projectListContext';  // Import ProjectListProvider from the path ../hooks/projectListContext.jsx
import { useTheme } from '../hooks/themeContext.jsx';               // Import theme context
import Footer from "../components/Footer.jsx";

/* Defines the Project page component
 *
 * Sets the Project page Component that will render when the path is /Projects
 * Include a search bar component to search for a specific project based on title
 * Include filter option box that filters on type of project, if the project is for school or personal, or by time
 * Include a legend for labels on projects. 
 */
export default function Projects(){
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

  return (
    <div className={`
      min-h-screen flex flex-col transition-colors duration-500
      ${isWarmthMode
        ? "bg-[radial-gradient(ellipse_80%_60%_at_20%_10%,rgba(255,226,237,0.7)_60%,#fff8f3_100%)]"
        : "bg-[radial-gradient(ellipse_80%_60%_at_20%_10%,rgba(22,34,57,0.88)_60%,#1b2432_100%)]"
      }
    `}>
      {/* Div: Content Wrapper over the entire home page
        *
        * min-h-screen sets the minimum height of the element to be 100% of the viewpoint height (the entire browser window screen)
        * flex sets the children to be in a flexbox format
        * flex-col sets the flex direction to be columns so children are placed vertically
        * bg (theme-adaptive) sets the background of the project page
        *  
      */}
      {Background}
      <Header/>

      <main className='flex-1 overflow-y-auto py-4 relative z-10'>
        {/* Main: Content Wrapper over all sections. Main is used to identify the "main" part of this page
          *
          * flex-1 fills in the flex direction (column here)
          * overflow-y-auto shows scrollbar if children overflow. Otherwise, no scrollbar
          * px-4 sets the horizontal padding 
          * py-4 sets the vertical padding 
          *  
         */}
       <h1
        style={{ fontFamily: "'Orbitron', 'Arial', sans-serif" }}
        className={`
          text-4xl font-bold mb-3 text-center
          transition-colors
          tracking-wide uppercase
          ${isWarmthMode ? "text-[#E94E41]" : "text-cyan-300"}
        `}
      >
        Projects
      </h1>
        {/* Wrap the ProjectsList component with ProjectListProvider to provide context */}
        <ProjectListProvider>
          <ProjectsList/>
        </ProjectListProvider>
      </main>
      <Footer/>
    </div>
  );
}