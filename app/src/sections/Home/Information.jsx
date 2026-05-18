// Imports
import { Link } from "react-router-dom";
import { useTheme } from '../../hooks/themeContext.jsx';
import { useState } from "react";
import { motion } from "framer-motion";

export default function Information() {
  const { isWarmthMode } = useTheme();

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          desc: formData.message,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        console.error(data.error);
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  const leftSlide = {
    hidden: { opacity: 0, x: -80 },
    visible: {
      opacity: 1, x: 0,
      transition: { type: "spring", stiffness: 70, damping: 20, duration: 0.8 },
    },
  };

  const rightSlide = {
    hidden: { opacity: 0, x: 80 },
    visible: {
      opacity: 1, x: 0,
      transition: { type: "spring", stiffness: 70, damping: 20, duration: 0.8 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  const inputClass = `
    flex-1 border rounded px-3 py-2 text-sm
    transition-colors outline-none focus:outline-none focus:ring-2
    ${isWarmthMode
      ? "border-gray-300 bg-white text-gray-800 focus:ring-blue-400"
      : "border-cyan-900 bg-[#202534] text-cyan-100 focus:ring-cyan-400"
    }
  `;

  const labelClass = `md:w-28 text-sm font-semibold shrink-0 ${isWarmthMode ? "text-gray-700" : "text-gray-200"}`;

  return (
    <div className="w-full h-full flex items-center justify-center transition-colors duration-500">
      <div
        className={`
          max-w-5xl w-full mx-auto flex flex-col items-center gap-6 px-6 py-6 my-6
          rounded-3xl shadow-xl border-2 z-10
          ${isWarmthMode
            ? "bg-[#FFF8F3]/90 border-[#E94E41]"
            : "bg-[#151C26]/90 border-cyan-700"
          }
        `}
      >
        {/* Heading */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className={`
            text-3xl lg:text-4xl font-extrabold text-center tracking-wide
            ${isWarmthMode ? "text-gray-800" : "text-cyan-300"}
          `}
        >
          Resources
        </motion.h1>

        <div className="flex flex-col lg:flex-row w-full gap-6 items-stretch">

          {/* LEFT: FAQ + CHANGELOG */}
          <motion.div
            className="flex flex-col flex-1 gap-5"
            variants={leftSlide}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.5 }}
          >
            {/* FAQ */}
            <div
              className={`
                p-5 rounded-lg shadow-md flex-1 flex flex-col justify-between border
                transition-colors
                ${isWarmthMode ? "bg-gray-50 border-[#e2eafc]" : "bg-[#19212b] border-cyan-700"}
              `}
            >
              <div>
                <h2 className={`text-2xl lg:text-3xl font-bold mb-2 ${isWarmthMode ? "text-[#E94E41]" : "text-cyan-400"}`}>
                  FAQs
                </h2>
                <p className={`text-sm ${isWarmthMode ? "text-gray-700" : "text-gray-300"}`}>
                  Answers to common questions visitors may have about this website and its content.
                </p>
              </div>
              <div className="text-right mt-3">
                <Link
                  to="/FaQs"
                  className={`
                    font-semibold underline underline-offset-2 transition-colors duration-200
                    ${isWarmthMode ? "text-blue-600 hover:text-[#E94E41]" : "text-cyan-300 hover:text-cyan-100"}
                  `}
                >
                  View FAQs
                </Link>
              </div>
            </div>

            {/* CHANGELOG */}
            <div
              className={`
                p-5 rounded-lg shadow-md flex-1 flex flex-col justify-between border
                transition-colors
                ${isWarmthMode ? "bg-gray-50 border-[#e2eafc]" : "bg-[#19212b] border-cyan-700"}
              `}
            >
              <div>
                <h2 className={`text-2xl lg:text-3xl font-bold mb-2 ${isWarmthMode ? "text-[#E94E41]" : "text-cyan-400"}`}>
                  Changelog
                </h2>
                <p className={`text-sm ${isWarmthMode ? "text-gray-700" : "text-gray-300"}`}>
                  Significant updates after deployment — new features, bug fixes, and news.
                </p>
              </div>
              <div className="text-right mt-3">
                <Link
                  to="/Changelog"
                  className={`
                    font-semibold underline underline-offset-2 transition-colors duration-200
                    ${isWarmthMode ? "text-blue-600 hover:text-[#E94E41]" : "text-cyan-300 hover:text-cyan-100"}
                  `}
                >
                  View Changelog
                </Link>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: CONTACT FORM */}
          <motion.div
            className="flex-1 flex flex-col"
            variants={rightSlide}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
          >
            <div
              className={`
                rounded-lg shadow-lg flex-1 flex flex-col border p-5 transition-colors
                ${isWarmthMode ? "bg-white border-[#e2eafc]" : "bg-[#1a222c] border-cyan-700"}
              `}
            >
              <h2 className={`text-2xl lg:text-3xl font-bold mb-1 text-center ${isWarmthMode ? "text-[#E94E41]" : "text-cyan-400"}`}>
                Contact Me
              </h2>
              <p className={`text-xs mb-4 text-center ${isWarmthMode ? "text-gray-500" : "text-gray-400"}`}>
                Name and email are optional — only include your email if you'd like a reply.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1 justify-between">
                <div className="flex flex-col gap-4">
                  {/* Name */}
                  <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
                    <label htmlFor="name" className={labelClass}>
                      Name <span className="text-gray-400 font-normal text-xs">(optional)</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Your name"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
                    <label htmlFor="email" className={labelClass}>
                      Email <span className="text-gray-400 font-normal text-xs">(optional)</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Your email"
                    />
                  </div>

                  {/* Message */}
                  <div className="flex flex-col md:flex-row md:items-start gap-1 md:gap-3">
                    <label htmlFor="message" className={`${labelClass} md:mt-2`}>
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Type your message here..."
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                </div>

                {/* Submit + status */}
                <div className="flex items-center justify-between">
                  <div>
                    {status === "success" && (
                      <p className="text-green-500 text-sm font-semibold">✅ Message sent successfully!</p>
                    )}
                    {status === "error" && (
                      <p className="text-red-500 text-sm font-semibold">❌ Failed to send. Please try again.</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className={`
                      px-6 py-2 rounded font-bold transition-colors focus:outline-none focus:ring-2
                      ${isWarmthMode
                        ? "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-400"
                        : "bg-cyan-700 text-white hover:bg-cyan-800 focus:ring-cyan-400"
                      }
                    `}
                  >
                    {status === "loading" ? "Sending..." : "Send"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}