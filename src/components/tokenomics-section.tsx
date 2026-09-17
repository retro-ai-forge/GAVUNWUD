"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js"
import { useDexScreenerPrice } from "@/hooks/useDexScreenerPrice"
import { useHolderDistribution } from "@/hooks/useHolderDistribution"
import { formatNumber, formatCurrency } from "@/lib/utils"
import { HolderDistributionChart } from "@/components/holder-distribution-chart"
// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement)

export default function TokenomicsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const { data: dexData, loading } = useDexScreenerPrice()

  const tokenomicsData = {
    labels: [
      "Circulating Supply",
      "WUD Treasury",
      "Zeitgeist PM Treasury",
      "Burned",
    ],
    datasets: [
      {
        data: [91.1, 2.1, 3.3, 3.5],
        backgroundColor: ["#88c8ff", "#ffd700", "#b967ff", "#333333"],
        borderColor: ["#000000", "#000000", "#000000", "#000000"],
        borderWidth: 2,
      },
    ],
  }

  const chartOptions = {
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          color: "#ffffff",
          font: {
            size: 12,
          },
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        bodyFont: {
          size: 14,
        },
        padding: 12,
        displayColors: true,
        callbacks: {
          label: (context: any) => `${context.label}: ${context.raw}%`,
        },
      },
    },
    cutout: "60%",
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  }

  return (
    <section ref={ref} className="py-20 px-4 md:px-6 bg-black relative">
      <div className="absolute inset-0 bg-[url('/images/pattern-bck.webp')] bg-repeat opacity-10"></div>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold font-['Karantina',sans-serif] mb-4">
            <span className="text-[#ff2e70]">Tokenomics</span>
          </h2>
          <div className="h-1 w-20 bg-[#ff2e70] mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            No team allocation, no presale, no vesting, admin rights burned
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto w-full flex flex-col items-center"
          >
            <div className="w-full max-w-lg text-center mb-6">
              <h3 className="text-3xl font-bold">
                Total Supply: <span className="text-[#ff2e70]">1 Trillion WUD</span>
              </h3>
            </div>
            
            <div className="w-full max-w-lg mx-auto h-[400px]">
              <Doughnut data={tokenomicsData} options={chartOptions as any} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="space-y-6">
              <div className="bg-black/60 backdrop-blur-sm p-6 rounded-xl border border-gray-800">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#ff2e70] mr-2"
                  >
                    <path d="M12 22V8" />
                    <path d="m5 12 7-4 7 4" />
                    <path d="M5 16l7-4 7 4" />
                    <path d="M5 20l7-4 7 4" />
                  </svg>
                  Token Distribution
                </h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex justify-between">
                    <span>Circulating Supply:</span>
                    <span className="font-medium">91.1%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Zeitgeist PM:</span>
                    <span className="font-medium">3.3%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Treasury:</span>
                    <span className="font-medium">2.1%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Burned:</span>
                    <span className="font-medium">3.5% (35B WUD)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-black/60 backdrop-blur-sm p-6 rounded-xl border border-gray-800">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#ff2e70] mr-2"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                  Liquidity
                  <span className="text-xs ml-2 text-gray-400">
                    {loading ? '(loading...)' : dexData && dexData.liquidityUsd > 0 ? '(live data)' : '(unavailable)'}
                  </span>
                </h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex justify-between">
                    <span>Total Liquidity:</span>
                    <span className="font-medium">
                      {loading ? "Loading..." : dexData && dexData.liquidityUsd > 0 ? formatCurrency(dexData.liquidityUsd) : "n/a"}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span>WUD in LP:</span>
                    <span className="font-medium">
                      {loading ? "Loading..." : dexData && dexData.liquidityBase > 0 ? `${formatNumber(Math.round(dexData.liquidityBase))} WUD` : "n/a"}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span>DOT in LP:</span>
                    <span className="font-medium">
                      {loading ? "Loading..." : dexData && dexData.liquidityQuote > 0 ? `${dexData.liquidityQuote.toFixed(0)} DOT` : "n/a"}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span>24h Volume:</span>
                    <span className="font-medium">
                      {loading ? "Loading..." : dexData?.volume24h ? formatCurrency(dexData?.volume24h) : "n/a"}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span>LP Burned:</span>
                    <span className="font-medium">96.8%</span>
                  </li>
                </ul>
                <div className="mt-3 flex flex-wrap gap-3">
                  <a 
                    href="https://hydration.subscan.io/account/7MnTh8N7p88jQURyvvvh5pZiV6DAMz8rywUokYqBmtHKw8AQ?tab=extrinsic"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#88c8ff] hover:underline text-sm"
                  >
                    View LP on Subscan →
                  </a>
                  {dexData?.url && (
                    <a
                      href={dexData.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#88c8ff] hover:underline text-sm"
                    >
                      {dexData.dataSource === "dexscreener" ? "View on DexScreener →" : "View on Hydration Price →"}
                    </a>
                  )}
                </div>
              </div>

              <div className="bg-black/60 backdrop-blur-sm p-6 rounded-xl border border-gray-800">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#ff2e70] mr-2"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  Security
                </h3>
                <p className="text-gray-300 mb-3">
                  Admin rights have been burned, verified on-chain. The project is fully decentralized with no centralized control.
                  $WUD is also a self sufficient asset on Hydration, which means it passed the scrutiny of the Hydration holders.
                </p>
                
                <div className="bg-black/40 p-4 rounded-lg mt-4 mb-3 text-sm">
                  <h4 className="text-[#88c8ff] font-bold mb-2">Pure Proxy Details</h4>
                  <p className="text-gray-300 mb-2">
                    The initial owner address was a pure proxy spawned by{" "}
                    <a 
                      href="https://assethub-polkadot.subscan.io/account/13GuDZLSmYn29gbSFTA38oG1yQRP33wqVdWpxHm7NdY8Drgk"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#ffd700] hover:underline break-all"
                    >
                      13GuDZLSmYn29gbSFTA38oG1yQRP33wqVdWpxHm7NdY8Drgk
                    </a>
                  </p>
                  <p className="text-gray-300">
                    The pure proxy was killed, revoking all admin access to $WUD. This is verifiable on-chain and represents a 
                    complete surrender of control by the founding team.
                  </p>
                </div>
                
                <div className="mt-3 flex flex-wrap gap-3">
                  <a 
                    href="https://assethub-polkadot.subscan.io/extrinsic/6110778-2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#88c8ff] hover:underline text-sm"
                  >
                    View Burn Proof →
                  </a>
                  <a 
                    href="https://wiki.polkadot.network/docs/learn-proxies-pure"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#88c8ff] hover:underline text-sm"
                  >
                    Learn About Pure Proxies →
                  </a>
                  <a 
                    href="https://hydradx.subsquare.io/democracy/referenda/168"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#88c8ff] hover:underline text-sm"
                  >
                    Hydration Governance →
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-center text-[#ff2e70] mb-8">Holder Distribution</h3>
          
          <HolderDistributionChart />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-xl font-bold text-[#ff2e70]">&quot;No VCs, no insiders, no mercy.&quot;</p>
        </motion.div>
      </div>
    </section>
  )
}
