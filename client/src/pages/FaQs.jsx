// Imports
import Header from "../components/Header";
import { useState } from "react";
import { useTheme } from "../hooks/themeContext.jsx";

export default function FaQs() {
  const { isWarmthMode } = useTheme(); // get theme

  const faqData = [
    {
      question: "What is this portfolio about?",
      answer: "This portfolio is designed to showcase my academic and professional progress starting from 2020 and beyond. Why 2020? That is when I programmed a project worth showcasing in high school. On this portfolio site, you can see projects I have created on the Project Page, a Document Page containing relevant downloadable PDFs, and a Timeline Page that highlights significant projects and events."
    },
    {
      question: "How was this portfolio developed and maintained?",
      answer: "This portfolio is primarily built using React on the frontend and Flask on the backend. I chose these technologies because I wanted to build my first website using bare-bones tools to get familiar with the fundamentals before moving on to more modern web frameworks. For styling, I used Tailwind CSS, as I am comfortable with CSS syntax and Tailwind provides an easier way to handle design. Additionally, some generative AI tools, such as ChatGPT, were used to assist with design, as I am less experienced in design. Any AI-generated code is thoroughly commented by me to ensure I understand how the design decisions were implemented, especially the Tailwind CSS syntax."
    },
    { question: "Who is the intended audience?", answer: "This portfolio is for anyone interested in my work, from professionals who want to explore my projects and technical skills to those curious about my career journey and growth." },
    { question: "What kinds of projects do you showcase?", answer: "Most projects showcased here are technical and engineering-based, spanning domains such as embedded systems, system design, software development, and AI/ML. These projects may come from academic assignments or personal endeavors. You can learn more about each project on the Projects Page of the site." },
    { question: "Can I contact you for feedback?", answer: "You can find my contact information at the bottom of the Home page. There is a form where you can provide an anonymous name and email if you would like a response, along with a message that will be sent to my email. My email address is also available in the footer of the site." },
    { question: "How often is your portfolio updated?", answer: "These projects will be updated periodically with new projects and features. You can view the Changelog to see any new updates as well as when the site was last updated. That being said, the website will be updated gradually after deployment, as I like to move on to other personal projects." },
    { question: "Are there any features planned in the future?", answer: "Several features are planned for the future, including a light and dark mode, individual pages for each event in the Timeline and Project sections to better explain and showcase them, a footer with quick details such as contact, and authentication with login functionality. This will allow me to update the website easily through my account and enable certain users to view locked projects in compliance with the university honor code. I welcome your feedback on the website, whether it’s a suggestion for a new feature, a bug report, or an improvement to the design. If a significant feature suggested by you is implemented, you will be credited in the Changelog." },
  ];

  const [openIndices, setOpenIndices] = useState([]);

  const toggleFaq = (index) => {
    if (openIndices.includes(index)) {
      setOpenIndices(openIndices.filter((i) => i !== index));
    } else {
      setOpenIndices([...openIndices, index]);
    }
  };

  // theme-aware styles
  const faqBg = isWarmthMode ? "bg-[#FFF8F0]" : "bg-[#181b22]";
  const faqBorder = isWarmthMode ? "border-[#E94E41]" : "border-cyan-500";
  const questionBg = isWarmthMode ? "hover:bg-[#FFECE5]" : "hover:bg-[#222936]";
  const questionText = isWarmthMode ? "text-[#8B2D2D]" : "text-cyan-300";
  const answerText = isWarmthMode ? "text-gray-700" : "text-cyan-100";

  return (
    <div className={`min-h-screen flex flex-col ${isWarmthMode ? "bg-[#FFF5EE]" : "bg-[#191b22]"}`}>
      <Header />
      <div className="w-full p-6">
        <h1 className={`text-4xl font-bold mb-8 text-center ${questionText}`}>
          Frequently Asked Questions (FAQs)
        </h1>
        <div className="space-y-4 w-full">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className={`rounded-lg shadow-md overflow-hidden w-full border-2 ${faqBorder} ${faqBg} transition-colors duration-300`}
            >
              <button
                className={`w-full text-left px-6 py-4 font-semibold ${questionText} ${questionBg} focus:outline-none focus:ring-2 focus:ring-blue-400 flex justify-between items-center transition-colors duration-300`}
                onClick={() => toggleFaq(index)}
              >
                <span>{faq.question}</span>
                <span className="ml-2 text-xl">
                  {openIndices.includes(index) ? "-" : "+"}
                </span>
              </button>

              {openIndices.includes(index) && (
                <div className={`px-6 py-4 border-t-2 ${faqBorder} ${answerText} transition-colors duration-300`}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
