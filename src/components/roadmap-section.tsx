"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

export default function RoadmapSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const roadmapItems = [
    {
      id: 1,
      title: "FlappyWUD Launch",
      description: "Initial game release with token integration and leaderboard",
      status: "completed",
      date: "Q2 2023",
    },
    {
      id: 2,
      title: "Jeet Leaderboard",
      description: "Competitive gameplay with rewards for top players",
      status: "completed",
      date: "Q3 2023",
    },
    {
      id: 3,
      title: "WUD Appchain Research",
      description: "Exploring the possibility of a dedicated WUD parachain",
      status: "in-progress",
      date: "Q1 2024",
    },
    {
      id: 4,
      title: "Gavun Agent on OpenGov",
      description: "Integrating the AI assistant with Polkadot governance",
      status: "upcoming",
      date: "Q2 2024",
    },
    {
      id: 5,
      title: "FlappyWUD 2.0",
      description: "Major game update with new features and improved graphics",
      status: "upcoming",
      date: "Q3 2024",
    },
  ]

  return (
    <section ref={ref} className="py-20 px-4 md:px-6 bg-black/90 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black"></div>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold font-['Karantina',sans-serif] mb-4">
            <span className="text-[#ff2e70]">Roadmap</span>
          </h2>
          <div className="h-1 w-20 bg-[#ff2e70] mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Our vision for the future of WUD, with a touch of humor but serious execution
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#ff2e70] to-gray-800 transform md:translate-x-[-0.5px]"></div>

          <div className="space-y-12">
            {roadmapItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
              >
                <div className="md:w-1/2 md:px-8">
                  <div
                    className={`bg-black/60 backdrop-blur-sm p-6 rounded-xl border ${item.status === "completed" ? "border-[#ff2e70]" : item.status === "in-progress" ? "border-yellow-500" : "border-gray-700"}`}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      {item.status === "completed" && (
                        <div className="bg-[#ff2e70] rounded-full p-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-white"
                          >
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                        </div>
                      )}
                      {item.status === "in-progress" && (
                        <div className="bg-yellow-500 rounded-full p-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-white"
                          >
                            <path d="M12 2v4" />
                            <path d="m6.8 6.8-2.8-2.8" />
                            <path d="M6 12H2" />
                            <path d="m6.8 17.2-2.8 2.8" />
                            <path d="M12 22v-4" />
                            <path d="m17.2 17.2 2.8 2.8" />
                            <path d="M22 12h-4" />
                            <path d="m17.2 6.8 2.8-2.8" />
                          </svg>
                        </div>
                      )}
                      {item.status === "upcoming" && (
                        <div className="bg-gray-700 rounded-full p-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-white"
                          >
                            <path d="M12 2v4" />
                            <path d="M12 18v4" />
                            <path d="M4.93 4.93l2.83 2.83" />
                            <path d="M16.24 16.24l2.83 2.83" />
                            <path d="M2 12h4" />
                            <path d="M18 12h4" />
                            <path d="M4.93 19.07l2.83-2.83" />
                            <path d="M16.24 7.76l2.83-2.83" />
                          </svg>
                        </div>
                      )}
                      <span
                        className={`text-sm font-bold ${item.status === "completed" ? "text-[#ff2e70]" : item.status === "in-progress" ? "text-yellow-500" : "text-gray-400"}`}
                      >
                        {item.status === "completed"
                          ? "COMPLETED"
                          : item.status === "in-progress"
                            ? "IN PROGRESS"
                            : "UPCOMING"}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-300 mb-4">{item.description}</p>

                    <div className="flex items-center space-x-2 text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-[#ff2e70]"
                      >
                        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                        <line x1="16" x2="16" y1="2" y2="6" />
                        <line x1="8" x2="8" y1="2" y2="6" />
                        <line x1="3" x2="21" y1="10" y2="10" />
                      </svg>
                      <span className="text-gray-400">{item.date}</span>
                    </div>
                  </div>
                </div>

                <div className="absolute left-0 md:left-1/2 top-6 w-8 h-8 rounded-full bg-[#ff2e70] border-4 border-black transform md:translate-x-[-50%] flex items-center justify-center">
                  <span className="text-white font-bold text-xs">{item.id}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-xl font-bold text-[#ff2e70]">
            &quot;The roadmap is a living document. Like WUD, it evolves with the community.&quot;
          </p>
        </motion.div>
      </div>
    </section>
  )
}
