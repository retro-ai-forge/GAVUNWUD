"use client"

import { Volume2, VolumeX } from "lucide-react"
import { useSound } from "@/components/sound-provider"
import { cn } from "@/lib/utils"

export function SoundToggle({ className }: { className?: string }) {
  const { muted, toggleMuted } = useSound()
  const label = muted ? "Turn sound on" : "Turn sound off"

  return (
    <button
      type="button"
      onClick={toggleMuted}
      aria-label={label}
      aria-pressed={muted}
      title={label}
      className={cn(
        "flex items-center justify-center rounded-lg border border-gray-700 p-2 text-white transition-colors hover:border-[#ff2e70] hover:text-[#ff2e70]",
        muted && "border-[#ff2e70] text-[#ff2e70]",
        className
      )}
    >
      {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
    </button>
  )
}
