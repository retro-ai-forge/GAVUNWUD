/**
 * BRAND ASSETS GALLERY
 * 
 * HOW TO SYNC NEW ASSETS:
 * 1. Open the Google Drive folder: https://drive.google.com/drive/folders/1RzZU1pwn05CTEUaIn9xsoLn21KAcEYGD
 * 2. To get a File ID: 
 *    - Right-click the file -> "Get link" OR open the file.
 *    - The ID is the long string between "/d/" and "/view" in the URL.
 *    - Example: In .../d/1YbLo7sKnriFFz3QzWU45KuNKZy4w_3PB/view, the ID is "1YbLo7sKnriFFz3QzWU45KuNKZy4w_3PB"
 * 3. Update the `ASSETS` array below with the new { id, name, type }.
 */

"use client"

import { motion } from "framer-motion"
import { Download, ExternalLink } from "lucide-react"

const ASSETS = [
    { id: "1YbLo7sKnriFFz3QzWU45KuNKZy4w_3PB", name: "Black Gold Sticker", type: "png" },
    { id: "1Hq__yIRP3CjGDlHDn7UC2FA1zanHRXgt", name: "Black White Sticker", type: "png" },
    { id: "1cBd75Ygt6LjesLhlA2JoM933oAQa0YLp", name: "FlappyWUD 2.0 Cover", type: "png" },
    { id: "1HvhCmgD0wdBAuKvn-3W0D4Q2RqpKklV4", name: "FlappyWUD 2.0 Thumbnail", type: "png" },
    { id: "1IEV4DygZqfX-CQbMUSafGmM7ZXujp-nP", name: "Gavun Wud AI Agent Banner", type: "png" },
    { id: "1m2VC2wK4XofxloS7TYD_nWmEPe9nQIrs", name: "Gavun Wud Banner", type: "png" },
    { id: "1OeKLYXtrqL5sIiFJmcWuujsbBou5jZAX", name: "Gavun Wud White Text Logo", type: "png" },
    { id: "1W1sRmdm0XFpHuPOFOyjzZbrmuMAFekcT", name: "Gold Logo Sticker", type: "png" },
    { id: "1AFszuSlM5Sy0YQMCKixvonmBQGhFQlVS", name: "New Large WUD Logo", type: "png" },
    { id: "18OlV4QB41FBulaFzfkFHil2fXyTI-izj", name: "New Small WUD Logo", type: "png" },
    { id: "18LBKlVACnoy8QgkFAbLnUwKzNWnFBQof", name: "Shirt Logo", type: "png" },
    { id: "1vPNd2c4pM0ZpzCHlqpwtwklpzPBi70fK", name: "WUD Universe Banner", type: "png" },
    { id: "1ETChAktKqADdClt3pltXPesdSUXCBDtl", name: "WUD Universe Bifrost Banner", type: "png" },
    { id: "1doz9qbD_qTbuAO-G9XRvogFQOeuKIhCY", name: "WUD Universe Marketplace Banner", type: "png" },
]

export default function BrandAssetsGallery() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {ASSETS.map((asset, index) => (
                <motion.div
                    key={asset.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="group relative bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden hover:border-[#ff2e70]/50 transition-all duration-300"
                >
                    {/* Thumbnail Container */}
                    <div className="aspect-video relative bg-black/40 overflow-hidden">
                        <img
                            src={`https://drive.google.com/thumbnail?id=${asset.id}&sz=w600`}
                            alt={asset.name}
                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                        />

                        {/* Overlay Actions */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                            <a
                                href={`https://drive.google.com/file/d/${asset.id}/view`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                                title="View in Google Drive"
                            >
                                <ExternalLink size={20} className="text-white" />
                            </a>
                            <a
                                href={`https://drive.google.com/uc?export=download&id=${asset.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-[#ff2e70] hover:bg-[#ff2e70]/80 rounded-full transition-colors"
                                title="Download"
                            >
                                <Download size={20} className="text-white" />
                            </a>
                        </div>
                    </div>

                    {/* Info Section */}
                    <div className="p-4 border-t border-gray-800/50 flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-[#ff2e70] uppercase tracking-tighter mb-0.5">
                                {asset.type}
                            </span>
                            <h4 className="text-sm font-semibold text-gray-200 truncate pr-4 max-w-[180px]" title={asset.name}>
                                {asset.name}
                            </h4>
                        </div>

                        <a
                            href={`https://drive.google.com/uc?export=download&id=${asset.id}`}
                            className="text-gray-500 hover:text-white transition-colors"
                            title="Download asset"
                        >
                            <Download size={16} />
                        </a>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}
