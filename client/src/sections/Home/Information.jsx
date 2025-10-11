// Imports
import { Link } from "react-router-dom";
import { useTheme } from '../../hooks/themeContext.jsx'; // Adjust path as necessary

/** Defines the Information section of the home page
 * 
 * Briefly explain the FaQ and Changelog section as well as a navigation section
 * Includes a contact message with that can be anonymous in name and email. 
 * Email should be provided if reply is wanted. 
 * Mesasge must not be blank 
 * 
 */
export default function Information() {
  const { isWarmthMode } = useTheme();

  return (
    <div className={`
      w-screen min-h-screen flex items-center justify-center relative overflow-hidden
      transition-colors duration-500 
      ${isWarmthMode
        ? "bg-[radial-gradient(ellipse_80%_60%_at_20%_10%,rgba(255,226,237,0.7)_60%,rgba(247,243,234,1)_100%)]"
        : "bg-[radial-gradient(ellipse_80%_60%_at_20%_10%,rgba(22,34,57,0.8)_60%,rgba(18,32,47,1)_100%)]"
      }
    `}>
      <div className={`
        max-w-6xl w-full mx-auto flex flex-col items-center gap-16 px-4 py-10
        rounded-3xl shadow-xl border-2
        z-10
        ${isWarmthMode
          ? "bg-[#FFF8F3]/90 border-[#E94E41]"
          : "bg-[#151C26]/90 border-cyan-700"
        }
      `}>
        <h1 className={`
          text-4xl md:text-5xl font-extrabold text-center mb-2 transition-colors
          ${isWarmthMode ? "text-gray-800" : "text-cyan-300"}
        `}>
          Resources
        </h1>

        <div className="flex flex-col lg:flex-row w-full gap-16 items-stretch">
          {/* Div Context wrapper for the entire resource content */}
          <div className="flex flex-col flex-1 gap-6">
            <div className={`
              p-6 rounded-lg shadow-md flex-1 flex flex-col justify-between border
              transition-colors
              ${isWarmthMode
                ? "bg-gray-50 border-[#e2eafc]"
                : "bg-[#19212b] border-cyan-700"
              }
            `}>
              <div>
                <h2 className={`text-2xl lg:text-3xl font-bold mb-2
                  ${isWarmthMode ? "text-[#E94E41]" : "text-cyan-400"}
                  `}>
                  FAQs
                </h2>
                <p className={`
                  mb-4
                  ${isWarmthMode ? "text-gray-700" : "text-gray-200"}
                `}>
                  The FAQ (Frequently Asked Questions) page answers common questions visitors may have about this website and its content.
                </p>
              </div>
              <div className="text-right mt-auto">
                <Link 
                  to="/FaQs"
                  className={`
                    font-semibold underline underline-offset-2
                    transition-colors duration-200
                    ${isWarmthMode
                      ? "text-blue-600 hover:text-[#E94E41]"
                      : "text-cyan-300 hover:text-cyan-100"}
                  `}
                >
                  View FAQs
                </Link>
              </div>
            </div>

            <div className={`
              p-6 rounded-lg shadow-md flex-1 flex flex-col justify-between border
              transition-colors
              ${isWarmthMode
                ? "bg-gray-50 border-[#e2eafc]"
                : "bg-[#19212b] border-cyan-700"}
            `}>
              <div>
                <h2 className={`text-2xl lg:text-3xl font-bold mb-2
                  ${isWarmthMode ? "text-[#E94E41]" : "text-cyan-400"}
                  `}>
                  Changelog
                </h2>
                <p className={`
                  mb-4
                  ${isWarmthMode ? "text-gray-700" : "text-gray-200"}
                `}>
                  The Changelog lists significant changes to the website after deployment, including new features, bug fixes, or news updates.
                </p>
              </div>
              <div className="text-right mt-auto">
                <Link 
                  to="/Changelog"
                  className={`
                    font-semibold underline underline-offset-2
                    transition-colors duration-200
                    ${isWarmthMode
                      ? "text-blue-600 hover:text-[#E94E41]"
                      : "text-cyan-300 hover:text-cyan-100"}
                  `}
                >
                  View Changelog
                </Link>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col">
            <div className={`
                rounded-lg shadow-lg flex-1 flex flex-col border
                transition-colors p-6
                ${isWarmthMode
                  ? "bg-white border-[#e2eafc]"
                  : "bg-[#1a222c] border-cyan-700"
                }
              `}
            >
              <h2 className={`
                  text-2xl lg:text-3xl font-bold mb-4 text-center
                  ${isWarmthMode ? "text-[#E94E41]" : "text-cyan-400"}
                `}>
                Contact Me
              </h2>
              <p className={`text-sm mb-6
                ${isWarmthMode ? "text-gray-700" : "text-gray-400"}
              `}>
                You can send a message anonymously by leaving the Name and Email fields empty.
                Provide your email only if you expect a response.
                <span className="text-red-500 font-semibold"> WIP:</span> This form is still a work in progress.
              </p>
              <form action="/submit" method="POST" className="space-y-6 flex-1 flex flex-col justify-between">
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                  <label htmlFor="name" className={`md:w-28 font-semibold 
                    ${isWarmthMode ? "text-gray-700" : "text-gray-200"}
                  `}>
                    Name: <span className="text-gray-500 text-sm">(optional)</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className={`
                      flex-1 border rounded px-3 py-2
                      transition-colors outline-none
                      ${isWarmthMode
                        ? "border-gray-300 bg-white text-gray-800 focus:ring-blue-400"
                        : "border-cyan-900 bg-[#202534] text-cyan-100 focus:ring-cyan-400"
                      }
                      focus:outline-none focus:ring-2
                    `}
                    placeholder="Your name"
                  />
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                  <label htmlFor="email" className={`md:w-28 font-semibold 
                    ${isWarmthMode ? "text-gray-700" : "text-gray-200"}
                  `}>
                    Email: <span className="text-gray-500 text-sm">(optional)</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`
                      flex-1 border rounded px-3 py-2
                      transition-colors outline-none
                      ${isWarmthMode
                        ? "border-gray-300 bg-white text-gray-800 focus:ring-blue-400"
                        : "border-cyan-900 bg-[#202534] text-cyan-100 focus:ring-cyan-400"
                      }
                      focus:outline-none focus:ring-2
                    `}
                    placeholder="Your email"
                  />
                </div>

                <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4 flex-1">
                  <label htmlFor="message" className={`md:w-28 font-semibold mt-2 md:mt-0 
                    ${isWarmthMode ? "text-gray-700" : "text-gray-200"}
                  `}>
                    Message: <span className="text-red-500">*</span>
                  </label>
                  <div className="flex-1 flex flex-col">
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      required
                      placeholder="Type your message here..."
                      className={`
                        border rounded px-3 py-2
                        transition-colors outline-none
                        ${isWarmthMode
                          ? "border-gray-300 bg-white text-gray-800 focus:ring-blue-400"
                          : "border-cyan-900 bg-[#202534] text-cyan-100 focus:ring-cyan-400"
                        }
                        focus:outline-none focus:ring-2
                      `}
                    ></textarea>
                    <p className="text-sm text-gray-500 mt-1">This field is required.</p>
                  </div>
                </div>
                {/* Submit */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className={`
                      px-6 py-2 rounded font-bold transition-colors
                      ${isWarmthMode
                        ? "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-400"
                        : "bg-cyan-700 text-white hover:bg-cyan-800 focus:ring-cyan-400"
                      }
                      focus:outline-none focus:ring-2
                    `}
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
