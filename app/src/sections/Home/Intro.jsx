import { useTheme } from '../../hooks/themeContext.jsx'; // Adjust path as necessary
import profilePic from '../../assets/images/darren.jpg';
import linkedinLogo from '../../assets/images/linkedin_logo.png'
import githubLogo from '../../assets/images/github_logo.png'
import { motion } from "framer-motion";

const leftSlide = {
  hidden: { opacity: 0, x: -80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const rightSlide = {
  hidden: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function Intro(){
    const { isWarmthMode } = useTheme();

    return (
        <>
        <div className={`
            w-screen min-h-screen flex items-center justify-center relative overflow-hidden
            transition-colors duration-500
            ${isWarmthMode
                ? "bg-[radial-gradient(ellipse_80%_60%_at_20%_10%,rgba(255,226,237,0.75)_60%,rgba(247,243,234,1)_100%)]"
                  + " before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_70%_30%_at_90%_95%,rgba(203,230,246,0.5)_30%,rgba(255,255,255,0)_100%)] before:z-0"
                  + " after:pointer-events-none after:absolute after:inset-0 after:bg-[radial-gradient(ellipse_90%_65%_at_62%_55%,rgba(255,246,223,0.3)_20%,rgba(250,226,200,0)_99%)] after:z-0"
                : "bg-[radial-gradient(ellipse_80%_60%_at_20%_10%,rgba(22,34,57,0.8)_60%,rgba(18,32,47,1)_100%)]"
                  + " before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_70%_30%_at_90%_95%,rgba(65,211,252,0.09)_40%,rgba(37,60,94,0)_100%)] before:z-0"
                  + " after:pointer-events-none after:absolute after:inset-0 after:bg-[radial-gradient(ellipse_90%_65%_at_62%_55%,rgba(0,208,255,0.08)_25%,rgba(22,34,57,0)_100%)] after:z-0"
            }
        `} style={{zIndex: 0}}>
            {/* Div component
              * 
              * before and after: Psuedo-elements that CSS creates that are layered over the main div to create more dynamic design
              *   - pointer-events-none: Allows these layers to not interfere with any button events if there are any
              *   - inset-0: Sets the position of the layer to 0 in all direction, giving full coverage
              * 
              */}
            <div className={
              `z-10 flex max-w-5xl w-full gap-10 flex-[1] rounded-3xl shadow-xl p-6 mx-auto border-2
              ${isWarmthMode
                ? "border-[#E94E41] bg-[#FAF3E3]/90"
                : "border-cyan-700 bg-[#151C26]/90"}
              backdrop-blur-[2px]`
            }>
                <div className="flex items-center">
                  <motion.div
                    className={
                        isWarmthMode
                        ? "bg-gradient-to-b from-[#FFE2ED] to-[#FAF3E3] rounded-full p-2 border-4 border-[#E94E41] shadow-lg"
                        : "bg-gradient-to-b from-[#3DAEFF] to-[#223042] rounded-full p-2 border-4 border-cyan-700 shadow-lg"
                    }
                    variants={leftSlide}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.3 }}
                  >
                        <img 
                            src={profilePic}
                            alt="Intro"
                            className={`w-64 h-64 md:w-96 md:h-96 rounded-full object-cover shadow-2xl flex-shrink-0 border-4
                            ${isWarmthMode ? "border-white" : "border-[#151C26]"}`}
                        />
                    </motion.div>
                </div>
                  <motion.div
                    className="flex flex-col justify-center flex-[2]"
                    variants={rightSlide}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.3 }}
                  >
                    <div
                      className={`
                        rounded-xl border-l-8 shadow-inner p-7 transition-colors duration-500
                        ${isWarmthMode
                          ? "bg-[#FFF8F3] border-[#264653]"
                          : "bg-[#212838]/90 border-cyan-700"
                        }
                      `}
                    >
                        <h1 className={`text-3xl lg:text-4xl font-bold mb-4 text-center tracking-wide 
                          ${isWarmthMode ? "text-[#E94E41]" : "text-cyan-400"}`}>
                          Welcome to FolioX – My Digital Portfolio!
                        </h1>
                        <p className={`mb-4 ${isWarmthMode ? "text-[#264653]" : "text-gray-300"}`}>
                            I’m Darren Dong, a senior undergraduate at the University of Michigan, Ann Arbor, pursuing a Bachelor’s degree in Computer Science with a minor in Electrical Engineering. My interests lie in system design and the integration of Artificial Intelligence and Machine Learning with both software and embedded systems. I primarily work with C++ and Python in my projects, but I’m always eager to expand my toolkit and explore new technologies and methodologies.
                        </p>
                        <p className={`mb-4 ${isWarmthMode ? "text-[#39536B]" : "text-gray-300"}`}>
                            Here, you’ll find an overview of my work in the Projects section, downloadable resumes summarizing my skills and experience in Resume, key moments and formative experiences in Highlights, and answers to common questions about this site in FAQs. Use the navigation bar above to explore each section in more detail.
                        </p>
                        <p className={`mb-4 ${isWarmthMode ? "text-[#39536B]" : "text-gray-300"}`}>
                            Feel free to explore the site, reach out with any inquiries, and dive deeper into the sections that interest you. I always appreciate feedback, which will be considered for future improvements.
                        </p>
                        <div className="flex gap-4 mt-2 justify-center">
                            <a 
                                href="https://www.linkedin.com/in/darren-dong-108841210/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                                className={`
                                  rounded-full border-2 transition p-2 shadow
                                  ${isWarmthMode
                                    ? "border-[#E94E41] bg-[#FFE2ED] hover:bg-[#E94E41]/20"
                                    : "border-cyan-500 bg-[#232b39] hover:bg-cyan-800/20"}
                                `}
                            >
                                <img src={linkedinLogo} alt="LinkedIn Logo" className="w-8 h-8"/>
                            </a>
                            <a 
                                href="https://github.com/DarrenDong0426" 
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub"
                                className={`
                                  rounded-full border-2 transition p-2 shadow
                                  ${isWarmthMode
                                    ? "border-[#264653] bg-[#e2eafc] hover:bg-[#264653]/20"
                                    : "border-cyan-500 bg-[#232b39] hover:bg-cyan-800/20"}
                                `}
                            >
                                <img src={githubLogo} alt="GitHub Logo" className="w-8 h-8"/>
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
        </>
    )
}